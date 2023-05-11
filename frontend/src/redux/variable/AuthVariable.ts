interface AuthInterface{
    token: string;
    user: {
        id: number,
        name: string;
    },
    role: string;
    auth: boolean;
}