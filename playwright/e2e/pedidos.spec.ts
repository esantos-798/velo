import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert
/// PAV - Preparar, Agir, Validar

test('deve consultar pedido aprovado', async ({ page }) => {
  //Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Consultar Pedido' })).toBeVisible()
  //Act
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  //await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-72GICU')
  //await page.locator('input[name="order-id"]').fill('VLO-72GICU')
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-72GICU')
  //await page.getByTestId('search-order-id').fill('VLO-72GICU')
  //await page.getByLabel('Número do Pedido').fill('VLO-72GICU')
  //await page.getByPlaceholder('Ex: VLO-ABC123').fill('VLO-72GICU')
  //await page.getByTestId('search-order-button').click()
  await page.locator('//button[text()="Buscar Pedido"]').click()
  //Assert
  //await page.waitForTimeout(15000) // Thread Sleep cy.wait(10000)
  await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10_000 })
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-72GICU')
  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})  