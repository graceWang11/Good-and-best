"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

export default function BannerComponent() {
    const storeUser = useMutation(api.user.store);

    const bgUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg22n4dqc3z6e5xzqfx30zxmr96z9j0w" });

    return (
        <div className="position-relative overflow-hidden text-center bg-body tertiary" style={{
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            }}>
            <div className="col-md-6 p-lg-5 mx-auto my-5">
                <h1 className="display-3 fw-bold" style={{ color: '#f56b40' }}>Good And Best Badminton</h1>
                <h3 className="fw-normal mb-3" style={{ color: '#F5F5F5' }}>Demo website</h3>
            </div>
        </div>
    )
}