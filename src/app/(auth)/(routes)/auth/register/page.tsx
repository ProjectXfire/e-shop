import AuthCard from "@/app/(auth)/_components/auth-card/AuthCard";
import RegisterForm from "@/app/(auth)/_components/register-form/RegisterForm";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";

function RegisterPage(): React.ReactElement {
  return (
    <AuthCard>
      <TitleAnimated title="E-Shop" subtitle="Creaa una nueva cuenta" />
      <FadeinContainer>
        <RegisterForm />
      </FadeinContainer>
    </AuthCard>
  );
}
export default RegisterPage;
