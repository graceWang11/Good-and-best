/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const BrandProductsList = ({ brand }: { brand: string }) => {
  // Fetch Victor products data
  const data = useQuery(api.Product.getVictorProducts,{brandName:brand});

  if (!data) {
    return <div>Loading products...</div>;
  }

  if (Array.isArray(data)) {
    return <div>No products found.</div>;
  }

  const { brandProductsWithCategory, brandProductsWithImages } = data;

  if (brandProductsWithCategory.length === 0) {
    return <div>No products found for {brand}.</div>;
  }
  return (
    <div className="product-grid" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {brandProductsWithCategory.map((product, index) => {
        const imageRecord = brandProductsWithImages.find(
          (image) => image.productId === product.product
        );
        const imageId = imageRecord ? imageRecord.storageID : null;

        return (
          <div
            key={product.product}
            className="product-card"
            style={{
              display: "inline-block",
              margin: "10px",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            <div>
              {imageId ? (
                <ImageFetcher imageId={imageId} productName={product.productName} />
              ) : (
                <div
                  style={{
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f0f0f0",
                    borderRadius: "8px",
                  }}
                >
                  No image available
                </div>
              )}
            </div>

            <div style={{ paddingTop: "10px" }}>
              <h3>{product.productName}</h3>
              <p>Brand: {product.brand}</p>
              <p>Series: {product.series}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.categoryName}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ImageFetcher = ({ imageId, productName }: { imageId: string; productName: string }) => {
  // Fetch the image URL from the backend using the imageId
  const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId });

  if (!imageUrl) {
    return <div>Loading image...</div>;
  }

  return (
    <img
      src={imageUrl}
      alt={productName}
      style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
      onError={(e) => {
        e.currentTarget.src = "/path/to/fallback-image.jpg"; // Handle missing image
      }}
    />
  );
};

export default BrandProductsList;
