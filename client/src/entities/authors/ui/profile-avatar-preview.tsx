import { Typograpghy } from '@/shared';
import { useState, useEffect } from 'react';

type ProfileAvatarPreviewProps = {
  initialImageSrc?: string | null;
  image?: File;
};

export const ProfileAvatarPreview = ({ initialImageSrc, image }: ProfileAvatarPreviewProps) => {
  const [previewImage, setPreviewImage] = useState<string | undefined | null>(initialImageSrc);

  useEffect(() => {
    if (!image) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        setPreviewImage(reader.result.toString());
      }
    };

    reader.readAsDataURL(image);
  }, [image]);

  return (
    <div className="mb-6">
      <div className="mb-4 flex justify-center">
        {previewImage ? (
          <img
            src={previewImage}
            className="border-ring/30 h-32 w-32 rounded-full border"
            alt="avatar preview"
          />
        ) : (
          <div className="border-ring/30 h-32 w-32 rounded-full border" />
        )}
      </div>
      <Typograpghy tagVariant="p" className="mb-4 text-center">
        Profile picture preview
      </Typograpghy>
      <div className="bg-ring/30 h-px" />
    </div>
  );
};
