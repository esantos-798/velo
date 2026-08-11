export function generateOrderCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
  
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
  
    return `VLO-${code}`;
  }
  
  //const order = generateOrderCode();
  
  //console.log(order);

//import { Page } from '@playwright/test';

//export async function searchOrder(page: Page, orderNumber: string) {
//    await page.getByRole('textbox', { name: 'Código do Pedido' }).fill(orderNumber);
//    await page.getByRole('button', { name: 'Buscar Pedido' }).click();
//}