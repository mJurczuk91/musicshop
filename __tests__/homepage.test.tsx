import { expect, test, describe, it } from 'vitest'
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"
import { render, screen } from '@testing-library/react'
import Bestsellers from '../app/(ui)/bestsellers'
import BlogArticleStubs from '../app/(ui)/blogArticleStubs'
import { products, blogArticles } from '../mocks/mockData.js'

describe('bestsellers section', () => {
    const renderBestsellers = async () => {
        const bestsellers = await Bestsellers();
        render(bestsellers);
    }
    it('displays product names', async () => {
        await renderBestsellers();
        for(let p of products){
            const productName = screen.getByText(p.name);
            expect(productName).toBeInTheDocument();
        };
    });
    it('displays products descriptions', async () => {
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
});

describe('blog articles section', () => {
    const renderArticles = async () => {
        const articles = await BlogArticleStubs();
        render(articles);
    };
    it('displays article titles', async () => {
        await renderArticles();
        for(let article of blogArticles){
            const title = screen.getByText(article.title);
            expect(title).toBeInTheDocument();
        }
    });
    it('displays correct image', async () => {
        await renderArticles();
        const images = screen.getAllByAltText("article image") as HTMLImageElement[];
        const imageSrcs = images.map(img=>img.src);
        console.log(imageSrcs);
        // ?? nie podoba mi się
        for(let article of blogArticles){  
            expect(imageSrcs).toContain(`http://localhost:3000${article.image_url}`);
        }
    })
})