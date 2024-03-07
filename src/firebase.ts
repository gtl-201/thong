/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore/lite';
import { FirebaseStorage, StorageReference, UploadMetadata, getDownloadURL, getStorage, ref, uploadBytes, } from 'firebase/storage';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBqluxwmqF5i__kgyHHBKudyFO7Gn3GCqA",
  authDomain: "thong-cf12a.firebaseapp.com",
  projectId: "thong-cf12a",
  storageBucket: "thong-cf12a.appspot.com",
  messagingSenderId: "832531018196",
  appId: "1:832531018196:web:d5e429dbf979c4b626e641",
  measurementId: "G-PBG15RP63J"
};


export const firebaseApp = (): FirebaseApp => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
  return app;
};


export const firebaseAppForUser = (): FirebaseApp => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig, 'admin');
  return app;
};

export const getStore = (): Firestore => getFirestore(firebaseApp());

class FirestoreService {
  db = getStore();

  collection = (name: string) => collection(this.db, name);

  add = async (collectionName: string, data: any): Promise<any> => {
    try {
      const db = collection(this.db, collectionName);

      const docRef = await addDoc(db, data);

      // this.update(collectionName, docRef.id, { id: docRef.id });
      localStorage.setItem('idBill', docRef.id )
      return Promise.resolve({ ...data, id: docRef.id });
    }
    catch (error) {
      return Promise.reject(error);
    }

  };

//   addWithSpecialId = async (collectionName: string, data: any): Promise<any> => {
//     try {
//         const db = collection(this.db, collectionName);

//         // Lấy danh sách tài liệu được sắp xếp theo ID giảm dần với giới hạn là 1
//         const q = query(db, orderBy('id', 'desc'), limit(1));
//         const querySnapshot = await getDocs(q);

//         let highestId = 0;
//         querySnapshot.forEach(doc => {
//             highestId = doc.data().id;
//         });

//         // Tạo ID mới cho tài liệu mới
//         const newId = highestId + 1;
//         // Thêm tài liệu mới với ID mới được tạo ra

//         // const newDocRef = await addDoc(db, data);
//         const newDocRef = await addDoc(db, { ...data, id: newId });
//         // this.update(collectionName, newDocRef.id, { id: newId });

//         return Promise.resolve({ ...data, id: newId });
//     } catch (error) {
//         return Promise.reject(error);
//     }
// };


  update = async (collectionName: string, docName: string, data: any): Promise<any> => {
    try {
      const docRef = doc(this.db, collectionName, docName);
      return await updateDoc(docRef, data);
    }
    catch (error) {
      return Promise.reject(error);
    }
  };

  addWithId = async (collectionName: string, id: string, data: any): Promise<any> => {
    try {
      const docRef = await setDoc(doc(this.db, collectionName, id), data);
      this.update(collectionName, id, { id });

      return Promise.resolve(docRef);
    }
    catch (error) {
      return Promise.reject(error);
    }

  };

  get = async (collectionName: string): Promise<any> => {
    try{
      const coll = collection(this.db, collectionName);
      const docs = await getDocs(coll);
      const res = docs.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      return res;
    } catch (error) {
      console.error('Error searching documents:', error);
      throw error;
    }
  };

  getByDoc = async (collectionName: string, id: string): Promise<any> => {

    const coll = doc(this.db, collectionName, id);
    const docs = await getDoc(coll);
    const res = docs.data();
    return res;

  };

  delete = async (collectionName: string, id: string): Promise<any> => {
    try {
      await deleteDoc(doc(this.db, collectionName, id));
      return Promise.resolve(true);
    }
    catch (error) {
      return Promise.reject(error);
    }
  };

  getMultiCollection = async (collections: string[]): Promise<any[]> => {
    try {
      // Record<string, any[]>
      const mergedData: any = {};
      for (const coll of collections) {
        const collectionRef = collection(this.db, coll);
        const querySnapshot = await getDocs(collectionRef);
        mergedData[coll] = [];
        querySnapshot.forEach((doc) => {
          mergedData[coll].push({ id: doc.id, ...doc.data() });
        });
      }

      return mergedData;
    } catch (error) {
      console.error('Error searching documents:', error);
      throw error;
    }
  };
  
  getMultiByDoc = async (collectionIds: { collectionName: string, id: string }[]): Promise<any[]> => {
    try {
        const results: any[] = [];

        // Lặp qua từng cặp collectionName và id
        for (const { collectionName, id } of collectionIds) {
            const coll = doc(this.db, collectionName, id);
            const docSnap = await getDoc(coll);
            if (docSnap.exists()) {
                results.push({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log(`Document ${id} in collection ${collectionName} does not exist`);
            }
        }

        return results;
    } catch (error) {
        console.error('Error getting documents:', error);
        throw error;
    }
};

  createUser = async (user: any): Promise<any | any> => {

    try {
      let result: any = false;
      const auth = getAuth(firebaseAppForUser());
      await createUserWithEmailAndPassword(auth, user.email, user.password ?? '123456')
        .then(async (userCredential) => {
          // Signed in
          const u = userCredential.user;
          await this.addWithId('Users', u.uid, user);
          result = true;
          // ...
        })
        .catch((error: any) => {
          const errorCode = error.code;
          switch (errorCode) {
            case 'auth/email-already-in-use':
              {
                // Notify('error', `Địa chỉ email '${user.email}' đã tồn tại trên hệ thống tài khoản!!`);
                result = false;
                break;
              }
            case 'auth/wrong-password':
              {
                // Notify('error', 'Bạn đã nhập sai mật khẩu vui lòng kiểm tra lại!!');
                break;
              }
            default:
              break;
          }
          // ..
        });
      return Promise.resolve(result);
    }
    catch (error) {
      console.log(error);

      return Promise.reject(error);
    }
  };

}

class Storage {
  storage: FirebaseStorage;
  reference: StorageReference;
  constructor() {
    this.storage = getStorage(firebaseApp());
    this.reference = ref(this.storage);
  }

  async upload(reference: string, file: any) {
    if (!file) {
      throw new Error('File lỗi');
    }

    // Xác định loại nội dung dựa trên phần mở rộng của tên tệp tin
    let contentType: string;
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
      contentType = 'image/jpeg';
    } else if (fileName.endsWith('.png')) {
      contentType = 'image/png';
    } else {
      throw new Error('Loại tệp tin không được hỗ trợ');
    }

    // Thiết lập metadata với contentType phù hợp
    const metadata: UploadMetadata = {
      contentType: contentType
    };

    // Tải tệp lên với metadata đã thiết lập
    const { ref: f } = await uploadBytes(ref(this.storage, reference), file, metadata);

    return getDownloadURL(f);
  }
}


export const storage = new Storage();

export const firestore = new FirestoreService();

export const auth = getAuth(firebaseApp());