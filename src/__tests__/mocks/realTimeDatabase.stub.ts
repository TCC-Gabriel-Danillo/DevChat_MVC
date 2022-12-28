import { RealtimeDatabaseType } from "_/repositories/RealtimeDatabaseRepository/types";

export const RealtimeDatabaseStub = {
  watch: jest.fn(),
  setCollections: jest.fn(),
  unwatch: jest.fn(),
} as RealtimeDatabaseType;
