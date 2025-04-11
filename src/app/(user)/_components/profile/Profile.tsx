import type { User } from "@/core/user/models/user.model";
import NextImage from "next/image";
import styles from "./styles.module.css";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";

interface Props {
  user: User;
}

function Profile({ user }: Props): React.ReactElement {
  return (
    <section className={styles.profile}>
      <div className={styles.profile__card}>
        <NextImage
          className={styles["card-avatar"]}
          src={user.image}
          alt={user.firstName}
          width={150}
          height={150}
        />
        <div className={styles["card-detail"]}>
          <TitleAnimated title={`${user.firstName} ${user.lastName}`} subtitle={user.email} />
        </div>
      </div>
    </section>
  );
}
export default Profile;
