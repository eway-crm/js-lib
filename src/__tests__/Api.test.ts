import { ApiConnection } from '../index';
import { IApiResult } from '../IApiResult';

jest.setTimeout(30000);

test('Base Login Test', done => {
    const serviceUrl = 'https://trial.eway-crm.com/31994';
    const username = 'api';
    const passwordHash = '470AE7216203E23E1983EF1851E72947';

    const connection = ApiConnection.create(serviceUrl, username, passwordHash, 'JestTest1', '00:00:00:00:00', 'JestTestMachine', done);
    connection.callMethod(
        'SearchUsers',
        {
            transmitObject: { Username: username }
        },
        (result: (IApiResult & { Data: { Username: string }[] })) => {
            expect(result.Data.length).toBe(1);
            done();
        }
    )
});