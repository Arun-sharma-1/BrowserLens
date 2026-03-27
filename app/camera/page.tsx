"use client";
import React from "react";
import { usePhoto } from "../hooks/useCamera";
const UserPhotoComponent = () => {
  const { videoRef, canvasRef, startCamera, takePhoto, photo } = usePhoto();
  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="300" />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <br />
      <div className="p-0">
        <button className="p-10" onClick={startCamera}>
          Start Camera
        </button>
        <button className="p-10" onClick={takePhoto}>
          Capture
        </button>
      </div>

      {photo && (
        <div>
          <h3>Captured Image:</h3>
          <img
            style={{
              display: "center",
              objectFit: "fill",
              borderRadius: "50%",
              margin: "auto",
            }}
            src={photo}
            alt="captured"
            width="300px"
            height={"300px"}
          />
        </div>
      )}
    </div>
  );
};

export default UserPhotoComponent;
