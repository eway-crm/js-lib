import { test, expect } from 'vitest';
import { HttpRequestError } from '../exceptions/HttpRequestError';

test('HttpRequestError.fromResponse prefers the api result Description over the status text', () => {
    const error = HttpRequestError.fromResponse(401, 'Unauthorized', { ReturnCode: 'rcBadAccessToken', Description: 'Expired token' });
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('Expired token');
    expect(error.responseData).toEqual({ ReturnCode: 'rcBadAccessToken', Description: 'Expired token' });
});

test('HttpRequestError.fromResponse falls back to the status text when the body is not the api json', () => {
    const error = HttpRequestError.fromResponse(502, 'Bad Gateway', '<html>proxy error</html>');
    expect(error.statusCode).toBe(502);
    expect(error.message).toBe('Bad Gateway');
});

test('HttpRequestError.fromResponse survives an empty http/2 status text and a missing body', () => {
    const error = HttpRequestError.fromResponse(401, '', undefined);
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('');
});

test('HttpRequestError carries its message in the stack', () => {
    const error = new HttpRequestError(401, 'Expired token');
    expect(error.stack).toContain('Expired token');
});
