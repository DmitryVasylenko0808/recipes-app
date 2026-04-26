export const transformImage = (image: string | null) => {
  return image ? `${process.env.SERVER_UPLOADS_URL}/${image}` : null;
};
