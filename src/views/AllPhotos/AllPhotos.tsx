import { Suspense } from "react";
import PhotosList from "./components/PhotosList";
import LogoIcon from "@/assets/logo.svg";
import SkeletonList from "./components/SkeletonList";

const AllPhotos = async () => {
  return (
    <div className="py-8 flex flex-col gap-5 mx-auto max-w-[550px]">
      <LogoIcon />
      <h1 className="font-bold text-xl mb-3">All Photos</h1>
      <Suspense fallback={<SkeletonList />}>
        <PhotosList />
      </Suspense>
    </div>
  );
};

export default AllPhotos;
