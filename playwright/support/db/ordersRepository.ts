import { getDb } from './client'
import type { NewOrderRow } from './schema'

export async function insertOrder(row: NewOrderRow): Promise<void> {
    await getDb()
        .insertInto('orders')
        .values(row)
        .execute()
}

export async function deleteOrderByNumber(orderNumber: string): Promise<void> {
    await getDb()
        .deleteFrom('orders')
        .where('order_number', '=', orderNumber)
        .execute()
}
