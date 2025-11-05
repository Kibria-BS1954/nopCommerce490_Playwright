// // utils/env.ts
// import * as fs from 'fs';
// import * as path from 'path';
// import * as dotenv from 'dotenv';

// const envPath = path.resolve(__dirname, '../.env/.env.login');
// if (fs.existsSync(envPath)) {
//   dotenv.config({ path: envPath });
// } else {
//   // Optionally fall back to default .env
//   dotenv.config();
// }

// /**
//  * Throws if the env var is missing — fail fast for required variables.
//  */
// export function getEnvVar(name: string): string {
//   const v = process.env[name];
//   if (!v) {
//     throw new Error(`Missing required environment variable: ${name}`);
//   }
//   return v;
// }

// /**
//  * Build the loginData object by reading the JSON test file,
//  * and replacing the fields that we keep in env.
//  */
// import rawLoginJson from '../testData/loginData.json';

// export const loginData = (() => {
//   // clone raw JSON
//   const data = JSON.parse(JSON.stringify(rawLoginJson)) as any;

//   // Replace valid user with env values if provided
//   if (process.env.VALID_USER_EMAIL || process.env.VALID_USER_PASSWORD) {
//     data.validUser = {
//       email: process.env.VALID_USER_EMAIL ?? data.validUser?.email ?? '',
//       password: process.env.VALID_USER_PASSWORD ?? data.validUser?.password ?? ''
//     };
//   }

//   // Similarly replace SQL injection if set in env (optional)
//   if (process.env.SQLINJECTION_EMAIL || process.env.SQLINJECTION_PASSWORD) {
//     data.sqlInjection = {
//       email: process.env.SQLINJECTION_EMAIL ?? data.sqlInjection?.email ?? '',
//       password: process.env.SQLINJECTION_PASSWORD ?? data.sqlInjection?.password ?? ''
//     };
//   }

//   // You can expand the above for other env-backed entries.

//   return data;
// })();
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Try multiple possible paths
const possiblePaths = [
  path.resolve(__dirname, "../.env/.env.login"),
  path.resolve(process.cwd(), ".env/.env.login"),
  path.resolve(process.cwd(), ".env.login"),
  path.resolve(__dirname, "../../.env/.env.login"),
  // path.resolve(__dirname, "../../../.env/.env.login"),
];

let envLoaded = false;
let usedPath = "";

for (const envPath of possiblePaths) {
  if (fs.existsSync(envPath)) {
    console.log("Found .env file at:", envPath);
    dotenv.config({ path: envPath });
    envLoaded = true;
    usedPath = envPath;
    break;
  }
}

if (!envLoaded) {
  console.error("No .env file found in any of these locations:");
  possiblePaths.forEach((p) => console.log("  -", p));
  throw new Error("No .env file found. Please check the file location.");
}

console.log("Successfully loaded .env from:", usedPath);

export function getEnvVar(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(
      `Environment variable ${name} is not set. Loaded from: ${usedPath}`
    );
  }
  return value;
}

export const loginData = {
  validUser: {
    email: getEnvVar("VALID_USER_EMAIL"),
    password: getEnvVar("VALID_USER_PASSWORD"),
  },
  invalidUser: {
    email: getEnvVar("INVALID_USER_EMAIL"),
    password: getEnvVar("INVALID_USER_PASSWORD"),
  },
  emptyUser: {
    email: getEnvVar("EMPTY_USER_EMAIL"),
    password: getEnvVar("EMPTY_USER_PASSWORD"),
  },
  invalidEmailFormat: {
    email: getEnvVar("INVALID_EMAIL_FORMAT"),
    password: getEnvVar("INVALID_EMAIL_PASSWORD"),
  },
  sqlInjection: {
    email: getEnvVar("SQLINJECTION_EMAIL"),
    password: getEnvVar("SQLINJECTION_PASSWORD"),
  },
};