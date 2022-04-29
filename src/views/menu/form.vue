<template>
  <n-form
    label-placement="left"
    :model="form"
    label-width="auto"
    :disabled="currentMode.value === 2"
  >
    <n-form-item path="type" label="节点类型">
      <n-radio-group v-model:value="form.type" name="类型" :disabled="currentMode.value !== 0">
        <n-radio v-for="authtype in authFormtypes" :key="authtype.value" :value="authtype.value">
          {{ authtype.label }}
        </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item path="perms" label="授权标识">
      <n-input v-model:value="form.perms" />
    </n-form-item>
    <n-form-item path="name" label="名称">
      <n-input v-model:value="form.name" />
    </n-form-item>
    <n-form-item path="path" label="路由" v-if="[0, 1].includes(form.type)">
      <n-input v-model:value="form.path" />
    </n-form-item>
    <n-form-item path="parentId" label="上级菜单">
      <n-tree-select
        :options="authNodeTree"
        @update:value="handleUpdateValue"
        :default-value="parentNode?.id"
        label-field="name"
        key-field="id"
        :key="treeSelectKey"
      />
    </n-form-item>
    <n-form-item path="name" label="排序号">
      <n-input-number v-model:value="form.orderId" class="w-full" />
    </n-form-item>
    <n-form-item path="icon" label="图标">
      <icon-input v-model="form.icon" />
    </n-form-item>
    <div class="flex justify-end">
      <n-button type="success" v-if="currentMode.value === 0" @click="createAuth">创建</n-button>
      <n-button type="success" v-else-if="currentMode.value === 1" @click="updateAuth"
        >更新</n-button
      >
    </div>
  </n-form>
</template>

<script setup lang="ts">
  import { AuthNode } from '@/auth/types';
  import { computed, reactive, ref, watch } from 'vue';
  import { useAuthStore } from '@/store/modules/auth';
  import IconInput from '@/components/IconInput/index.vue';
  import { dfs } from '@/utils/search';
  const authStore = useAuthStore();
  const authNodeTree = authStore.allAuthNodeTree;
  // 三种类型
  const authFormtypes = [
    {
      value: 0,
      label: '目录',
    },
    {
      value: 1,
      label: '菜单',
    },
    {
      value: 2,
      label: '操作',
    },
  ];
  // 表单数据
  const Props = defineProps<{
    modelValue: AuthNode;
    mode: number;
  }>();
  const Emits = defineEmits<{
    (e: 'close'): void;
  }>();
  const form = reactive(Props.modelValue);
  function handleUpdateValue(v) {
    form.parentId = v;
  }
  // 不同模式下的业务
  const modes = [
    {
      value: 0,
      name: '创建',
    },
    {
      value: 1,
      name: '修改',
    },
    {
      value: 2,
      name: '查看',
    },
  ];
  const currentMode = computed(() => modes.find((mode) => mode.value === Props.mode) || modes[0]);
  const parentNode = ref(dfs(authNodeTree, form.parentId, 'id', 'children'));
  const treeSelectKey = ref(0);
  watch(
    () => form.parentId,
    () => {
      parentNode.value = dfs(authNodeTree, form.parentId, 'id', 'children');
      treeSelectKey.value++;
    }
  );
  watch(
    () => form.type,
    (v) => {
      if (v === 0) form.parentId = '-1';
    },
    {
      immediate: true,
    }
  );
  async function createAuth() {
    await authStore
      .createAuth({ ...form })
      .then(() => {
        window['$message'].success('成功');
        Emits('close');
      })
      .catch(() => window['$message'].error('失败'));
  }
  async function updateAuth() {
    await authStore
      .updateAuth({ ...form })
      .then(() => {
        window['$message'].success('成功');
        Emits('close');
      })
      .catch(() => window['$message'].error('失败'));
  }
</script>
