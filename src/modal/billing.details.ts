import { generateRandomCity, generateEmail } from "../common/utils/string.utils";

export interface IBillingDetails {
    firstName: string,
    lastName: string,
    company?: string,
    country: string,
    address: string,
    postcode?: string,
    city: string,
    phone: string,
    email: string,
    comments?: string,
    paymentMethod: string,
}

export class BillingDetails {

    private firstName: string;
    private lastName: string;
    private company?: string;
    private country: string;
    private address: string;
    private postcode?: string;
    private city: string;
    private phone: string;
    private email: string;
    private comments?: string;
    private paymentMethod: string;

    constructor(sampleJSONData: IBillingDetails) {
        this.firstName = sampleJSONData.firstName;
        this.lastName = sampleJSONData.lastName;
        this.company = sampleJSONData.company;
        this.country = sampleJSONData.country;
        this.address = sampleJSONData.address;
        this.postcode = sampleJSONData.postcode;
        this.city = generateRandomCity();
        this.phone = sampleJSONData.phone;
        this.email = generateEmail();
        this.comments = sampleJSONData.comments;
        this.paymentMethod = sampleJSONData.paymentMethod;
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(lastName: string) {
        this.lastName = lastName;
    }

    getCompany() {
        return this.company;
    }

    setCompany(company: string) {
        this.company = company;
    }

    getCountry() {
        return this.country;
    }

    setCountry(country: string) {
        this.country = country;
    }

    getAddress() {
        return this.address;
    }

    setAddress(address: string) {
        this.address = address;
    }

    getPostcode() {
        return this.postcode;
    }

    setPostcode(postcode: string) {
        this.postcode = postcode;
    }

    getCity() {
        return this.city;
    }

    setCity(city: string) {
        this.city = city;
    }

    getPhone() {
        return this.phone;
    }

    setPhone(phone: string) {
        this.phone = phone;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email: string) {
        this.phone = email;
    }

    getComments() {
        return this.comments;
    }

    setComments(comments: string) {
        this.comments = comments;
    }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    setPaymentMethod(paymentMethod: string) {
        this.paymentMethod = paymentMethod;
    }

}