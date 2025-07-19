// backend\tests\order.model.test.js
import { getOrderByNumber } from '../models/order.model.js';

describe('Order Model', () => {
  test('fetches an order by number', async () => {
    const order = await getOrderByNumber('ORD123456');
    expect(order).toHaveProperty('orderNumber', 'ORD123456');
  });
});
