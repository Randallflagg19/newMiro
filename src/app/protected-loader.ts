import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { redirect } from "react-router-dom";
import { enableMocking } from "@/shared/api/mocks";

export async function protectedLoader() {
  await enableMocking();

  const token = await useSession.getState().refreshToken();

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
}
