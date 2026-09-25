export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          acknowledged_at: string | null
          created_at: string
          details: string | null
          id: string
          player_id: string | null
          resolved_at: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
          state: Database["public"]["Enums"]["alert_state"]
          title: string
          zone_id: string
        }
        Insert: {
          acknowledged_at?: string | null
          created_at?: string
          details?: string | null
          id?: string
          player_id?: string | null
          resolved_at?: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
          state?: Database["public"]["Enums"]["alert_state"]
          title: string
          zone_id: string
        }
        Update: {
          acknowledged_at?: string | null
          created_at?: string
          details?: string | null
          id?: string
          player_id?: string | null
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          state?: Database["public"]["Enums"]["alert_state"]
          title?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "audio_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      audio_zones: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          location_id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audio_zones_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      branch_issue_reports: {
        Row: {
          created_at: string
          created_by: string
          id: string
          issue_type: string
          location_id: string
          note: string | null
          organization_id: string
          resolved_at: string | null
          state: Database["public"]["Enums"]["alert_state"]
          zone_id: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          issue_type: string
          location_id: string
          note?: string | null
          organization_id: string
          resolved_at?: string | null
          state?: Database["public"]["Enums"]["alert_state"]
          zone_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          issue_type?: string
          location_id?: string
          note?: string | null
          organization_id?: string
          resolved_at?: string | null
          state?: Database["public"]["Enums"]["alert_state"]
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "branch_issue_reports_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branch_issue_reports_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branch_issue_reports_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "audio_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_targets: {
        Row: {
          campaign_id: string
          created_at: string
          zone_id: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          zone_id: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_targets_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_targets_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "audio_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          content_item_id: string | null
          created_at: string
          created_by: string
          ends_at: string | null
          id: string
          organization_id: string
          starts_at: string | null
          state: Database["public"]["Enums"]["campaign_state"]
          title: string
          updated_at: string
        }
        Insert: {
          content_item_id?: string | null
          created_at?: string
          created_by: string
          ends_at?: string | null
          id?: string
          organization_id: string
          starts_at?: string | null
          state?: Database["public"]["Enums"]["campaign_state"]
          title: string
          updated_at?: string
        }
        Update: {
          content_item_id?: string | null
          created_at?: string
          created_by?: string
          ends_at?: string | null
          id?: string
          organization_id?: string
          starts_at?: string | null
          state?: Database["public"]["Enums"]["campaign_state"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_content_item_id_fkey"
            columns: ["content_item_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      content_items: {
        Row: {
          bucket_id: string
          created_at: string
          created_by: string
          description: string | null
          duration_seconds: number | null
          file_size_bytes: number | null
          id: string
          kind: string
          language: string
          mime_type: string | null
          organization_id: string
          state: Database["public"]["Enums"]["content_state"]
          storage_path: string | null
          title: string
          updated_at: string
        }
        Insert: {
          bucket_id?: string
          created_at?: string
          created_by: string
          description?: string | null
          duration_seconds?: number | null
          file_size_bytes?: number | null
          id?: string
          kind: string
          language?: string
          mime_type?: string | null
          organization_id: string
          state?: Database["public"]["Enums"]["content_state"]
          storage_path?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          duration_seconds?: number | null
          file_size_bytes?: number | null
          id?: string
          kind?: string
          language?: string
          mime_type?: string | null
          organization_id?: string
          state?: Database["public"]["Enums"]["content_state"]
          storage_path?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_items_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          code: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          organization_id: string
          timezone: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          code?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          organization_id: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          code?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          organization_id?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          location_id: string | null
          organization_id: string
          role: Database["public"]["Enums"]["branchcast_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          location_id?: string | null
          organization_id: string
          role?: Database["public"]["Enums"]["branchcast_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          location_id?: string | null
          organization_id?: string
          role?: Database["public"]["Enums"]["branchcast_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          created_by: string
          id: string
          name: string
          onboarding_completed_at: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          name: string
          onboarding_completed_at?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          onboarding_completed_at?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      player_events: {
        Row: {
          event_type: string
          id: number
          occurred_at: string
          payload: Json
          player_id: string
        }
        Insert: {
          event_type: string
          id?: never
          occurred_at?: string
          payload?: Json
          player_id: string
        }
        Update: {
          event_type?: string
          id?: never
          occurred_at?: string
          payload?: Json
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_events_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          created_at: string
          device_code: string
          display_name: string | null
          firmware_version: string | null
          id: string
          last_seen_at: string | null
          pairing_code: string | null
          pairing_expires_at: string | null
          state: Database["public"]["Enums"]["player_state"]
          updated_at: string
          zone_id: string
        }
        Insert: {
          created_at?: string
          device_code: string
          display_name?: string | null
          firmware_version?: string | null
          id?: string
          last_seen_at?: string | null
          pairing_code?: string | null
          pairing_expires_at?: string | null
          state?: Database["public"]["Enums"]["player_state"]
          updated_at?: string
          zone_id: string
        }
        Update: {
          created_at?: string
          device_code?: string
          display_name?: string | null
          firmware_version?: string | null
          id?: string
          last_seen_at?: string | null
          pairing_code?: string | null
          pairing_expires_at?: string | null
          state?: Database["public"]["Enums"]["player_state"]
          updated_at?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "audio_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          preferred_locale: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          preferred_locale?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          preferred_locale?: string
          updated_at?: string
        }
        Relationships: []
      }
      schedule_entries: {
        Row: {
          campaign_id: string | null
          content_item_id: string | null
          created_at: string
          created_by: string
          ends_at: string | null
          id: string
          recurrence_rule: string | null
          starts_at: string
          updated_at: string
          zone_id: string
        }
        Insert: {
          campaign_id?: string | null
          content_item_id?: string | null
          created_at?: string
          created_by: string
          ends_at?: string | null
          id?: string
          recurrence_rule?: string | null
          starts_at: string
          updated_at?: string
          zone_id: string
        }
        Update: {
          campaign_id?: string | null
          content_item_id?: string | null
          created_at?: string
          created_by?: string
          ends_at?: string | null
          id?: string
          recurrence_rule?: string | null
          starts_at?: string
          updated_at?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_entries_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_entries_content_item_id_fkey"
            columns: ["content_item_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_entries_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "audio_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          created_by: string
          email: string
          expires_at: string
          id: string
          location_id: string | null
          organization_id: string
          role: Database["public"]["Enums"]["branchcast_role"]
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          created_by: string
          email: string
          expires_at?: string
          id?: string
          location_id?: string | null
          organization_id: string
          role?: Database["public"]["Enums"]["branchcast_role"]
          token?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          created_by?: string
          email?: string
          expires_at?: string
          id?: string
          location_id?: string | null
          organization_id?: string
          role?: Database["public"]["Enums"]["branchcast_role"]
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_invites_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_invites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_organization: {
        Args: { _name: string; _slug: string }
        Returns: {
          created_at: string
          created_by: string
          id: string
          name: string
          onboarding_completed_at: string | null
          slug: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "organizations"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      alert_severity: "info" | "warning" | "critical"
      alert_state: "open" | "acknowledged" | "resolved"
      branchcast_role:
        | "owner"
        | "marketing"
        | "operations"
        | "branch"
        | "viewer"
      campaign_state: "draft" | "scheduled" | "active" | "paused" | "completed"
      content_state: "draft" | "ready" | "archived"
      player_state: "online" | "offline" | "warning" | "unpaired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_severity: ["info", "warning", "critical"],
      alert_state: ["open", "acknowledged", "resolved"],
      branchcast_role: ["owner", "marketing", "operations", "branch", "viewer"],
      campaign_state: ["draft", "scheduled", "active", "paused", "completed"],
      content_state: ["draft", "ready", "archived"],
      player_state: ["online", "offline", "warning", "unpaired"],
    },
  },
} as const
