import { BlobServiceClient } from "@azure/storage-blob";

// Generate UUID for unique filenames
function generateUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-4" +
    s4().substr(0, 3) +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

// Azure Storage Upload Function
const uploadToAzureStorage = async (file) => {
  try {
    const sasURL = import.meta.env.VITE_APP_BLOB_SAS_URL;

    if (!sasURL) {
      throw new Error("Azure Storage SAS URL is not configured");
    }

    // Parse the SAS URL to extract container name
    const url = new URL(sasURL);
    const containerName = url.pathname.split("/")[1];

    // Create BlobServiceClient with the SAS URL
    const blobServiceClient = new BlobServiceClient(sasURL);

    // Get container client - don't try to create it as SAS token might not have permissions
    const containerClient = blobServiceClient.getContainerClient("rifahdash");

    const uuid = generateUUID();
    // Clean filename to remove special characters
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const blobName = `${uuid}-${cleanFileName}`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload file
    console.log("Uploading file:", file.name, "as", blobName);

    const uploadResponse = await blockBlobClient.uploadData(file, {
      blobHTTPHeaders: {
        blobContentType: file.type || "application/octet-stream",
      },
    });

    console.log("Upload successful:", uploadResponse);

    // Construct the URL manually since blockBlobClient.url might not be correct with SAS
    const storageAccount = import.meta.env.VITE_APP_STORAGE_ACCOUNT_NAME;
    const blobUrl = `https://${storageAccount}.blob.core.windows.net/rifahdash/${blobName}`;

    console.log("File uploaded successfully. URL:", blobUrl);
    return blobUrl;
  } catch (error) {
    console.error("Azure upload error:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

export default uploadToAzureStorage;
