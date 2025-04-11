"use client";

import type { User } from "@/core/user/models/user.model";
import { updateUser } from "@/core/user/services/update-user.service";
import styles from "./styles.module.css";
import { toastMessage } from "@/shared/components/message/ToastMessage";

interface Props {
  users: User[];
}

type Role = "user" | "admin";

type RoleSelect = {
  label: string;
  value: Role;
};

function UsersList({ users }: Props): React.ReactNode {
  const rolesItems: RoleSelect[] = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  const updateRole = async (role: Role, userId: string): Promise<void> => {
    const { error, success } = await updateUser(userId, { role });
    if (error) toastMessage.error(error);
    if (success) toastMessage.success(success);
  };

  return (
    <div className={styles["users-list-container"]}>
      <table className={styles["users-list"]}>
        <thead className={styles["table-header"]}>
          <tr>
            <th className={styles["table-head"]}>Email</th>
            <th className={styles["table-head"]}>Nombre completo</th>
            <th className={styles["table-head"]}>Role</th>
          </tr>
        </thead>
        <tbody className={styles["table-body"]}>
          {users.map((user) => (
            <tr key={user.id}>
              <td className={styles["table-data"]}>{user.email}</td>
              <td className={styles["table-data"]}>{`${user.firstName} ${user.lastName}`}</td>
              <td className={styles["table-data"]} style={{ position: "relative" }}>
                <div className={styles["table-data__select"]}>
                  <select
                    onChange={(e) => updateRole(e.target.value as Role, user.id)}
                    defaultValue={user.role}
                  >
                    {rolesItems.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UsersList;
