import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTaskSnapshot,
} from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';

export interface UploadProgress {
  progress: number;
  url?: string;
  error?: string;
}

export async function uploadDocument(
  file: File,
  userId: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const extension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${extension}`;
  const storageRef = ref(storage, `documents/${userId}/${fileName}`);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot: UploadTaskSnapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
}

export async function deleteDocument(url: string): Promise<void> {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
}

export async function uploadMultipleDocuments(
  files: File[],
  userId: string,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const url = await uploadDocument(files[i], userId, (p) => onProgress?.(i, p));
    urls.push(url);
  }
  return urls;
}
