import { test, describe, expect } from "vitest";
import { products } from "../mocks/mockData";
import ProductBreadcrumbs from "../app/product/components/productBreadcrumbs";
import { render, screen } from "@testing-library/react";

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