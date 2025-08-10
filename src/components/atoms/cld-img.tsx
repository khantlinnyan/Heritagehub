"use client";
import { CldImage } from "next-cloudinary";

interface CldImgProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  crop: string;
  gravity: string;
  quality: number;
  className?: string;
}

const CldImg = ({
  src,
  alt,
  width,
  height,
  crop,
  gravity,
  quality,
  className,
}: CldImgProps) => {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      crop={crop}
      gravity={gravity}
      quality={quality}
      className={className}
    />
  );
};

export default CldImg;
