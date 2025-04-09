/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { FunctionComponent, ReactNode } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: FunctionComponent<P>,
  equals = shallowEquals
) {
  return function MemoizedComponent(props: P): ReactNode {
    const previous = useRef<{
      props: P;
      result: ReactNode;
    } | null>(null);

    // 1. 이전 props가 존재하고, 현재와 같으면 이전 결과 재사용
    if (previous.current && equals(previous.current.props, props)) {
      return previous.current.result;
    }

    // 2. 새로 계산한 결과 저장
    const result = Component(props);
    previous.current = { props, result };
    return result;
  };
}
