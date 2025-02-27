import type { RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { Mock, SpyInstance } from 'jest';

declare global {
  namespace jest {
    interface Matchers<R> {
      // DOM Testing Library
      toBeInTheDocument(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;

      // Jest matchers
      toBe(expected: any): R;
      toBeTruthy(): R;
      toBeFalsy(): R;
      toBeNull(): R;
      toEqual(expected: any): R;
      toContain(expected: any): R;
      toHaveLength(length: number): R;
      toHaveBeenCalled(): R;
      toHaveBeenCalledTimes(times: number): R;
      toHaveBeenCalledWith(...args: any[]): R;
      toBeInstanceOf(expected: any): R;
      toMatch(expected: string | RegExp): R;
      toMatchObject(expected: object): R;
      toThrow(expected?: string | Error | RegExp): R;
    }
  }
}

declare module '@testing-library/react' {
  export interface RenderOptions {
    container?: HTMLElement;
    baseElement?: HTMLElement;
    hydrate?: boolean;
    wrapper?: React.ComponentType;
  }

  export interface RenderResult {
    container: HTMLElement;
    baseElement: HTMLElement;
    debug: (baseElement?: HTMLElement | DocumentFragment) => void;
    rerender: (ui: ReactElement) => void;
    unmount: () => void;
    asFragment: () => DocumentFragment;
  }

  export function render(
    ui: ReactElement,
    options?: RenderOptions
  ): RenderResult;

  export const screen: {
    getByText: (text: string | RegExp) => HTMLElement;
    getByRole: (role: string, options?: { name?: string | RegExp }) => HTMLElement;
    queryByText: (text: string | RegExp) => HTMLElement | null;
    queryByRole: (role: string, options?: { name?: string | RegExp }) => HTMLElement | null;
    getAllByRole: (role: string) => HTMLElement[];
    getByTestId: (testId: string) => HTMLElement;
    queryByTestId: (testId: string) => HTMLElement | null;
    findByText: (text: string | RegExp) => Promise<HTMLElement>;
    findByRole: (role: string, options?: { name?: string | RegExp }) => Promise<HTMLElement>;
    findAllByRole: (role: string) => Promise<HTMLElement[]>;
  };

  export const waitFor: (
    callback: () => void | Promise<void>,
    options?: { timeout?: number; interval?: number }
  ) => Promise<void>;

  export const act: (callback: () => void | Promise<void>) => Promise<void>;
}

declare module '@testing-library/jest-dom' {
  export function toBeInTheDocument(): void;
  export function toHaveClass(...classNames: string[]): void;
  export function toHaveAttribute(attr: string, value?: string): void;
  export function toHaveTextContent(text: string | RegExp): void;
  export function toBeVisible(): void;
  export function toBeDisabled(): void;
  export function toBeEnabled(): void;
}

declare module '@testing-library/jest-dom/extend-expect' {
  export * from '@testing-library/jest-dom';
}

declare module 'jest' {
  export interface SpyInstance<T = any, Y extends any[] = any[]> {
    mockClear(): void;
    mockReset(): void;
    mockRestore(): void;
    mockImplementation(fn: (...args: Y) => T): SpyInstance<T, Y>;
    mockImplementationOnce(fn: (...args: Y) => T): SpyInstance<T, Y>;
    mockReturnValue(value: T): SpyInstance<T, Y>;
    mockReturnValueOnce(value: T): SpyInstance<T, Y>;
  }

  export type Mock<T = any, Y extends any[] = any[]> = {
    (...args: Y): T;
    mock: {
      calls: Y[];
      instances: T[];
      invocationCallOrder: number[];
      results: { type: 'return' | 'throw'; value: any }[];
    };
  } & SpyInstance<T, Y>;
}
