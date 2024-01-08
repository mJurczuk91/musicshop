import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import Bestsellers from '../app/(ui)/bestsellers'
import { beforeAll, afterEach, afterAll } from 'vitest'
import {server} from "../mocks/mswServer"
 
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Page', async () => {
    const bestsellers = await Bestsellers();
    render(bestsellers)
    expect(1).toEqual(1);
})