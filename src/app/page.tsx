import { isAuthenticated } from "@/lib/api";
import AllPhotos from "@/views/AllPhotos/AllPhotos";
import { redirect } from "next/navigation";

export default async function Home() {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect("/sign-in");
  }

  return <AllPhotos />;
}
