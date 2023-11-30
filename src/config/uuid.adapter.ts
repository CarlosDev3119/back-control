import { v4 as uuidv4 } from 'uuid';


export class UUID {
    static v4 = () => uuidv4();
}