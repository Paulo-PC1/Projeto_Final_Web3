import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

// Paleta derivada de #0d81ee (a cor 500 é a cor exata pedida; as demais
// são tons mais claros/escuros gerados a partir dela, só pra dar
// consistência em hover/focus/disabled etc.)
export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f3f9fe',
      100: '#e7f2fd',
      200: '#c2e0fb',
      300: '#9ecdf8',
      400: '#56a7f3',
      500: '#0d81ee',
      600: '#0b72d1',
      700: '#095dab',
      800: '#074885',
      900: '#05345f',
      950: '#03203c'
    }
  }
});