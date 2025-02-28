import type { RefObject } from 'react';
interface ScrollAnimationConfig {
    y?: number;
    opacity?: number;
    scale?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    once?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
}
export declare function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(config?: ScrollAnimationConfig): RefObject<T>;
interface ParallaxConfig {
    speed?: number;
    direction?: 'vertical' | 'horizontal';
    reverse?: boolean;
    start?: string;
    end?: string;
}
export declare function useParallax<T extends HTMLElement = HTMLDivElement>(config?: ParallaxConfig): RefObject<T>;
export default useScrollAnimation;
//# sourceMappingURL=useScrollAnimation.d.ts.map