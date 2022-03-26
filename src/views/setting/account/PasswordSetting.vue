<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="旧密码" path="currentPassword">
          <n-input v-model:value="formValue.currentPassword" />
        </n-form-item>
        <n-form-item label="新密码" path="newPassword">
          <n-input v-model:value="formValue.newPassword" />
        </n-form-item>
        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">更新密码</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { updatePassword } from '@/api/system/user';

  const rules = {
    currentPassword: {
      required: true,
      message: '',
      trigger: 'blur',
    },
    newPassword: {
      required: true,
      message: '',
      trigger: 'blur',
    },
  };
  const formRef: any = ref(null);
  const message = useMessage();

  const formValue = reactive({
    currentPassword: '',
    newPassword: '',
  });

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
        updatePassword(formValue)
          .then(() => {
            message.success('成功');
          })
          .catch(() => {
            message.error('验证失败');
          });
      } else {
        message.error('验证失败，请填写完整信息');
      }
    });
  }
</script>
