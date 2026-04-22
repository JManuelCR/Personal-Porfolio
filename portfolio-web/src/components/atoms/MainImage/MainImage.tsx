import Image from "next/image";

interface MainImageProps {
    imageUrl: string;
}
export default function MainImage({imageUrl}: MainImageProps) {
  return (
    <div className="relative w-10 h-10 rounded-full">
      <Image
        src={imageUrl}
        alt="Profile Image"
        fill
        className="object-cover object-center rounded-full"
      />
    </div>
  );
}
