<template>
  <n-card title="用户黑名单" style="min-height: 800px">
    <div class="flex justify-start flex-wrap" v-show="currentUserid">
      <div
        class="relative m-5"
        v-for="blackType in isBlackTypes"
        :key="blackType.type"
        title="移除"
      >
        <n-icon
          size="20"
          class="absolute right-1 top-1 cursor-pointer"
          @click="setBlack(blackType)"
        >
          <CloseOutlined class="text-white" />
        </n-icon>
        <div
          class="rounded shadow w-32 h-32 text-center leading-7 flex justify-center items-center flex-col bg-black text-white"
        >
          <span>类型：{{ blackType.type }}</span>
          <n-ellipsis style="max-width: 6rem">
            {{ blackType.name }}
          </n-ellipsis>
          <n-ellipsis style="max-width: 6rem">
            {{ blackType.description || '暂无描述' }}
          </n-ellipsis>
        </div>
      </div>
      <n-divider>不在黑名单的类型</n-divider>
      <div
        class="relative m-5"
        v-for="blackType in notBlackTypes"
        :key="blackType.type"
        title="添加"
      >
        <n-icon
          size="20"
          class="absolute right-1 top-1 cursor-pointer"
          @click="setBlack(blackType)"
        >
          <PlusOutlined class="text-black" />
        </n-icon>
        <div
          class="rounded shadow w-32 h-32 text-center leading-7 flex justify-center items-center flex-col bg-blue-500"
        >
          <span>类型：{{ blackType.type }}</span>
          <n-ellipsis style="max-width: 6rem">
            {{ blackType.name }}
          </n-ellipsis>
          <n-ellipsis style="max-width: 6rem">
            {{ blackType.description || '暂无描述' }}
          </n-ellipsis>
        </div>
      </div>
    </div>
    <div></div>
  </n-card>
</template>
<script lang="ts" setup>
  import { CloseOutlined, PlusOutlined } from '@vicons/antd';
  import { getBlackList, setBlackType } from '@/api/blacklist';
  import { getBlackTypes } from '@/api/blacklist';
  import { computed, reactive, Ref, ref, unref } from 'vue';
  import { BlackType } from './index';
  import { transformTypes } from './help';
  const Props = defineProps<{
    userid?: string;
  }>();
  const currentUserid = ref('');
  const blackTypes: BlackType[] = reactive([]);
  getBlackTypes().then((res: BlackType[]) => {
    blackTypes.push(...res);
  });
  if (Props.userid) {
    currentUserid.value = unref(Props.userid);
    updateUser();
  }
  const blacklist: Ref<number[]> = ref([]);
  function updateUser() {
    getBlackList(currentUserid.value)
      .then((res) => {
        blacklist.value = transformTypes(res.value);
      })
      .catch(() => {});
  }

  const isBlackTypes = computed(() =>
    blackTypes.filter((blackType) => blacklist.value[blackType.type])
  );
  const notBlackTypes = computed(() =>
    blackTypes.filter((blackType) => !blacklist.value[blackType.type])
  );
  async function setBlack(blackType: BlackType) {
    await setBlackType(currentUserid.value, blackType.type, !blacklist.value[blackType.type]);
    blacklist.value[blackType.type] = blacklist.value[blackType.type] ? 0 : 1;
  }
</script>
