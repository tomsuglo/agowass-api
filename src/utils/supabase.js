// // utils/supabase.js
// import { createClient } from "@supabase/supabase-js";

// const SUPABASE_URL = "https://dyetluzxxofyghdrygle.supabase.co";
// const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZXRsdXp4eG9meWdoZHJ5Z2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNjc1NTgsImV4cCI6MjA3Mjk0MzU1OH0.8bvH2hV6OTxSUzEoZi8s8snkeuec66r-i_pfymdKhho"; // Keep safe in env

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
