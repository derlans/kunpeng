import { defineStore } from 'pinia';
import { rule } from '@/views/rule/rules/index';
import { getRuleList } from '@/api/rule';
export interface rulesState {
  rules: rule[];
}
export const useRulesStore = defineStore({
  id: 'rules',
  state: (): rulesState => ({ rules: [] }),
  getters: {},
  actions: {
    async setRules() {
      const rules = await getRuleList();
      this.rules = rules;
    },
  },
});
