import { type Page } from '@playwright/test';

export class Dialog {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    acceptAlert() {
        this.page.on('dialog', dialog => { dialog.accept(); });
    }

    getMessage() {
        return new Promise<string>((resolve) => {
            this.page.on('dialog', dialog => {
                resolve(dialog.message());
            });
        });
    }

}
