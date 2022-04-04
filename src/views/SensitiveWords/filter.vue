<template>
  <n-card title="敏感词过滤展示" style="min-height: 800px">
    <div class="flex justify-start items-center">
      <div class="p-4 bg-gray-100 flex justify-start items-center flex-col">
        <n-input
          type="textarea"
          round
          clearable
          v-model:value="words"
          style="height: 200px; width: 400px"
          class="text-base"
        />
        <n-button type="primary" class="w-52 mt-5" @click="filter">过滤</n-button>
      </div>
      <div class="m-20 text-4xl">
        <n-icon><SwapOutlined /></n-icon>
      </div>
      <div class="flex justify-around items-center flex-col">
        <n-card style="height: 120px; width: 400px" class="bg-gray-100 mb-5" title="匹配结果">
          <div>
            <n-tag v-for="match in matchs" :key="match">{{ match }}</n-tag>
          </div>
        </n-card>
        <n-card style="height: 120px; width: 400px" class="bg-gray-100" title="过滤结果"
          ><div>{{ filterOutput }}</div></n-card
        >
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
  import { filterSensitiveWords, matchSensitiveWords } from '@/api/SensitiveWords';
  import { SwapOutlined } from '@vicons/antd';
  import { Ref, ref } from 'vue';
  const words = ref('');
  const matchs: Ref<string[]> = ref([]);
  const filterOutput = ref('');
  function filter() {
    matchSensitiveWords(words.value).then((res) => {
      matchs.value = res;
    });
    filterSensitiveWords(words.value).then((res) => {
      filterOutput.value = res;
    });
  }
</script>
