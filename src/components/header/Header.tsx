import HeaderClient from "./HeaderClient";
import { getAccessToken } from "@/utils/cookies.utils";

export default async function Header() {
  const access = await getAccessToken();
  const loggedIn = Boolean(access);

  return <HeaderClient loggedIn={loggedIn} />;
}
