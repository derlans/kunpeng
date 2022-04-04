<template>
  <div class="relative">
    <n-input
      v-model:value="input"
      @keyup.enter="updateInput"
      class="absolute"
      placeholder="输入用户名回车搜索用户"
      @blur="isShowSelect = false"
      @focus="isShowSelect = false"
    />
    <n-select
      :options="options"
      :reset-menu-on-options-change="false"
      @scroll="handleScroll"
      :show="isShowSelect"
      class="absolute -z-1"
      v-model:value="select"
      :on-update:value="handelSelect"
    />
  </div>
</template>

<script setup lang="ts">
  import { getUserList } from '@/api/user';
  import { Ref, ref } from 'vue';
  const Emits = defineEmits<{
    (e: 'onSelect', userid: string): void;
  }>();
  const isShowSelect = ref(false);
  const options: Ref<{ label: string; value: string }[]> = ref([]);
  const input = ref('');
  const select = ref('');
  const searchQuery = {
    size: 10,
    current: 1,
  };
  function updateInput() {
    searchQuery.current = 1;
    isShowSelect.value = false;
    getUserList({ ...searchQuery, username: input.value }).then(({ records }) => {
      options.value = records.map((user) => ({
        label: user.username,
        value: user.id,
      }));
      isShowSelect.value = true;
    });
  }
  function handleScroll() {
    searchQuery.current++;
    getUserList({ ...searchQuery, username: input.value }).then(({ records }) => {
      options.value.push(
        ...records.map((user) => ({
          label: user.username,
          value: user.id,
        }))
      );
    });
  }
  function handelSelect(v, option) {
    input.value = option.label;
    Emits('onSelect', v);
  }
</script>
