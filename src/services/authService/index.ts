import { HttpsAdapter } from "_/adapters";
import { mapGitUserToUser } from "_/helpers/mapGitUserToUser";
import { User, AuthCredentialType } from "_/types";

import { GitRepositoryDto, GitTokenDto, GitUserDto, AuthServiceType } from "./types";

export class AuthService implements AuthServiceType {
  constructor(private readonly gitAuthHttp: HttpsAdapter, private readonly gitApiHttp: HttpsAdapter) {}

  async authenticateGithub(credentials: AuthCredentialType): Promise<User | undefined> {
    const tokenResponse = await this.exchangeCredentials(credentials);
    if (!tokenResponse) return;

    const { access_token } = tokenResponse;

    const [gitUser, gitRepos] = await Promise.all([this.getUserInfo(access_token), this.getUserRepos(access_token)]);
    if (!gitUser || !gitRepos) return;

    const techs = this.getTechsInfoFromGitRepos(gitRepos);

    const newUser = mapGitUserToUser(gitUser, techs);
    return newUser;
  }

  async exchangeCredentials(credentials: AuthCredentialType) {
    return this.gitAuthHttp.post<GitTokenDto>("/access_token", credentials, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  async getUserInfo(token: string): Promise<GitUserDto | undefined> {
    return this.gitApiHttp.get<GitUserDto>("/user", {
      headers: { authorization: `bearer ${token}` },
    });
  }

  async getUserRepos(token: string): Promise<GitRepositoryDto[] | undefined> {
    return this.gitApiHttp.get<GitRepositoryDto[]>("/user/repos", {
      headers: { authorization: `bearer ${token}` },
    });
  }

  getTechsInfoFromGitRepos(repos: GitRepositoryDto[]): string[] {
    const techs: string[] = [];
    repos.forEach((repo) => {
      const isNewTech = !techs.find((tech) => repo.language === tech);
      if (isNewTech && repo.language) {
        techs.push(repo.language);
      }
    });
    return techs;
  }
}
