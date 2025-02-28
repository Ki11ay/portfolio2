interface ScrollToOptions {
    offset?: number;
    duration?: number;
    ease?: string;
}
export declare const scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
export declare const scrollToTop: (duration?: number) => void;
export declare const scrollToSection: (sectionId: string, offset?: number) => void;
export {};
//# sourceMappingURL=scrollUtils.d.ts.map