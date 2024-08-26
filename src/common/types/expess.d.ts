// src/express.d.ts
import { JwtPayload } from "../interfaces/jwt-payload.interface";

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload; 
  }
}
