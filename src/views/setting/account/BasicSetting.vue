<template>
  <my-upload
    field="avatar"
    @crop-success="cropSuccess"
    @crop-upload-success="cropUploadSuccess"
    @crop-upload-fail="cropUploadFail"
    v-model="show"
    :width="50"
    :height="50"
    :url="UPLOAD_AVATAR_URL"
    :headers="headers"
    img-format="png"
  />
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form
        :label-width="120"
        :model="formValue"
        :rules="rules"
        ref="formRef"
        label-placement="left"
      >
        <n-form-item label="点击更新头像" path="avatar" class="cursor-pointer">
          <n-avatar :size="40" :src="userStore.avatar" @click="showEditAvatar" />
        </n-form-item>
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
  import { createStorage } from '@/utils/Storage';
  import { ACCESS_TOKEN } from '@/store/mutation-types';
  import { getAppEnvConfig } from '@/utils/env';
  import myUpload from 'vue-image-crop-upload/upload-3.vue';
  const { VITE_GLOB_API_URL } = getAppEnvConfig();
  const Storage = createStorage({ storage: localStorage });
  const UPLOAD_AVATAR_URL = VITE_GLOB_API_URL + '/auth/user/update/avatar';
  const show = ref(false);
  const headers = {
    Authorization: Storage.get(ACCESS_TOKEN),
  };
  function showEditAvatar() {
    show.value = true;
  }
  function cropSuccess() {
    userStore.GetInfo();
  }
  function cropUploadSuccess() {}
  function cropUploadFail() {}
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
