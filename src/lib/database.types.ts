export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          auth_user_id: string;
          full_name: string | null;
          email: string;
          avatar_url: string | null;
          country: string | null;
          timezone: string | null;
          role: "user" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id: string;
          full_name?: string | null;
          email: string;
          avatar_url?: string | null;
          country?: string | null;
          timezone?: string | null;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      businesses: {
        Row: {
          id: string;
          profile_id: string;
          business_name: string;
          slug: string;
          industry: string | null;
          website: string | null;
          description: string | null;
          logo_url: string | null;
          country: string | null;
          timezone: string | null;
          currency: string;
          business_size: string | null;
          status: "active" | "inactive" | "deleted";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          business_name: string;
          slug?: string;
          industry?: string | null;
          website?: string | null;
          description?: string | null;
          logo_url?: string | null;
          country?: string | null;
          timezone?: string | null;
          currency?: string;
          business_size?: string | null;
          status?: "active" | "inactive" | "deleted";
        };
        Update: Partial<Database["public"]["Tables"]["businesses"]["Insert"]>;
      };
      business_settings: {
        Row: {
          id: string;
          business_id: string;
          language: string;
          default_ai_provider: string | null;
          timezone: string | null;
          notification_email: string | null;
          branding_color: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          language?: string;
          default_ai_provider?: string | null;
          timezone?: string | null;
          notification_email?: string | null;
          branding_color?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["business_settings"]["Insert"]>;
      };
      subscriptions: {
        Row: {
          id: string;
          profile_id: string;
          plan: "starter" | "growth" | "business" | "enterprise" | "trial";
          billing_cycle: "monthly" | "annual";
          status: "active" | "cancelled" | "expired" | "trial";
          started_at: string;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          profile_id: string;
          plan?: "starter" | "growth" | "business" | "enterprise" | "trial";
          billing_cycle?: "monthly" | "annual";
          status?: "active" | "cancelled" | "expired" | "trial";
          started_at?: string;
          expires_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["subscriptions"]["Insert"]>;
      };
      fuel_wallet: {
        Row: {
          id: string;
          profile_id: string;
          balance: number;
          trial_balance: number;
          last_updated: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          balance?: number;
          trial_balance?: number;
          last_updated?: string;
        };
        Update: Partial<Database["public"]["Tables"]["fuel_wallet"]["Insert"]>;
      };
      fuel_transactions: {
        Row: {
          id: string;
          wallet_id: string;
          business_id: string | null;
          type: "credit" | "debit" | "purchase";
          credits: number;
          usd_cost: number | null;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          wallet_id: string;
          business_id?: string | null;
          type: "credit" | "debit" | "purchase";
          credits: number;
          usd_cost?: number | null;
          description: string;
        };
        Update: Partial<Database["public"]["Tables"]["fuel_transactions"]["Insert"]>;
      };
      ai_solutions: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          category: string;
          icon: string | null;
          thumbnail: string | null;
          status: "draft" | "published" | "archived";
          is_featured: boolean;
          current_version: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          category: string;
          icon?: string | null;
          thumbnail?: string | null;
          status?: "draft" | "published" | "archived";
          is_featured?: boolean;
          current_version?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["ai_solutions"]["Insert"]>;
      };
      solution_versions: {
        Row: {
          id: string;
          solution_id: string;
          version: string;
          configuration_json: Json;
          workflow_json: Json;
          prompt_json: Json;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          solution_id: string;
          version: string;
          configuration_json?: Json;
          workflow_json?: Json;
          prompt_json?: Json;
          published?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["solution_versions"]["Insert"]>;
      };
      installed_solutions: {
        Row: {
          id: string;
          business_id: string;
          solution_id: string;
          version_id: string | null;
          display_name: string;
          status: "active" | "inactive" | "error";
          installed_at: string;
          last_execution: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          solution_id: string;
          version_id?: string | null;
          display_name: string;
          status?: "active" | "inactive" | "error";
          installed_at?: string;
          last_execution?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["installed_solutions"]["Insert"]>;
      };
      solution_configuration: {
        Row: {
          id: string;
          installed_solution_id: string;
          configuration_json: Json;
          prompt_overrides: Json;
          trigger_settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          installed_solution_id: string;
          configuration_json?: Json;
          prompt_overrides?: Json;
          trigger_settings?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["solution_configuration"]["Insert"]>;
      };
      knowledge_sources: {
        Row: {
          id: string;
          business_id: string;
          type: "website" | "pdf" | "faq" | "text" | "url";
          name: string;
          status: "pending" | "processing" | "ready" | "error";
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          type: "website" | "pdf" | "faq" | "text" | "url";
          name: string;
          status?: "pending" | "processing" | "ready" | "error";
        };
        Update: Partial<Database["public"]["Tables"]["knowledge_sources"]["Insert"]>;
      };
      knowledge_files: {
        Row: {
          id: string;
          knowledge_source_id: string;
          filename: string;
          storage_path: string;
          mime_type: string;
          file_size: number;
          processed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          knowledge_source_id: string;
          filename: string;
          storage_path: string;
          mime_type: string;
          file_size: number;
          processed?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["knowledge_files"]["Insert"]>;
      };
      website_sources: {
        Row: {
          id: string;
          knowledge_source_id: string;
          website_url: string;
          crawl_depth: number;
          last_crawled: string | null;
          status: "pending" | "crawling" | "done" | "error";
        };
        Insert: {
          id?: string;
          knowledge_source_id: string;
          website_url: string;
          crawl_depth?: number;
          last_crawled?: string | null;
          status?: "pending" | "crawling" | "done" | "error";
        };
        Update: Partial<Database["public"]["Tables"]["website_sources"]["Insert"]>;
      };
      faqs: {
        Row: {
          id: string;
          business_id: string;
          question: string;
          answer: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          question: string;
          answer: string;
        };
        Update: Partial<Database["public"]["Tables"]["faqs"]["Insert"]>;
      };
      ai_providers: {
        Row: {
          id: string;
          name: string;
          model: string;
          provider: string;
          cost_input: number;
          cost_output: number;
          enabled: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          model: string;
          provider: string;
          cost_input?: number;
          cost_output?: number;
          enabled?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["ai_providers"]["Insert"]>;
      };
      workflow_executions: {
        Row: {
          id: string;
          business_id: string;
          installed_solution_id: string;
          trigger_type: string;
          status: "running" | "completed" | "failed";
          started_at: string;
          finished_at: string | null;
          fuel_used: number;
          provider: string | null;
          model: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          installed_solution_id: string;
          trigger_type: string;
          status?: "running" | "completed" | "failed";
          started_at?: string;
          finished_at?: string | null;
          fuel_used?: number;
          provider?: string | null;
          model?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["workflow_executions"]["Insert"]>;
      };
      execution_logs: {
        Row: {
          id: string;
          execution_id: string;
          step_name: string;
          status: "running" | "completed" | "failed";
          input_json: Json;
          output_json: Json;
          duration_ms: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          execution_id: string;
          step_name: string;
          status: "running" | "completed" | "failed";
          input_json?: Json;
          output_json?: Json;
          duration_ms?: number | null;
        };
        Update: Partial<Database["public"]["Tables"]["execution_logs"]["Insert"]>;
      };
      custom_solution_requests: {
        Row: {
          id: string;
          profile_id: string;
          business_id: string | null;
          title: string;
          description: string;
          website: string | null;
          priority: "low" | "normal" | "high";
          status: "pending" | "reviewing" | "quoted" | "accepted" | "building" | "completed" | "cancelled";
          admin_notes: string | null;
          quoted_price: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          business_id?: string | null;
          title: string;
          description: string;
          website?: string | null;
          priority?: "low" | "normal" | "high";
          status?: "pending" | "reviewing" | "quoted" | "accepted" | "building" | "completed" | "cancelled";
          admin_notes?: string | null;
          quoted_price?: number | null;
        };
        Update: Partial<Database["public"]["Tables"]["custom_solution_requests"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Business = Database["public"]["Tables"]["businesses"]["Row"];
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type FuelWallet = Database["public"]["Tables"]["fuel_wallet"]["Row"];
export type FuelTransaction = Database["public"]["Tables"]["fuel_transactions"]["Row"];
export type AiSolution = Database["public"]["Tables"]["ai_solutions"]["Row"];
export type InstalledSolution = Database["public"]["Tables"]["installed_solutions"]["Row"];
export type WorkflowExecution = Database["public"]["Tables"]["workflow_executions"]["Row"];
export type CustomSolutionRequest = Database["public"]["Tables"]["custom_solution_requests"]["Row"];
