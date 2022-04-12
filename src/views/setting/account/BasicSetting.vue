<template>
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
          <n-input
            v-model:value="formValue.username"
            placeholder="请输入用户名"
            style="width: 300px"
          />
        </n-form-item>
        <n-form-item label="联系电话" path="phone">
          <n-input
            placeholder="请输入联系电话"
            v-model:value="formValue.phone"
            style="width: 300px"
          />
        </n-form-item>
        <n-form-item label="生日" path="birthday">
          <n-date-picker
            v-model:value="formValue.birthday"
            type="date"
            clearable
            style="width: 300px"
          />
        </n-form-item>
        <n-form-item label="联系地址" path="city">
          <n-input
            v-model:value="formValue.city"
            placeholder="请输入所在城市"
            style="width: 300px"
          />
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit" class="ml-40">更新基本信息</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
  <VueAvatarUpload
    :url="UPLOAD_AVATAR_URL"
    :headers="headers"
    :fixed="true"
    style="z-index: 9999"
    :avatar="userStore.avatar"
    @error="handleError"
    v-show="show"
    @close="show = false"
    @success="handleSuccess"
    :key="userStore.avatar"
  />
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { updateUser } from '@/api/system/user';
  import { useUserStore } from '@/store/modules/user';
  import { createStorage } from '@/utils/Storage';
  import { ACCESS_TOKEN } from '@/store/mutation-types';
  import { getAppEnvConfig } from '@/utils/env';
  import { getTime } from 'date-fns';
  import VueAvatarUpload from 'vue-avatar-upload';
  import 'vue-avatar-upload/lib/style.css';

  const { VITE_GLOB_API_URL } = getAppEnvConfig();
  const Storage = createStorage({ storage: localStorage });
  const UPLOAD_AVATAR_URL = VITE_GLOB_API_URL + '/auth/user/update/avatar';

  const show = ref(false);
  const headers = {
    Authorization: Storage.get(ACCESS_TOKEN),
  };
  function handleError(error) {
    console.log(error);
  }
  function handleSuccess() {
    window['$message'].success('头像更新成功');
    show.value = false;
    userStore.GetInfo();
  }
  function showEditAvatar() {
    show.value = true;
  }
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
    birthday: getTime(new Date(userStore.birthday)),
  });

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
        updateUser({ ...formValue, birthday: new Date(formValue.birthday).toISOString() })
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
