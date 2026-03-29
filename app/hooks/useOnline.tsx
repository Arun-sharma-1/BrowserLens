import React, { useEffect, useState } from 'react'

const useOnline = () => {
    const [isOnline, setIsOnline] = useState<boolean>(true);
   
    useEffect(() => {
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [])
    
    return {isOnline}
}

export default useOnline