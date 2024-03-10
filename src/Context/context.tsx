// import { onAuthStateChanged, User } from "firebase/auth";
// import React, { createContext, FC, useEffect, useState } from "react";
// import { auth } from "../firebase/config";
// import { getUserProfile } from "../firebase/users-service";

// interface UserContextType {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   isLoadingUser: boolean;
//   setIsLoadingUser: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export const UserContext = createContext<UserContextType>({
//   user: null,
//   setUser: () => {},
//   isLoadingUser: true,
//   setIsLoadingUser: () => {},
// });

// export const UserContextProvider: FC = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       setIsLoadingUser(true);
//       if (firebaseUser && !user) {
//         const userProfile = await getUserProfile(firebaseUser.email);
//         setUser(userProfile);
//       } else {
//         setUser(null);
//       }

//       setIsLoadingUser(false);
//     });

//     return () => unsubscribe();
//   }, [user]);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         isLoadingUser,
//         setIsLoadingUser,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };
