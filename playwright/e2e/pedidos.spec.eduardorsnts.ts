import { test, expect } from '@playwright/test';


test('test_desafio', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-QYESMH');
  await page.locator('//button[text()="Buscar Pedido"]').click();

  await expect(page.getByText('Pedido', { exact: true })).toBeVisible({timeout: 10_000});
  await expect(page.getByText('VLO-QYESMH')).toBeVisible();
  await expect(page.getByText('APROVADO')).toBeVisible();
});