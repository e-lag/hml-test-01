import { v4 as uuidv4 } from 'uuid';

export function idCheckOrGenerate(id:string): string {
    return !id? uuidv4(): id;
}
