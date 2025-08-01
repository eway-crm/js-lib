import type { ApiConnection } from "../ApiConnection";
import VersionHelperBase from "./VersionHelperBase";

export enum Version {
    Version75 = '7.5',
    Version76 = '7.6',
    Version77 = '7.7',
    Version80 = '8.0',
    Version81 = '8.1',
    Version82 = '8.2',
    Version83 = '8.3',
    Version90 = '9.0',
    Version91 = '9.1',
    Version92 = '9.2',
    Version93 = '9.3',
    Version94 = '9.4'
}

export default class VersionHelper extends VersionHelperBase {
    static readonly is75OrLater = (connection: ApiConnection) => {
        return VersionHelperBase.supportsFeaturesOf(connection, Version.Version75);
    };

    static readonly is76OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, Version.Version76);
    };

    static readonly is77OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, Version.Version77);
    };

    static readonly is80OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, Version.Version80);
    };

    static readonly is81OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, Version.Version81);
    };

    static readonly is82OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, Version.Version82);
    };

    static readonly is83OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, Version.Version83);
    };

    static readonly is90OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, Version.Version90);
    };

    static readonly is91OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, Version.Version91);
    };

    static readonly is92OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, Version.Version92);
    };

    static readonly is93OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, Version.Version93);
    };

    static readonly is94OrLater = (connection: ApiConnection) => {
        return VersionHelper.supportsFeaturesOf(connection, Version.Version94);
    };

    static readonly isFeatureSupported = (connection: ApiConnection, featureOfVersion: Version) => {
        return VersionHelper.supportsFeaturesOf(connection, featureOfVersion);
    };
}