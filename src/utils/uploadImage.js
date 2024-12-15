import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    console.log("Image URL:", url);
    return url; 
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};
