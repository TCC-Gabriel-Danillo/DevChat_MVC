import { GitUserDto } from "_/services/authService/types";
import { User } from "_/types";

export const mapGitUserToUser = (gitUser: GitUserDto, techs: string[]): User => {
  return {
    email: gitUser.email,
    id: String(gitUser.id),
    photoUrl: gitUser.avatar_url,
    techs,
    username: gitUser.login,
  };
};
