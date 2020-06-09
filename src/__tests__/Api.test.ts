import { ApiConnection } from '../ApiConnection';
import { IApiResult } from '../IApiResult';
import 'jest';

jest.setTimeout(30000);

test('Base Login Test', (done) => {
    const serviceUrl = 'https://trial.eway-crm.com/31994';
    const username = 'api';
    const passwordHash = '470AE7216203E23E1983EF1851E72947';

    const connection = ApiConnection.create(serviceUrl, username, passwordHash, 'JestTest1', '00:00:00:00:00', 'JestTestMachine', done);
    connection.callMethod(
        'SearchUsers',
        {
            transmitObject: { Username: username },
        },
        (result: IApiResult & { Data: { Username: string }[] }) => {
            expect(result.Data.length).toBe(1);
            expect(result.Data[0].Username).toBe(username);
            done();
        }
    );
});

test('Preview url test', (done) => {
    const serviceUrl = 'https://trial.eway-crm.com/31994';
    const username = 'api';
    const passwordHash = '470AE7216203E23E1983EF1851E72947';

    const connection = ApiConnection.create(serviceUrl, username, passwordHash, 'JestTest1', '00:00:00:00:00', 'JestTestMachine', done);
    expect(connection.getItemPreviewGetMethodUrl('Users', 'EDB8F11C-C759-4DB9-9927-3AAA4B342083')).toBe('https://trial.eway-crm.com/31994/API.svc/GetItemPreview?folderName=Users&itemGuid=EDB8F11C-C759-4DB9-9927-3AAA4B342083');
    expect(connection.getItemPreviewGetMethodUrl('Users', 'EDB8F11C-C759-4DB9-9927-3AAA4B342083', 3)).toBe('https://trial.eway-crm.com/31994/API.svc/GetItemPreview?folderName=Users&itemGuid=EDB8F11C-C759-4DB9-9927-3AAA4B342083&itemVersion=3');

    done();
});
