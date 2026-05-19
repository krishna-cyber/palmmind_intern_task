import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import { clientDB } from "./db.ts";

const db = clientDB;
if (!db) throw new Error("Database not initialized: clientDB is undefined");

export const auth = betterAuth({
  //...
  database: mongodbAdapter(db),
  emailAndPassword:{
    enabled:true,
    autoSignIn:true
  },
  plugins:[admin()],

  session:{
  cookieCache:{
  enabled: true,
  }
  },

  trustedOrigins: ["http://localhost:3000"],

  experimental: { joins: true },
  advanced:{disableOriginCheck:true}
});


