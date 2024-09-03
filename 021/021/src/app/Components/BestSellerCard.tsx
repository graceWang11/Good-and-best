"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";


function BestSellerCard({ pic, name }) {
    return (
      <div style={styles.card}>
        <img src={pic} alt={name} />
        <p className="text-center">{name}</p>
      </div>
    );
  }
  
  const styles = {
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '250px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '100px',
    },
  };
  
  export default BestSellerCard;