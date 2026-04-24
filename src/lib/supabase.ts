import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim() ||
  'https://fzklyclzehpmggqvjipy.supabase.co';

const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  'sb_publishable_q5Ghc7KehdhGbK9VCS2eGA_wU0imUWp';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    detectSessionInUrl: true,
    flowType: 'pkce',
    storageKey: 'menudoapp-web-auth',
  },
});
