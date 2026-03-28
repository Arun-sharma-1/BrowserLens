"use client";
import { usePhoto } from "../../hooks/usePhoto";
import UserPhotoComponent from "../../components/userPhotoComponent";

export default function UserPhoto() {
  const {
    videoRef,
    canvasRef,
    photoBlob,
    isCameraOn,
    startCamera,
    takePhoto,
    reTakePhoto,
  } = usePhoto();

  return (
    <>
      <UserPhotoComponent
        photo={photoBlob}
        isCameraOn={isCameraOn}
        videoRef={videoRef}
        startCamera={startCamera}
        takePhoto={takePhoto}
        reTakePhoto={reTakePhoto}
      />
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
