declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DB_NAME: string;
            MYSQL_USER: string;
            MYSQL_PASSWORD: string;
            MYSQL_HOST: string;
            ADMIN_USERNAME: string;
            ADMIN_PASSWORD: string;
            ENVIRONMENT: "prod" | "dev";
            SSL_KEY_PATH: string;
            SSL_CERT_PATH: string;
            JWT_SECRET: string;
        }
    }
}
declare module "express-session" {
    interface SessionData {
        adminConnected: boolean
    }
}
export { };