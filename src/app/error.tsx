"use client";

import Button from "@/components/Button";

const Error = () => {
  return (
    <div className="flex flex-col gap-4 max-w-[360px] mx-auto h-screen items-center justify-center">
      <h1 className="text-2xl font-bold text-center">
        Ooops! Something went wrong
      </h1>
      <Button onClick={() => window.location.reload()}>Reload the page</Button>
    </div>
  );
};

export default Error;
