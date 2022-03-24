<template>
  <n-input
    :value="Props.modelValue"
    @update:modelValue="update"
    @click="showModel = !showModel"
    :disabled="true"
    class="relative"
  />
  <component :is="icons[Props.modelValue || 'DatabaseOutlined']" class="w-8 h-8 m-1 border" />
  <n-modal v-model:show="showModel">
    <div class="flex-wrap flex overflow-y-auto bg-white p-4">
      <div
        v-for="icon in filterIcons"
        :key="icon[0]"
        class="w-8 h-8 m-1 border hover:bg-green-300"
        :style="{
          background: icon[0] === Props.modelValue ? '#15a1935f' : '',
        }"
        @click="
          () => {
            showModel = false;
            update(icon[0]);
          }
        "
      >
        <component :is="icon[1]" />
      </div>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import * as icons from '@vicons/antd';
  const filterIcons = Object.entries(icons).filter((icon, index) => !(index % 3));
  const showModel = ref(false);
  const Props = defineProps<{
    modelValue?: string;
  }>();
  const Emits = defineEmits<{
    (e: 'update:modelValue', modelValue?: string): void;
  }>();
  function update(v) {
    Emits('update:modelValue', v);
  }
</script>
