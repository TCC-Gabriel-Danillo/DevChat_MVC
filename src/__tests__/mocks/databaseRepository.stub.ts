import { DatabaseType } from "_/repositories/DatabaseRepository/types";

export const DatabaseRepositoryStub = {
  setCollections: jest.fn(),
  getOneById: jest.fn(),
  getAll: jest.fn(),
  createOrReplace: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as DatabaseType;
