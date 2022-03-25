import { defineStore } from 'pinia';
import { getRoles, deleteRole, updateRole, authRole } from '@/api/role/index';
import { Role } from '@/views/role/index';
import { isArrayEquel, isObjectEquel, setValues } from '@/utils';
interface roleState {
  roles: Role[];
}
interface roleMap {
  [k: Role['id']]: Role;
}
export const useRoleStore = defineStore({
  id: 'role',
  state: (): roleState => ({ roles: [] }),
  getters: {
    getRoles(state) {
      return state.roles;
    },
    getRoleMap(state): roleMap {
      return state.roles.reduce((pre, cur) => {
        pre[cur.id] = cur;
        return pre;
      }, {});
    },
  },
  actions: {
    async setRoles() {
      const rulus = await getRoles();
      this.roles.length = 0;
      this.roles.push(...rulus);
    },
    async deleteRole(id) {
      await deleteRole(id);
      await this.setRoles();
    },
    async authRole(id: Role['id'], authIds: Role['authIds']) {
      await authRole(id, authIds);
      const role = this.roles.find((role) => role.id === id);
      if (role) {
        role.authIds = [...authIds];
      }
    },
    async updateRole(role: Role) {
      const storeRole = this.roles.find((_role) => _role.id === role.id);
      if (storeRole) {
        if (!isObjectEquel(role, storeRole, ['code', 'rolename', 'description'])) {
          await updateRole(role);
          setValues(storeRole, role, ['code', 'rolename', 'description']);
        }
        if (!isArrayEquel(role.authIds, storeRole.authIds)) {
          await authRole(role.id, role.authIds);
          storeRole.authIds = [...role.authIds];
        }
      }
    },
  },
});
