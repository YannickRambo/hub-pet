import type { User } from "../types/User";

export const users: User[] = [
    {
        email: "admin@hubpet.com",
        password: "123456",
        type: "ADMIN"
    },
    {
        email: "atendente@hubpet.com",
        password: "123456",
        type: "ATENDENTE"
    }
]