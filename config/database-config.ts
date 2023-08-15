import * as dotenv from "dotenv";
dotenv.config();


export const sqlServer = {
    DB_CONNECTION:  process.env.SQLSERVER_DB_CONNECTION || "mssql",
    DB_HOST:  process.env.SQLSERVER_DB_HOST || "limpoint.database.windows.net",
    DB_PORT:  process.env.SQLSERVER_DB_PORT || "1433",
    DB_DATABASE:  process.env.SQLSERVER_DB_DATABASE || "Limpoint",
    DB_USERNAME:  process.env.SQLSERVER_DB_USERNAME || "Limpoint",
    DB_PASSWORD:  process.env.SQLSERVER_DB_PASSWORD || "limp#123",
};
