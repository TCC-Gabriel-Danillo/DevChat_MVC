import { QueryOptions } from "../DatabaseAdapter/types";

export type VoidCallback<T> = (data: T[]) => void;

export interface RealtimeDatabaseType {
  watch<T>(cb: VoidCallback<T>, args?: QueryOptions): void;
  unwatch(): void;
}
