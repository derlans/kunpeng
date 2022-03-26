import { defineStore } from 'pinia';
import { getAllAuthTree } from '@/api/auth/index';
import { AuthNodeTree } from '@/auth/types';
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
  },
});
