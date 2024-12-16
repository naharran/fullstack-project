import { AuthTokenData } from './types'; // Adjust the path
declare global {
   namespace Express {
     export interface Request {
       user: AuthTokenData;
     }
   }
 }