// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cqzapjfvheuzkbsnmxws.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxemFwamZ2aGV1emtic25teHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0Nzg0NjEsImV4cCI6MjA1OTA1NDQ2MX0.cKKkYjGTT6V-DxGC8zD6zfiORiGThO4wIPy5adJNuBs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);