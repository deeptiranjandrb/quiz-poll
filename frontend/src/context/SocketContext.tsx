import  { useContext,createContext, ReactNode } from "react";
import { io } from "socket.io-client";
// Create a socket context
const newSocket = io("http://localhost:8080");
export const SocketContext = createContext(newSocket);

// Create a socket provider
export const SocketProvider = ({ children }:{children:ReactNode}) => {
  
  return (
    <SocketContext.Provider value={newSocket}>
      {children}
    </SocketContext.Provider>
  );
};

// Use the socket context in a child component
export const useSocketContext = () => useContext(SocketContext);

