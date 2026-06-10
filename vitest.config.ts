import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['src/__tests__/**/*.test.ts'],
        environment: 'node',
        // The Api and CommonDataApi suites call the live free.eway-crm.com service.
        testTimeout: 30000,
    },
});
