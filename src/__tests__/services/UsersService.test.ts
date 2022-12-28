import { mapUserToFirebaseUser } from "_/helpers/mapUserToFirebaseUser";
import { UsersService } from "_/services";

import { userMock } from "../mocks/authService.stub";
import { DatabaseRepositoryStub } from "../mocks/databaseRepository.stub";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UserService", () => {
  const userDatabase = DatabaseRepositoryStub;
  const usersService = new UsersService(userDatabase);

  it("Deve criar usuário no banco", () => {
    usersService.createUserIfNotExists(userMock);
    const expected = mapUserToFirebaseUser(userMock);

    expect(userDatabase.createOrReplace).toBeCalledWith(expected, expected.id);
  });

  it("Deve chamar getAll", () => {
    usersService.listUsersByTech("any_tech");
    expect(userDatabase.getAll).toBeCalled();
  });
});
