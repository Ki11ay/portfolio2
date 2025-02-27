export function getEnvVar<T extends keyof ImportMetaEnv>(key: T): string {
  const value = import.meta.env[key];

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
}

export function getBooleanEnvVar(key: keyof ImportMetaEnv): boolean {
  const value = getEnvVar(key).toLowerCase();
  return value === 'true' || value === '1';
}

export function getNumberEnvVar(key: keyof ImportMetaEnv): number {
  const value = getEnvVar(key);
  const parsed = parseInt(value, 10);

  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} is not a valid number`);
  }

  return parsed;
}

// Helper to get required environment variables during initialization
export function validateRequiredEnvVars() {
  const required = [
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_USER_ID',
    'VITE_EMAILJS_TO_EMAIL',
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ] as const;

  const missing = required.filter(key => !import.meta.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

// Helper to get email configuration
export function getEmailConfig() {
  return {
    serviceId: getEnvVar('VITE_EMAILJS_SERVICE_ID'),
    templateId: getEnvVar('VITE_EMAILJS_TEMPLATE_ID'),
    userId: getEnvVar('VITE_EMAILJS_USER_ID'),
    toEmail: getEnvVar('VITE_EMAILJS_TO_EMAIL')
  };
}

// Helper to get site configuration
export function getSiteConfig() {
  return {
    url: getEnvVar('VITE_SITE_URL'),
    name: getEnvVar('VITE_SITE_NAME'),
    description: getEnvVar('VITE_SITE_DESCRIPTION')
  };
}

// Helper to get feature flags
export function getFeatureFlags() {
  return {
    analytics: getBooleanEnvVar('VITE_ENABLE_ANALYTICS'),
    pwa: getBooleanEnvVar('VITE_ENABLE_PWA'),
    offlineSupport: getBooleanEnvVar('VITE_ENABLE_OFFLINE_SUPPORT'),
    pushNotifications: getBooleanEnvVar('VITE_ENABLE_PUSH_NOTIFICATIONS')
  };
}

// Helper to get debug settings
export function getDebugSettings() {
  return {
    debug: getBooleanEnvVar('VITE_DEBUG_MODE'),
    logLevel: getEnvVar('VITE_LOG_LEVEL')
  };
}

// Helper to get supabase configuration
export function getSupabaseConfig() {
  return {
    url: getEnvVar('VITE_SUPABASE_URL'),
    anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY')
  };
}

// Helper to get social links
export function getSocialLinks() {
  return {
    github: getEnvVar('VITE_GITHUB_URL'),
    linkedin: getEnvVar('VITE_LINKEDIN_URL'),
    email: getEnvVar('VITE_EMAIL')
  };
}
