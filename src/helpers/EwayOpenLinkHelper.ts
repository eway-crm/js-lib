import * as base64url from 'universal-base64url';
import { FolderNames, type TFolderName } from '../constants/FolderNames';

export type TItemInfo = Partial<{ [key in TFolderName]: string[] }>;

export class EwayOpenLinkHelper {
    private static readonly openEwayLinkRegEx = /https:\/\/open\.eway-crm\.(dev|com)\/\?[-a-zA-Z0-9()@:%_\+.~#?&\/=]*/gi;
    static readonly ewayItemLinkParamName = 'l';
    static readonly ewayLinkDomainLength = 7;
    static readonly getEwayOpenDomain = (isDevEnvironment: boolean) => isDevEnvironment ? 'open.eway-crm.dev' : 'open.eway-crm.com';

    static readonly isEwayOpenLinkInString = (text: string) => EwayOpenLinkHelper.openEwayLinkRegEx.test(text);

    static readonly getOpenLinksFromString = (text: string) => text.match(EwayOpenLinkHelper.openEwayLinkRegEx);

    static readonly getItemLinksFromOpenLinks = (openLinks: RegExpMatchArray) => {
        try {
            return openLinks.map(ol => {
                const itemurl = new URL(ol);
                const itemLink = itemurl.searchParams.get(EwayOpenLinkHelper.ewayItemLinkParamName);
                return itemLink;
            });
        } catch (e) {
            console.error('Invalid string passed for cretaing url while getting links from open links');
        }
    };

    static readonly getItemInfoFromLink = (link: string) => {
        const decodedItemUrl: string[] = base64url.decode(link).substring(EwayOpenLinkHelper.ewayLinkDomainLength).split('/');
        const isValidFolderName = Object.keys(FolderNames).some(f => FolderNames[f as keyof typeof FolderNames] === decodedItemUrl[0]);
        if (isValidFolderName && decodedItemUrl[1]) {
            const folderName = decodedItemUrl[0] as TFolderName;
            return { folderName, itemGuid: decodedItemUrl[1] };
        }
    };

    static readonly getAllItemsFromTextWithLinks = (text: string) => {
        const result: TItemInfo = {};
        if (EwayOpenLinkHelper.isEwayOpenLinkInString(text)) {
            const matches = EwayOpenLinkHelper.getOpenLinksFromString(text);
            if (!matches) return;
            const itemLinks = EwayOpenLinkHelper.getItemLinksFromOpenLinks(matches);
            itemLinks?.forEach(link => {
                if (!link) {
                    return;
                }
                const itemInfo = EwayOpenLinkHelper.getItemInfoFromLink(link);
                if (itemInfo) {
                    result[itemInfo.folderName] = !!result[itemInfo.folderName] ? [...result[itemInfo.folderName] ?? [], itemInfo.itemGuid] : [itemInfo.itemGuid];
                }
            });
        }
        return result;
    };
}