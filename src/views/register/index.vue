<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img src="~@/assets/images/account-logo.png" alt="" />
        </div>
        <div class="view-account-top-desc">鲲鹏风控平台 注册</div>
      </div>
      <div class="view-account-form">
        <n-form ref="formRef" size="large" :model="formInline" :rules="rules">
          <n-form-item path="username" label="用户名">
            <n-input v-model:value="formInline.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input
              v-model:value="formInline.password"
              type="password"
              showPasswordOn="click"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="email" label="邮箱">
            <n-input v-model:value="formInline.email" type="email" placeholder="请输入邮箱">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="phone" label="电话">
            <n-input
              v-model:value="formInline.phone"
              type="phone"
              showPasswordOn="phone"
              placeholder="请输入电话号码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <!-- <n-form-item path="city" label="城市">
            <n-input v-model:value="formInline.city" type="city" placeholder="请输入城市">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item> -->
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              注册
            </n-button>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex view-account-other">
              <div class="flex-initial" style="margin-left: auto">
                <a @click.prevent="router.push('/login')">登录</a>
              </div>
            </div>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMessage } from 'naive-ui';
  import { register } from '@/api/system/user';
  interface FormState {
    username: string;
    password: string;
    email: string;
    phone: string;
    city?: string;
  }

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);

  const formInline = reactive({
    username: '',
    password: '',
    email: '',
    phone: '',
  });

  const rules = {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
    email: { required: true, message: '请输入邮箱', trigger: 'blur' },
    phone: { required: true, message: '请输入手机号', trigger: 'blur' },
  };

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const { username, password, email, phone } = formInline;
        loading.value = true;

        const params: FormState = {
          username,
          password,
          email,
          phone,
        };

        try {
          await register(params);
          router.replace({ path: '/login' });
        } catch {
          message.warning('用户名或者邮箱已存在');
        } finally {
          loading.value = false;
        }
      } else {
        message.error('请填写完整信息，并且进行验证码校验');
      }
    });
  };
</script>

<style lang="less" scoped>
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
      flex: 1;
      padding: 32px 0;
      width: 384px;
      margin: 0 auto;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>
