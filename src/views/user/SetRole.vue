<template>
  <n-card class="w-96" title="授予用户角色">
    <n-form>
      <n-form-item label="角色">
        <n-select
          :value="sysRoleids"
          multiple
          :options="roleStore.getRoleOptions"
          @update:value="handelUpdate"
        />
      </n-form-item>
      <div class="flex justify-end">
        <n-button type="success" @click="updateRoles"> 更新 </n-button>
      </div>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
  import { useRoleStore } from '@/store/modules/role';
  import { setUserRoles } from '@/api/user/index';
  import { User } from './index';
  import { reactive } from 'vue';
  const roleStore = useRoleStore();
  const Props = defineProps<{
    user: User;
  }>();

  const sysRoleids = reactive(Props.user.sysRoles.map((role) => role.id));
  const Emit = defineEmits<{
    (e: 'update:sysRoles', user: User['sysRoles']): void;
  }>();
  async function handelUpdate(v) {
    sysRoleids.length = 0;
    sysRoleids.push(...v);
  }
  async function updateRoles() {
    try {
      await setUserRoles(Props.user.id, sysRoleids);
      Emit(
        'update:sysRoles',
        roleStore.roles.filter((role) => sysRoleids.includes(role.id))
      );
    } catch (error) {
      window['$message'].error('更新失败');
    }
  }
</script>
