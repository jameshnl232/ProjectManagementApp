"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { formFields } from "@/lib/utils";
import { useState } from "react";
import heroImage from "../../public/hero_image_pm.png";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});

const AuthProvider = ({ children }: any) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {isAuthModalOpen ? (
        <Authenticator formFields={formFields}>
          {({ user }: any) =>
            user ? (
              <div>{children}</div>
            ) : (
              <div>
                <h1>Please sign in below:</h1>
              </div>
            )
          }
        </Authenticator>
      ) : (
        <>
          {/* Background image with overlay */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImage.src})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Welcome to Task Manager
            </h1>
            <p className="mx-auto mt-6 max-w-md text-xl text-gray-300 sm:text-2xl">
              Manage your tasks with ease.
            </p>
            <div className="mt-10">
              <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" 
                onClick={() => setIsAuthModalOpen(true)}
              >
                Get Started
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthProvider;
