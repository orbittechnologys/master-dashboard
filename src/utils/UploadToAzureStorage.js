import { BlobServiceClient } from "@azure/storage-blob";

const uploadToAzureStorage = async (file, blobName) => {
  console.log(blobName);

  const storageAccount = import.meta.env.VITE_APP_STORAGE_ACCOUNT_NAME;
  const containerName = import.meta.env.VITE_APP_CONTAINER_NAME;
  const sasURL = import.meta.env.VITE_APP_SAS_URL;

  console.log(storageAccount, containerName, sasURL);
  if (!sasURL) {
    throw new Error("SAS URL is missing. Check your environment variables.");
  }

  const uploadUrl = sasURL;
  console.log(uploadUrl);
  const blobService = new BlobServiceClient(uploadUrl);

  console.log(blobService);

  const folderName = "truecaller";

  const containerClient = blobService.getContainerClient(folderName); // Folder name

  const uuid = generateUUID();

  const blobClient = containerClient.getBlockBlobClient(uuid + file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  console.log(blobClient);

  // upload file
  await blobClient.uploadData(file, options);

  const url = blobClient.url;
  console.log("File uploaded successfully. URL:", url);

  const imageUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${folderName}/${uuid}${file.name}`;

  return imageUrl;
};

function generateUUID() {
  // Generate a random hexadecimal string of length 4
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  // Return a UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
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

export default uploadToAzureStorage;
