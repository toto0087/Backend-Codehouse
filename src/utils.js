import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 
import bcrypt from "bcrypt";
import crypto from 'crypto';
  
 const __filename = fileURLToPath(import.meta.url); 
 const __dirname = dirname(__filename); 
 export const hashData = async (data) => {
    const hash = await bcrypt.hash(data, 10);
    return hash
 };

export const compareData = async (data, hash) => {
    const result = await bcrypt.compare(data, hash);
    return result
 };
 export default __dirname

 export function generateUniqueCode() {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const codeLength = 8;

   let uniqueCode = '';

   for (let i = 0; i < codeLength; i++) {
       const randomIndex = Math.floor(Math.random() * characters.length);
       uniqueCode += characters.charAt(randomIndex);
   }

   return uniqueCode;
}

export const generateResetToken = () => {
   return crypto.randomBytes(20).toString('hex');
 };