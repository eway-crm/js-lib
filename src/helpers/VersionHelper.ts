import type { ApiConnection } from "../ApiConnection";
import VersionHelperBase from "./VersionHelperBase";

export enum Version {
    Version75 = '7.5',
    Version76 = '7.6',
    Version77 = '7.7',
    Version81 = '8.1',
    Version82 = '8.2',
    Version83 = '8.3',
    Version84 = '8.4',
}

export default class VersionHelper extends VersionHelperBase {
    static readonly is75OrLater = (connection: ApiConnection) => {
        return VersionHelperBase.supportsFeaturesOf(connection, "7.5");
    };

    static readonly is76OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, "7.6");
    };

    static readonly is77OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, "7.7");
    };

    static readonly is81OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, "8.1");
    };

    static readonly isFeatureSupported = (connection: ApiConnection, featureOfVersion: Version) => {
        return VersionHelper.supportsFeaturesOf(connection, featureOfVersion);
    };
}