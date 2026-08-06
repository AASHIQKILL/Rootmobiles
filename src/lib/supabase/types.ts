/**
 * Placeholder Database type. Once a real Supabase project exists, replace this
 * with the generated types:
 *   npx supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts
 */
type LooseTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: never[];
};

export interface Database {
  public: {
    Tables: Record<string, LooseTable>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
