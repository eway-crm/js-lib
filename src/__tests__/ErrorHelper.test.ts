import { test, expect } from 'vitest';
import ErrorHelper from '../helpers/ErrorHelper';

test('ErrorHelper.stringifyError test', () => {
    try {
        const error = new Error('testing') as any;
        error.detail = new Error('inner');
        error.detail.detail = 'innerdetail';
        throw error;
    } catch (err) {
        const msg = ErrorHelper.stringifyError(err as Error);
        expect(msg).toContain('"stack":"Error: testing');
        expect(msg).toContain('"stack":"Error: inner');
        expect(msg).toContain('"detail":"innerdetail"');
    }
});
