import { PhoneType } from "./PhoneType";

export class EditContactInput {
    name!: string;
    lastName!: string;
    phones!: PhoneType[];
    address!: string;
    email!: string;
}