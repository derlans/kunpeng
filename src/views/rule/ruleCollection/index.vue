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
        <n-button type="warning" @click="refreshRule" class="mr-3">部署上线</n-button>
        <n-button
          type="success"
          @click="
            () => {
              showModal = true;
              mode = 1;
              formParams = {
                description: '',
                pathName: '',
                name: '',
              };
            }
          "
          >创建规则集</n-button
        >
      </template>
    </BasicTable>
    <n-modal
      v-model:show="showModal"
      :show-icon="false"
      preset="dialog"
      :title="mode === 1 ? '新建规则集' : '更新描述'"
    >
      <n-form
        :model="formParams"
        :rules="formParamsRules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="名称" path="name">
          <n-input
            placeholder="请输入名称"
            v-model:value="formParams.name"
            :disabled="mode === 2"
          />
        </n-form-item>
        <n-form-item label="路径" path="pathName">
          <n-input v-model:value="formParams.pathName" :disabled="mode === 2" />
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input v-model:value="formParams.description" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" @click="handelCreateRuleCollection" v-if="mode === 1"
            >确定</n-button
          >
          <n-button type="info" @click="updateRuleCollection" v-if="mode === 2">更新</n-button>
        </n-space>
      </template>
    </n-modal>
    <n-modal
      v-model:show="showCreateRuleCollectionRule"
      :show-icon="false"
      preset="dialog"
      :title="ruleModes[ruleMode]"
    >
      <n-form
        :model="ruleCollectionRuleForm"
        :rules="formParamsRules"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="规则名" path="ruleName">
          <n-select
            :options="ruleNameOptions"
            v-model:value="ruleCollectionRuleForm.ruleName"
            :disabled="ruleMode === 1"
            style="width: 300px"
          />
        </n-form-item>
        <n-form-item label="规则优先级" path="priority">
          <n-input-number v-model:value="ruleCollectionRuleForm.priority" style="width: 300px" />
        </n-form-item>

        <n-form-item label="拦截记录" path="interceptDescription">
          <n-input
            v-model:value="ruleCollectionRuleForm.interceptDescription"
            style="width: 300px"
          />
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
            :checked-value="0"
            :unchecked-value="1"
          />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showCreateRuleCollectionRule = false)">取消</n-button>
          <n-button type="info" @click="handelCreateRuleCollectionRule" v-show="ruleMode === 0"
            >确定</n-button
          >
          <n-button type="info" @click="handelUpdateRuleCollectionRule" v-show="ruleMode === 1"
            >确定</n-button
          >
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
  import { ruleColumns } from './index';
  import { useForm as myuseForm } from '@/hooks/form/useForm';
  import { useRulesStore } from '@/store/modules/rules';
  import {
    getRuleCollection,
    removeRuleCollection,
    createRuleCollection,
    updateRuleCollectionDes,
    updateRuleCollectionRule,
    deleteRuleCollectionRule,
    createRuleCollectionRule,
    refresh,
  } from '@/api/rule/index';

  const $message = window['$message'];
  // 定义表格
  const _ruleColumns = [
    {
      title: '优先级',
      key: 'priority',
    },
    {
      title: '是否开启',
      key: 'off',
      render(row) {
        return h(NSwitch, {
          'checked-value': 0,
          'unchecked-value': 1,
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
          h(
            NButton,
            {
              type: 'success',
              onClick: debounce(() => {
                ruleMode.value = 1;
                Object.assign(ruleCollectionRuleForm, row);
                showCreateRuleCollectionRule.value = true;
              }, 500),
            },
            '更新'
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
  const formParams = ref({
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
    createRuleCollection(formParams.value).then(() => {
      showModal.value = false;
      $message.success('创建成功');
      reloadTable();
    });
  }

  // 给规则集添加规则
  const ruleModes = {
    0: {
      title: '添加规则',
    },
    1: {
      title: '更新规则',
    },
  };
  const ruleMode = ref(0);
  const rulesStore = useRulesStore();
  rulesStore.setRules();
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
  function handelUpdateRuleCollectionRule() {
    updateRuleCollectionRule(ruleCollectionRuleForm).then(() => {
      showCreateRuleCollectionRule.value = false;
      $message.success('更新成功');
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
  const mode = ref(1);
  const actionRef = ref();
  const actionColumn = reactive({
    width: 300,
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
          {
            label: '修改描述',
            type: 'info',
            onClick: () => {
              formParams.value = record;
              showModal.value = true;
              mode.value = 2;
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
  async function refreshRule() {
    await refresh();
    window['$message'].success('部署成功');
  }
  async function updateRuleCollection() {
    await updateRuleCollectionDes(formParams.value);
    $message.success('更新成功');
    showModal.value = false;
    reloadTable();
  }
</script>

<style scoped></style>
