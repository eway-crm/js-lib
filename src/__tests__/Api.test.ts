import { test, expect } from 'vitest';
import { ApiConnection } from '../ApiConnection';
import { IApiResult } from '../data/IApiResult';
import { FolderNames } from '..';

const serviceUrl = 'https://free.eway-crm.com/31994';
const username = 'api';
const passwordHash = '470AE7216203E23E1983EF1851E72947';

test('Base Login Test', async () => {
    await new Promise<void>((resolve, reject) => {
        const connection = ApiConnection.create(serviceUrl, username, passwordHash, 'JestTest1', '00:00:00:00:00', 'JestTestMachine', reject);
        connection.callMethod(
            'SearchUsers',
            {
                transmitObject: { Username: username },
            },
            (result: IApiResult & { Data: { Username: string }[] }) => {
                try {
                    expect(result.Data.length).toBe(1);
                    expect(result.Data[0].Username).toBe(username);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
});

test('Base Promise Login Test', async () => {
    const connection = ApiConnection.create(serviceUrl, username, passwordHash, 'JestTest1', '00:00:00:00:00', 'JestTestMachine', (error) => {
        throw error;
    });
    const result = await connection.askMethod<IApiResult & { Data: { Username: string }[] }>('SearchUsers', {
        transmitObject: { Username: username },
    });

    expect(result.Data.length).toBe(1);
    expect(result.Data[0].Username).toBe(username);
});

test('Preview url test', () => {
    const connection = ApiConnection.create(serviceUrl, username, passwordHash, 'JestTest1', '00:00:00:00:00', 'JestTestMachine', (error) => {
        throw error;
    });
    expect(connection.getItemPreviewGetMethodUrl('Users', 'EDB8F11C-C759-4DB9-9927-3AAA4B342083')).toBe(
        'https://free.eway-crm.com/31994/API.svc/GetItemPreview?folderName=Users&itemGuid=EDB8F11C-C759-4DB9-9927-3AAA4B342083'
    );
    expect(connection.getItemPreviewGetMethodUrl('Users', 'EDB8F11C-C759-4DB9-9927-3AAA4B342083', 3)).toBe(
        'https://free.eway-crm.com/31994/API.svc/GetItemPreview?folderName=Users&itemGuid=EDB8F11C-C759-4DB9-9927-3AAA4B342083&itemVersion=3'
    );
});

test('Create open link test', () => {
    const connection = ApiConnection.create(serviceUrl, username, passwordHash, 'JestTest1', '00:00:00:00:00', 'JestTestMachine', (error) => {
        throw error;
    });
    expect(connection.createOpenLink(false, FolderNames.users, 'EDB8F11C-C759-4DB9-9927-3AAA4B342083', 'JestTest1')).toBe(
        'https://open.eway-crm.com/?ws=aHR0cHM6Ly9mcmVlLmV3YXktY3JtLmNvbS8zMTk5NA&l=ZXdheTovL1VzZXJzL2VkYjhmMTFjLWM3NTktNGRiOS05OTI3LTNhYWE0YjM0MjA4Mw&n=JestTest1'
    );
    expect(connection.createOpenLink(false, FolderNames.users)).toBe(
        'https://open.eway-crm.com/?ws=aHR0cHM6Ly9mcmVlLmV3YXktY3JtLmNvbS8zMTk5NA&l=ZXdheTovL1VzZXJz'
    );
});
