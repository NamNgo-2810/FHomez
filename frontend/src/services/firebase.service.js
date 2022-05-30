import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { useEffect, useRef, useState } from "react";

firebase.initializeApp({

  // FHomeZ 
  apiKey: "AIzaSyD5Lb7mk2-QkOSzTsdG5rTkzYwvN37cn40",
  authDomain: "fhomez-c86fb.firebaseapp.com",
  projectId: "fhomez-c86fb",
  storageBucket: "fhomez-c86fb.appspot.com",
  messagingSenderId: "418087428319",
  appId: "1:418087428319:web:261028897e59afa6b1896a",

  // Project 3
  // apiKey: "AIzaSyAQqw_YN6yzAhj_4vXJUGn13Def8P_Hw48",
  // authDomain: "mindxdemo.firebaseapp.com",
  // projectId: "mindxdemo",
  // storageBucket: "mindxdemo.appspot.com",
  // messagingSenderId: "47905551824",
  // appId: "1:47905551824:web:b0fc9af36dc8ee339d35d5"
});

const firestore = firebase.firestore();

const storage = firebase.storage();

export const useFirestoreQuery = (query) => {
  const [docs, setDocs] = useState([]);
  const queryRef = useRef(query);

  useEffect(() => {
    if (!queryRef.current?.isEqual(query)) {
      queryRef.current = query;
    }
  });

  useEffect(() => {
    if (!queryRef.current) {
      return null;
    }

    const unsubscribe = queryRef.current.onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocs(data);
    });

    return unsubscribe;
  }, [queryRef]);

  return docs;
};

export { storage, firestore };



// https://plnkr.co/edit/zjKMcigaZ3t6kLZv9aOc?p=preview&preview