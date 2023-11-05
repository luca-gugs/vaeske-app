"use client";
import { User } from "@clerk/nextjs/dist/types/server";
import { ReactNode, createContext, useContext, useState } from "react";

interface UserContextType {
  test: boolean;
  //   adminProfile: AdminProfile | undefined | null;
  //   loadingAdminProfile: boolean;
}

const UserContext = createContext<UserContextType>({
  test: false,
  //   adminProfile: null,
  //   loadingAdminProfile: false,
});

export const UserProvider: React.FC<{
  children: ReactNode;
  user: User | null;
}> = ({ children }) => {
  const [test, setTest] = useState(false);
  return (
    <UserContext.Provider
      value={{
        test,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
