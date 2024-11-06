import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";

interface BrandImageProps {
  brand: string;
  imageId: string;
}

export default function BrandImage({ brand, imageId }: BrandImageProps) {
  const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId });

  console.log(`Loading image for ${brand}:`, { imageId, imageUrl });

  if (!imageUrl) {
    return (
      <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
    );
  }

  return (
    <div className="relative w-full aspect-square">
      <Image
        src={imageUrl}
        alt={`${brand} logo`}
        fill
        className="object-contain p-4"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        onError={(e) => {
          console.error(`Error loading image for ${brand}:`);
        }}
      />
    </div>
  );
}
