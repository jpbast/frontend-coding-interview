"use client";

import Logo from "@/assets/logo.svg";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { handleApiError } from "@/lib/handleApiError";
import { SignInResponse } from "@/types/api";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ForgotPasswordModal from "./ForgotPasswordModal";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the request");
      }

      const data = (await response.json()) as SignInResponse;
      if (data.success) {
        router.push("/");
      } else {
        setErrorMessage(data.errorMessage || "");
      }
    } catch (error) {
      // Used for unknown and unexpected errors
      const err = handleApiError(error, "Sign In");
      throw err;
    }
  };

  const handleForgotPassword = useCallback(() => {
    setShowForgotPassword(true);
  }, []);

  const closeForgotPassword = useCallback(() => {
    setShowForgotPassword(false);
  }, []);

  return (
    <div className="py-9 flex gap-5 flex-col items-center justify-center mx-auto max-w-[320px] sm:h-screen sm:py-0">
      <Logo />
      <h1 className="text-xl font-bold text-text-primary mb-3 text-center">
        Sign in to your account
      </h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
        <Input
          name="username"
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          onForgotPassword={handleForgotPassword}
        />
        <Button type="submit" disabled={!username || !password}>
          Sign in
        </Button>
        {errorMessage && (
          <p className="text-red-500 text-sm -mt-2 font-bold">{errorMessage}</p>
        )}
      </form>
      <ForgotPasswordModal
        open={showForgotPassword}
        onClose={closeForgotPassword}
      />
    </div>
  );
};

export default SignIn;
