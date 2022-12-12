import {
  getFirestore,
  setDoc,
  doc,
  Firestore,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  CollectionReference,
  DocumentData,
  Query,
  QuerySnapshot,
} from "firebase/firestore";

import { DatabaseType, ORDER, QueryOptions } from "./types";

export class DatabaseAdapter implements DatabaseType {
  private readonly firestore: Firestore = getFirestore();
  private readonly collections: string[];

  constructor(...collections: string[]) {
    this.collections = collections;
  }

  get collection() {
    return this.parseCollection(this.collections, this.firestore);
  }

  async getOneById<T>(id: string): Promise<T> {
    const docRef = doc(this.collection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as T;
  }

  async getAll<T>(args?: QueryOptions): Promise<T[]> {
    const docsRef = this.getRefFromArgs(this.collection, args);
    const docsSnap = await getDocs(docsRef);
    return this.parseFirebaseSnapshot<T>(docsSnap);
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

  private parseFirebaseSnapshot = <T>(snap: QuerySnapshot<DocumentData>): T[] => {
    return snap.docs.map((d) => ({ ...d.data(), id: d.id })) as T[];
  };

  private parseCollection = (collections: string[], firestore: Firestore): CollectionReference<DocumentData> => {
    if (collection.length > 1) {
      return collection.apply(null, [firestore, ...collections]);
    }
    return collection(firestore, collections[0]);
  };

  private getRefFromArgs = (
    collection: CollectionReference<DocumentData>,
    options?: QueryOptions
  ): Query<DocumentData> => {
    if (options?.filterArgs && options?.orderArgs) {
      const { field: filterField, op, value } = options.filterArgs;
      const { field: orderField, order } = options.orderArgs;
      return query(collection, where(filterField, op, value), orderBy(orderField, order || ORDER.ASC));
    }

    if (options?.filterArgs) {
      const { field: filterField, op, value } = options.filterArgs;
      return query(collection, where(filterField, op, value));
    }

    if (options?.orderArgs) {
      const { field: orderField, order } = options.orderArgs;
      return query(collection, orderBy(orderField, order));
    }

    return query(collection);
  };
}
