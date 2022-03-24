import { CatalogueAuthNode, MenuAuthNode } from './types';
import { dailyRecord } from './models/dailyRecord';
export const auths: (CatalogueAuthNode | MenuAuthNode)[] = [dailyRecord];
