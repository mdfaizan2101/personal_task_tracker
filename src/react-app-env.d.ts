/// <reference types="react-scripts" />

declare module 'react' {
  export = React;
  export as namespace React;
}

declare namespace React {
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);

  interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> {}

  interface ComponentLifecycle<P, S, SS = any> {}

  type Key = string | number;

  interface ReactNode {
    // React node types
  }

  type FC<P = {}> = FunctionComponent<P>;

  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;

  interface ChangeEvent<T = Element> {
    target: T;
    currentTarget: T;
  }
}

declare namespace JSX {
  interface Element extends React.ReactElement<any, any> {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react/jsx-runtime' {
  const jsx: any;
  const jsxs: any;
  const Fragment: any;
  export { jsx, jsxs, Fragment };
  export default {};
}

declare module 'react/jsx-dev-runtime' {
  const jsxDEV: any;
  const Fragment: any;
  export { jsxDEV, Fragment };
  export default {};
} 