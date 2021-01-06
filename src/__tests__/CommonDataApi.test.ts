import { ApiConnection } from '../ApiConnection';
import { CommonDataConnection } from '../tokenizedServices/CommonDataConnection';
import 'jest';

jest.setTimeout(30000);

test('Base ComonDataApi Test', (done) => {

    const serviceUrl = 'https://trial.eway-crm.com/31994';

    const commonDataConnection = new CommonDataConnection(
        ApiConnection.createAnonymous(serviceUrl)
    );

    commonDataConnection.isEnabled(
        (url: string, token: string) => {
            expect(url).toBeTruthy();
            expect(token).toBeTruthy();
            done();
        },
        () => {
            throw new Error('Common data api should be always enabled.');
        }
    );
});
