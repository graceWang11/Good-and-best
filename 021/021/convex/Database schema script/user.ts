import { v } from "convex/values"; 
import { mutation, query } from "../_generated/server";
import { Id } from "../_generated/dataModel";

// Define a mutation called 'store' which allows you to store user information in the database
export const store = mutation({
    // Specify that the mutation takes arguments for UserTypeID, UserName, Address, and PhoneNumber
    args: {        
        userName: v.string(),
        address: v.string(),
        phoneNumber: v.string(),
    },
    
    // The handler function is where the logic for the mutation is defined
    handler: async(ctx,{ userName, address, phoneNumber }) => {
        // Get the identity of the currently authenticated user
        const identity = await ctx.auth.getUserIdentity();
        
        // If there is no authenticated user, throw an error
        if (!identity) {
            throw new Error("Called store without authenticated user");
        }


        //Query the database to check if the user is already stored
        const user = await ctx.db
            .query("users") // Specify the 'users' table/collection
            .withIndex("by_token", (q) =>
                // Use the 'by_token' index to find the user by their tokenIdentifier
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique(); // Expect a unique result
    

        // If the user is found (not null), return their user ID
        if (user !== null) {
            return user._id;
        }

        //Define UserTypeID
        let userTypeID: Id<"userTypes">;
        //Assign admin account 
        if (identity.email === "goodandbest@gmail.com") {
            const adminType = await ctx.db.query("userTypes").filter(q => q.eq("UserType", "Admin")).unique();
            if (!adminType) {
                throw new Error("Admin user type not found");
            }
            userTypeID = adminType._id;
        } else {
            //Handling customer account
            const customerType = await ctx.db.query("userTypes").filter(q => q.eq("UserType", "Customer")).unique();
            if (!customerType) {
                throw new Error("Customer user type not found");
            }
            userTypeID = customerType._id;
        }

        // If the user is not found, insert a new user record into the 'users' table
        const userID = await ctx.db.insert("users", {
            tokenIdentifier: identity.tokenIdentifier, // Store the user's token identifier
            email: identity.email!, // Store the user's email (using non-null assertion)
            userTypeID,             // Store the UserTypeID as an FK
            userName,               // Store the UserName
            address,                // Store the Address
            phoneNumber,            // Store the PhoneNumber
        });
        
        // Return the new user ID after insertion
        return userID;
    }
});
