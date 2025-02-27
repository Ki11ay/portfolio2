import { SpyInstance } from 'jest';
import type { RenderResult } from '@testing-library/react';

declare global {
  // Jest globals
  const jest: typeof import('@jest/globals')['jest'];
  const expect: typeof import('@jest/globals')['expect'];
  const describe: typeof import('@jest/globals')['describe'];
  const it: typeof import('@jest/globals')['it'];
  const test: typeof import('@jest/globals')['test'];
  const beforeAll: typeof import('@jest/globals')['beforeAll'];
  const beforeEach: typeof import('@jest/globals')['beforeEach'];
  const afterAll: typeof import('@jest/globals')['afterAll'];
  const afterEach: typeof import('@jest/globals')['afterEach'];

  namespace jest {
    type Mock<T = any, Y extends any[] = any[]> = {
      (...args: Y): T;
      mockClear: () => void;
      mockReset: () => void;
      mockRestore: () => void;
      mockImplementation: (fn: (...args: Y) => T) => Mock<T, Y>;
      mockImplementationOnce: (fn: (...args: Y) => T) => Mock<T, Y>;
      mockReturnValue: (value: T) => Mock<T, Y>;
      mockReturnValueOnce: (value: T) => Mock<T, Y>;
      mockResolvedValue: (value: T) => Mock<Promise<T>, Y>;
      mockResolvedValueOnce: (value: T) => Mock<Promise<T>, Y>;
      mockRejectedValue: (value: any) => Mock<Promise<T>, Y>;
      mockRejectedValueOnce: (value: any) => Mock<Promise<T>, Y>;
      mock: {
        calls: Y[];
        instances: T[];
        invocationCallOrder: number[];
        results: { type: 'return' | 'throw'; value: any }[];
        lastCall?: Y;
      };
    };

    type SpyInstance<T = any, Y extends any[] = any[]> = {
      (...args: Y): T;
    } & Mock<T, Y>;

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
      toThrow(expected?: string | Error | RegExp): R;
      toThrowError(expected?: string | Error | RegExp): R;
    }

    interface JestMatchers<T> {
      not: JestMatchers<T>;
      toBe(expected: any): void;
      toEqual(expected: any): void;
      toMatch(expected: string | RegExp): void;
      toBeTruthy(): void;
      toBeFalsy(): void;
      toBeNull(): void;
      toBeUndefined(): void;
      toBeDefined(): void;
      toBeInstanceOf(expected: any): void;
      toHaveLength(expected: number): void;
      toContain(expected: any): void;
      toThrow(expected?: string | Error | RegExp): void;
    }
  }
}

// Testing Library types
declare module '@testing-library/react' {
  export interface RenderOptions {
    container?: HTMLElement;
    baseElement?: HTMLElement;
    hydrate?: boolean;
    wrapper?: React.ComponentType;
  }

  export function render(
    ui: React.ReactElement,
    options?: RenderOptions
  ): RenderResult & {
    rerender: (ui: React.ReactElement) => void;
    unmount: () => void;
    container: HTMLElement;
  };

  export const screen: {
    getByText: (text: string | RegExp) => HTMLElement;
    getByRole: (role: string, options?: { name?: string | RegExp }) => HTMLElement;
    queryByText: (text: string | RegExp) => HTMLElement | null;
    queryByRole: (role: string, options?: { name?: string | RegExp }) => HTMLElement | null;
    getAllByRole: (role: string) => HTMLElement[];
    getByTestId: (testId: string) => HTMLElement;
    queryByTestId: (testId: string) => HTMLElement | null;
  };
}

export {};
