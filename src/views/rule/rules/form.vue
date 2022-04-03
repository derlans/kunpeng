<template>
  <div>
    <n-card class="pl-40 pr-40">
      <h2 class="text-xl text-center font-bold">{{ currentMode.descriptions }}</h2>
      <n-form :disabled="disabled">
        <n-form-item label="规则名" path="ruleName">
          <n-input v-model:value="form.ruleName" />
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input v-model:value="form.description" />
        </n-form-item>
        <n-form-item
          label="创建时间"
          path="createTime"
          v-if="currentMode.value === RuleFormMode.UPDATE_RULE"
        >
          <n-date-picker v-model:value="form.createTime" type="datetime" :disabled="true" />
        </n-form-item>
        <n-form-item
          label="更新时间"
          path="updateTime"
          v-if="currentMode.value === RuleFormMode.UPDATE_RULE"
        >
          <n-date-picker v-model:value="form.updateTime" type="datetime" :disabled="true" />
        </n-form-item>
        <n-form-item label="代码" path="code">
          <div class="h-96 w-full">
            <code-editor v-model:code="form.code" ref="javaCodeEditor" :disabled="disabled" />
          </div>
        </n-form-item>
        <div class="justify-center flex">
          <n-button
            type="info"
            v-if="currentMode.value === RuleFormMode.CREATE_NEW_RULE"
            class="w-40"
            @click="modes[0].event.craeteNewRule"
          >
            创建
          </n-button>
          <n-button
            type="success"
            v-else-if="currentMode.value === RuleFormMode.UPDATE_RULE"
            class="w-40"
            @click="modes[1].event.updateRule"
          >
            修改
          </n-button>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useMessage } from 'naive-ui';
  import { useRoute } from 'vue-router';
  import { getRuleList, updateRule } from '@/api/rule';
  import { RuleFormMode, DEFAUTT_JAVA_CODE, RuleFormModeValues, rule } from './index';
  import codeEditor from '@/components/codeEditor/index.vue';
  const route = useRoute();
  const message = useMessage();
  const javaCodeEditor = ref(null);
  const disabled = ref(false);

  // 表格默认数据
  function getDefaultForm(): rule {
    const now = new Date().getTime();
    return {
      createTime: now,
      updateTime: now,
      ruleName: '',
      description: '',
      code: DEFAUTT_JAVA_CODE,
    } as rule;
  }
  const form = ref(getDefaultForm());
  // 不同的模式下的业务
  const modes = [
    {
      value: RuleFormMode.CREATE_NEW_RULE,
      descriptions: '创建新规则',
      meta: {},
      trigger() {
        form.value = getDefaultForm();
      },
      event: {
        async craeteNewRule() {
          await updateRule(form.value);
          message.success('创建成功');
        },
      },
    },
    {
      value: RuleFormMode.UPDATE_RULE,
      descriptions: '修改规则',
      async trigger() {
        const { id } = route.query;
        if (!id) {
          message.error('没有找到该规则');
          return;
        }
        const rules = await getRuleList();
        const currentRule = rules.find((rule) => rule.id === id);
        if (currentRule) {
          currentRule.createTime = new Date(currentRule.createTime).getTime();
          currentRule.updateTime = new Date(currentRule.updateTime).getTime();
          form.value = currentRule;
          return;
        }
        message.error('没有找到该规则');
      },
      event: {
        async updateRule() {
          await updateRule(form.value);
          message.success('更新成功');
        },
      },
    },
    {
      value: RuleFormMode.LOOK_RULE,
      descriptions: '查看规则',
      async trigger() {
        disabled.value = true;
        await getMode(RuleFormMode.UPDATE_RULE)?.trigger();
      },
    },
  ] as const;
  function getMode(modeValue: RuleFormModeValues) {
    return modes.find((v) => v.value === modeValue);
  }
  const _currentModeValue = ref(RuleFormMode.CREATE_NEW_RULE);
  const currentModeValue = computed({
    get: () => _currentModeValue.value,
    set: (v) => {
      const mode = modes.find((mode) => mode.value === v);
      if (mode) {
        _currentModeValue.value = v;
        mode.trigger();
        return;
      }
    },
  });

  const currentMode = computed(
    () =>
      modes.find((mode) => mode.value === currentModeValue.value) ||
      modes.find((mode) => mode.value === RuleFormMode.CREATE_NEW_RULE) ||
      modes[0]
  );
  const { modeValue } = route.query;
  if (modeValue) {
    currentModeValue.value = modeValue as RuleFormMode;
  }
</script>

<style scoped>
  :deep(.n-form-item-label) {
    font-size: medium;
  }
</style>
