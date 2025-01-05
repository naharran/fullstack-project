import { User } from '../../shared/types'; // Adjust the path
declare global {
   namespace Express {
     export interface Request {
       user?: Omit<User,'password'>;
     }
   }
 }