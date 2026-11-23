import { useEffect, useState, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext.context";
import type { User } from "../types/User";

export default function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User>({} as User);

    useEffect(() => {
        const loggedUser = localStorage.getItem("user") ?? "";
        
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    function login(email: string, password: string, type: string) {
        setUser({ email, password, type });
        localStorage.setItem("user", JSON.stringify(user));
    }

    return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>
}