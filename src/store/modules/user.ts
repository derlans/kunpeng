import { defineStore } from 'pinia';
import { createStorage } from '@/utils/Storage';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER, IS_LOCKSCREEN } from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';
import { AuthNodeTree, AuthNode } from '@/auth/types';
import { getAuths } from '@/api/auth';
const Storage = createStorage({ storage: localStorage });
import { getUserInfo, login } from '@/api/system/user';
import { storage } from '@/utils/Storage';

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  emial: string;
  info: any;
  authNodeTree: AuthNodeTree;
  authorities: AuthNode['perms'][];
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: Storage.get(ACCESS_TOKEN, ''),
    username: '',
    emial: '',
    welcome: '',
    avatar: '',
    info: Storage.get(CURRENT_USER, {}),
    authNodeTree: [],
    authorities: [],
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
    getAuthorities(): AuthNode['perms'][] {
      return this.authorities;
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
            this.setAvatar(res.avatar);
            this.emial = res.email;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取权限
    async setAuthorities() {
      try {
        const { nav, authorities } = await getAuths();
        this.authNodeTree = nav;
        this.authorities = authorities;
        return { authorities };
      } catch (e) {
        return Promise.reject(e);
      }
    },
    // 登出
    async logout() {
      this.authorities = [];
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
