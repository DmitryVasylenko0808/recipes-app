export const RecipesSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div className="h-120 w-73 animate-pulse rounded-md bg-gray-200" key={i} />
      ))}
    </div>
  );
};
