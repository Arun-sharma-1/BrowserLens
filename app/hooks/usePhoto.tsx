import { useEffect, useRef, useState } from "react";

export const usePhoto = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (!videoRef.current) {
        console.error("videoRef still not ready");
        return;
      }

      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    } catch (err) {
      console.error("Camera error:", err);
    }
  };
  const startCamera = () => {
    setIsCameraOn(true);
  };
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const size = 300;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(video, 0, 0, size, size);

    // const image = canvas.toDataURL("image/png");
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setPhotoBlob(blob);
      },
      "image/jpeg",
      0.9
    );

    // stop camera
    const stream = video.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());

    setIsCameraOn(false);
  };
  const reTakePhoto = () => {
    setPhotoBlob(null);
    setIsCameraOn(true);
  };
  useEffect(() => {
    if (!isCameraOn) return;
    startStream();
  }, [isCameraOn]);

  return {
    videoRef,
    canvasRef,
    photoBlob,
    isCameraOn,
    startCamera,
    takePhoto,
    reTakePhoto,
  };
};
