import { QueryOptions } from "./Options";

export interface DatabaseType {
  getOneById<T>(id: string): Promise<T>;
  getAll<T>(args?: QueryOptions): Promise<T[]>;
  createOrReplace(data: any, id?: string): Promise<void>;
  update(data: any, id: string): Promise<void>;
  delete(id: string): Promise<void>;
  setCollections(...collections: string[]): void;
}
