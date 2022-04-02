<template>
  <BasicTable
    :columns="columns"
    :request="loadDataTable"
    :row-key="(row) => row.id"
    :actionColumn="actionColumn"
    :scroll-x="1800"
    ref="actionRef"
  >
    <template #toolbar>
      <n-button type="primary" class="mr-3" @click="reloadTable">刷新数据</n-button>
      <n-button type="success" @click="openCreateForm">新建类型</n-button>
    </template>
  </BasicTable>
  <NModal v-model:show="showModal">
    <n-card class="w-96" :title="currentMode.name">
      <n-form>
        <n-form-item path="type" label="节点类型">
          <n-input-number :max="62" :min="0" v-model:value="form.type" :step="1" />
        </n-form-item>
        <n-form-item path="name" label="名字">
          <n-input v-model:value="form.name" />
        </n-form-item>
        <n-form-item path="description" label="描述">
          <n-input v-model:value="form.description" />
        </n-form-item>
      </n-form>
      <div class="flex justify-end">
        <n-button type="info" @click="updateForm" v-if="currentMode.value === 1">更新</n-button>
        <n-button type="info" @click="createNewType" v-else-if="currentMode.value === 0"
          >创建</n-button
        >
      </div>
    </n-card>
  </NModal>
</template>

<script setup lang="ts">
  import { BlackType, columns } from './index';
  import { BasicTable, TableAction } from '@/components/Table';
  import { reactive, h, ref, unref } from 'vue';
  import {
    getBlackTypes,
    deleteBlackTypes,
    updateBlackTypes,
    createBlackTypes,
  } from '@/api/blacklist';
  import { confirmDelete } from '@/utils';
  const actionRef = ref();
  const actionColumn = reactive({
    width: 200,
    title: '操作',
    key: 'action',
    align: 'center',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '更新',
            type: 'info',
            onClick: () => {
              showModal.value = true;
              currentMode.value = modes[1];
              form.value = record;
            },
          },
          {
            label: '删除',
            type: 'warning',
            onClick: () => {
              confirmDelete(async () => {
                await deleteBlackTypes(record.id);
                reloadTable();
              });
            },
          },
        ],
      });
    },
  });
  async function loadDataTable() {
    const list = await getBlackTypes();
    return {
      list: list,
      page: 1,
      pageCount: 1,
    };
  }
  function reloadTable() {
    actionRef.value.reload();
  }
  const showModal = ref(false);
  const modes = [
    {
      value: 0,
      name: '创建',
    },
    {
      value: 1,
      name: '更新',
    },
  ];
  const currentMode = ref(modes[0]);
  const form = ref({
    type: 0,
    name: '',
    description: '',
  } as BlackType);
  async function updateForm() {
    await updateBlackTypes(unref(form));
    window['$message'].success('更新成功');
  }
  function openCreateForm() {
    currentMode.value = modes[0];
    showModal.value = true;
  }
  async function createNewType() {
    await createBlackTypes(unref(form));
    window['$message'].success('创建成功');
    reloadTable();
  }
</script>
