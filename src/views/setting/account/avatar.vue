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
</template>

<script setup lang="ts">
  import { ACCESS_TOKEN } from '@/store/mutation-types';
  import { getAppEnvConfig } from '@/utils/env';
  import myUpload from 'vue-image-crop-upload/upload-3.vue';
  import { ref } from 'vue';
  import { createStorage } from '@/utils/Storage';
  const { VITE_GLOB_API_URL } = getAppEnvConfig();
  const Storage = createStorage({ storage: localStorage });
  const UPLOAD_AVATAR_URL = VITE_GLOB_API_URL + '/auth/user/update/avatar';
  const show = ref(true);
  const headers = {
    Authorization: Storage.get(ACCESS_TOKEN),
  };

  function cropSuccess() {}
  function cropUploadSuccess() {}
  function cropUploadFail() {}
</script>
