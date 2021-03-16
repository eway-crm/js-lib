import { FolderNames, IApiCompany, IApiContact, IApiLead, TFolderName } from "..";
import { IApiItemBase } from "./IApiItemBase";
import { IApiUser } from "./IApiUser";

export class EWItem<T extends IApiItemBase> {
    readonly folderName: TFolderName;
    readonly baseItem: T;

    constructor(folderName: TFolderName, baseItem: T) {
        if (!folderName || !baseItem) {
            throw new Error('Both folderName and baseItem has to be defined!');
        }

        this.folderName = folderName;
        this.baseItem = baseItem;
    }

    getEmailAddress(): string | null {
        switch (this.folderName) {
            case FolderNames.contacts:
                {
                    const contact = this.baseItem as unknown as IApiContact;
                    return contact.Email1Address || contact.Email2Address || contact.Email3Address;
                }

            case FolderNames.leads:
                {
                    const lead = this.baseItem as unknown as IApiLead;
                    return lead.Email;
                }

            case FolderNames.companies:
                {
                    const company = this.baseItem as unknown as IApiCompany;
                    return company.Email;
                }

            case FolderNames.users:
                {
                    const user = this.baseItem as unknown as IApiUser;
                    return user.Email1Address || user.Email2Address;
                }

            default:
                return null;
        }
    }
}