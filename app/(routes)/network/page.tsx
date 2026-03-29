'use client'
import { useNetworkSpeed } from '@/app/hooks/useNetworkSpeed'
import React from 'react'

const NetworkSpped = () => {
    const {category , speedMbps , connectionSpeed, isTesting} = useNetworkSpeed();
    return (
        <div>
          {isTesting ? (
            <p>Testing speed...</p>
          ) : (
            <>
              <p>Speed: {speedMbps ? `${speedMbps} Mbps` : "N/A"}</p>
              <p>Quality: {category}</p>
              <p>Connecton Speed: {connectionSpeed}</p>
            </>
          )}
        </div>
    )
}

export default NetworkSpped