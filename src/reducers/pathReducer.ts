const CHANGE_PATH = 'path/CHANGE_PATH' as const;

export type AppPath = 'MAIN' | 'LOGIN';

export interface AppPathState {
  path: AppPath;
}

const initialState: AppPathState = {
  path: 'MAIN',
};

export const changePath = (path: AppPath) =>
  <const>{
    type: CHANGE_PATH,
    payload: path,
  };

type ACTIONTYPE = ReturnType<typeof changePath>;

export default function pathReducer(
  state: AppPathState = initialState,
  action: ACTIONTYPE,
): AppPathState {
  switch (action.type) {
    case CHANGE_PATH:
      return { ...state, path: action.payload };
    default:
      return state;
  }
}
