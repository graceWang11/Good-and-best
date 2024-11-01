"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="max-w-md w-full p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Please sign in to your account</p>
        </div>
        
        <SignIn
          appearance={{
            baseTheme: dark,
            elements: {
              formButtonPrimary: 
                "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case",
              card: "bg-white shadow-xl border border-gray-200",
              headerTitle: "text-gray-900",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: 
                "border border-gray-300 hover:bg-gray-50",
              socialButtonsBlockButtonText: 
                "text-gray-600 font-normal",
              formFieldLabel: "text-gray-700",
              formFieldInput: 
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
              footerActionLink: 
                "text-indigo-600 hover:text-indigo-700",
            },
          }}
          redirectUrl="/"
          afterSignInUrl="/"
        />
      </div>
    </div>
  );
} 