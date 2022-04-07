<template>
  <n-card title="敏感词过滤展示" style="min-height: 1000px">
    <div class="flex justify-center items-center" style="height: 600px">
      <div class="p-4 bg-gray-100 flex justify-start items-center flex-col" style="width: 40%">
        <n-input
          type="textarea"
          round
          clearable
          v-model:value="words"
          style="height: 300px; width: 100%"
          class="text-base"
        />
        <n-button type="primary" class="w-52 mt-5" @click="filter">过滤</n-button>
      </div>
      <div class="m-20 text-4xl">
        <n-icon><SwapOutlined /></n-icon>
      </div>
      <div class="flex justify-around items-center flex-col" style="width: 40%">
        <n-card style="height: 320px" class="bg-gray-100 mb-5" title="匹配结果">
          <div>
            <n-tag
              v-for="(match, index) in matchs"
              :key="match"
              :type="tagTypes[index % tagTypes.length]"
              class="mr-2 text-base"
              >{{ match }}</n-tag
            >
          </div>
        </n-card>
        <n-card style="height: 320px" class="bg-gray-100 text-base" title="过滤结果"
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
  const tagTypes = ['success', 'warning', 'error', 'info'];
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
