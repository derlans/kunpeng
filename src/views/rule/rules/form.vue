<template>
  <div>
    <n-card class="pl-40 pr-40">
      <h2 class="text-xl text-center font-bold">{{ currentMode.descriptions }}</h2>
      <n-form>
        <n-form-item label="规则名" path="ruleName">
          <n-input v-model:value="formValue.ruleName" />
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input v-model:value="formValue.description" />
        </n-form-item>

        <n-form-item
          label="创建时间"
          path="createTime"
          v-if="currentMode.value === RuleFormMode.UPDATE_RULE"
        >
          <n-date-picker v-model:value="formValue.createTime" type="datetime" :disabled="true" />
        </n-form-item>
        <n-form-item
          label="更新时间"
          path="updateTime"
          v-if="currentMode.value === RuleFormMode.UPDATE_RULE"
        >
          <n-date-picker v-model:value="formValue.updateTime" type="datetime" :disabled="true" />
        </n-form-item>
        <n-form-item label="乐观锁" path="version">
          <n-input-number v-model:value="formValue.version" />
        </n-form-item>
        <n-form-item label="规则优先级" path="priority">
          <n-input-number v-model:value="formValue.priority" />
        </n-form-item>
        <n-form-item label="是否删除" path="isDeleted">
          <n-switch v-model:value="formValue.isDeleted" :checked-value="1" :unchecked-value="0" />
        </n-form-item>
        <n-form-item label="代码" path="code">
          <div ref="codeRef" class="w-full h-96"></div>
        </n-form-item>
        <div class="justify-center flex">
          <n-button
            type="info"
            v-if="currentMode.value === RuleFormMode.CREATE_NEW_RULE"
            class="w-40"
          >
            创建
          </n-button>
          <n-button
            type="success"
            v-else-if="currentMode.value === RuleFormMode.UPDATE_RULE"
            class="w-40"
          >
            修改
          </n-button>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
  import * as monaco from 'monaco-editor';
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getRuleList } from '@/api/rule';
  import { RuleFormMode, DEFAUTT_JAVA_CODE } from './index';
  const rounte = useRoute();
  // 获取所有规则
  const rules: any[] = [];
  async function setRules() {
    const res = await getRuleList();
    // @ts-ignore
    res.forEach((rule) => {
      rule.createTime = new Date(rule.createTime).getTime();
      rule.updateTime = new Date(rule.updateTime).getTime();
    });
    rules.push(...res);
  }
  // 定义表格
  const codeRef = ref();
  const now = new Date().getTime();
  const formValue = reactive({
    createTime: now,
    updateTime: now,
    ruleName: '',
    description: '',
    version: 0,
    priority: 0,
    isDeleted: 0,
    code: DEFAUTT_JAVA_CODE,
  });
  let editor: monaco.editor.IStandaloneCodeEditor;
  onMounted(() => {
    editor = monaco.editor.create(codeRef.value, {
      value: DEFAUTT_JAVA_CODE,
      language: 'java',
      theme: 'vs-dark',
      selectOnLineNumbers: true,
    });
    editor.onDidChangeModelContent(() => {
      const currenValue = editor?.getValue();
      formValue.code = currenValue;
    });
  });
  // 不同的模式下的业务
  const modes = [
    {
      value: RuleFormMode.CREATE_NEW_RULE,
      descriptions: '创建新规则',
    },
    {
      value: RuleFormMode.UPDATE_RULE,
      descriptions: '修改规则',
    },
  ];
  let { modeValue, id } = rounte.query;
  // 类型转化
  if (id) {
    (id as any as number) = parseFloat(id as string);
  }
  const currentMode = modes.find((mode) => mode.value === modeValue) || modes[0];
  if (currentMode.value === RuleFormMode.UPDATE_RULE) {
    setRules().then(() => {
      const currentRule = rules.find((rule) => rule.id === id) || {};
      for (const key in currentRule) {
        formValue[key] = currentRule[key];
      }
      editor.setValue(currentRule.code);
    });
  } else if (currentMode.value === RuleFormMode.CREATE_NEW_RULE) {
  }
</script>

<style scoped>
  :deep .n-form-item-label {
    font-size: medium;
  }
</style>
