/// <reference types="@types/jest" />
import type { RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { SpyInstance, Mock } from 'jest';

declare global {
  namespace jest {
    interface Matchers<R, T = any> {
      // DOM Testing Library
      toBeInTheDocument(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toHaveStyle(style: Record<string, any>): R;
      toBeEmpty(): R;
      toBeInvalid(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toHaveValue(value?: string | string[] | number): R;
      toContainElement(element: HTMLElement | null): R;
      toHaveAccessibleDescription(description?: string | RegExp): R;
      toHaveAccessibleName(name?: string | RegExp): R;
      toHaveFocus(): R;

      // Jest matchers
      toBe(expected: any): R;
      toBeTruthy(): R;
      toBeFalsy(): R;
      toBeNull(): R;
      toBeUndefined(): R;
      toBeDefined(): R;
      toEqual(expected: any): R;
      toContain(expected: any): R;
      toHaveLength(length: number): R;
      toHaveBeenCalled(): R;
      toHaveBeenCalledTimes(times: number): R;
      toHaveBeenCalledWith(...args: any[]): R;
      toHaveBeenLastCalledWith(...args: any[]): R;
      toBeInstanceOf(expected: any): R;
      toMatch(expected: string | RegExp): R;
      toMatchObject(expected: object): R;
      toThrow(expected?: string | Error | RegExp): R;
      toThrowError(expected?: string | Error | RegExp): R;
    }
  }

  // Window mocks
  interface Window {
    workbox: any;
    __WB_MANIFEST: any;
    matchMedia(query: string): MediaQueryList;
  }

  // Navigator mocks
  interface Navigator {
    serviceWorker: ServiceWorkerContainer;
    onLine: boolean;
  }

  interface MediaQueryList {
    addListener(listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void): void;
    removeListener(listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void): void;
  }
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '@testing-library/react' {
  export interface RenderOptions {
    container?: HTMLElement;
    baseElement?: HTMLElement;
    hydrate?: boolean;
    wrapper?: React.ComponentType;
  }

  export function render(
    ui: ReactElement,
    options?: RenderOptions
  ): RenderResult & {
    rerender: (ui: ReactElement) => void;
    unmount: () => void;
    container: HTMLElement;
  };
}

declare module 'jest' {
  export interface SpyInstance<T = any, Y extends any[] = any[]> {
    mock: {
      calls: Y[];
      instances: T[];
      contexts: any[];
      results: { type: 'return' | 'throw'; value: any }[];
      lastCall: Y;
    };
  }
}
