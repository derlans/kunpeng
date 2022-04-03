<template>
  <n-steps size="small" :current="(current as number)" :status="currentStatus">
    <n-step title="验证" description="验证现有的邮箱" />
    <n-step title="绑定" description="绑定新的邮箱" />
    <n-step title="完成" description="恭喜你完成邮箱更换" />
  </n-steps>
  <div class="mt-6 flex justify-start p-3 w-96">
    <n-form label-placement="left" :label-width="50" v-if="current === 1">
      <n-form-item label="邮箱" path="email">
        <n-input v-model:value="userStore.emial" readonly />
        <n-button type="info" class="ml-3" @click="sendCode" v-if="!isWaiting">发送验证码</n-button>
        <n-button type="info" class="ml-3" disabled v-else>{{ time }}</n-button>
      </n-form-item>
      <n-form-item label="验证码" path="code">
        <n-input v-model:value="code" />
        <n-button type="success" class="ml-3" @click="check">验证</n-button>
      </n-form-item>
    </n-form>
    <n-form label-placement="left" :label-width="50" v-else-if="current === 2">
      <n-form-item label="新邮箱" path="email">
        <n-input v-model:value="emial" />
        <n-button type="info" class="ml-3" @click="sendNewCode" v-if="!isWaiting"
          >发送验证码</n-button
        >
        <n-button type="info" class="ml-3" disabled v-else>{{ time }}</n-button>
      </n-form-item>
      <n-form-item label="验证码" path="code">
        <n-input v-model:value="code" />
        <n-button type="success" class="ml-3" @click="checkNew">验证</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { StepsProps } from 'naive-ui';
  import { useUserStore } from '@/store/modules/user';
  import { useTimeCountdown } from '@/hooks/useTime';
  import { sendEmail, checkEmail, updateUser } from '@/api/system/user';
  const $message = window['$message'];
  const isWaiting = ref(false);
  const { time, start, reset } = useTimeCountdown(60, () => {
    isWaiting.value = false;
    reset();
  });
  const userStore = useUserStore();
  const current = ref(1);
  const currentStatus = ref<StepsProps['status']>('process');
  const code = ref('');
  async function sendCode() {
    isWaiting.value = true;
    start();
    try {
      await sendEmail(userStore.emial);
      $message.success('发送成功');
    } catch (error) {
      $message.fail('发送失败');
      reset();
      isWaiting.value = false;
    }
  }
  async function check() {
    try {
      const res = await checkEmail(userStore.emial, code.value);
      if (res === true) {
        $message.success('验证正确');
        current.value = 2;
        code.value = '';
        reset();
        isWaiting.value = false;
      } else {
        $message.fail('验证码错误');
      }
    } catch (error) {
      $message.fail('验证码错误');
    }
  }
  const emial = ref('');
  async function sendNewCode() {
    isWaiting.value = true;
    start();
    try {
      await sendEmail(emial.value);
      $message.success('发送成功');
    } catch (error) {
      $message.fail('发送失败');
      reset();
      isWaiting.value = false;
    }
  }
  async function checkNew() {
    try {
      const res = await checkEmail(emial.value, code.value);
      if (res === true) {
        await updateUser({ email: emial.value });
        $message.success('验证正确');
        current.value = 3;
        code.value = '';
        reset();
        isWaiting.value = false;
      } else {
        $message.fail('验证码错误');
      }
    } catch (error) {
      $message.fail('验证码错误');
    }
  }
</script>
