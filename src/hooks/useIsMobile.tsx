import { useState, useEffect } from 'react';
import { Device } from '@capacitor/device';

interface DeviceInfo {
  isMobile: boolean;
  platform: string;
  model: string;
}

export const useIsMobile = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    platform: '',
    model: ''
  });

  useEffect(() => {
    const detectDevice = async () => {
      try {
        const info = await Device.getInfo();
        
        // Consider tablets as mobile devices as well
        const isMobile = ['ios', 'android'].includes(info.platform.toLowerCase());
        
        setDeviceInfo({
          isMobile,
          platform: info.platform,
          model: info.model
        });
      } catch (error) {
        console.error('Error detecting device:', error);
        // Fallback to basic mobile detection if Capacitor fails
        const isMobileByScreen = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
        
        setDeviceInfo({
          isMobile: isMobileByScreen,
          platform: 'unknown',
          model: 'unknown'
        });
      }
    };

    detectDevice();
  }, []);

  return deviceInfo;
};

export default useIsMobile;