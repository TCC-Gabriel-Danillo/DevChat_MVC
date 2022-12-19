import { Unsubscribe } from "@firebase/util";
import { firebaseApp } from "_/config/firabaseConfig";
import { getRefFromArgs, parseCollection, parseFirebaseSnapshot } from "_/helpers/databaseHelpers";
import { Firestore, getFirestore, onSnapshot } from "firebase/firestore";

import { QueryOptions } from "../DatabaseAdapter/types";
import { RealtimeDatabaseType, VoidCallback } from "./types";

export class RealtimeDatabaseAdapter implements RealtimeDatabaseType {
  private unsubscribeFunction?: Unsubscribe;

  private readonly firestore: Firestore = getFirestore(firebaseApp);
  private collections: string[];

  constructor(...collections: string[]) {
    this.collections = collections;
  }

  setCollections(...collections: string[]) {
    this.collections = collections;
  }

  watch<T>(cb: VoidCallback<T>, args: QueryOptions): void {
    const collection = parseCollection(this.collections, this.firestore);
    const q = getRefFromArgs(collection, args);
    this.unsubscribeFunction = onSnapshot(q, (querySnapShot) => {
      const docs = parseFirebaseSnapshot<T>(querySnapShot);
      cb(docs);
    });
  }

  unwatch(): void {
    this.unsubscribeFunction?.();
  }
}
