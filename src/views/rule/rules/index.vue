<template>
  <n-card :bordered="false" class="proCard">
    <BasicForm @register="register" @submit="handleSubmit">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>
    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row._id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1800"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable" class="mr-3">刷新数据</n-button>
        <n-button
          type="success"
          @click="
            () => {
              router.push({
                path: '/rule/ruleEditor',
                query: { modeValue: RuleFormMode.CREATE_NEW_RULE },
              });
            }
          "
          >新建规则</n-button
        >
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { deleteRule, getRuleList } from '@/api/rule/index';
  import { columns } from './columns';
  import { useRouter } from 'vue-router';
  import { RuleFormMode } from './index';
  import { useForm } from '@/components/Form';
  const router = useRouter();
  const message = useMessage();
  const actionRef = ref();
  const actionColumn = reactive({
    width: 300,
    title: '操作',
    key: 'action',
    align: 'center',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除',
            onClick: handleDelete.bind(null, record),
            type: 'warning',
          },
          {
            label: '查看详情',
            type: 'success',
            onClick: handleLookDetail.bind(null, record),
          },
          {
            label: '更新',
            type: 'info',
            onClick: () => {
              router.push({
                path: '/rule/ruleEditor',
                query: { modeValue: RuleFormMode.UPDATE_RULE, id: record.id },
              });
            },
          },
        ],
      });
    },
  });

  const loadDataTable = async ({ page, size }) => {
    const { rules: list, total } = await getRuleList({
      page,
      size,
      queryRuleName: formMethods.getFieldsValue().ruleName as string,
    });
    return {
      list,
      page: page,
      pageCount: Math.ceil(total / size),
    };
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }
  const [register, formMethods] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas: [
      {
        field: 'ruleName',
        component: 'NInput',
        label: '规则名',
      },
    ] as any[],
  });
  function handleSubmit() {
    reloadTable();
  }
  async function handleDelete(record: Recordable) {
    await deleteRule(record.id);
    message.info('已删除');
    reloadTable();
  }
  function handleLookDetail(record: Recordable) {
    router.push({
      path: '/rule/ruleEditor',
      query: { modeValue: RuleFormMode.LOOK_RULE, id: record.id },
    });
  }
</script>

<style lang="less" scoped></style>
