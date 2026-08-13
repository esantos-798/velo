import { Page } from '@playwright/test'

import { OrderLockupPage } from '../pages/OrderLockupPage'

export class HeaderComponent {
    constructor(private page: Page) { }

    async goToOrderLookup(): Promise<OrderLockupPage> {
        await this.page.getByTestId('header-nav')
            .getByRole('link', { name: 'Consultar Pedido' })
            .click()

        return new OrderLockupPage(this.page)
    }
}
