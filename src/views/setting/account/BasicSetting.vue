<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="formValue.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="联系电话" path="phone">
          <n-input placeholder="请输入联系电话" v-model:value="formValue.phone" />
        </n-form-item>

        <n-form-item label="联系地址" path="city">
          <n-input v-model:value="formValue.city" placeholder="请输入所在城市" />
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">更新基本信息</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { updateUser } from '@/api/system/user';
  import { useUserStore } from '@/store/modules/user';
  const userStore = useUserStore();
  const rules = {
    username: {
      required: true,
      message: '请输入昵称',
      trigger: 'blur',
    },
    email: {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur',
    },
    phone: {
      required: true,
      message: '请输入联系电话',
      trigger: 'input',
    },
  };
  const formRef: any = ref(null);
  const message = useMessage();

  const formValue = reactive({
    username: userStore.username,
    phone: userStore.phone,
    city: userStore.city,
  });

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
        updateUser(formValue)
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
