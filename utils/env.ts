import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env/.env.data");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const readEnv = (key: string, fallback = ""): string =>
  process.env[key] ?? fallback;

export default class ENV {
  public static ENVIRONMENT_NAME = readEnv("ENVIRONMENT_NAME");
  public static BASE_URL = readEnv("BASE_URL").replace(/\/$/, "");

  public static VALID_USER_EMAIL = readEnv("VALID_USER_EMAIL");
  public static VALID_USER_PASSWORD = readEnv("VALID_USER_PASSWORD");

  public static INVALID_USER_EMAIL = readEnv("INVALID_USER_EMAIL");
  public static INVALID_USER_PASSWORD = readEnv("INVALID_USER_PASSWORD");

  public static EMPTY_USER_EMAIL = readEnv("EMPTY_USER_EMAIL");
  public static EMPTY_USER_PASSWORD = readEnv("EMPTY_USER_PASSWORD");

  public static INVALID_EMAIL_FORMAT = readEnv("INVALID_EMAIL_FORMAT");
  public static INVALID_EMAIL_PASSWORD = readEnv("INVALID_EMAIL_PASSWORD");

  public static SQLINJECTION_EMAIL = readEnv("SQLINJECTION_EMAIL");
  public static SQLINJECTION_PASSWORD = readEnv("SQLINJECTION_PASSWORD");

  public static REGISTRATION_EMAIL_DOMAIN = readEnv(
    "REGISTRATION_EMAIL_DOMAIN",
    "example.com"
  );
}