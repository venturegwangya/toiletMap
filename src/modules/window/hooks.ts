import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@modules/configureStore';
import { windowTypes, windowActions } from '.';

export function useSelectedLeftMenu(): windowTypes.LeftMenu {
  const leftMenu = useAppSelector(state => state.window.leftMenu);
  return leftMenu;
}

export function useSelectLeftMenu(): (
  leftMenu: windowTypes.LeftMenu,
) => windowActions.SelectLeftMenuAction {
  const dispatch = useAppDispatch();
  const setSelectedLeftMenu = useCallback(
    (leftMenu: windowTypes.LeftMenu) =>
      dispatch(windowActions.selectLeftMenu(leftMenu)),
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
