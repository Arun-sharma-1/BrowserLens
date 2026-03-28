import Image from "next/image";

const UserPhotoComponent = ({
  photo,
  isCameraOn,
  videoRef,
  startCamera,
  takePhoto,
  reTakePhoto,
}: any) => {
  console.log("isCameraOn", isCameraOn);
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Circular Container */}
      <div className="relative w-64 h-64 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {/* SHOW VIDEO */}
        {isCameraOn && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* SHOW PHOTO */}
        {!isCameraOn && photo && (
                  //   <Image src={photo} alt="captured" fill className="object-cover" />
                  <div>{photo.toString()}</div>
        )}

        {/* PLACEHOLDER */}
        {!photo && !isCameraOn && (
          <Image
            src="https://robohash.org/mail@ashallendesign.co.uk"
            alt="placeholder"
            fill
            className="object-cover"
            loading="eager"
          />
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">
        {!isCameraOn && !photo && (
          <button onClick={startCamera}>Start Camera</button>
        )}

        {isCameraOn && <button onClick={takePhoto}>Capture</button>}

        {photo && <button onClick={reTakePhoto}>Retake</button>}
      </div>
    </div>
  );
};

export default UserPhotoComponent;
