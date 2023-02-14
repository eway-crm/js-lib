import { compare, CompareOperator } from "compare-versions";
import { ApiConnection } from "../ApiConnection";

export default class VersionHelperBase {
    protected static readonly getIsDebug = (connection?: ApiConnection | null) => {
        return !!connection?.sessionHandler.lastSuccessfulLoginResponse?.Debug;
    };

    protected static readonly compare = (connection: ApiConnection, version: string, operator: CompareOperator) => {
        const wcfVersion = connection.sessionHandler.lastSuccessfulLoginResponse?.WcfVersion;
        if (!wcfVersion) {
            return false;
        }

        return compare(wcfVersion, version, operator) || compare(wcfVersion, "1", "=" );
    };
}