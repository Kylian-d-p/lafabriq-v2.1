declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DB_NAME: string;
            MYSQL_USER: string;
            MYSQL_PASSWORD: string;
            MYSQL_HOST: string;
            SECRET_SESSION: string;
            ADMIN_USERNAME: string;
            ADMIN_PASSWORD: string;
        }
    }
}
declare module "express-session" {
    interface SessionData {
        adminConnected: boolean
    }
}
export { };