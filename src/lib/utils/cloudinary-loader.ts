export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const cloudName = "dlcqjthel";
  const transformations = `f_auto,q_${quality || "auto"}`;
  const resizing = `w_${width}`;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${src}`;
}
