import { expect, test } from '../support/fixtures'

import { generateOrderCode } from '../support/helpers'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    await app.landing.open()
    await app.landing.expectLoaded()

    await app.header.goToOrderLookup()
    await app.orderLockup.expectLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ app, seedOrder }) => {
    const order = await seedOrder({ status: 'APROVADO' })

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderResult(order)
  })

  test('deve consultar um pedido reprovado', async ({ app, seedOrder }) => {
    const order = await seedOrder({ status: 'REPROVADO' })

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderResult(order)
  })

  test('deve consultar um pedido em analise', async ({ app, seedOrder }) => {
    const order = await seedOrder({ status: 'EM_ANALISE' })

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderResult(order)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {

    const order = generateOrderCode()

    await app.orderLockup.searchOrder(order)

    await app.orderLockup.validateNotFound()

  })

  test('deve exibir mensagem quando o código está fora do padrão', async ({ app }) => {

    await app.orderLockup.searchOrder('ABC-12345')

    await app.orderLockup.validateNotFound()

  })

  test('deve manter o botão de busca desabilitado com campo vazio ou apenas espaços', async ({ app }) => {
    const { searchButton, orderInput } = app.orderLockup

    await expect(searchButton).toBeDisabled()

    await orderInput.fill('      ')

    await expect(searchButton).toBeDisabled()
  })

})
