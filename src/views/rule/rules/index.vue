<template>
  <n-card :bordered="false" class="proCard">
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
    const { rules: list, total } = await getRuleList({ page, size });
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
