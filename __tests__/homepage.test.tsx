import { expect, test, describe } from 'vitest'
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"
import { render, screen } from '@testing-library/react'
import Bestsellers from '../app/(ui)/bestsellers'
import { products } from '../mocks/mockData.js'
import {server} from "../mocks/mswServer.js"


/* test('bestsellers', async () => {

    for(let p of products){
        const item = screen.getByText(p.name);
        expect(item).toBeInTheDocument();
        const itemDescription = screen.getByText(p.description);
        expect(itemDescription).toBeInTheDocument();
    }
}) */

describe('bestsellers', () => {
    const renderBestsellers = async () => {
        const bestsellers = await Bestsellers();
        render(bestsellers);
    }

    test('bestsellers section displays product names', async () => {
        await renderBestsellers();
        for(let p of products){
            const productName = screen.getByText(p.name);
            expect(productName).toBeInTheDocument();
        };
    });
    test('bestsellers section displays products descriptions', async () => {
        await renderBestsellers();
        for(let p of products){
            const productDescription = screen.getByText(p.description);
            expect(productDescription).toBeInTheDocument();
        };
    });
    test('clicking on bestsellers product name redirects to that products page'), async () => {
        const user = userEvent.setup()
        await renderBestsellers();
        const firstProductName = screen.getByText(products[0].name);
        await user.click(firstProductName);
        const product = screen.getByText('PRODUCT');
        expect(product).toBeInTheDocument();
    }
})