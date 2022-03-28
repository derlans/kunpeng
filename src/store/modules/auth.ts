import { defineStore } from 'pinia';
import { getAllAuthTree, createAuth, updateAuth, deleteAuth } from '@/api/auth/index';
import { AuthNodeTree, AuthNode } from '@/auth/types';
interface AuthState {
  allAuthNodeTree: AuthNodeTree;
}
export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({ allAuthNodeTree: [] }),
  getters: {
    getAllAuthNodeTree(state) {
      return state.allAuthNodeTree;
    },
  },
  actions: {
    async setAuth() {
      const allAuthNodeTree = await getAllAuthTree();
      this.allAuthNodeTree.length = 0;
      this.allAuthNodeTree.push(...allAuthNodeTree);
      return allAuthNodeTree;
    },
    async createAuth(authNode: AuthNode) {
      try {
        await createAuth(authNode);
        await this.setAuth();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateAuth(authNode: AuthNode) {
      try {
        await updateAuth(authNode);
        await this.setAuth();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteAuth(id) {
      try {
        await deleteAuth(id);
        await this.setAuth();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
