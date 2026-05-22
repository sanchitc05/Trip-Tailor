import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export const useSessionExpiry = () => {
  const { accessToken, logout, validateSession } = useAuthStore();
  const warningTimer = useRef();

  useEffect(() => {
    if (!accessToken) return;

    try {
      const decoded = jwtDecode(accessToken);
      const expiresAt = decoded.exp * 1000;
      const now = Date.now();
      const warnAt = expiresAt - now - 2 * 60 * 1000; // 2 min before expiry

      if (warnAt > 0) {
        warningTimer.current = setTimeout(() => {
          toast('Your session expires in 2 minutes', {
            duration: 10000,
            icon: '⏱️',
            style: {
              background: '#0f172a',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            // Note: react-hot-toast doesn't have a built-in "action" label like some other libs, 
            // but we can pass a custom component or handle it via a button in the message.
          });
          
          // Trigger a silent refresh by validating session
          // The axios interceptor will handle the actual refresh if the token is close to expiry
          validateSession();
        }, warnAt);
      }
    } catch (error) {
      console.error("Failed to decode token", error);
    }

    return () => {
      if (warningTimer.current) clearTimeout(warningTimer.current);
    };
  }, [accessToken, validateSession]);
};
