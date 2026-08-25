import type { OrderDetails, OrderStatus } from '../actions/orderLockupActions'
import { generateOrderCode } from '../helpers'
import type { NewOrderRow } from './schema'

type DbColor = 'lunar-white' | 'midnight-black'
type DbWheelType = 'aero' | 'sport'

const colorLabels: Record<DbColor, string> = {
    'lunar-white': 'Lunar White',
    'midnight-black': 'Midnight Black',
}

const statusDefaults: Record<
    OrderStatus,
    {
        color: DbColor
        wheelType: DbWheelType
        customerName: string
        customerEmail: string
        totalPrice: number
    }
> = {
    APROVADO: {
        color: 'lunar-white',
        wheelType: 'aero',
        customerName: 'EDUARDO DOS SANTOS',
        customerEmail: 'eduardo@velo.dev',
        totalPrice: 40000,
    },
    REPROVADO: {
        color: 'midnight-black',
        wheelType: 'sport',
        customerName: 'Steve Jobs',
        customerEmail: 'jobs@apple.com',
        totalPrice: 42000,
    },
    EM_ANALISE: {
        color: 'lunar-white',
        wheelType: 'aero',
        customerName: 'João da Silva',
        customerEmail: 'joao@velo.dev',
        totalPrice: 40000,
    },
}

export type TestOrderOverrides = Partial<{
    orderNumber: string
    color: DbColor
    wheelType: DbWheelType
    customerName: string
    customerEmail: string
    customerPhone: string
    customerCpf: string
    paymentMethod: 'avista' | 'financiamento'
    totalPrice: number
}>

export function buildTestOrder(
    status: OrderStatus,
    overrides: TestOrderOverrides = {}
): { insert: NewOrderRow; expect: OrderDetails } {
    const defaults = statusDefaults[status]
    const color = overrides.color ?? defaults.color
    const wheelType = overrides.wheelType ?? defaults.wheelType
    const paymentMethod = overrides.paymentMethod ?? 'avista'
    const orderNumber = overrides.orderNumber ?? generateOrderCode()

    const insert: NewOrderRow = {
        order_number: orderNumber,
        color,
        wheel_type: wheelType,
        customer_name: overrides.customerName ?? defaults.customerName,
        customer_email: overrides.customerEmail ?? defaults.customerEmail,
        customer_phone: overrides.customerPhone ?? '(19) 98396-5666',
        customer_cpf: overrides.customerCpf ?? '000.000.141-41',
        payment_method: paymentMethod,
        total_price: overrides.totalPrice ?? defaults.totalPrice,
        status,
        optionals: [],
    }

    const expect: OrderDetails = {
        number: orderNumber,
        status,
        color: colorLabels[color],
        wheels: `${wheelType} Wheels`,
        customer: {
            name: insert.customer_name,
            email: insert.customer_email,
        },
        payment: paymentMethod === 'avista' ? 'À Vista' : 'Financiamento 12x',
    }

    return { insert, expect }
}
