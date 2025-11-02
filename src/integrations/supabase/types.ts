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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      agency_branding: {
        Row: {
          address_city: string | null
          address_state: string | null
          address_street: string | null
          address_zip: string | null
          agency_description: string | null
          agency_id: string
          agency_model: Database["public"]["Enums"]["agency_model"] | null
          billing_email: string | null
          company_name: string | null
          created_at: string | null
          footer_text: string | null
          id: string
          legal_name: string | null
          logo_url: string | null
          phone: string | null
          primary_color: string | null
          primary_contact_email: string | null
          primary_contact_name: string | null
          primary_contact_phone: string | null
          secondary_color: string | null
          updated_at: string | null
        }
        Insert: {
          address_city?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          agency_description?: string | null
          agency_id: string
          agency_model?: Database["public"]["Enums"]["agency_model"] | null
          billing_email?: string | null
          company_name?: string | null
          created_at?: string | null
          footer_text?: string | null
          id?: string
          legal_name?: string | null
          logo_url?: string | null
          phone?: string | null
          primary_color?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          secondary_color?: string | null
          updated_at?: string | null
        }
        Update: {
          address_city?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          agency_description?: string | null
          agency_id?: string
          agency_model?: Database["public"]["Enums"]["agency_model"] | null
          billing_email?: string | null
          company_name?: string | null
          created_at?: string | null
          footer_text?: string | null
          id?: string
          legal_name?: string | null
          logo_url?: string | null
          phone?: string | null
          primary_color?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          secondary_color?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      agency_notification_preferences: {
        Row: {
          agency_id: string
          created_at: string | null
          email_enabled: boolean | null
          email_frequency: string | null
          id: string
          in_app_enabled: boolean | null
          performance_emails_enabled: boolean | null
          sms_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          agency_id: string
          created_at?: string | null
          email_enabled?: boolean | null
          email_frequency?: string | null
          id?: string
          in_app_enabled?: boolean | null
          performance_emails_enabled?: boolean | null
          sms_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          agency_id?: string
          created_at?: string | null
          email_enabled?: boolean | null
          email_frequency?: string | null
          id?: string
          in_app_enabled?: boolean | null
          performance_emails_enabled?: boolean | null
          sms_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      agency_notification_settings: {
        Row: {
          agency_id: string
          created_at: string | null
          enabled: boolean | null
          id: string
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          agency_id: string
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          agency_id?: string
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agency_notification_settings_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "notification_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_notification_preferences: {
        Row: {
          agent_id: string
          created_at: string | null
          email_enabled: boolean | null
          email_frequency: string | null
          id: string
          in_app_enabled: boolean | null
          performance_emails_enabled: boolean | null
          sms_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          email_enabled?: boolean | null
          email_frequency?: string | null
          id?: string
          in_app_enabled?: boolean | null
          performance_emails_enabled?: boolean | null
          sms_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          email_enabled?: boolean | null
          email_frequency?: string | null
          id?: string
          in_app_enabled?: boolean | null
          performance_emails_enabled?: boolean | null
          sms_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notification_templates: {
        Row: {
          active: boolean | null
          body_html: string
          body_sms: string | null
          created_at: string | null
          created_by: string | null
          customizable: boolean | null
          id: string
          name: string
          notification_type: string
          subject: string | null
          trigger_event: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          body_html: string
          body_sms?: string | null
          created_at?: string | null
          created_by?: string | null
          customizable?: boolean | null
          id?: string
          name: string
          notification_type: string
          subject?: string | null
          trigger_event: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          body_html?: string
          body_sms?: string | null
          created_at?: string | null
          created_by?: string | null
          customizable?: boolean | null
          id?: string
          name?: string
          notification_type?: string
          subject?: string | null
          trigger_event?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          agency_id: string
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agency_id: string
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agency_id?: string
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_agency_role: {
        Args: {
          _agency_id: string
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      agency_model: "marketplace_buyers" | "bring_your_own_media" | "hybrid"
      app_role: "owner" | "admin" | "agent"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      agency_model: ["marketplace_buyers", "bring_your_own_media", "hybrid"],
      app_role: ["owner", "admin", "agent"],
    },
  },
} as const
