import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import type { World } from '@wdio/cucumber-framework';
import type { ElementArray } from 'webdriverio';
import HomePage from '../../src/pages/HomePage';


declare module '@wdio/cucumber-framework' {
    interface World {
        [key: string]: any;
    }
}

const homePage = new HomePage();

Given('I navigato to the application', async function(this: World): Promise<void> {
    console.log('\n=== Step: Navigating to application ===');
    await homePage.open();
    console.log('Waiting for media-list to be displayed...');
    await $('.media-list').waitForDisplayed({ timeout: 10000 });
    console.log('Media list is displayed');
    await browser.pause(2000); // Pause to see the state
});

Given('there is an existing  item {string}', async function(this: World, text: string): Promise<void> {
    await homePage.createItem(text);
});

When('I enter {string} into the new  input', async function(this: World, text: string): Promise<void> {
    console.log('\n=== Step: Entering text into input ===');
    console.log('Text to enter:', text);
    await homePage.newItemInput.setValue(text);
    console.log('Text entered successfully');
    await browser.pause(2000); // Pause to see the state
});

When('I enter a string of {int} characters into the new  input', async function(this: World, length: number): Promise<void> {
    const text = 'A'.repeat(length);
    await homePage.newItemInput.setValue(text);
});

When('I upload the image from {string} folder with name {string}', async function(this: World, folderName: string, imageName: string): Promise<void> {
    const relativeImagePath = `/${folderName}/${imageName}`;
    console.log('Resolved relative image path:', relativeImagePath);

    await homePage.setImage(relativeImagePath);
});

When('I press Enter', async function(this: World): Promise<void> {
    console.log('\n=== Step: Pressing Enter ===');
    await homePage.createButton.click();
    console.log('Create button clicked');
    await browser.pause(2000); // Pause to see the state
});

When('I double click on the  item {string}', async function(this: World, text: string): Promise<void> {
    const items: ElementArray = await homePage.itemTexts;
    for (let i = 0; i < items.length; i++) {
        const itemText = await items[i].getText();
        if (itemText === text) {
            await homePage.editItem(i, text);
            break;
        }
    }
});

When('I change the text to {string}', async function(this: World, newText: string): Promise<void> {
    await homePage.newItemInput.setValue(newText);
});

When('I hover over the  item {string}', async function(this: World, text: string): Promise<void> {
    const items: ElementArray = await homePage.itemTexts;
    for (let i = 0; i < items.length; i++) {
        const itemText = await items[i].getText();
        if (itemText === text) {
            await items[i].moveTo();
            break;
        }
    }
});

When('I click the delete button', async function(this: World): Promise<void> {
    const deleteButtons: ElementArray = await homePage.deleteButtons;
    await deleteButtons[0].click();
    // Handle confirmation modal
    const confirmButton = await $('button[ng-click="submit()"]');
    await confirmButton.click();
});

Then('I should see {string} in the  list', async function(this: World, text: string): Promise<void> {
    console.log('\n=== Step: Verifying item in list ===');
    console.log('Searching for text:', text);
    
    // Wait for the list to be present
    await $('.media-list').waitForDisplayed({ timeout: 10000 });
    console.log('Media list is displayed');
    
    // Get all items and log them
    const items = await homePage.itemTexts;
    console.log('Number of items found:', items.length);
    
    // Log each item's text
    for (const item of items) {
        const itemText = await item.getText();
        console.log('Item text:', itemText);
    }
    
    await browser.pause(2000); // Pause to see the state
    
    const exists = await homePage.findItemWithText(text);
    console.log('Item exists:', exists);
    
    expect(exists).toBe(true);
});

Then('I should not see {string} in the  list', async function(this: World, text: string): Promise<void> {
    const exists = await homePage.findItemWithText(text);
    expect(exists).toBe(false);
});

Then('the  count should be {int}', async function(this: World, count: number): Promise<void> {
    const actualCount = await homePage.getItemCount();
    expect(actualCount).toBe(count);
});

Then('the input should only accept the first {int} characters', async function(this: World, maxLength: number): Promise<void> {
    const longText = 'A'.repeat(maxLength + 50);
    const truncatedText = await homePage.validateMaxLength(longText, maxLength);
    expect(truncatedText.length).toBeLessThanOrEqual(maxLength);
});

Then('I should be able to create the  item with truncated text', async function(this: World): Promise<void> {
    await homePage.createButton.click();
    // Verify the item was created
    const count = await homePage.getItemCount();
    expect(count).toBeGreaterThan(0);
});

Then('I should see a  item with text {string}', async function(this: World, text: string): Promise<void> {
    const exists = await homePage.findItemWithText(text);
    expect(exists).toBe(true);
}); 