import { render, screen } from "@testing-library/react"
import Home from "@/app/page"
import Bestsellers from "@/app/(ui)/bestsellers"
import { fetchProducts } from "@/app/(lib)/data";
import api from "@/app/(lib)/api";

describe('Homepage', () => {
    it("runs tests", () => {
        const one = 1;
        expect(one).toEqual(1);
    });
/*     it("is awesome", async () => {
        const bestsellers = await Bestsellers();
        render(bestsellers);
        expect(1).toEqual(1);
    }) */
    it("would be nice if it worked", async () => {
        const response = await fetch("http://example.com");
        console.log(response);
    })
})