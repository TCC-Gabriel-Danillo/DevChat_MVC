import { FirebaseUser, User } from "_/types";

export const mapUserToFirebaseUser = (user: User): FirebaseUser => {
  return {
    email: user.email,
    id: user.id,
    username: user.username,
    photoUrl: user.photoUrl,
    techs: user.techs,
  };
};
