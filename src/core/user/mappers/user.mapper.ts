import type { User } from "../models/user.model";
import { User as UserDb } from "@prisma/client";

export function userMapper(userDb: UserDb): User {
  const { id, firstName, lastName, email, image, role } = userDb;
  let userImage = image;
  if (!userImage) userImage = "/images/user.png";
  const userModel: User = { id, firstName, lastName, email, image: userImage, role, token: "" };
  return userModel;
}
