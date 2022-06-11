import { initializeApp } from "firebase/app";
import { getStorage, ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";


const app = initializeApp({
  // FHomeZ 
  apiKey: "AIzaSyD5Lb7mk2-QkOSzTsdG5rTkzYwvN37cn40",
  authDomain: "fhomez-c86fb.firebaseapp.com",
  projectId: "fhomez-c86fb",
  storageBucket: "fhomez-c86fb.appspot.com",
  messagingSenderId: "418087428319",
  appId: "1:418087428319:web:261028897e59afa6b1896a"
});

const storage = getStorage(app);


export { uploadBytesResumable,getDownloadURL,ref,storage  };


// export const useFirestoreQuery = (query) => {
//   const [docs, setDocs] = useState([]);
//   const queryRef = useRef(query);

//   useEffect(() => {
//     if (!queryRef.current?.isEqual(query)) {
//       queryRef.current = query;
//     }
//   });

//   useEffect(() => {
//     if (!queryRef.current) {
//       return null;
//     }

//     const unsubscribe = queryRef.current.onSnapshot((querySnapshot) => {
//       const data = querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setDocs(data);
//     });

//     return unsubscribe;
//   }, [queryRef]);

//   return docs;
// };



// https://plnkr.co/edit/zjKMcigaZ3t6kLZv9aOc?p=preview&preview