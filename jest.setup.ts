import '@testing-library/jest-dom'
import { mswServer } from './mocks/server';

mswServer.events.on('request:start', ({ request }) => {
    console.log('Outgoing:', request.method, request.url)
  })

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());