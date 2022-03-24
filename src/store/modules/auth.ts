import { defineStore } from 'pinia';
import { getAllAuthTree } from '@/api/auth/index';
import { AuthNodeTree } from '@/auth/types';
interface authState {
  allAuthNodeTree: AuthNodeTree;
}
export const useAuthStore = defineStore({
  id: 'auth',
  state: (): authState => ({ allAuthNodeTree: [] }),
  getters: {
    getAllAuthNodeTree(state) {
      return state.allAuthNodeTree;
    },
  },
  actions: {
    async setAuth() {
      const allAuthNodeTree = await getAllAuthTree();
      this.allAuthNodeTree.push(...allAuthNodeTree);
    },
  },
});
