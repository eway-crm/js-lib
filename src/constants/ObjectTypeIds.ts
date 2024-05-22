import type { TFolderName } from "./FolderNames";
import { FolderNames } from "./FolderNames";

/**
 * WARNING: Higher ObjectTypeIds are not constant across all environments. Be VERY CAREFUL when adding new ones.
 */

const ObjectTypeIds: Partial<Record<TFolderName, number>> = {
    [FolderNames.relations]: 0,
    [FolderNames.unifiedRelations]: 1,
    [FolderNames.users]: 2,
    [FolderNames.groups]: 3,
    [FolderNames.enumTypes]: 4,
    [FolderNames.enumValues]: 5,
    [FolderNames.additionalFields]: 6,
};

export default ObjectTypeIds;