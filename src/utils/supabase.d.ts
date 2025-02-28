export declare const supabase: import("@supabase/supabase-js").SupabaseClient<any, "public", any>;
export declare function getWritings(): Promise<any[]>;
export declare function getWritingById(id: string): Promise<any>;
export declare function createWriting(writing: {
    title: string;
    description: string;
    content: string;
    tags: string[];
}): Promise<any>;
//# sourceMappingURL=supabase.d.ts.map