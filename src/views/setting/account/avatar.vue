<template>
  <my-upload
    field="img"
    @crop-success="cropSuccess"
    @crop-upload-success="cropUploadSuccess"
    @crop-upload-fail="cropUploadFail"
    v-model="show"
    :width="300"
    :height="300"
    :url="UPLOAD_AVATAR_URL"
    :params="params"
    :headers="headers"
    img-format="png"
  />
</template>

<script setup lang="ts">
  import { getAppEnvConfig } from '@/utils/env';
  import myUpload from 'vue-image-crop-upload/upload-3.vue';
  import { ref } from 'vue';
  const { VITE_GLOB_API_URL } = getAppEnvConfig();
  const UPLOAD_AVATAR_URL = VITE_GLOB_API_URL + '/user/update/avatar';
  const show = ref(true);
  const params = {};
  const headers = [];
  function cropSuccess() {}
  function cropUploadSuccess() {}
  function cropUploadFail() {}
</script>
