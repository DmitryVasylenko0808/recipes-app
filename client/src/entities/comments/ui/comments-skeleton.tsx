type CommentsSkeletonProps = { countItems?: number };

export const CommentsSkeleton = ({ countItems = 9 }: CommentsSkeletonProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: countItems }).map((_, i) => (
        <div className="bg-accent h-22 animate-pulse rounded-md" key={i} />
      ))}
    </div>
  );
};
