type RecipeImageProps = { image: string };

export const RecipeImage = ({ image }: RecipeImageProps) => {
  return (
    <div className="h-126 w-full">
      <img src={image} alt="recipe image" className="h-full w-full rounded-md" />
    </div>
  );
};
