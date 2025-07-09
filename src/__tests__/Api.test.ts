import { ApiConnection } from '../ApiConnection';
import { IApiResult } from '../data/IApiResult';
import 'jest';
import { FolderNames } from '..';

jest.setTimeout(30000);

test('Base Login Test', (done) => {
    const serviceUrl = 'https://free.eway-crm.com/31994';
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

test('Base Promise Login Test', (done) => {
    const serviceUrl = 'https://free.eway-crm.com/31994';
    const username = 'api';
    const passwordHash = '470AE7216203E23E1983EF1851E72947';

    const connection = ApiConnection.create(serviceUrl, username, passwordHash, 'JestTest1', '00:00:00:00:00', 'JestTestMachine', done);
    connection
        .askMethod<IApiResult & { Data: { Username: string }[] }>('SearchUsers', {
            transmitObject: { Username: username },
        })
        .then((result) => {
            expect(result.Data.length).toBe(1);
            expect(result.Data[0].Username).toBe(username);
            done();
        })
        .catch(done);
});

test('Preview url test', (done) => {
    const serviceUrl = 'https://free.eway-crm.com/31994';
    const username = 'api';
    const passwordHash = '470AE7216203E23E1983EF1851E72947';

    const connection = ApiConnection.create(serviceUrl, username, passwordHash, 'JestTest1', '00:00:00:00:00', 'JestTestMachine', done);
    expect(connection.getItemPreviewGetMethodUrl('Users', 'EDB8F11C-C759-4DB9-9927-3AAA4B342083')).toBe(
        'https://free.eway-crm.com/31994/API.svc/GetItemPreview?folderName=Users&itemGuid=EDB8F11C-C759-4DB9-9927-3AAA4B342083'
    );
    expect(connection.getItemPreviewGetMethodUrl('Users', 'EDB8F11C-C759-4DB9-9927-3AAA4B342083', 3)).toBe(
        'https://free.eway-crm.com/31994/API.svc/GetItemPreview?folderName=Users&itemGuid=EDB8F11C-C759-4DB9-9927-3AAA4B342083&itemVersion=3'
    );

    done();
});

test('Create open link test', (done) => {
    const serviceUrl = 'https://free.eway-crm.com/31994';
    const username = 'api';
    const passwordHash = '470AE7216203E23E1983EF1851E72947';

    const connection = ApiConnection.create(serviceUrl, username, passwordHash, 'JestTest1', '00:00:00:00:00', 'JestTestMachine', done);
    expect(connection.createOpenLink(false, FolderNames.users, 'EDB8F11C-C759-4DB9-9927-3AAA4B342083', 'JestTest1')).toBe(
        'https://open.eway-crm.com/?ws=aHR0cHM6Ly90cmlhbC5ld2F5LWNybS5jb20vMzE5OTQ&l=ZXdheTovL1VzZXJzL2VkYjhmMTFjLWM3NTktNGRiOS05OTI3LTNhYWE0YjM0MjA4Mw&n=JestTest1'
    );
    expect(connection.createOpenLink(false, FolderNames.users)).toBe(
        'https://open.eway-crm.com/?ws=aHR0cHM6Ly90cmlhbC5ld2F5LWNybS5jb20vMzE5OTQ&l=ZXdheTovL1VzZXJz'
    );

    done();
});