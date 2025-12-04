import * as base64url from 'universal-base64url';
import { FolderNames, type TFolderName } from '../constants/FolderNames';

export type TItemInfo = Partial<{ [key in TFolderName]: string[] }>;

export class OpenItemLinkHelper {
    private static readonly openItemLinkRegEx = /https:\/\/open\.eway-crm\.(dev|com)\/\?[-a-zA-Z0-9()@:%_\+.~#?&\/=]*/gi;
    static readonly itemParamName = 'l';
    static readonly openLinkDomainLength = 7;
    static readonly getOpenLinkDomain = (isDevEnvironment: boolean) => isDevEnvironment ? 'open.eway-crm.dev' : 'open.eway-crm.com';

    static readonly isOpenItemLinkInText = (text: string) => OpenItemLinkHelper.openItemLinkRegEx.test(text);

    static readonly getOpenLinksFromString = (text: string) => text.match(OpenItemLinkHelper.openItemLinkRegEx);

    static readonly getItemLinksFromOpenLinks = (openLinks: RegExpMatchArray) => {
        try {
            return openLinks.map(ol => {
                const itemurl = new URL(ol);
                const itemLink = itemurl.searchParams.get(OpenItemLinkHelper.itemParamName);
                return itemLink;
            });
        } catch (e) {
            console.error('Invalid string passed for cretaing url while getting links from open links');
        }
    };

    static readonly getItemInfoFromLink = (link: string) => {
        const decodedItemUrl: string[] = base64url.decode(link).substring(OpenItemLinkHelper.openLinkDomainLength).split('/');
        const isValidFolderName = Object.keys(FolderNames).some(f => FolderNames[f as keyof typeof FolderNames] === decodedItemUrl[0]);
        if (isValidFolderName && decodedItemUrl[1]) {
            const folderName = decodedItemUrl[0] as TFolderName;
            return { folderName, itemGuid: decodedItemUrl[1] };
        }
    };

    static readonly getAllItemsFromTextWithLinks = (text: string) => {
        const result: TItemInfo = {};
        if (OpenItemLinkHelper.isOpenItemLinkInText(text)) {
            const matches = OpenItemLinkHelper.getOpenLinksFromString(text);
            if (!matches) return;
            const itemLinks = OpenItemLinkHelper.getItemLinksFromOpenLinks(matches);
            itemLinks?.forEach(link => {
                if (!link) {
                    return;
                }
                const itemInfo = OpenItemLinkHelper.getItemInfoFromLink(link);
                if (itemInfo) {
                    result[itemInfo.folderName] = !!result[itemInfo.folderName] ? [...result[itemInfo.folderName] ?? [], itemInfo.itemGuid] : [itemInfo.itemGuid];
                }
            });
        }
        return result;
    };
}