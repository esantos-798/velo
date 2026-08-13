import { Page, expect } from '@playwright/test'

export function createLandingActions(page: Page) {
    return {
        async open() {
            await page.goto('http://localhost:5173/')
        },

        async expectLoaded() {
            await expect(
                page.getByTestId('hero-section').getByRole('heading')
            ).toContainText('Velô Sprint')
        },
    }
}
