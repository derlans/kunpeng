<template>
  <n-card>
    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      :actionColumn="actionColumn"
      ref="actionRef"
    >
      <template #toolbar>
        <n-input
          class="mr-3"
          placeholder="回车添加敏感词"
          style="width: 180px"
          v-model:value="newWord"
          @keyup.enter="createNewWord"
        />
        <n-button type="info" @click="createNewWord" class="mr-3">添加</n-button>
        <n-button type="success" @click="showBatchCreate" class="mr-3">批量修改</n-button>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>
    <n-modal v-model:show="isShowBatchCreate">
      <n-card title="批量添加" style="width: 600px">
        <n-input
          type="textarea"
          placeholder="请使用;间隔输入敏感词"
          round
          clearable
          v-model:value="batchWords"
          style="height: 300px"
          class="text-base"
        />
        <div class="flex justify-center mt-5">
          <n-button type="success" @click="batchCreate" class="mr-3 w-56">更新</n-button>
        </div>
      </n-card>
    </n-modal>
  </n-card>
</template>

<script setup lang="ts">
  import { BasicTable, TableAction } from '@/components/Table';
  import { reactive, h, ref, Ref } from 'vue';
  import { DataTableColumn } from 'naive-ui';
  import { getSensitiveWords, updateSensitiveWords } from '@/api/SensitiveWords';
  import { confirmDelete } from '@/utils';
  const actionRef = ref();
  const sensitiveWords: Ref<string[]> = ref([]);
  const columns: DataTableColumn<string>[] = [
    {
      key: 'value',
      title: '敏感词',
      align: 'center',
      render(rowData) {
        return h('span', null, rowData);
      },
    },
  ];
  const newWord = ref('');
  function createNewWord() {
    if (!newWord.value) {
      window['$message'].warning('不能为空');
      return;
    }
    if (sensitiveWords.value.includes(newWord.value)) {
      window['$message'].warning('敏感词已存在');
      return;
    }
    sensitiveWords.value.push(newWord.value);
    updateSensitiveWords(sensitiveWords.value).then(() => {
      window['$message'].success('更新成功');
    });
  }
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
            type: 'warning',
            onClick: () => {
              confirmDelete(async () => {
                const index = sensitiveWords.value.findIndex((word) => word === record);
                sensitiveWords.value.splice(index, 1);
                updateSensitiveWords(sensitiveWords.value).then(() => {
                  window['$message'].success('更新成功');
                });
              });
            },
          },
        ],
      });
    },
  });
  async function loadDataTable() {
    sensitiveWords.value = await getSensitiveWords();
    return {
      list: sensitiveWords.value,
      page: 1,
      pageCount: 1,
    };
  }
  function reloadTable() {
    actionRef.value.reload();
  }
  const isShowBatchCreate = ref(false);
  const batchWords = ref('');
  function showBatchCreate() {
    isShowBatchCreate.value = true;
    batchWords.value = sensitiveWords.value.join(';');
  }
  function batchCreate() {
    sensitiveWords.value = batchWords.value.split(';').filter(Boolean);
    updateSensitiveWords(sensitiveWords.value).then(() => {
      window['$message'].success('更新成功');
    });
  }
</script>
