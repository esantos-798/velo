import { test as base } from '@playwright/test'

import { createHeaderActions } from './actions/headerActions'
import { createLandingActions } from './actions/landingActions'
import { createOrderLockupActions } from './actions/orderLockupActions'
import { createConfiguratorActions } from './actions/configuratorActions'
import type { OrderDetails, OrderStatus } from './actions/orderLockupActions'
import { destroyDb } from './db/client'
import { buildTestOrder, type TestOrderOverrides } from './db/orderFactory'
import { deleteOrderByNumber, insertOrder } from './db/ordersRepository'

type App = {
    header: ReturnType<typeof createHeaderActions>
    landing: ReturnType<typeof createLandingActions>
    orderLockup: ReturnType<typeof createOrderLockupActions>
    configurator: ReturnType<typeof createConfiguratorActions>
}

type SeedOrderOptions = {
    status: OrderStatus
    overrides?: TestOrderOverrides
}

export const test = base.extend<{
    app: App
    seedOrder: (options: SeedOrderOptions) => Promise<OrderDetails>
}>({
    app: async ({ page }, use) => {
        const app: App = {
            header: createHeaderActions(page),
            landing: createLandingActions(page),
            orderLockup: createOrderLockupActions(page),
            configurator: createConfiguratorActions(page),
        }

        await use(app)
    },

    seedOrder: async ({}, use) => {
        const created: string[] = []

        await use(async ({ status, overrides }) => {
            const { insert, expect } = buildTestOrder(status, overrides)
            await insertOrder(insert)
            created.push(insert.order_number)
            return expect
        })

        for (const orderNumber of created) {
            await deleteOrderByNumber(orderNumber)
        }

        await destroyDb()
    },
})

export { expect } from '@playwright/test'
