import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../configureStore';
import { LeftMenu } from './types';
import { useAppDispatch } from '@modules/configureStore';
import { useCallback } from 'react';
import { selectLeftMenu, SelectLeftMenuAction } from './actions';

export function useSelectedLeftMenu(): LeftMenu {
  const leftMenu = useAppSelector(state => state.window.leftMenu);
  return leftMenu;
}

export function useSelectLeftMenu(): (
  leftMenu: LeftMenu,
) => SelectLeftMenuAction {
  const dispatch = useAppDispatch();
  const setSelectedLeftMenu = useCallback(
    (leftMenu: LeftMenu) => dispatch(selectLeftMenu(leftMenu)),
    [dispatch],
  );
  return setSelectedLeftMenu;
}

export function useModalVisibility(): boolean {
  const show = useAppSelector(state => state.window.show);
  return show;
}

export function useModalContent(): React.ReactNode {
  const content = useAppSelector(state => state.window.modalContent);
  return content;
}

export function useLeftPosition(ref: React.RefObject<HTMLElement>): number {
  let defaultLeft = 0;
  if (ref.current) {
    // todo 이준희 => useGetBoundingClientRect
    // memorize => useMemo
    defaultLeft =
      (document.body.getBoundingClientRect().width +
        ref.current?.getBoundingClientRect().width) /
      2;
  }
  const [left, setLeft] = useState<number>(defaultLeft);
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const [entry] = entries;
      setLeft((window.innerWidth + entry.contentRect.width) / 2);
    });

    if (ref?.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return left;
}
