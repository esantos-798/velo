import { Page } from '@playwright/test'

export function createHeaderActions(page: Page) {
    return {
        async goToOrderLookup() {
            await page.getByTestId('header-nav')
                .getByRole('link', { name: 'Consultar Pedido' })
                .click()
        },
    }
}
