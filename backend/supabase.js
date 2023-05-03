import * as SecureStore from "expo-secure-store";
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key, value) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://qbwfeeguozaiinzkxish.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFid2ZlZWd1b3phaWluemt4aXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwODE0NzQsImV4cCI6MTk5ODY1NzQ3NH0.YE1QpV7L9y44TeWPK2psfaRdBaSBBd-tZNL24Tq-tEI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});