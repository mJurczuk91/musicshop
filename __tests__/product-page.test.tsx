import { test, describe, expect } from "vitest";
import { products } from "../mocks/data/mockProducts";
import { comments } from '../mocks/data/mockComments'
import ProductBreadcrumbs from "../app/product/[slug]/components/productBreadcrumbs";
import { render, screen } from "@testing-library/react";
import ImageSelector from "@/app/product/[slug]/components/imageSelector";
import userEvent from '@testing-library/user-event';
import ProductCommentSection from "@/app/product/[slug]/components/productCommentsSection";
import ProductDetails from "@/app/product/[slug]/components/productDetails";
import CommentDisplay from "@/app/product/[slug]/components/commentDisplay";

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

describe('comment display', () => {
    const commentShort = {
        id: '1',
        userId: '1',
        userName: 'User Name',
        productId: '1',
        message: 'message',
        date: new Date().toISOString()
    };
    const commentLong = {
        id: '1',
        userId: '1',
        userName: 'User Name',
        productId: '1',
        message: 'messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage messagemessagemessage',
        date: new Date().toISOString()
    };
    const maxCommentLength = 150;

    test('comments longer than max length get abbreviated', () => {
        render(<CommentDisplay comment={commentLong} abbreviateCommentsLongerThan={maxCommentLength} />)

        const msg = commentLong.message.slice(0, maxCommentLength).trim().concat('...');
        expect(screen.getByText(msg)).toBeInTheDocument();
    });
    test("messages shorter than max length don't display 'show more/less' button", () => {
        render(<CommentDisplay comment={commentShort} abbreviateCommentsLongerThan={maxCommentLength} />);

        expect(screen.queryByText('Show more')).toBeFalsy();
        expect(screen.queryByText('Show less')).toBeFalsy();
    });
})

describe('comment section', () => {
    const firstProductComments = comments.filter(el => el.productId === products[0].id);

    test("it displays first 150 chars of every comment for a given product by default", async () => {
        const productCommentSection = await ProductCommentSection({ productId: products[0].id })
        render(productCommentSection)

        //messages longer than 150 chars have three dots at the end
        firstProductComments.map(c => {
            const msgShort = c.message.length > 150 ? c.message.slice(0, 150).concat('...') : c.message;
            expect(screen.getByText(msgShort)).toBeInTheDocument();
        })
    });
})

describe('details section', () => {
    test('it displays all the details for a given product', () => {
        render(<ProductDetails details={products[0].details} />);
        
        products[0].details.map(({ key, value }) => {
            expect(screen.getByText(key)).toBeInTheDocument();
            expect(screen.getByText(value)).toBeInTheDocument();
        })
    })
})