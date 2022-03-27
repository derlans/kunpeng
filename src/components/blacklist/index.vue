<template>
  <n-card title="编辑黑名单规则" class="w-96">
    <div class="flex justify-start flex-wrap">
      <span
        v-for="(isBlack, index) in blacklist"
        :key="index"
        class="border-2 m-2 w-7 h-7 text-center leading-7 cursor-pointer hover:bg-black"
        :style="{ background: isBlack ? '#000' : '', color: isBlack ? '#fff' : '' }"
        :title="isBlack ? '点击解禁' : '点击封禁'"
        @click="setBlack(index)"
        >{{ index }}
      </span>
    </div>
    <div></div>
  </n-card>
</template>
<script lang="ts" setup>
  import { getBlackList, setBlackType } from '@/api/blacklist';
  import { reactive } from 'vue';
  import { transformTypes } from './help';
  const Props = defineProps<{
    userid: string;
  }>();
  const blacklist: number[] = reactive([]);
  getBlackList(Props.userid)
    .then((res) => {
      blacklist.push(...transformTypes(res.value));
    })
    .catch(() => {});
  async function setBlack(index) {
    await setBlackType(Props.userid, index, !blacklist[index]);
    blacklist[index] = blacklist[index] ? 0 : 1;
  }
</script>
