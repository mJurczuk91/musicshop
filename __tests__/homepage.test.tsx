import { expect, test, beforeAll, afterEach, afterAll } from 'vitest'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Bestsellers from '../app/(ui)/bestsellers'
import { products } from '../mocks/mockData.js'
 

test('Page', async () => {
    const bestsellers = await Bestsellers();
    render(bestsellers);
})