import type { IApiCompany, IApiContact, IApiLead, TFolderName } from "..";
import { FolderNames } from "../constants/FolderNames";
import type { IItemPreview } from "../interfaces/IItemPreview";
import type { IApiItemBase } from "./IApiItemBase";
import type { IApiUser } from "./IApiUser";

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

    getInitials(): string | null {
        switch (this.folderName) {
            case FolderNames.contacts:
                {
                    const contact = this.baseItem as unknown as IApiContact;
                    return this.getInitialsInternal(contact.FirstName, contact.LastName);
                }

            case FolderNames.users:
                {
                    const user = this.baseItem as unknown as IApiUser;
                    return this.getInitialsInternal(user.FirstName, user.LastName);
                }

            default:
                return null;
        }
    }

    private getInitialsInternal(firstName: string | null, lastName: string | null): string | null {
        const initials = (firstName?.substr(0, 1) || '') + (lastName?.substr(0, 1) || '');
        if (initials == '')
            return null;

        return initials;
    }

    getItemPreview(): IItemPreview | null {
        switch (this.folderName) {
            case FolderNames.contacts:
                {
                    const contact = this.baseItem as unknown as IApiContact;
                    if (!contact.ProfilePicture)
                        return null;

                    return {
                        imageData: contact.ProfilePicture,
                        width: contact.ProfilePictureWidth || 0,
                        height: contact.ProfilePictureHeight || 0
                    };
                }

            case FolderNames.users:
                {
                    const user = this.baseItem as unknown as IApiUser;
                    if (!user.ProfilePicture)
                        return null;

                    return {
                        imageData: user.ProfilePicture,
                        width: user.ProfilePictureWidth || 0,
                        height: user.ProfilePictureHeight || 0
                    };
                }

            default:
                return null;
        }
    }
}