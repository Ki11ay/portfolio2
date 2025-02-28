export declare function getEnvVar<T extends keyof ImportMetaEnv>(key: T): string;
export declare function getBooleanEnvVar(key: keyof ImportMetaEnv): boolean;
export declare function getNumberEnvVar(key: keyof ImportMetaEnv): number;
export declare function validateRequiredEnvVars(): void;
export declare function getEmailConfig(): {
    serviceId: string;
    templateId: string;
    userId: string;
    toEmail: string;
};
export declare function getSiteConfig(): {
    url: string;
    name: string;
    description: string;
};
export declare function getFeatureFlags(): {
    analytics: boolean;
    pwa: boolean;
    offlineSupport: boolean;
    pushNotifications: boolean;
};
export declare function getDebugSettings(): {
    debug: boolean;
    logLevel: string;
};
export declare function getSupabaseConfig(): {
    url: string;
    anonKey: string;
};
export declare function getSocialLinks(): {
    github: string;
    linkedin: string;
    email: string;
};
//# sourceMappingURL=envUtils.d.ts.map