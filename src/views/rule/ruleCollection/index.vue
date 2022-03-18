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
    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建规则集">
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
    <n-modal
      v-model:show="showCreateRuleCollectionRule"
      :show-icon="false"
      preset="dialog"
      title="新建规则"
    >
      <n-form
        :model="ruleCollectionRuleForm"
        :rules="formParamsRules"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="规则名" path="ruleName">
          <n-select :options="ruleNameOptions" v-model:value="ruleCollectionRuleForm.ruleName" />
        </n-form-item>
        <n-form-item label="规则优先级" path="priority">
          <n-slider v-model:value="ruleCollectionRuleForm.priority" :step="1" :max="100" :min="1" />
        </n-form-item>

        <n-form-item label="拦截记录" path="interceptDescription">
          <n-input v-model:value="ruleCollectionRuleForm.interceptDescription" />
        </n-form-item>
        <n-form-item label="是否拦截" path="intercept">
          <n-switch
            v-model:value="ruleCollectionRuleForm.intercept"
            :checked-value="1"
            :unchecked-value="0"
          />
        </n-form-item>
        <n-form-item label="是否启用" path="off">
          <n-switch
            v-model:value="ruleCollectionRuleForm.off"
            :checked-value="1"
            :unchecked-value="0"
          />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showCreateRuleCollectionRule = false)">取消</n-button>
          <n-button type="info" @click="handelCreateRuleCollectionRule">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref, computed } from 'vue';
  import { debounce } from '@/utils/lodashChunk';
  import { NDataTable, NSwitch, NSpace, NButton } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { columns as ruleColumns } from '../rules/columns';
  import { useForm as myuseForm } from '@/hooks/form/useForm';
  import { useRulesStore } from '@/store/modules/rules';
  import {
    getRuleCollection,
    removeRuleCollection,
    createRuleCollection,
    updateRuleCollectionRule,
    deleteRuleCollectionRule,
    createRuleCollectionRule,
  } from '@/api/rule/index';

  const $message = window['$message'];
  // 定义表格
  const _ruleColumns = [
    {
      title: '是否开启',
      key: 'off',
      render(row) {
        return h(NSwitch, {
          'checked-value': 1,
          'unchecked-value': 0,
          value: row.off,
          'onUpdate:value': debounce((v) => {
            updateRuleCollectionRule({ ...row, off: v }).then(() => {
              $message.success('更新成功');
              row.off = v;
            });
          }, 500),
        });
      },
    },
    {
      title: '是否拦截',
      key: 'intercept',
      render(row) {
        return h(NSwitch, {
          'checked-value': 1,
          'unchecked-value': 0,
          value: row.intercept,
          'onUpdate:value': debounce((v) => {
            updateRuleCollectionRule({ ...row, intercept: v }).then(() => {
              $message.success('更新成功');
              row.intercept = v;
            });
          }, 500),
        });
      },
    },
    {
      title: '操作',
      key: 'operation',
      render(row) {
        return h(NSpace, null, [
          h(
            NButton,
            {
              type: 'warning',
              onClick: debounce(() => {
                deleteRuleCollectionRule(row.id).then(() => {
                  reloadTable();
                });
              }, 500),
            },
            '删除'
          ),
        ]);
      },
    },
  ];
  const columns = [
    {
      type: 'expand',
      renderExpand: (rowData) => {
        return h(NDataTable, {
          data: rowData.rules,
          columns: [...ruleColumns, ..._ruleColumns],
          class: 'children-table',
        });
      },
      expandable: (rowData) => rowData?.rules?.length,
    },
    {
      title: '路径',
      key: 'pathName',
    },
    {
      title: '名字',
      key: 'name',
    },
    {
      title: '描述',
      key: 'description',
    },
  ];
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
  // 给规则集添加规则
  const rulesStore = useRulesStore();
  if (rulesStore.rules.length === 0) {
    rulesStore.setRules();
  }
  const ruleNameOptions = computed(() => {
    return rulesStore.rules.map((rule) => ({
      value: rule['ruleName'],
      label: rule['ruleName'],
    }));
  });
  const showCreateRuleCollectionRule = ref(false);
  const [ruleCollectionRuleForm] = myuseForm({
    schemas: [
      {
        field: 'path',
        label: '路径',
      },
      {
        field: 'priority',
        label: '优先级',
        defaultValue: 1,
      },
      {
        field: 'ruleName',
        label: '规则名',
      },
      {
        field: 'interceptDescription',
        label: '拦截记录',
      },
      {
        field: 'intercept',
        label: '是否拦截',
      },
      {
        field: 'off',
        label: '是否应用',
      },
    ],
  });
  function handelCreateRuleCollectionRule() {
    createRuleCollectionRule({ ...ruleCollectionRuleForm }).then(() => {
      showCreateRuleCollectionRule.value = false;
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
    width: 200,
    title: '操作',
    key: 'action',
    fixed: 'right',
    algen: 'center',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除',
            type: 'warning',
            onClick: handleDelete.bind(null, record),
          },
          {
            label: '添加',
            type: 'success',
            onClick: () => {
              showCreateRuleCollectionRule.value = true;
              ruleCollectionRuleForm.path = record.pathName;
            },
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

<style scoped></style>
