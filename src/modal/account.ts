import { generateEmail } from "../common/utils/string.utils";

export class Account {

    private email: string;
    private password: string;

    constructor() {
        this.generateSampleAccount();
    }

    generateSampleAccount() {
        this.email = generateEmail();
        this.password = 'TAtraining123';
    }

    getUsername() {
        return this.email.split('@')[0];
    }

    setEmail(email: string) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    getPassword() {
        return this.password;
    }

}