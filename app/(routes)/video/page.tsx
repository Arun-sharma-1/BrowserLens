"use client";
import React from "react";

const UserVideo = () => {
  return <FloatingCamera />;
};
export default UserVideo;

import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/app/hooks/useVideo";

const FloatingCamera = () => {
  const { videoRef, startRecording, stopRecording } =
    useVideo();

  const boxRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({ x: 20, y: 20 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // 🟢 Start drag
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // 🔵 Drag move
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  // 🔴 Snap to edges
  const onMouseUp = () => {
    dragging.current = false;

    const box = boxRef.current;
    if (!box) return;

    const rect = box.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let newX = position.x;
    let newY = position.y;

    // left / right
    if (rect.left < screenWidth / 2) {
      newX = 10;
    } else {
      newX = screenWidth - rect.width - 10;
    }

    // top / bottom
    if (rect.top < screenHeight / 2) {
      newY = 10;
    } else {
      newY = screenHeight - rect.height - 10;
    }

    setPosition({ x: newX, y: newY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <>
      {/* 🎥 Floating Video */}
      <div
        ref={boxRef}
        onMouseDown={onMouseDown}
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: 220,
          height: 160,
          background: "#000",
          borderRadius: 12,
          overflow: "hidden",
          cursor: "grab",
          zIndex: 9999,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 🎛 Controls */}
      <div style={{ position: "fixed", bottom: 100, left: 20 }} className="flex gap-4">

        <button onClick={startRecording}>Record</button>

        <button
          onClick={async () => {
            const blob = await stopRecording();
            console.log("Video Blob:", blob);

            // if (blob) {
            //   const url = URL.createObjectURL(blob);
            //   window.open(url);
            // }
          }}
        >
          Stop Recording
        </button>
      </div>
    </>
  );
};

// export default FloatingCamera;
