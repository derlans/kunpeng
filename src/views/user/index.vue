<template>
  <BasicForm @register="register" @submit="reloadTable">
    <template #statusSlot="{ model, field }">
      <n-input v-model:value="model[field]" />
    </template>
  </BasicForm>
  <BasicTable
    :columns="columns"
    :request="loadDataTable"
    :row-key="(row) => row.id"
    :actionColumn="actionColumn"
    :scroll-x="1800"
    ref="actionRef"
  >
    <template #toolbar>
      <n-button type="primary" @click="reloadTable">刷新数据</n-button>
    </template>
  </BasicTable>
  <NModal v-model:show="showBlackList">
    <BlackList :userid="currentUserid" />
  </NModal>
</template>

<script setup lang="ts">
  import { columns } from './index';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { reactive, h, ref } from 'vue';
  import { getUserList } from '@/api/user/index';
  import BlackList from '@/components/blacklist/index.vue';
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
            label: '授予角色',
            type: 'success',
            onClick: () => {},
          },
          {
            label: '黑名单编辑',
            type: 'info',
            onClick: () => {
              showBlackList.value = true;
              currentUserid.value = record.id;
            },
          },
        ],
      });
    },
  });
  async function loadDataTable({ size, page }) {
    const { username = '' } = formMetheds.getFieldsValue();
    const { records, total, current } = await getUserList({ current: page, size, username });
    if (total) {
      return {
        list: records,
        page: current,
        pageCount: Math.ceil(total / size),
        size,
      };
    }
    return {
      list: [],
      page: 1,
      pageCount: 1,
    };
  }
  function reloadTable() {
    actionRef.value.reload();
  }
  const schemas = [
    {
      field: 'username',
      component: 'NInput',
      label: '用户名',
      componentProps: {
        placeholder: '请输入用户名',
      },
      rules: [{ required: true, message: '请输入用户名', trigger: ['blur'] }],
    },
  ];
  const [register, formMetheds] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas: schemas as any[],
  });
  const showBlackList = ref(false);
  const currentUserid = ref('');
</script>
