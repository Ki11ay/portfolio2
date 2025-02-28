declare module 'gsap' {
  export * from 'gsap/gsap-core';
  export { gsap as default } from 'gsap/gsap-core';
}

declare module 'gsap/gsap-core' {
  export type GSAPCallback = () => void;

  export interface TweenVars {
    [key: string]: any;
    delay?: number;
    duration?: number;
    ease?: string | Function;
    onComplete?: GSAPCallback;
    onStart?: GSAPCallback;
    onUpdate?: GSAPCallback;
    onRepeat?: GSAPCallback;
    repeat?: number;
    repeatDelay?: number;
    yoyo?: boolean;
    [key: string]: any;
  }

  export interface Timeline extends TweenVars {
    autoRemoveChildren?: boolean;
    defaults?: TweenVars;
    delay?: number;
    duration?: number;
    labels?: { [key: string]: number };
    smoothChildTiming?: boolean;
    vars?: TweenVars;
  }

  export interface Tween extends TweenVars {
    vars: TweenVars;
    timeline(): Timeline;
    kill(vars?: object | string, target?: object | string): this;
    pause(atTime?: number, suppressEvents?: boolean): this;
    play(from?: number | string, suppressEvents?: boolean): this;
    progress(value?: number, suppressEvents?: boolean): number;
    restart(includeDelay?: boolean, suppressEvents?: boolean): this;
    resume(from?: number | string, suppressEvents?: boolean): this;
    reverse(from?: number | string, suppressEvents?: boolean): this;
    seek(time: number | string, suppressEvents?: boolean): this;
    timeScale(value?: number): number;
  }

  export interface GSAPStatic {
    config(config: object): void;
    registerPlugin(...args: any[]): void;
    core: { Timeline: new () => Timeline; Tween: new () => Tween };
    defaults(obj: TweenVars): void;
    to(target: any, vars: TweenVars): Tween;
    from(target: any, vars: TweenVars): Tween;
    fromTo(target: any, fromVars: TweenVars, toVars: TweenVars): Tween;
    set(target: any, vars: TweenVars): Tween;
    timeline(vars?: TweenVars): Timeline;
    getProperty(target: any, property: string, unit?: string): string | number;
    quickSetter(target: any, property: string, unit?: string): Function;
    killTweensOf(target: any, vars?: TweenVars): void;
    utils: {
      selector(value: any): Element[];
      toArray(value: any): any[];
      mapRange(inMin: number, inMax: number, outMin: number, outMax: number, value: number): number;
      interpolate(start: number | number[], end: number | number[], progress: number): number | number[];
      snap(increment: number | number[], value: number): number;
      random(min: number, max: number): number;
      shuffle(array: any[]): any[];
      distribute(config: object): number[];
    };
  }

  export interface ScrollTrigger {
    kill(): void;
    disable(): void;
    enable(): void;
    refresh(): void;
  }

  export interface GSAPScrollTrigger {
    create(vars: object): ScrollTrigger;
    refresh(soft?: boolean): void;
    update(): void;
    clearScrollMemory(): void;
    maxScroll(target: Element | Window): number;
    getById(id: string): ScrollTrigger;
    getAll(): ScrollTrigger[];
    isScrolling(): boolean;
    addEventListener(type: string, callback: Function): void;
    removeEventListener(type: string, callback: Function): void;
  }

  export const gsap: GSAPStatic;
}