import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 
import bcrypt from "bcrypt";
  
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