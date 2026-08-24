import { test, expect } from '../support/fixtures';

test.describe('Configuração do Veículo - Adição de Opcionais', () => {
  test('deve atualizar o preço ao adicionar e remover opcionais e persistir no checkout', async ({ app, page }) => {
    // Arrange
    await app.configurator.open();

    // Valida estado inicial (R$ 40.000,00)
    await app.configurator.expectTotalPrice('R$ 40.000,00');

    // Act 1: Marcar "Precision Park"
    await app.configurator.toggleOptional('Precision Park');

    // Assert 1: Preço atualizado
    await app.configurator.expectTotalPrice('R$ 45.500,00');

    // Act 2: Marcar "Flux Capacitor"
    await app.configurator.toggleOptional('Flux Capacitor');

    // Assert 2: Preço atualizado
    await app.configurator.expectTotalPrice('R$ 50.500,00');

    // Act 3: Desmarcar ambos
    await app.configurator.toggleOptional('Precision Park');
    await app.configurator.toggleOptional('Flux Capacitor');

    // Assert 3: Preço volta ao inicial
    await app.configurator.expectTotalPrice('R$ 40.000,00');

    // Act 4: Ir para o Checkout
    await app.configurator.goToCheckout();

    // Assert 4: Redirecionado para a página de checkout
    await expect(page).toHaveURL(/.*\/order/);
  });
});
