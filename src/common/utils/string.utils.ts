import moment from "moment";

export function generateEmail(domain: string = 'mailinator.com') {
    return `auto.test${Date.now()}@${domain}`;
}

export function generateRandomCity() {
    const cityList: string[] = ["Hồ Chí Minh", "Huế", "Đà Nẵng", "Hà Nội"];
    const ind: number = Math.floor(Math.random() * cityList.length);
    return cityList[ind];
}

export function formateDate(d: Date, format: string) {
    return moment(d).format(format)
}

export function getCurrentDate(format: string = "MMMM DD, YYYY") {
    return formateDate(new Date(), format);
}