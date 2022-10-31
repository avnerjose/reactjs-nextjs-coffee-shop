import Skeleton from "react-loading-skeleton";

export function ProductItemSkeleton() {
  return (
    <div className="flex flex-col h-fit items-center rounded-md gap-2 py-4 px-2 bg-white relative ">
      <Skeleton height={160} width={80} />
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <Skeleton width={100} height={14} />
          <Skeleton width={150} height={14} />
          <Skeleton width={60} height={14} />
        </div>
        <Skeleton circle width={52} height={52} />
      </div>
    </div>
  );
}
