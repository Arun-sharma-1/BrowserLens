import { useRef } from "react";

const MAX_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

export const useVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // 🔥 buffer for size-based chunking
  const bufferRef = useRef<Blob[]>([]);
  const currentSizeRef = useRef<number>(0);

  // 🎥 Start camera
  const startStream = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    streamRef.current = mediaStream;

    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      await videoRef.current.play();
    }
  };

  // 🛑 Stop camera
  const stopStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    videoRef.current = null;
  };

  // 📤 Upload function (replace with S3 API)
  const uploadChunk = async (blob: Blob) => {
    console.log("Uploading chunk:", blob.size / 1024 / 1024, "MB");
   
  };

  // 🔴 Start recording
  const startRecording = async () => {
    await startStream();
    if (!streamRef.current) return;

    const recorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = recorder;

    bufferRef.current = [];
    currentSizeRef.current = 0;

    recorder.ondataavailable = async (event) => {
      if (event.data.size === 0) return;

      // 🔥 accumulate
      bufferRef.current.push(event.data);
      currentSizeRef.current += event.data.size;

      console.log(
        "Current buffer size:",
        currentSizeRef.current / 1024 / 1024,
        "MB"
      );

      // 🚀 upload when >= 5MB
      if (currentSizeRef.current >= MAX_CHUNK_SIZE) {
        const chunkBlob = new Blob(bufferRef.current, {
          type: "video/webm",
        });

        await uploadChunk(chunkBlob);

        // reset buffer
        bufferRef.current = [];
        currentSizeRef.current = 0;
      }
    };

    // 🔥 IMPORTANT → generate chunks every second
    recorder.start(1000);
  };

  // ⏹ Stop recording
  const stopRecording = async () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    return new Promise<void>((resolve) => {
      recorder.onstop = async () => {
        // 🔥 upload remaining data
        if (bufferRef.current.length > 0) {
          const finalBlob = new Blob(bufferRef.current, {
            type: "video/webm",
          });

          await uploadChunk(finalBlob);
        }

        stopStream();
        resolve();
      };

      recorder.stop();
    });
  };

  return {
    videoRef,
    startRecording,
    stopRecording,
  };
};