// /* eslint-disable react/no-unescaped-entities */
// "use client";

// import { useEffect } from "react";
// import { useMutation } from "convex/react";
// import { api } from "../../../convex/_generated/api";
// import { useQuery } from "convex/react";

// export default function BannerComponent() {

//     const bgUrl = useQuery(api.imageStorage.getImageUrl, { imageId: "kg235f0rbve62bnbxfdpyvht39702r58" });

//     return (
//         <div className="position-relative overflow-hidden bg-body tertiary" style={{
//             backgroundImage: `url(${bgUrl})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'flex-start'
//             }}>
//             <div className="col-md-6 p-lg-5" style={{ maxWidth: '50%' }}>
//                 <p style={{ color: '#FF9874', textAlign: 'justify' }}>Welcome to Good And Best Badminton, your one-stop destination for all things badminton! Whether you're a seasoned player, an enthusiastic beginner, or a sports fan, we are here to equip you with the best gear and accessories to elevate your game.</p>
//                 <p style={{ color: '#FF9874', textAlign: 'justify' }}>Founded in 2024, Good And Best Badminton was born out of a passion for badminton and a commitment to provide players of all levels with high-quality equipment. We understand that having the right gear can make a significant difference in performance, so we offer a carefully curated selection of rackets, shoes, shuttlecocks, and accessories from the most trusted brands in the industry.</p>
//                 <p style={{ color: '#FF9874', textAlign: 'justify' }}>At Good And Best Badminton, we believe that every player deserves the best. That's why our team is dedicated to providing exceptional customer service, ensuring you find exactly what you need. Whether you’re looking for the latest technology in rackets or comfortable shoes for long hours on the court, our knowledgeable staff is here to help you make the right choice.</p>
//                 <p style={{ color: '#FF9874', textAlign: 'justify' }}>Thank you for choosing Good And Best Badminton. Let's smash your goals together!</p>
//             </div>
//         </div>
//     )
// }