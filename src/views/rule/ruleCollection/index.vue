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
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable" class="mr-3">刷新数据</n-button>
        <n-button type="success" @click="() => (showModal = true)">创建规则集</n-button>
      </template>
    </BasicTable>
    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
      <n-form
        :model="formParams"
        :rules="formParamsRules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="名称" path="name">
          <n-input placeholder="请输入名称" v-model:value="formParams.name" />
        </n-form-item>
        <n-form-item label="路径" path="pathName">
          <n-input v-model:value="formParams.pathName" />
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input v-model:value="formParams.description" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" @click="handelCreateRuleCollection">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { getRuleCollection, removeRuleCollection, createRuleCollection } from '@/api/rule/index';
  import { columns } from './columns';
  const $message = window['$message'];
  // 新建规则集
  const showModal = ref(false);
  const formParams = reactive({
    description: '',
    pathName: '',
    name: '',
  });
  const formParamsRules = {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入名称',
    },
    description: {
      required: false,
      trigger: ['blur', 'input'],
    },
    pathName: {
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入路径',
    },
  };
  function handelCreateRuleCollection() {
    createRuleCollection({ ...formParams }).then(() => {
      showModal.value = false;
      $message.success('创建成功');
      reloadTable();
    });
  }
  const schemas = [
    {
      field: 'pathName',
      component: 'NInput',
      label: '路径',
    },
    {
      field: 'name',
      component: 'NInput',
      label: '规则名',
    },
  ];
  // 规则集列表
  const actionRef = ref();
  const actionColumn = reactive({
    width: 100,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除',
            icon: 'ic:outline-delete-outline',
            onClick: handleDelete.bind(null, record),
          },
        ],
      });
    },
  });

  const [register, formMethods] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas: schemas as any[],
  });
  const loadDataTable = async ({ page, size }) => {
    const { name = '', pathName = '' } = formMethods.getFieldsValue();
    const { records, total: totalCount } = await getRuleCollection({ page, size, name, pathName });
    if (totalCount) {
      return {
        list: records,
        page,
        pageCount: Math.ceil(totalCount / size),
        size,
      };
    }
    return {
      list: [],
      page: 1,
      pageCount: 1,
    };
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }
  async function handleSubmit() {
    reloadTable();
  }
  // 删除规则集合
  function handleDelete(record: Recordable) {
    const $dialog = window['$dialog'];
    const $message = window['$message'];
    $dialog.warning({
      title: '警告',
      content: '你确定删除该规则集？',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => {
        removeRuleCollection(record.id)
          .then(() => {
            $message.success('删除成功');
            reloadTable();
          })
          .catch(() => {});
      },
    });
  }
</script>
