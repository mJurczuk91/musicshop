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
    test('image miniatures dont contain the one currently displayed as big', () => {
        render(<ImageSelector imgUrlArr={imgUrlArr} />);
        const miniatures = screen.queryAllByAltText('product picture small') as HTMLImageElement[];
        expect(miniatures.find(img => img.src === `http://localhost:3000${imgUrlArr[0]}`)).toBeUndefined();
    });
    test('clicking on miniature sets it as the big picture and removes it from miniatures', async () => {
        const user = userEvent.setup();
        render(<ImageSelector imgUrlArr={imgUrlArr} />);

        const miniature = screen.getAllByAltText('product picture small')[0] as HTMLImageElement;
        const bigPic = screen.getByAltText('product picture big') as HTMLImageElement;

        expect(miniature.src).toContain(`http://localhost:3000${imgUrlArr[1]}`);
        expect(bigPic.src).toContain(`http://localhost:3000${imgUrlArr[0]}`);

        await user.click(miniature);

        const allMiniatures = screen.getAllByAltText('product picture small') as HTMLImageElement[];
        expect(bigPic.src).toContain(`http://localhost:3000${imgUrlArr[1]}`);
        expect(allMiniatures.find(img => img.src === `http://localhost:3000${imgUrlArr[1]}`)).toBeUndefined();
    })
})