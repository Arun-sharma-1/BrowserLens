"use client";
import React from "react";
import useOnline from "../hooks/useOnline";

const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOnline } = useOnline();
  return (
    <>
      {!isOnline && (
        <div className="bg-red-500 text-white text-center p-2">
          You are offline
        </div>
      )}
      {isOnline && children}
    </>
  );
};

export default NetworkProvider;
