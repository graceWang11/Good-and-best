"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

export default function Footer() {
    const storeUser = useMutation(api.user.store);
    const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg20gd15hk3tv13mxn3edesmhh6z9kj8" });
    const currentYear = new Date().getFullYear();

    return (
        <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <img src={imageUrl} alt="Logo" className="logo" style={{ height: '40px', width: 'auto', margin: '20px' }} />
                <p className="mb-3 mb-md-0">&copy; {currentYear}</p>
            </div>    
        </footer>
    )
}