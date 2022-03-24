<template>
  <n-card title="卡片">
    <n-button type="info" class="mb-3" @click="showModel = true">新增</n-button>
    <n-data-table :columns="columns" :data="data" :row-key="rowKey" />
  </n-card>
  <n-modal
    v-model:show="showModel"
    :show-icon="false"
    preset="dialog"
    title="权限节点"
    display-directive="show"
  >
    <EditAuth v-model="form" :mode="formMode" />
  </n-modal>
</template>

<script setup lang="ts">
  import { AuthNode } from '@/auth/types';
  import { renderViconsIcon } from '@/render/icon/index';
  import { DataTableColumns, NButton, NSpace } from 'naive-ui';
  import { renderTag } from './index';
  import { useAuthStore } from '@/store/modules/auth';
  import EditAuth from './form.vue';
  import { h, ref } from 'vue';
  import { useForm } from '@/hooks/form/useForm';
  // 初始化权限树
  const authStore = useAuthStore();
  authStore.setAuth();
  const data = authStore.getAllAuthNodeTree;
  const rowKey = (row) => row.perms;
  function createColumns(): DataTableColumns<AuthNode> {
    return [
      {
        key: 'name',
        title: '名称',
      },
      {
        key: 'icon',
        title: '图标',
        render(rowData) {
          if (rowData.icon) {
            return renderViconsIcon(rowData.icon);
          } else {
            return;
          }
        },
      },
      {
        key: 'type',
        title: '类型',
        render(rowData) {
          return renderTag(rowData.type);
        },
      },
      {
        key: 'orderId',
        title: '排序号',
      },
      {
        key: 'perms',
        title: '授权标识符',
      },
    ];
  }
  const actionColums: DataTableColumns<AuthNode> = [
    {
      title: '操作',
      key: 'Operation',
      render(rowData) {
        return h(NSpace, null, [
          h(
            NButton,
            {
              type: 'info',
              onClick: () => {
                showModel.value = true;
                formMode.value = 1;
                formMethod.setFieldsValue(rowData, 1);
              },
            },
            '修改'
          ),
          h(
            NButton,
            {
              type: 'success',
              onClick: () => {
                formMethod.setFieldsValue(rowData, 1);
              },
            },
            '删除'
          ),
        ]);
      },
    },
  ];
  const columns = [...createColumns(), ...actionColums];
  // 创建，更新 表格
  const formMode = ref(0);
  const showModel = ref(false);
  const schemas = [
    {
      field: 'id',
    },
    {
      field: 'name',
    },
    {
      field: 'type',
      defaultValue: 0,
    },
  ];
  const [form, formMethod] = useForm({ schemas });
</script>
