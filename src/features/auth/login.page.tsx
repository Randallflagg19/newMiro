import { Link } from "react-router-dom";
import { AuthLayout } from "./ui/auth-layout";
import { ROUTES } from "@/shared/model/routes";
import { LoginForm } from "./ui/login-form";

function LoginPage() {
  return (
    <AuthLayout
      form={<LoginForm />}
      title="Войти в систему"
      description="Введите ваш email и пароль для входа в систему"
      footerText={
        <>
          Нет аккаунта?{" "}
          <Link className="text-primary underline" to={ROUTES.REGISTER}>
            Зарегистрироваться
          </Link>
        </>
      }
    />
  );
}

export const Component = LoginPage;
