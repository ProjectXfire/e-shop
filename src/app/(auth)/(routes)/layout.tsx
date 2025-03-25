import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import AuthContainer from "../_components/auth-container/AuthContainer";

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props): React.ReactElement {
  return <AuthContainer>{children}</AuthContainer>;
}
export default AuthLayout;
