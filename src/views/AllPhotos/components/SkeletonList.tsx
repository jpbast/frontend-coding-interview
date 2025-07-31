import Skeleton from "@/components/Skeleton";

const SkeletonList = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex gap-3 flex-1 w-full items-start">
          <Skeleton width={20} height={20} />
          <Skeleton width={75} height={75} />
          <div className="flex flex-col gap-1 flex-1">
            <Skeleton width={120} height={20} />
            <Skeleton width="100%" height={30} />
            <Skeleton width={70} height={20} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonList;
