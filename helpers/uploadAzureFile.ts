import { BlobServiceClient } from "@azure/storage-blob";
import path from "path";

export const uploadFileAzure = async (
  BlobServiceClient: BlobServiceClient,
  containerName: string,
  nameTemp: any,
  folder: string
) => {
  const pathImagen = path.join(__dirname, `../../assets/${folder}`, nameTemp);  
  const containerClient = BlobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(nameTemp);
  const data = await blockBlobClient.uploadFile(pathImagen);
  return `${containerClient.url}/${nameTemp}`;
};

export const deleteFileAzure = async (
  BlobServiceClient: BlobServiceClient,
  containerName: string,
  nameFile: any
) => {
  // include: Delete the base blob and all of its snapshots.
  // only: Delete only the blob's snapshots and not the blob itself.
  const options: any = {
    deleteSnapshots: "include", // or 'only'
  };

  const containerClient = BlobServiceClient.getContainerClient(containerName);
  const blockBlobClient = await containerClient.getBlockBlobClient(nameFile);
  await blockBlobClient.deleteIfExists(options);
};

export const uploadVideoAzure = async (
  BlobServiceClient: BlobServiceClient,
  containerName: string,
  nameTemp: any,
  folder = "videos"
) => {
  const pathImagen = path.join(__dirname, `../../assets/${folder}`, nameTemp);
  const containerClient = BlobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(nameTemp);
  const data = await blockBlobClient.uploadFile(pathImagen);
  return `${containerClient.url}/${nameTemp}`;
};
