import type { User } from "../models/user.model";

export function userMapper(userDb: Record<string, any>): User {
  const { id, firstName, lastName, email, image, role } = userDb;
  const userModel: User = { id, firstName, lastName, email, image, role, token: "" };
  return userModel;
}
