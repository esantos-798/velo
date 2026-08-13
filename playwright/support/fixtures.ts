import { test as base } from '@playwright/test'

import { createHeaderActions } from './actions/headerActions'
import { createLandingActions } from './actions/landingActions'
import { createOrderLockupActions } from './actions/orderLockupActions'

type App = {
    header: ReturnType<typeof createHeaderActions>
    landing: ReturnType<typeof createLandingActions>
    orderLockup: ReturnType<typeof createOrderLockupActions>
}

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        const app: App = {
            header: createHeaderActions(page),
            landing: createLandingActions(page),
            orderLockup: createOrderLockupActions(page),
        }

        await use(app)
    },
})

export { expect } from '@playwright/test'
