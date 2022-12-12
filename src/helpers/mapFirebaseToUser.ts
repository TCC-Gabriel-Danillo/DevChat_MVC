import { FirebaseUser, User } from "_/types";

export const mapFirebaseToUser = (firebaseUser: FirebaseUser): User => {
  return {
    email: firebaseUser.email,
    id: firebaseUser.id,
    username: firebaseUser.username,
    photoUrl: firebaseUser.photoUrl,
    techs: firebaseUser.techs,
  };
};
