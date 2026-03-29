import { useEffect, useState } from "react";

type NetworkSpeed = {
  speedMbps: number | null;
  category: "slow" | "medium" | "fast" | "unknown";
  isTesting: boolean;
  error: string | null;
  connectionSpeed?: string;
};
export const useNetworkSpeed = () => {
  const [newtowkInfo, setNetworkInfo] = useState<NetworkSpeed>({
    speedMbps: null,
    category: "unknown",
    isTesting: false,
    error: null,
  });
  const classifySpeed = (mbps: number) => {
    if (mbps < 1.5) return "slow";
    if (mbps < 5) return "medium";
    return "fast";
  };

  const testSpeed = async () => {
    try {
      setNetworkInfo((prev) => ({ ...prev, isTesting: true, error: null }));
      const imageUrl = 'https://portfolio-olive-kappa-t4n70yj3b8.vercel.app/arun-hero-img.png'
      const startTime = performance.now();

      const response = await fetch(imageUrl + "?cache=" + Date.now(), {
        cache: "no-store",
      });
      const blob = await response.blob();
      const endTime = performance.now();

      const durationSec = (endTime - startTime) / 1000;
      const fileSizeBits = blob.size * 8;

      const speedMbps = fileSizeBits / durationSec / (1024 * 1024);

      setNetworkInfo({
        speedMbps: Number(speedMbps.toFixed(2)),
        category: classifySpeed(speedMbps),
        isTesting: false,
        error: null,
      });
    } catch (err: any) {
      console.error("err", err);
      setNetworkInfo((prev) => ({
        ...prev,
        isTesting: false,
        speedMbps: 0,
        category: "unknown",
        error: err.message || "Speed test failed",
      }));
    }
  };

  useEffect(() => {
    const connection = (navigator as any).connection;

    if (connection?.downlink) {
      const approx = connection.downlink;
      setNetworkInfo((prev) => ({
        ...prev,
        speedMbps: approx,
        category: classifySpeed(approx),
        connectionSpeed: approx,
      }));
    }

    testSpeed();
  }, []);

  return {
    ...newtowkInfo,
    testSpeed,
  };
};
