import { firebaseApp } from "_/config/firabaseConfig";
import { getRefFromArgs, parseCollection, parseFirebaseSnapshot } from "_/helpers/databaseHelpers";
import { getFirestore, setDoc, doc, Firestore, getDocs, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

import { DatabaseType, QueryOptions } from "./types";

export class DatabaseAdapter implements DatabaseType {
  private readonly firestore: Firestore = getFirestore(firebaseApp);
  private readonly collections: string[];

  constructor(...collections: string[]) {
    this.collections = collections;
  }

  get collection() {
    return parseCollection(this.collections, this.firestore);
  }

  async getOneById<T>(id: string): Promise<T> {
    const docRef = doc(this.collection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as T;
  }

  async getAll<T>(args?: QueryOptions): Promise<T[]> {
    const docsRef = getRefFromArgs(this.collection, args);
    const docsSnap = await getDocs(docsRef);
    return parseFirebaseSnapshot<T>(docsSnap);
  }

  async createOrReplace(data: any, id?: string) {
    await setDoc(doc(this.collection, id), data);
  }

  async update(data: any, id: string): Promise<void> {
    await updateDoc(doc(this.collection, id), data);
  }

  async delete(id: string) {
    await deleteDoc(doc(this.collection, id));
  }
}
