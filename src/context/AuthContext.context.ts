import { createContext, use } from "react";
import type { User } from "../types/User";

interface AuthContextProps {
    user: User;
    login: (email: string, password: string, type: string) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function useAuth() {
    return use(AuthContext);
};