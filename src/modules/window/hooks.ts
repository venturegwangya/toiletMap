import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../configureStore';

export function useModalVisibility(): boolean {
  const show = useAppSelector(state => state.window.show);
  return show;
}

export function useModalContent(): React.ReactNode {
  const content = useAppSelector(state => state.window.modalContent);
  return content;
}

export function useRefreshPillPosition(): string {
  const position = useAppSelector(state => state.window.pillLeftPosition);
  return position;
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
  }, []);
  return left;
}
