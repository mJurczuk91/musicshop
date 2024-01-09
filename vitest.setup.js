import * as matchers from 'vitest-dom/matchers'
import {expect} from 'vitest'
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {server} from "./mocks/mswServer.js"

expect.extend(matchers)

beforeAll(() => server.listen())

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close())
