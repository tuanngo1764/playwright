import { getCurrentDate } from "../common/utils/string.utils";

export interface IOrder {
    orderNumber?: string,
    orderDate: string,
    total: string,
    paymentMethod: string,
    email: string,
}


export class Order {

    private orderNumber?: string;
    private orderDate: string;
    private total: string;
    private paymentMethod: string;
    private email: string;

    constructor(orderTotal: string, paymentMethod: string, orderEmail: string, orderNumber: string = "") {
        this.orderNumber = orderNumber;
        this.orderDate = getCurrentDate();
        this.total = orderTotal;
        this.paymentMethod = paymentMethod;
        this.email = orderEmail;
    }

    getOrderNumber() {
        return this.orderNumber;
    }

    setOrderNumber(orderNumber: string) {
        this.orderNumber = orderNumber;
    }

    getOrderDate() {
        return this.orderDate;
    }

    setOrderDate(orderDate: string) {
        this.orderDate = orderDate;
    }

    getOrderTotal() {
        return this.total;
    }

    setOrderTotal(total: string) {
        this.total = total;
    }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    setPaymentMethod(paymentMethod: string) {
        this.paymentMethod = paymentMethod;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
    }

}