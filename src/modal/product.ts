export interface IProduct {
    name: string,
    price: number,
    currency: string,
    description: string,
    category: string,
    tags?: string,
    image?: string,
    liveViewing?: number,
}


export class Product {

    private name: string;
    private price: number;
    private currency: string;
    private description: string;
    private category: string;
    private tags?: string;
    private image?: string;
    private liveViewing?: number;

    constructor(productJsonData: IProduct) {
        this.name = productJsonData.name;
        this.price = productJsonData.price;
        this.currency = productJsonData.currency;
        this.description = productJsonData.description;
        this.category = productJsonData.category;
        this.tags = productJsonData.tags;
        this.tags = productJsonData.tags;
        this.image = productJsonData.image;
        this.liveViewing = productJsonData.liveViewing;
    }

    getProductName() {
        return this.name;
    }

    setProductName(name: string) {
        this.name = name;
    }

    getProductPrice() {
        return this.price;
    }

    setProductPrice(price: number) {
        this.price = price;
    }

    getProductPaymentPrice() {
        return `${this.currency}${this.price.toFixed(2)}`;
    }

    getCurrency() {
        return this.currency;
    }

    setCurrency(currency: string) {
        this.currency = currency;
    }

    getProductDescription() {
        return this.description;
    }

    setProductDescription(description: string) {
        this.description = description;
    }

    getProductCategory() {
        return this.category;
    }

    setProductCategory(category: string) {
        this.category = category;
    }

    getProductTags() {
        return this.tags;
    }

    setProductTags(tags: string) {
        this.tags = tags;
    }

    getProductImage() {
        return this.image;
    }

    setProductImage(image: string) {
        this.image = image;
    }

    getProductLiveViewing() {
        return this.liveViewing;
    }

    setProductLiveViewing(liveViewing: number) {
        this.liveViewing = liveViewing;
    }

}