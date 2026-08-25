import { test, expect } from '../support/fixtures';

test.describe('Configuração do Veículo (Cores e Rodas) e Cálculo do Preço Base', () => {

  test.beforeEach(async ({ app }) => {
    await app.configurator.open();
  });
  
  test('deve atualizar a imagem do veículo e manter o preço base ao alterar a cor exterior', async ({ app }) => {
    // Estado Inicial: Verificar o preço base de R$ 40.000,00 e cor padrão
    await app.configurator.expectPrice('R$ 40.000,00');
    await app.configurator.expectColorOptionVisible('Glacier Blue');

    // Ação: Selecionar uma cor exterior diferente ("Midnight Black")
    await app.configurator.selectColor('Midnight Black');
    
    // Assert: Validar que o preço permanece R$ 40.000,00
    await app.configurator.expectPrice('R$ 40.000,00');
    await app.configurator.expectCarImage('/src/assets/midnight-black-aero-wheels.png');
  });

  test('deve atualizar a imagem do veículo e recalcular o preço total ao alternar o modelo das rodas', async ({ app }) => {
    // Estado Inicial: Verificar o preço base de R$ 40.000,00
    await app.configurator.expectPrice('R$ 40.000,00');

    // Ação 1: Selecionar a opção de roda "Sport Wheels"
    await app.configurator.selectWheels(/Sport Wheels/);
    await app.configurator.expectCarImage('/src/assets/glacier-blue-sport-wheels.png');
    
    // Assert 1: Validar acréscimo de R$ 2.000,00 (Total: R$ 42.000,00)
    await app.configurator.expectPrice('R$ 42.000,00');

    // Ação 2: Voltar para a roda "Aero Wheels"
    await app.configurator.selectWheels(/Aero Wheels/);
    
    // Assert 2: Validar retorno ao preço base (Total: R$ 40.000,00)
    await app.configurator.expectPrice('R$ 40.000,00');
    await app.configurator.expectCarImage('/src/assets/glacier-blue-aero-wheels.png');
  });

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
