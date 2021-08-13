import { faList, faUser } from '@fortawesome/free-solid-svg-icons';
export const leftMenus = ['LIST', 'USER_SETTING'] as const;
export type LeftMenu = typeof leftMenus[number] | null;
export const leftMenuIconMap = {
  LIST: faList,
  USER_SETTING: faUser,
};
