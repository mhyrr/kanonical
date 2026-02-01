#!/usr/bin/env python3
"""
Fetches Google Sheets data and writes to /data/*.json

Usage: ./scripts/fetch-sheets.py

Requires:
  - KANONICAL_SHEET_CRED environment variable (JSON service account credentials)
  - pip install google-auth google-auth-oauthlib google-api-python-client
"""

import os
import json
import sys
from pathlib import Path

try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
except ImportError:
    print("Missing dependencies. Install with:")
    print("  pip install google-auth google-auth-oauthlib google-api-python-client")
    sys.exit(1)

# Sheet configurations - IDs from your gatsby-config.js
SHEETS = {
    'books': {
        'id': '1D4K-8Tf-kJKMqqe1zGv6AXs5fQWTbTbxan_gDFmkErE',
        'range': 'Books!A:F'
    },
    'workouts': {
        'id': '1WKkLtwJujS-AL4WB_sLlxyFtbBgxl6zTcrAoUwnr9O0',
        'range': 'Sheet1!A:E'
    },
    'links': {
        'id': '1xyxBcVq5TehTu3mW1lL8N0lhTEr0eUUvnH9b16raj8w',
        'range': 'Links!A:D'
    },
    'words': {
        'id': '1pam_ovDuYjkp5Zm52Y_TgCCTFSbEFjVHWzc_uwNjSQA',
        'range': 'Words!A:C'
    }
}

def fetch_sheet(service, sheet_id, range_name):
    """Fetch a sheet and return as list of dicts."""
    try:
        result = service.spreadsheets().values().get(
            spreadsheetId=sheet_id,
            range=range_name
        ).execute()
    except Exception as e:
        print(f"  Error fetching sheet {sheet_id}: {e}")
        return []

    values = result.get('values', [])
    if not values:
        return []

    # First row is headers
    headers = [h.lower().replace(' ', '_') for h in values[0]]

    # Convert rows to dicts, handling missing columns
    rows = []
    for row in values[1:]:
        # Pad row to match headers length
        padded = row + [''] * (len(headers) - len(row))
        rows.append(dict(zip(headers, padded)))

    return rows

def main():
    # Get credentials from environment
    creds_json = os.environ.get('KANONICAL_SHEET_CRED')
    if not creds_json:
        print("Error: KANONICAL_SHEET_CRED environment variable not set")
        print("\nSet it with your Google service account JSON:")
        print('  export KANONICAL_SHEET_CRED=\'{"type":"service_account",...}\'')
        sys.exit(1)

    try:
        creds_data = json.loads(creds_json)
    except json.JSONDecodeError as e:
        print(f"Error parsing KANONICAL_SHEET_CRED as JSON: {e}")
        sys.exit(1)

    # Authenticate
    creds = service_account.Credentials.from_service_account_info(
        creds_data,
        scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
    )
    service = build('sheets', 'v4', credentials=creds)

    # Ensure data directory exists
    data_dir = Path(__file__).parent.parent / 'data'
    data_dir.mkdir(exist_ok=True)

    # Fetch each sheet
    for name, config in SHEETS.items():
        print(f"Fetching {name}...")
        data = fetch_sheet(service, config['id'], config['range'])

        output_path = data_dir / f'{name}.json'
        with open(output_path, 'w') as f:
            json.dump(data, f, indent=2)

        print(f"  Wrote {len(data)} rows to {output_path.name}")

    print("\nDone!")

if __name__ == '__main__':
    main()
