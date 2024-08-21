/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

export default function ClientComponent() {
  const storeUser = useMutation(api.user.store);

  const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg20gd15hk3tv13mxn3edesmhh6z9kj8" });
  const bgUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg22n4dqc3z6e5xzqfx30zxmr96z9j0w" });

  useEffect(() => {
    storeUser({
      userName: "",
      address: "",
      phoneNumber: ""
    });
  });

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container text-center">
        <div className="d-flex flex-warp align-items-center justify-content-center justify-content-lg-start">
          <div className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            <img src={imageUrl} alt="Logo" className="logo" style={{ height: '65px', width: 'auto', margin: '20px' }} />
          </div>

          <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="#" className="nav-link px-2 test-secondary">Home</a></li>
            <li><a href="#" className="nav-link px-2 test-black">products</a></li>
          </div>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="search" className="form-control" placeholder="Search ..." aria-label="Search"></input>
          </form>
          <div>
            <button type="button" className="btn btn-light">Login</button>
          </div>
        </div>
      </div>

      <div className="position-relative overflow-hidden text-center bg-body tertiary" style={{
      backgroundImage: `url(${bgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      }}>
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1 className="display-3 fw-bold" style={{ color: '#f56b40' }}>Good And Best Badminton</h1>
          <h3 className="fw-normal mb-3" style={{ color: '#ffd0c3' }}>This is a Demo website</h3>
        </div>
      </div>
    </div>
  );
}
