/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore,getFirestore } from 'firebase/firestore/lite';
import { FirebaseStorage, StorageReference, getDownloadURL, getStorage, ref, uploadBytes, } from 'firebase/storage';

import { getAuth } from 'firebase/auth';

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
    const { ref: f } = await uploadBytes(ref(this.storage, reference), file);

    return getDownloadURL(f);
  }
}

export const storage = new Storage();

export const firestore = new FirestoreService();

export const auth = getAuth(firebaseApp());
