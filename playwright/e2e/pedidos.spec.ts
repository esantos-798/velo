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

  test('deve consultar um pedido aprovado', async ({ app }) => {

    // Test Data
    const order = {
      number: 'VLO-72GICU',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'EDUARDO DOS SANTOS',
        email: 'eduardo@velo.dev'
      },
      payment: 'À Vista'
    } as const

    // Act
    await app.orderLockup.searchOrder(order.number)

    // Assert
    await app.orderLockup.validateOrderResult(order)

  })

  test('deve consultar um pedido reprovado', async ({ app }) => {

    // Test Data
    const order = {
      number: 'VLO-YT5MC7',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    } as const

    // Act
    await app.orderLockup.searchOrder(order.number)

    // Assert
    await app.orderLockup.validateOrderResult(order)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {

    // Test Data
    const order = {
      number: 'VLO-ONBDD7',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@velo.dev'
      },
      payment: 'À Vista'
    } as const

    // Act
    await app.orderLockup.searchOrder(order.number)

    // Assert
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
