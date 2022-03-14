import { defineStore } from 'pinia';
import { createStorage } from '@/utils/Storage';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER, IS_LOCKSCREEN } from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';

const Storage = createStorage({ storage: localStorage });
import { getUserInfo, login } from '@/api/system/user';
import { storage } from '@/utils/Storage';

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: any;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: Storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [
      {
        label: '主控台',
        value: 'dashboard_console',
      },
      {
        label: '监控页',
        value: 'dashboard_monitor',
      },
      {
        label: '工作台',
        value: 'dashboard_workplace',
      },
      {
        label: '基础列表',
        value: 'basic_list',
      },
      {
        label: '基础列表删除',
        value: 'basic_list_delete',
      },
    ],
    info: Storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.username;
    },
    getPermissions(): [any][] {
      return this.permissions;
    },
    getUserInfo(): object {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info) {
      this.info = info;
    },
    // 登录
    async login(userInfo) {
      try {
        const {
          data: response,
          headers: { authorization },
        } = await login(userInfo);
        const { code } = response;
        const { username } = userInfo;
        if (code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000;
          storage.set(ACCESS_TOKEN, authorization, ex);
          storage.set(CURRENT_USER, username, ex);
          storage.set(IS_LOCKSCREEN, false);
          this.setToken(authorization);
          this.setUserInfo({ username });
        }
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    // 获取用户信息
    GetInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            // if (result.permissions && result.permissions.length) {
            //   const permissionsList = result.permissions;
            //   that.setPermissions(permissionsList);
            //   that.setUserInfo(result);
            // } else {
            //   reject(new Error('getInfo: permissionsList must be a non-null array !'));
            // }
            this.setAvatar(res.avatar);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo('');
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
      return Promise.resolve('');
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
