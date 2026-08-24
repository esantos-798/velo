import { Page, expect } from '@playwright/test'

export function createConfiguratorActions(page: Page) {
    const carImage = page.locator('img[alt^="Velô Sprint"]')

    return {
        async open() {
            await page.goto('http://localhost:5173/configure')
        },

        async expectPrice(price: string) {
            await expect(page.getByText(price)).toBeVisible()
        },

        async expectColorOptionVisible(color: string) {
            await expect(page.getByRole('button', { name: color })).toBeVisible()
        },

        async selectColor(color: string) {
            await page.getByRole('button', { name: color }).click()
        },

        async selectWheels(wheels: RegExp | string) {
            await page.getByRole('button', { name: wheels }).click()
        },

        async expectCarImage(srcPath: string) {
            await expect(carImage).toHaveAttribute('src', srcPath)
        },

        async toggleOptional(optionalName: string) {
            await page.getByRole('checkbox', { name: optionalName }).click()
        },

        async expectTotalPrice(price: string) {
            await expect(page.getByTestId('total-price')).toHaveText(price)
        },

        async goToCheckout() {
            await page.getByRole('button', { name: 'Monte o Seu' }).click()
        }
    }
}
