import { HttpsAdapter } from "_/adapters";
import { GITHUB_URL } from "_/constants";
import { AuthService } from "_/services/authService";

import * as httpMock from "../mocks/http";

describe("authService", () => {
  beforeAll(() => {
    httpMock.mockAuthTokenRequest();
    httpMock.mockReposRequest();
    httpMock.mockUserRequest();
  });

  it("Deve retornar usuário", async () => {
    const gitApiHttp = new HttpsAdapter(GITHUB_URL.API_BASE_URL);
    const gitAuthHttp = new HttpsAdapter(GITHUB_URL.AUTH_BASE_URL);
    const authService = new AuthService(gitAuthHttp, gitApiHttp);

    const credentials = {
      code: "any_code",
      client_id: "any_client_id",
      client_secret: "any_client_secret",
    };
    const user = await authService.authenticateGithub(credentials);
    expect(user).toEqual({
      email: "email",
      id: "id",
      photoUrl: "url",
      username: "username",
      techs: ["language1"],
    });
  });

  it("Deve retornar vazio caso valor do token seja vazio", async () => {
    httpMock.mockAuthTokenRequestEmpty();
    const gitApiHttp = new HttpsAdapter(GITHUB_URL.API_BASE_URL);
    const gitAuthHttp = new HttpsAdapter(GITHUB_URL.AUTH_BASE_URL);
    const authService = new AuthService(gitAuthHttp, gitApiHttp);

    const credentials = {
      code: "any_code",
      client_id: "any_client_id",
      client_secret: "any_client_secret",
    };
    const user = await authService.authenticateGithub(credentials);

    expect(user).toBeFalsy();
  });

  it("Deve retornar vazio caso token retorne vazio", async () => {
    httpMock.mockReposRequestEmpty();
    httpMock.mockAuthTokenRequest();
    httpMock.mockUserRequest();
    const gitApiHttp = new HttpsAdapter(GITHUB_URL.API_BASE_URL);
    const gitAuthHttp = new HttpsAdapter(GITHUB_URL.AUTH_BASE_URL);
    const authService = new AuthService(gitAuthHttp, gitApiHttp);

    const credentials = {
      code: "any_code",
      client_id: "any_client_id",
      client_secret: "any_client_secret",
    };
    const user = await authService.authenticateGithub(credentials);

    expect(user).toBeFalsy();
  });

  it("Deve retornar erro 401", async () => {
    httpMock.mockReposRequestForbidden();
    httpMock.mockAuthTokenRequest();
    httpMock.mockUserRequest();
    const gitApiHttp = new HttpsAdapter(GITHUB_URL.API_BASE_URL);
    const gitAuthHttp = new HttpsAdapter(GITHUB_URL.AUTH_BASE_URL);
    const authService = new AuthService(gitApiHttp, gitAuthHttp);

    const credentials = {
      code: "any_code",
      client_id: "any_client_id",
      client_secret: "any_client_secret",
    };
    const user = authService.authenticateGithub(credentials);

    await expect(user).rejects.toThrow();
  });
});
