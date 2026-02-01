#!/bin/bash
#
# Fetches Google Sheets data and writes to /data/*.json
#
# Usage: ./scripts/fetch-sheets.sh
#
# Requires:
#   - KANONICAL_SHEET_CRED environment variable (JSON service account credentials)
#   - jq (brew install jq)
#

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DATA_DIR="$SCRIPT_DIR/../data"

# Sheet IDs from gatsby-config.js
BOOKS_ID="1D4K-8Tf-kJKMqqe1zGv6AXs5fQWTbTbxan_gDFmkErE"
WORKOUTS_ID="1WKkLtwJujS-AL4WB_sLlxyFtbBgxl6zTcrAoUwnr9O0"
LINKS_ID="1xyxBcVq5TehTu3mW1lL8N0lhTEr0eUUvnH9b16raj8w"
WORDS_ID="1pam_ovDuYjkp5Zm52Y_TgCCTFSbEFjVHWzc_uwNjSQA"

# Check dependencies
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required. Install with: brew install jq"
    exit 1
fi

if [ -z "$KANONICAL_SHEET_CRED" ]; then
    echo "Error: KANONICAL_SHEET_CRED environment variable not set"
    exit 1
fi

# Get access token from service account
get_access_token() {
    # Extract key components from service account JSON
    local client_email=$(echo "$KANONICAL_SHEET_CRED" | jq -r '.client_email')
    local private_key=$(echo "$KANONICAL_SHEET_CRED" | jq -r '.private_key')
    local token_uri=$(echo "$KANONICAL_SHEET_CRED" | jq -r '.token_uri')

    # Create JWT header and claim
    local header=$(echo -n '{"alg":"RS256","typ":"JWT"}' | base64 | tr -d '=' | tr '/+' '_-' | tr -d '\n')

    local now=$(date +%s)
    local exp=$((now + 3600))
    local claim=$(cat <<EOF
{
    "iss": "$client_email",
    "scope": "https://www.googleapis.com/auth/spreadsheets.readonly",
    "aud": "$token_uri",
    "iat": $now,
    "exp": $exp
}
EOF
)
    local claim_b64=$(echo -n "$claim" | base64 | tr -d '=' | tr '/+' '_-' | tr -d '\n')

    # Sign with private key
    local signature=$(echo -n "${header}.${claim_b64}" | \
        openssl dgst -sha256 -sign <(echo "$private_key") | \
        base64 | tr -d '=' | tr '/+' '_-' | tr -d '\n')

    local jwt="${header}.${claim_b64}.${signature}"

    # Exchange JWT for access token
    local response=$(curl -s -X POST "$token_uri" \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -d "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=$jwt")

    echo "$response" | jq -r '.access_token'
}

# Fetch a sheet and convert to JSON array of objects
fetch_sheet() {
    local sheet_id=$1
    local range=$2
    local output=$3
    local token=$4

    echo "Fetching $output..."

    local url="https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/${range}"
    local response=$(curl -s -H "Authorization: Bearer $token" "$url")

    # Convert sheet data to array of objects
    # First row = headers, rest = data
    echo "$response" | jq '
        .values as $rows |
        ($rows[0] | map(ascii_downcase | gsub(" "; "_"))) as $headers |
        $rows[1:] | map(
            . as $row |
            reduce range(0; $headers | length) as $i (
                {};
                . + {($headers[$i]): ($row[$i] // "")}
            )
        )
    ' > "$DATA_DIR/$output"

    local count=$(jq 'length' "$DATA_DIR/$output")
    echo "  Wrote $count rows to $output"
}

# Main
mkdir -p "$DATA_DIR"

echo "Authenticating..."
TOKEN=$(get_access_token)

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
    echo "Error: Failed to get access token"
    exit 1
fi

fetch_sheet "$BOOKS_ID" "Books!A:F" "books.json" "$TOKEN"
fetch_sheet "$WORKOUTS_ID" "Sheet1!A:E" "workouts.json" "$TOKEN"
fetch_sheet "$LINKS_ID" "Links!A:D" "links.json" "$TOKEN"
fetch_sheet "$WORDS_ID" "Words!A:C" "words.json" "$TOKEN"

echo ""
echo "Done!"
