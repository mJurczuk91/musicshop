import { expect, test, describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Bestsellers from '../app/(ui)/bestsellers';
import BlogArticleStubs from '../app/(ui)/blogArticleStubs';
import { products } from '../mocks/data/mockProducts'
import { blogArticles } from '../mocks/data/mockBlogArticles'
import { categories } from '../mocks/data/mockCategories';
import ProductMiniature from '../app/(ui)/productMiniature';
import CategoryMenuItem from '../app/(ui)/navbar/categoryMenuItem';
import CategoryMenu from '../app/(ui)/navbar/categoryMenu';
import CategoryGrid from '../app/(ui)/categoryGrid';
import OffersOfTheWeek from '../app/(ui)/offersOfTheWeek';


/* describe('product miniature', () => {
    test('displays products name', () => {
        render(<ProductMiniature product={products[0]} />);
        const name = screen.getByText(products[0].name);
        expect(name).toBeInTheDocument();
    });
    test('displays first 30 letters of product description', () => {
        render(<ProductMiniature product={products[0]} />);
        const description = screen.getByText(products[0].description.slice(0, 30));
        expect(description).toBeInTheDocument();
    });
    test('displays products image', () => {
        render(<ProductMiniature product={products[0]} />);
        const img = screen.getByAltText('product image') as HTMLImageElement;
        expect(img.src).toContain(`http://localhost:3000${products[0].imgUrlArray[0]}`);
    });
}) */
describe('bestsellers section', () => {
    test('bestsellers section renders 4 product miniatures', async () => {
        const bestsellers = await Bestsellers();
        render(bestsellers);
        for (let product of products.slice(0, 4)) {
            expect(screen.getByText(product.name)).toBeInTheDocument();
            expect(screen.getByText(product.description.slice(0, 30).trim())).toBeInTheDocument();
        }
    })
});
/* 
describe('offersOfTheWeek section', () => {
    test('it displays 8 products', async () => {
        const offersOfTheWeek = await OffersOfTheWeek();
        render(offersOfTheWeek);
        for (let product of products.slice(0, 8)) {
            expect(screen.getByText(product.name)).toBeInTheDocument();
            expect(screen.getByText(product.description.slice(0, 30).trim())).toBeInTheDocument();
        }
        expect(screen.queryByText(products[8].name)).toBeNull();
    })
})

describe('blog articles section', () => {
    const renderArticles = async () => {
        const articles = await BlogArticleStubs();
        render(articles);
    };
    it('displays article titles', async () => {
        await renderArticles();
        for (let article of blogArticles) {
            const title = screen.getByText(article.title);
            expect(title).toBeInTheDocument();
        }
    });
    it('displays correct image', async () => {
        await renderArticles();
        const images = screen.getAllByAltText("article image") as HTMLImageElement[];
        const imageSrcs = images.map(img => img.src);
        for (let article of blogArticles) {
            expect(imageSrcs).toContain(`http://localhost:3000${article.image_url}`);
        }
    })
})

describe('CategoryMenuItem', () => {
    test('it displays category name', () => {
        render(<CategoryMenuItem category={categories[0]} />)
        const cat = screen.getByText(categories[0].name);
        expect(cat).toBeInTheDocument();
    });
    test('it displays all subcategories', () => {
        render(<CategoryMenuItem category={categories[0]} />);
        for (let item of categories[0].subcategories) {
            const subcat = screen.getByText(item);
            expect(subcat).toBeInTheDocument();
        }
    });
});

describe('CategoryMenu', async () => {
    test('it displays all categories and subcategories', async () => {
        const categoryMenu = await CategoryMenu();
        render(categoryMenu);
        for (let cat of categories) {
            expect(screen.getByText(cat.name)).toBeInTheDocument();
            for (let subcat of cat.subcategories) {
                expect(screen.getByText(subcat)).toBeInTheDocument();
            }
        }
    })
});

describe('categoryGrid', () => {
    test('it displays 3 subcategories from each of 4 main categories', async () => {
        const categoryGrid = await CategoryGrid();
        render(categoryGrid);
        for (let cat of categories) {
            expect(screen.getByText(cat.name)).toBeInTheDocument();
            for (let subcat of cat.subcategories.slice(0, 3)) {
                expect(screen.getByText(subcat)).toBeInTheDocument();
            }
        }
    })
}) */