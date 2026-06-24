export const ROLES = { USER: "user", ADMIN: "admin" };

export function isAdmin(user) {
  return !!user && user.role === ROLES.ADMIN;
}
