package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
	"google.golang.org/api/sheets/v4"
)

type SheetConfig struct {
	ID    string
	Range string
}

var sheetConfigs = map[string]SheetConfig{
	"books": {
		ID:    "1D4K-8Tf-kJKMqqe1zGv6AXs5fQWTbTbxan_gDFmkErE",
		Range: "Books!A:F",
	},
	"workouts": {
		ID:    "1WKkLtwJujS-AL4WB_sLlxyFtbBgxl6zTcrAoUwnr9O0",
		Range: "Sheet1!A:I",
	},
	"links": {
		ID:    "1xyxBcVq5TehTu3mW1lL8N0lhTEr0eUUvnH9b16raj8w",
		Range: "Links!A:D",
	},
	"words": {
		ID:    "1pam_ovDuYjkp5Zm52Y_TgCCTFSbEFjVHWzc_uwNjSQA",
		Range: "Words!A:C",
	},
}

func main() {
	// Get credentials from environment
	credsJSON := os.Getenv("KANONICAL_SHEET_CRED")
	if credsJSON == "" {
		log.Fatal("KANONICAL_SHEET_CRED environment variable not set")
	}

	ctx := context.Background()

	// Create credentials from JSON
	creds, err := google.CredentialsFromJSON(ctx, []byte(credsJSON), sheets.SpreadsheetsReadonlyScope)
	if err != nil {
		log.Fatalf("Failed to parse credentials: %v", err)
	}

	// Create Sheets service
	srv, err := sheets.NewService(ctx, option.WithCredentials(creds))
	if err != nil {
		log.Fatalf("Failed to create Sheets service: %v", err)
	}

	// Ensure data directory exists
	dataDir := filepath.Join(".", "data")
	if err := os.MkdirAll(dataDir, 0755); err != nil {
		log.Fatalf("Failed to create data directory: %v", err)
	}

	// Fetch each sheet
	for name, config := range sheetConfigs {
		fmt.Printf("Fetching %s...\n", name)

		resp, err := srv.Spreadsheets.Values.Get(config.ID, config.Range).Do()
		if err != nil {
			log.Printf("  Error fetching %s: %v", name, err)
			continue
		}

		if len(resp.Values) == 0 {
			log.Printf("  No data found in %s", name)
			continue
		}

		// First row is headers
		headers := make([]string, len(resp.Values[0]))
		for i, h := range resp.Values[0] {
			header := strings.ToLower(fmt.Sprintf("%v", h))
			header = strings.ReplaceAll(header, " ", "_")
			headers[i] = header
		}

		// Convert rows to maps
		var rows []map[string]string
		for _, row := range resp.Values[1:] {
			rowMap := make(map[string]string)
			for i, header := range headers {
				if i < len(row) {
					rowMap[header] = fmt.Sprintf("%v", row[i])
				} else {
					rowMap[header] = ""
				}
			}
			rows = append(rows, rowMap)
		}

		// Write to JSON file
		outputPath := filepath.Join(dataDir, name+".json")
		jsonData, err := json.MarshalIndent(rows, "", "  ")
		if err != nil {
			log.Printf("  Error marshaling %s: %v", name, err)
			continue
		}

		if err := os.WriteFile(outputPath, jsonData, 0644); err != nil {
			log.Printf("  Error writing %s: %v", name, err)
			continue
		}

		fmt.Printf("  Wrote %d rows to %s\n", len(rows), name+".json")
	}

	fmt.Println("\nDone!")
}
