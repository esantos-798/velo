import { Page, expect } from '@playwright/test'

import { HeaderComponent } from '../components/HeaderComponent'

export class LandingPage {
    readonly header: HeaderComponent

    constructor(private page: Page) {
        this.header = new HeaderComponent(page)
    }

    async open() {
        await this.page.goto('http://localhost:5173/')
    }

    async expectLoaded() {
        await expect(
            this.page.getByTestId('hero-section').getByRole('heading')
        ).toContainText('Velô Sprint')
    }
}
