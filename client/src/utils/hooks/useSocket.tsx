import { useState, useEffect, useRef } from 'react';
import {io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
    connect: () => void;
    disconnect: () => void;
    [event: string]: (...args: any[]) => void; 
  }
  
  interface ClientToServerEvents {
    [event: string]: (...args: any[]) => void; 
  }

const useSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedGuestId = localStorage.getItem('guestId');

    socketRef.current = io(url, {
      auth: {
        token: token,
        guestId: storedGuestId || undefined 
      },
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to Socket.io server');
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
      setIsConnected(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [url]);

  const emit = (eventName: string, data?: any) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, data);
    }
  };

  const on = (eventName: string, callback: (...args: any[]) => void) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }
  };

  const off = (eventName: string, callback?: (...args: any[]) => void) => {
    if (socketRef.current) {
      socketRef.current.off(eventName, callback);
    }
  };

  return { isConnected, emit, on, off };
};

export default useSocket;