interface UseIntersectionObserverProps {
    threshold?: number;
    rootMargin?: string;
    onlyOnce?: boolean;
}
export declare const useIntersectionObserver: ({ threshold, rootMargin, onlyOnce }?: UseIntersectionObserverProps) => {
    elementRef: import("react").MutableRefObject<HTMLElement | null>;
    isVisible: boolean;
};
export default useIntersectionObserver;
//# sourceMappingURL=useIntersectionObserver.d.ts.map