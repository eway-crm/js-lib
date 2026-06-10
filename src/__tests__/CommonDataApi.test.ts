import { test, expect } from 'vitest';
import { ApiConnection } from '../ApiConnection';
import { CommonDataConnection } from '../tokenizedServices/CommonDataConnection';
import { ITokenizedApiResult } from '../tokenizedServices/ITokenizedApiResult';

test('Base ComonDataApi Test', async () => {
    const serviceUrl = 'https://free.eway-crm.com/31994';

    await new Promise<void>((resolve, reject) => {
        const commonDataConnection = new CommonDataConnection(ApiConnection.createAnonymous(serviceUrl), reject);

        commonDataConnection.isCommonDataApiEnabled(
            (url: string, token: string) => {
                try {
                    expect(url).toBeTruthy();
                    expect(token).toBeTruthy();
                } catch (error) {
                    reject(error);
                    return;
                }

                commonDataConnection.callCommonDataApi('GetAdminFeaturedVideos', {}, (response: ITokenizedApiResult) => {
                    try {
                        expect(response).toBeTruthy();
                        expect(response.ReturnCodeString).toBe('Success');
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
            },
            () => {
                reject(new Error('Common data api should be always enabled.'));
            }
        );
    });
});
