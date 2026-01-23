import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://utcpyrnlsynnpzejcfqz.supabase.co';
const supabaseAnonKey = 'sb_publishable_Ls2qanuERBAaXSCbdSU0-Q_t3Ios2EU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
