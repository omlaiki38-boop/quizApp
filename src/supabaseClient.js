import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gfdqywbgwpmsqqyvaafc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZHF5d2Jnd3Btc3FxeXZhYWZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQyNjQ2MSwiZXhwIjoyMDczMDAyNDYxfQ.DDa15Vg42Llc34aoSo8DWKQpnJae0eQzcOvPbwTbtg8";
export const supabase = createClient(supabaseUrl, supabaseKey);
