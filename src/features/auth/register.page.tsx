import { ROUTES } from "@/shared/model/routes";
import { RegisterForm } from "./ui/register-form";
import { AuthLayout } from "./ui/auth-layout";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <AuthLayout
      form={<RegisterForm />}
      title="Регистрация"
      description="Введите ваш email и пароль для регистрации"
      footerText={
        <>
          Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
