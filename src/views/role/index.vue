<template>
  <BasicTable
    :columns="columns"
    :request="loadDataTable"
    :row-key="(row) => row.id"
    :actionColumn="actionColumn"
    :scroll-x="1090"
    ref="actionRef"
  >
    <template #toolbar>
      <n-button type="primary" @click="reloadTable" class="mr-3">刷新数据</n-button>
      <n-button
        type="success"
        @click="
          () => {
            currentMode = modes[0];
            showModal = true;
          }
        "
        >新建角色</n-button
      >
    </template>
  </BasicTable>
  <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" :title="currentMode.title">
    <n-form
      :model="form"
      :rules="formRules"
      ref="formRef"
      label-placement="left"
      :label-width="80"
      class="py-4"
    >
      <n-form-item label="名字" path="rolename">
        <n-input v-model:value="form.rolename" />
      </n-form-item>
      <n-form-item label="标识符" path="code">
        <n-input v-model:value="form.code" />
      </n-form-item>
      <n-form-item label="授权" path="authIds">
        <n-tree-select
          checkable
          multiple
          :options="allAuthNodeTree"
          @update:value="handleUpdateValue"
          :default-value="form.authIds"
          label-field="name"
          key-field="id"
          :key="1"
        />
      </n-form-item>
    </n-form>

    <template #action>
      <n-space>
        <n-button @click="() => (showModal = false)">取消</n-button>
        <n-button type="info" @click="createRole" v-if="currentMode.value === 0">新建</n-button>
        <n-button type="success" @click="updateRole" v-else-if="currentMode.value === 1"
          >更新</n-button
        >
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
  import { useRoleStore } from '@/store/modules/role';
  import { columns } from './index';
  import { BasicTable, TableAction } from '@/components/Table';
  import { reactive, h, ref } from 'vue';
  import { useForm } from '@/hooks/form/useForm';
  import { useAuthStore } from '@/store/modules/auth';
  import { searchParentNodes } from '@/utils/tree';
  const $dialog = window['$dialog'];
  const $message = window['$message'];
  const actionRef = ref();
  // 行操作 删除  修改
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
            label: '删除',
            onClick: () => {
              $dialog.warning({
                title: '警告',
                content: '你确定删除该角色？',
                positiveText: '确定',
                negativeText: '不确定',
                onPositiveClick: () => {
                  roleStore
                    .deleteRole(record.id)
                    .then(() => {
                      $message.success('删除成功');
                      reloadTable();
                    })
                    .catch(() => {
                      $message.fail('删除失败');
                    });
                },
              });
            },
            type: 'warning',
          },
          {
            label: '修改',
            type: 'success',
            onClick: () => {
              currentMode.value = modes[1];
              formMethods.setFieldsValue(record, 1);
              showModal.value = true;
            },
          },
        ],
      });
    },
  });
  // 数据来源于pinia
  // 获取数据和刷新表格
  const roleStore = useRoleStore();
  async function loadDataTable() {
    await roleStore.setRoles();
    return {
      list: roleStore.roles,
      page: 1,
      pageCount: 1,
      size: roleStore.roles.length,
    };
  }
  function reloadTable() {
    actionRef.value.reload();
  }
  // 表单
  const authStore = useAuthStore();
  const allAuthNodeTree = authStore.getAllAuthNodeTree;
  const showModal = ref(false);
  const [form, formMethods] = useForm({
    schemas: [
      {
        field: 'rolename',
        defaultValue: '',
      },
      {
        field: 'code',
        defaultValue: '',
      },
      {
        field: 'description',
        defaultValue: '',
      },
      {
        field: 'authIds',
        defaultValue: [],
      },
    ],
  });
  const formRules = [];
  function createRole() {}
  async function updateRole() {
    await roleStore.updateRole(form);
    $message.success('更新成功');
  }
  function handleUpdateValue(v: string[]) {
    const parents = searchParentNodes(authStore.allAuthNodeTree, v, 'id').map((auth) => auth.id);
    for (const i of parents) {
      if (!v.includes(i)) {
        v.push(i);
      }
    }
    form.authIds = v;
  }
  const modes = [
    {
      value: 0,
      title: '新建角色',
    },
    {
      value: 1,
      title: '修改角色',
    },
  ];
  const currentMode = ref(modes[0]);
</script>

<style scoped>
  :deep .n-tag__content {
    color: rgb(0, 102, 255);
  }
</style>
