export default class Shared {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    public async open(path: string = '') {
        return browser.url(`${path}`);
    }

    /**
     * Wait for element to be displayed
     * @param selector Element selector
     */
    protected async waitForDisplayed(selector: string) {
        const element = await $(selector);
        await element.waitForDisplayed();
        return element;
    }
} 