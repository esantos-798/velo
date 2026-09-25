import { test, expect } from '../support/fixtures'

import { deleteOrderByEmail, deleteOrderByDocument } from '../support/database/orderRepository'

test.describe('Checkout', () => {



  test.describe('Validações de campos obrigatórios', () => {

    let alerts: any

    test.beforeEach(async ({ page, app }) => {
      await page.goto('/order')
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()

      alerts = app.checkout.elements.alerts
    })


    test('deve validar obrigatoriedade de todos os campos em branco', async ({ app }) => {
      // Act
      await app.checkout.submit()

      // Assert
      await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
      await expect(alerts.lastname).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
      await expect(alerts.email).toHaveText('Email inválido')
      await expect(alerts.phone).toHaveText('Telefone inválido')
      await expect(alerts.document).toHaveText('Documento inválido')
      await expect(alerts.store).toHaveText('Selecione uma loja')
      await expect(alerts.terms).toHaveText('Aceite os termos')
    })

    test('deve validar limite mínimo de caracteres para Nome e Sobrenome', async ({ app }) => {

      const customer = {
        name: 'A',
        lastname: 'B',
        email: 'papito@teste.com',
        document: '000.000.141-41',
        phone: '(11) 99999-9999'
      }

      // Arrange
      await app.checkout.fillCustomerlData(customer)
      await app.checkout.selectStore('Velô Paulista')
      await app.checkout.acceptTerms()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
      await expect(alerts.lastname).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
    })

    test('deve exibir erro para e-mail com formato inválido', async ({ app }) => {
      const customer = {
        name: 'Fernando',
        lastname: 'Papito',
        email: 'papito@.com',
        document: '000.000.141-41',
        phone: '(11) 99999-9999'
      }

      // Arrange
      await app.checkout.fillCustomerlData(customer)
      await app.checkout.selectStore('Velô Paulista')
      await app.checkout.acceptTerms()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(alerts.email).toHaveText('Email inválido')
    })

    test('deve exibir erro para CPF inválido', async ({ app }) => {

      const customer = {
        name: 'Fernando',
        lastname: 'Papito',
        email: 'papito@test.com',
        document: '000.000.141-9', // Faltando 1 dígito
        phone: '(11) 99999-9999'
      }

      // Arrange
      await app.checkout.fillCustomerlData(customer)
      await app.checkout.selectStore('Velô Paulista')
      await app.checkout.acceptTerms()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(alerts.document).toHaveText('Documento inválido')
    })

    test('deve exigir o aceite dos termos ao finalizar com dados válidos', async ({ app }) => {

      const customer = {
        name: 'Fernando',
        lastname: 'Papito',
        email: 'papito@test.com',
        document: '000.000.141-41',
        phone: '(11) 99999-9999'
      }

      // Arrange
      await app.checkout.fillCustomerlData(customer)
      await app.checkout.selectStore('Velô Paulista')

      await expect(app.checkout.elements.terms).not.toBeChecked()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(alerts.terms).toHaveText('Aceite os termos')
    })
  })

  test.describe('Pagamento e Confirmação', () => {

    test.beforeEach(async ({ app }) => {
      await app.hero.open()
    })

    test('deve criar um pedido com sucesso para pagamento à vista', async ({ app }) => {

      const customer = {
        name: 'Eduardo',
        lastname: 'Santos',
        email: 'santos@teste.com',
        document: '152.163.870-56',
        phone: '(19) 99999-9999',
        store: 'Velô Paulista',
        paymentMethod: 'À Vista',
        totalPrice: 'R$ 40.000,00'
      }

      await deleteOrderByDocument(customer.document)

      // Arrange
      await app.configurator.expectPrice(customer.totalPrice)
      await app.configurator.finishConfigurator()
      await app.checkout.expectLoaded()

      await app.checkout.fillCustomerlData(customer)
      await app.checkout.selectStore(customer.store)

      // Act
      await app.checkout.selectPaymentMethod(customer.paymentMethod)
      await app.checkout.expectSummaryTotal(customer.totalPrice)
      await app.checkout.acceptTerms()
      await app.checkout.submit()

      // Assert
      await app.checkout.expectResult('Pedido Aprovado!')
    })
  })
})