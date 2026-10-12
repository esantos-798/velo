import { describe, it, expect, beforeEach } from 'vitest';
import { 
  useConfiguratorStore, 
  calculateTotalPrice, 
  formatPrice 
} from './configuratorStore';

describe('Utilitários do Configurador', () => {
  it('deve calcular o preço total corretamente com rodas esportivas e opcionais', () => {
    const config = {
      exteriorColor: 'glacier-blue' as const,
      interiorColor: 'carbon-black' as const,
      wheelType: 'sport' as const,
      optionals: ['precision-park' as const],
    };
    // 40000 (base) + 2000 (sport) + 5500 (precision-park) = 47500
    expect(calculateTotalPrice(config)).toBe(47500);
  });

  it('deve formatar o preço corretamente para BRL', () => {
    expect(formatPrice(40000)).toContain('40.000,00');
  });
});

describe('useConfiguratorStore', () => {
  beforeEach(() => {
    useConfiguratorStore.getState().resetConfiguration();
  });

  it('deve iniciar com as configurações padrão', () => {
    const state = useConfiguratorStore.getState();
    expect(state.configuration.wheelType).toBe('aero');
    expect(state.viewMode).toBe('exterior');
  });

  it('deve alterar a cor exterior e atualizar o viewMode para exterior', () => {
    useConfiguratorStore.getState().setExteriorColor('midnight-black');
    const state = useConfiguratorStore.getState();
    expect(state.configuration.exteriorColor).toBe('midnight-black');
    expect(state.viewMode).toBe('exterior');
  });

  it('deve alternar opcionais corretamente (adicionar e remover)', () => {
    const store = useConfiguratorStore.getState();
    store.toggleOptional('flux-capacitor');
    expect(useConfiguratorStore.getState().configuration.optionals).toContain('flux-capacitor');
    
    store.toggleOptional('flux-capacitor');
    expect(useConfiguratorStore.getState().configuration.optionals).not.toContain('flux-capacitor');
  });
});