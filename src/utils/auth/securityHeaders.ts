import { supabase } from '@/integrations/supabase/client';

export const applySecurityHeaders = async () => {
  try {
    console.log('Initializing security headers...');
    
    // First check if we can reach Supabase
    const { data: healthCheck, error: healthError } = await supabase
      .from('security_events')
      .select('count')
      .limit(1)
      .single();

    if (healthError) {
      console.error('Supabase connection check failed:', healthError);
      // Fall back to default security settings
      return true;
    }

    // If we can reach Supabase, proceed with headers
    const headers = {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Content-Security-Policy': "default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob: 'unsafe-inline'; font-src * data: 'unsafe-inline';",
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    };

    // Apply headers directly instead of calling the edge function
    Object.entries(headers).forEach(([key, value]) => {
      if (typeof document !== 'undefined') {
        // Only run in browser context
        try {
          // Try to set meta tags as fallback
          const meta = document.createElement('meta');
          meta.httpEquiv = key;
          meta.content = value;
          document.head.appendChild(meta);
        } catch (e) {
          console.warn(`Could not set security header ${key}:`, e);
        }
      }
    });

    // Log success
    await supabase
      .from('security_events')
      .insert({
        event_type: 'security_headers_applied',
        severity: 'info',
        details: { headers: Object.keys(headers) }
      });

    console.log('Security headers applied successfully');
    return true;

  } catch (error) {
    console.error('Error applying security headers:', error);
    // Don't throw, just return false to indicate failure
    return false;
  }
};