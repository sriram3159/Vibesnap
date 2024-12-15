import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import LocalStorage from "./storageUtils/LocalStorage";


  const userCollectionRef=collection(db,"users")
const userData = JSON.parse(LocalStorage.getUserData());

export const savePost = async (text, imageUrl) => {
  try {
    const docRef = await addDoc(userCollectionRef,{
        user:userData?.displayName,
        userDp:userData?.photoURL,
        feedMsg: text,
        imageUrl: imageUrl,
        createdAt: new Date(),
        likes:0,
      })

    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
};
