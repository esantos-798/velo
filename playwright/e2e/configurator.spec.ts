import { test } from '../support/fixtures'

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

});