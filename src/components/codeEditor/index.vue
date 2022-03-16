<template> <div ref="codeRef" class="code-editor"></div></template>

<script setup lang="ts">
  // java语法高亮
  import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';
  import { monaco } from './customMonaco';
  import { ref, onMounted, watch } from 'vue';
  const props = withDefaults(
    defineProps<{
      editorOpations?: monaco.editor.IStandaloneEditorConstructionOptions;
      disabled?: boolean;
      code: string;
    }>(),
    {
      editorOpations: () => {
        return {
          language: 'java',
          theme: 'vs-dark',
        };
      },
      disabled: false,
    }
  );
  const emit = defineEmits<{
    (e: 'update:code', code: string): void;
  }>();
  const codeRef = ref();
  // 要把editor导出去
  const codeEditor: { value?: any } = {};
  onMounted(() => {
    const editor = monaco.editor.create(codeRef.value, {
      ...props.editorOpations,
      value: props.code,
      readOnly: !!props.disabled,
    });
    codeEditor.value = editor;
    editor.onDidChangeModelContent(() => {
      const currenValue = editor?.getValue() || '';
      emit('update:code', currenValue);
    });
    watch(
      () => props.code,
      (newCode) => {
        if (newCode === editor?.getValue()) return;
        editor.setValue(newCode || '');
      }
    );
    watch(
      () => props.disabled,
      (v) => {
        editor.updateOptions({
          readOnly: !!v,
        });
      }
    );
  });
  defineExpose({
    codeEditor,
  });
</script>
<style scoped>
  .code-editor {
    width: 100%;
    height: 100%;
  }
</style>
