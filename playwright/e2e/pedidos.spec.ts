import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert

test('test', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/');

  // Checkpoint 1: Verificar se o título da página é "Velô Sprint" (faz parte da preparação)
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  // Act
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  
  // Checkpoint 2: Verificar se a página de consulta de pedidos é carregada
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await page.getByTestId('search-order-id').fill('VLO-QYESMH');

  // Act
  await page.getByTestId('search-order-button').click();

  // Assert 
  await expect(page.getByTestId('order-result-id')).toBeVisible();
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-QYESMH');
  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');

});