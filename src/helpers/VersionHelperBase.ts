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

        return compare(wcfVersion, version, ">=") || compare(wcfVersion, "1.0.0.0", "=" );
    };
}