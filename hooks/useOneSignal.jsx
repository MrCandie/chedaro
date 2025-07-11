"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

const useOneSignal = () => {
  useEffect(() => {
    const initOneSignal = async () => {
      await OneSignal.init({
        appId: "2d989f58-4b7c-4aef-864c-928836d4f3f2",
        // serviceWorkerPath: "/OneSignalSDKWorker.js",
        notifyButton: {
          enable: true,
        },
        autoRegister: false, // Don't auto-subscribe users
      });
    };

    initOneSignal();
  }, []);
};

export default useOneSignal;
