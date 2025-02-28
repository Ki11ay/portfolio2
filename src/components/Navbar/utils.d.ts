interface Section {
    id: string;
    label: string;
}
export declare const navItems: readonly [{
    readonly id: "home";
    readonly label: "Home";
}, {
    readonly id: "what-i-do";
    readonly label: "What I Do";
}, {
    readonly id: "tech-stack";
    readonly label: "Skills";
}, {
    readonly id: "work";
    readonly label: "Work";
}, {
    readonly id: "hobbies";
    readonly label: "Hobbies";
}, {
    readonly id: "contact";
    readonly label: "Contact";
}];
export type SectionId = typeof navItems[number]['id'];
export declare const getSectionOffset: (sectionId: string) => number;
export declare const findActiveSection: (sections: ReadonlyArray<Section>, scrollPosition: number) => SectionId;
export declare const getScrollProgress: () => number;
export declare const isInViewport: (element: HTMLElement) => boolean;
export {};
//# sourceMappingURL=utils.d.ts.map