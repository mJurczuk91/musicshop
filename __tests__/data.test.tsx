import { fetchProductById, fetchCommentsByProductId } from "../app/(lib)/data";
import { expect, test } from 'vitest';
import { products } from "../mocks/data/mockProducts";

test("fetch product by id gets product correctly", async () => {
    const product = await fetchProductById(products[0].id);
    expect(product).toEqual(products[0]);
});

test('fetch comments by product id gets comments for that product only', async () => {
    const comments = await fetchCommentsByProductId(products[0].id);
    comments.map((comment) => {
        expect(comment.productId).toEqual(products[0].id);
    })
})