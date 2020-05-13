![eWay-CRM Logo](https://www.eway-crm.com/wp-content/themes/eway/img/email/logo_grey.png)
# eWay-CRM API
API used for communication with [eWay-CRM](http://www.eway-crm.com/) web service. This library is a wrapper over HTTP/S communication and sessions. See our [documentation](https://kb.eway-crm.com/documentation/6-add-ins/6-7-api-1) for more information.

## Installation
The simpliest way to start using this library is to get the  [NPM Package](https://www.nuget.org/packages/eWayCRM.API). To do that, just run this command in your NodeJS project's root dir:

```
npm i @eway-crm/connector
```

To get the best dev experience, we also recommend using [TypeScript](https://www.typescriptlang.org/) since this library contains the types headers.

## Usage

This library wraps the communication with JSON API. For HTTP requests, it uses [Axios](https://github.com/axios/axios). To provide the most variability, it lets you input JSON data and fetch JSON data in the same structure as the server uses. The only thing you don't have to care about is the `sessionId`.

The actual usage is then the same as it would be for example with  [PHP](https://github.com/rstefko/eway-crm-php-lib). See the  [documentation](https://kb.eway-crm.com/documentation/6-add-ins/6-7-api-1)  for more.

## Version Compatibility

This library is compatible with **eWay-CRM 6.0.1 and higher**. If you have got a lower version of your eWay-CRM, check the Updates section in the eWay-CRM Administration Application. If there is no update available, contact your eWay-CRM account manager or via other channel listed on our [web page](https://www.eway-crm.com/contact/).

## Establishing Connection

To communicate with eWay-CRM web service, we first have to establish connection. This must be done prior to every action we want to accomplish with use of the web service. To do that, we have to  create new instance of ```ApiConnection``` with seven parameters:
1. Service url address (same as the one you use in Outlook)
2. Username
3. Password hash (md5 of the user's UTF8 password or hash created by the tool from eWay-CRM server component)
4. App version identifier (name and version of the connecting client app - must consist of alphabet string and digits at the end)
5. Client machine identifier (unique identifier of the connecting machine - MAC address for instance)
6. Client machine name (human readable client machine - PC name for instance)
7. Error handling callback (this callback is called everytime an unexpected error occurs)

```JS
import ApiConnection from '@eway-crm/connector';

const serviceUrl = 'https://trial.eway-crm.com/31994';
const username = 'api';
const passwordHash = '470AE7216203E23E1983EF1851E72947';

const connection = ApiConnection.create(serviceUrl, username, passwordHash, 'JSSample1', '00:00:00:00:00', 'SampleTestMachine', (err) => console.error(err));
```

## CORS

If you are developing a web app running on a different host than your eWay-CRM web service, you need to configure your eWay-CRM web service to allow cross-origin requests. To achieve that, put the following setting into `appSettings` section of your web service's web.config file.

```XML
<add key="AccessControlAllowOrigin" value="https://YOUR-ORIGIN:PORT" />
```

## Using the Connection Object

Once having the `ApiConnection` instance, the API requests look like this searching of our user record.

```JS
connection.callMethod(
    'SearchUsers',
    {
        transmitObject: { Username: username },
    },
    (result) => {
        console.log('My user detail follows:');
        console.log(result.Data[0]);
    }
);
```