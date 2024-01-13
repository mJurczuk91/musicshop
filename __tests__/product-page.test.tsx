import { test, describe, expect } from "vitest";
import { products } from "../mocks/mockData";
import ProductBreadcrumbs from "../app/product/components/productBreadcrumbs";
import { render, screen } from "@testing-library/react";
import ImageSelector from "@/app/product/components/imageSelector";
import userEvent from '@testing-library/user-event';

describe('product page breadcrumbs', () => {
    test('breadcrumbs are properly displayed', () => {
        render(<ProductBreadcrumbs product={products[0]} />);
        const homePage = screen.getByText('Home page');
        const category = screen.getByText(products[0].category);
        const subcategory = screen.getByText(products[0].subcategory);
        const productName = screen.getByText(products[0].name);

        expect(homePage).toBeInTheDocument();
        expect(category).toBeInTheDocument();
        expect(subcategory).toBeInTheDocument();
        expect(productName).toBeInTheDocument();
    })
})

describe('image selector', () => {
    const imgUrlArr = ['/img1', '/img2', '/img3', '/img4', '/img5']

    test('by default image selector displays first picture in array as the big one', () => {
        render(<ImageSelector imgUrlArr={imgUrlArr} />);
        const bigPic = screen.getByAltText("product picture big") as HTMLImageElement;
        expect(bigPic.src).toContain(`http://localhost:3000${imgUrlArr[0]}`);
    });

    test('image miniatures contain all images', () => {
        render(<ImageSelector imgUrlArr={imgUrlArr} />);
        const miniatures = screen.queryAllByAltText('product picture small') as HTMLImageElement[];
        const miniaturesSrc = miniatures.map(el => el.src);
        imgUrlArr.map(img => {
            expect(miniaturesSrc.find(min => min === `http://localhost:3000${img}`)).toBeTruthy();
        })
    });

    test('clicking on miniature sets it as the big picture', async () => {
        const user = userEvent.setup();
        render(<ImageSelector imgUrlArr={imgUrlArr} />);

        const miniature = screen.getAllByAltText('product picture small')[1] as HTMLImageElement;
        const bigPic = screen.getByAltText('product picture big') as HTMLImageElement;

        expect(bigPic.src).toContain(`http://localhost:3000${imgUrlArr[0]}`);

        await user.click(miniature);

        expect(bigPic.src).toContain(`http://localhost:3000${imgUrlArr[1]}`);
    })
})