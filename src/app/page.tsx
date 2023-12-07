"use client";
import Loader1 from "@/app/(dashboard)/components/Loader1";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "./constants";
import Login from "./(auth)/login/page";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(routes.LOGIN);
  }, []);

  return (
    <section className="flex items-center justify-center w-full h-full p-5 overflow-auto bg-white">
      <Loader1 />
    </section>
  );
}
