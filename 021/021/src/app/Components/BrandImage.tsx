import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../../convex/_generated/api";

// BrandImage component fetches the URL and renders the image for each brand
function BrandImage({ brand, imageId }: { brand: string; imageId: string }) {
  const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId });

  if (!imageUrl) {
    return <div>Loading image...</div>;
  }

  return (
    <Image
      src={imageUrl} // Use the fetched URL
      alt={brand}
      width={150}
      height={100}
      className="swiper-slide-image"
    />
  );
}

export default BrandImage;
