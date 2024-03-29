import { getProductSlug, getSubcategorySlug } from "../app/(lib)/helpers";
import { expect, test } from 'vitest';
import { Product } from "../app/(lib)/definitions";

test('getProductSlug generates proper slug', () => {
    const product:Product = {
        id: "1021",
        name: 'magnificient drums',
        amount: 3,
        category: 'drums',
        subcategory: 'acoustic drums',
        description: 'description',
        imgUrlArray: ['/drums1.jpg'],
        price: '123.54',
        details: [{key: 'key', value: 'value'}],
    };
    const product2:Product = {
        id: "1023",
        name: 'drums',
        amount: 3,
        category: 'drums',
        subcategory: 'acoustic drums',
        description: 'description',
        imgUrlArray: ['/drums1.jpg'],
        price: '123.54',
        details: [{key: 'key', value: 'value'}],
    };
    const slug = getProductSlug(product);
    const slug2 = getProductSlug(product2);
    expect(slug).toEqual('1021-magnificient-drums');
    expect(slug2).toEqual('1023-drums');
});

test('getSubcategorySlug returns a proper slug', () => {
    const subcategory = 'acoustic drums';
    const slug = getSubcategorySlug(subcategory);
    expect(slug).toEqual('acoustic-drums');
})