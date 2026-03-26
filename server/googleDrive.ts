/**
 * Google Drive service using Google Apps Script web app
 * This is a simpler alternative to using Google Cloud Service Account
 */

interface AppsScriptResponse {
    success: boolean;
    file?: {
        id: string;
        name: string;
        mimeType: string;
        createdTime: string;
        size: number;
        downloadUrl: string;
    };
    error?: string;
}

export class GoogleDriveService {
    private appsScriptUrl: string;

    constructor() {
        this.appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || "";

        if (!this.appsScriptUrl) {
            console.warn("GOOGLE_APPS_SCRIPT_URL not configured. Resume download will not work.");
        }
    }

    /**
     * Gets the latest resume file information from Google Apps Script
     * @returns File metadata including download URL, or null if not found
     */
    async getLatestResume(): Promise<AppsScriptResponse["file"] | null> {
        if (!this.appsScriptUrl) {
            throw new Error("Google Apps Script URL not configured");
        }

        try {
            const response = await fetch(this.appsScriptUrl);

            if (!response.ok) {
                throw new Error(`Apps Script request failed: ${response.statusText}`);
            }

            const data: AppsScriptResponse = await response.json();

            if (!data.success) {
                console.error("Apps Script error:", data.error);
                return null;
            }

            return data.file || null;
        } catch (error) {
            console.error("Error fetching from Google Apps Script:", error);
            throw new Error("Failed to fetch resume from Google Drive");
        }
    }

    /**
     * Downloads the latest resume file and returns it as a stream
     * @returns File stream and metadata, or null if no file found
     */
    async downloadLatestResume(): Promise<{
        data: ReadableStream;
        mimeType: string;
        fileName: string;
    } | null> {
        const fileInfo = await this.getLatestResume();

        if (!fileInfo) {
            return null;
        }

        try {
            // Download the file from Google Drive using the direct download URL
            const response = await fetch(fileInfo.downloadUrl);

            if (!response.ok) {
                throw new Error(`Failed to download file: ${response.statusText}`);
            }

            if (!response.body) {
                throw new Error("No response body received");
            }

            return {
                data: response.body,
                mimeType: fileInfo.mimeType,
                fileName: fileInfo.name,
            };
        } catch (error) {
            console.error("Error downloading file from Google Drive:", error);
            throw new Error("Failed to download file from Google Drive");
        }
    }
}

export const googleDriveService = new GoogleDriveService();
