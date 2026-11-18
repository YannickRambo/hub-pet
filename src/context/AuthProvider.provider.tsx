import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext.context";
import type { User } from "../types/User";

export default function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User>({} as User);

    function login(email: string, password: string, type: string) {
        setUser({ email, password, type });
    }

    return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>
}