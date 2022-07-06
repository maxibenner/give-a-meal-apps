import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createClient,
  SupabaseClient
} from "@supabase/supabase-js";
import { supabaseConfig } from "../constants/env";


// Initialize supabase
export var supabase: SupabaseClient;
supabase = createClient(supabaseConfig.apiUrl, supabaseConfig.anonKey, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false,
});
