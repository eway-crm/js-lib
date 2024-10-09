import { compare } from "compare-versions";
import type { ApiConnection } from "../ApiConnection";

export default class VersionHelperBase {
    protected static readonly getIsDebug = (connection?: ApiConnection | null) => {
        return !!connection?.sessionHandler.lastSuccessfulLoginResponse?.Debug;
    };

    protected static readonly supportsFeaturesOf = (connection: ApiConnection, version: string) => {
        const wcfVersion = connection.sessionHandler.lastSuccessfulLoginResponse?.WcfVersion;
        if (!wcfVersion) {
            return false;
        }

        return VersionHelperBase.supportsVersionFeaturesOf(wcfVersion, version);
    };

    static readonly supportsVersionFeaturesOf = (testedVersion: string, version: string) => {
        return compare(testedVersion, version, ">=") || compare(testedVersion, "1.0.0.0", "=");
    };
}