import { fetchProductById } from "../app/(lib)/data";
import { expect, test } from 'vitest';
import { products } from "../mocks/mockData";

test("fetch product by id gets product correctly", async () => {
    const product = await fetchProductById(products[0].id);
    expect(product).toEqual(products[0]);
});