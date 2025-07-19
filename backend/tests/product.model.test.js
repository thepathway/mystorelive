// backend\tests\product.model.test.js
import { getAllProducts } from '../models/product.model.js';

describe('Product Model', () => {
  test('fetches all products', async () => {
    const products = await getAllProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });
});
