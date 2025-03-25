import AuthCard from "@/app/(auth)/_components/auth-card/AuthCard";
import LoginForm from "@/app/(auth)/_components/login-form/LoginForm";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";

function LoginPage(): React.ReactElement {
  return (
    <AuthCard>
      <TitleAnimated title="E-Shop" subtitle="Ingresa a tu cuenta" />
      <FadeinContainer>
        <LoginForm />
      </FadeinContainer>
    </AuthCard>
  );
}
export default LoginPage;
