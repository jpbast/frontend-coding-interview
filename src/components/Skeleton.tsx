type SkeletonProps = {
  width?: number | string;
  height?: number | string;
};

const Skeleton = ({ width, height }: SkeletonProps) => {
  return (
    <div
      className="animate-pulse bg-neutral-300 shrink-0 rounded-lg w-full"
      style={{
        maxWidth: width,
        height: height,
      }}
    />
  );
};

Skeleton.displayName = "Skeleton";

export default Skeleton;
