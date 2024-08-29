"use client";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import LoginButton from "./LoginComponent";

export default function ClientComponent() {
  const { isLoaded, isSignedIn, user } = useUser();
  const storeUser = useMutation(api.user.store);
  const router = useRouter();

  const imageUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg20gd15hk3tv13mxn3edesmhh6z9kj8" });
  const bgUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg22n4dqc3z6e5xzqfx30zxmr96z9j0w" });

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      storeUser({
        userName: user.fullName || "",
        address: "",
        phoneNumber: "",
        email: user.primaryEmailAddress?.emailAddress || ""
      }).then(userID => {
        console.log("User ID:", userID);
      }).catch(error => {
        console.error("Error storing user:", error.message);
        if (error.message === "User not found") {
          console.log("User not found, staying on the page.");
        }
      });
    } else {
      console.log("User not signed in. Skipping user store operation.");
    }
  }, [isLoaded, isSignedIn, user, storeUser]);

  if (!imageUrl || !bgUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container text-center">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <div className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            <img src={imageUrl} alt="Logo" className="logo" style={{ height: '65px', width: 'auto', margin: '20px' }} />
          </div>

          <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
            <li><a href="#" className="nav-link px-2 text-black">Products</a></li>
          </div>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="search" className="form-control" placeholder="Search ..." aria-label="Search"></input>
          </form>
          <div>
            {!isSignedIn ? (
              <LoginButton /> // Show login button if the user is not signed in
            ) : (
              <button type="button" className="btn btn-light">
                Account
              </button> // Show account button if the user is signed in
            )}
          </div>
        </div>
      </div>

      <div
        className="position-relative overflow-hidden text-center bg-body tertiary"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1 className="display-3 fw-bold" style={{ color: "#f56b40" }}>
            Good And Best Badminton
          </h1>
          <h3 className="fw-normal mb-3" style={{ color: "#ffd0c3" }}>
            This is a Demo website
          </h3>
        </div>
      </div>
    </div>
  );
}
