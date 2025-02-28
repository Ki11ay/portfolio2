export declare const NAV_ITEMS: readonly [{
    readonly id: "home";
    readonly label: "Home";
}, {
    readonly id: "what-i-do";
    readonly label: "What I Do";
}, {
    readonly id: "work";
    readonly label: "Work";
}, {
    readonly id: "tech-stack";
    readonly label: "Skills";
}, {
    readonly id: "hobbies";
    readonly label: "Hobbies";
}, {
    readonly id: "contact";
    readonly label: "Contact";
}];
export type SectionId = typeof NAV_ITEMS[number]['id'];
export interface NavItem {
    id: SectionId;
    label: string;
}
export interface ScrollState {
    currentSection: SectionId;
    progress: number;
}
//# sourceMappingURL=types.d.ts.map