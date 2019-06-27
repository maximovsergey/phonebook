import { Phone } from "./Phone";

export class User {
    id: string;
    name: string;
    lastName: string;
    address: string;
    phones: Phone[];
    email: string;
}