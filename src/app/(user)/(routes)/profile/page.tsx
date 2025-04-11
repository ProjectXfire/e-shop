import { auth } from "@auth";
import { redirect } from "next/navigation";
import Profile from "../../_components/profile/Profile";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";

async function ProfilePage(): Promise<React.ReactElement> {
  const session = await auth();

  if (!session || !session.user) redirect("/");

  return (
    <MaxWidthContainer>
      <PaddingContainer>
        <FadeinContainer>
          <TitleAnimated title="Perfil" />
          <Profile user={session.user} />
        </FadeinContainer>
      </PaddingContainer>
    </MaxWidthContainer>
  );
}
export default ProfilePage;
