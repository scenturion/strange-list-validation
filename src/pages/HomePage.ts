import { ChainablePromiseElement, ChainablePromiseArray, ElementArray } from 'webdriverio';
import Shared from './Shared';

export default class HomePage extends Shared {
    // Selectors
    public get newItemInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('textarea[name="text"]'); }
    public get list(): ChainablePromiseElement<WebdriverIO.Element> { return $('.media-list'); }
    public get items(): ChainablePromiseArray<ElementArray> { return $$('.media-list .media'); }
    public get editButtons(): ChainablePromiseArray<ElementArray> { return $$('button[ng-click*="setCurrentItem"]'); }
    public get uploadImage(): ChainablePromiseElement<WebdriverIO.Element> { return $('#inputImage'); }
    public get deleteButtons(): ChainablePromiseArray<ElementArray> { return $$('button[ng-click*="open"]'); }
    public get itemTexts(): ChainablePromiseArray<ElementArray> { return $$('.media-list .media .story'); }
    public get createButton(): ChainablePromiseElement<WebdriverIO.Element> { return $('.btn-success'); }


    async createItem(text: string): Promise<void> {
        await this.newItemInput.setValue(text);
        await this.createButton.click();
    }

    async setImage(imagePath: string): Promise<void> {
        if (!imagePath || typeof imagePath !== 'string') {
            throw new Error('Invalid image path provided');
        }
        await this.uploadImage.setValue(imagePath);
    }


    async editItem(index: number, newText: string): Promise<void> {
        const editButtons = await this.editButtons;
        const buttons = await editButtons;
        if (index >= 0 && index < buttons.length) {
            await buttons[index].click();
            await this.newItemInput.setValue(newText);
            await this.createButton.click();
        }
    }


    async deleteItem(index: number): Promise<void> {
        const deleteButtons = await this.deleteButtons;
        const buttons = await deleteButtons;
        if (index >= 0 && index < buttons.length) {
            const items = await this.items;
            const item = items[index];
            if (item) {
                await item.moveTo();  // Hover over item
                await buttons[index].click();
                // Handle confirmation modal
                const confirmButton = await $('button[ng-click="submit()"]');
                await confirmButton.click();
            }
        }
    }

    /**
     * Gets the text of a  item at the specified index
     * @param index Index of the item
     */
    async getItemText(index: number): Promise<string> {
        const items = await this.itemTexts;
        const texts = await items;
        if (index >= 0 && index < texts.length) {
            return texts[index].getText();
        }
        return '';
    }

    /**
     * Gets the total count of  items
     */
    async getItemCount(): Promise<number> {
        const items = await this.items;
        return items.length;
    }

    /**
     * Finds an item with the specified text
     * @param text Text to search for
     */
    async findItemWithText(text: string): Promise<boolean> {
        console.log('Finding item with text:', text);
        const items = await this.itemTexts;
        console.log('Total items found:', items.length);
        
        for (const item of items) {
            const itemText = await item.getText();
            console.log('Comparing with item text:', itemText);
            if (itemText === text) {
                console.log('Match found!');
                return true;
            }
        }
        console.log('No match found');
        return false;
    }

    /**
     * Checks if the input field enforces the maximum length
     * @param text Text to check
     * @param maxLength Maximum allowed length
     */
    async validateMaxLength(text: string, maxLength: number): Promise<string> {
        await this.newItemInput.setValue(text);
        const value = await this.newItemInput.getValue();
        return value.slice(0, maxLength);
    }
} 