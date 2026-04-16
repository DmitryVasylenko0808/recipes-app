export const RecipeDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="bg-accent h-126 animate-pulse rounded-md" />
      <div className="bg-accent h-18 animate-pulse rounded-md" />
      <div className="flex gap-2">
        <div className="bg-accent h-18 w-18 animate-pulse rounded-full" />
        <div className="bg-accent h-18 w-40 animate-pulse rounded-md" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="bg-accent h-16 w-20 animate-pulse rounded-md" key={i} />
        ))}
      </div>
      <div className="bg-accent h-70 animate-pulse rounded-md" />
      <div className="bg-accent h-160 animate-pulse rounded-md" />
    </div>
  );
};
