export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bonuses: {
        Row: {
          id: number
          casino_id: number
          name: string
          description: string
          bonus_code: string | null
          wagering_requirement: number | null
          min_deposit: number | null
          max_amount: number | null
          valid_until: string | null
          bonus_type: string
          is_exclusive: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          casino_id: number
          name: string
          description: string
          bonus_code?: string | null
          wagering_requirement?: number | null
          min_deposit?: number | null
          max_amount?: number | null
          valid_until?: string | null
          bonus_type: string
          is_exclusive?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          casino_id?: number
          name?: string
          description?: string
          bonus_code?: string | null
          wagering_requirement?: number | null
          min_deposit?: number | null
          max_amount?: number | null
          valid_until?: string | null
          bonus_type?: string
          is_exclusive?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bonuses_casino_id_fkey"
            columns: ["casino_id"]
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          }
        ]
      }
      casino_countries: {
        Row: {
          id: number
          casino_id: number
          country_id: number
          is_restricted: boolean
          created_at: string
        }
        Insert: {
          id?: number
          casino_id: number
          country_id: number
          is_restricted?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          casino_id?: number
          country_id?: number
          is_restricted?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "casino_countries_casino_id_fkey"
            columns: ["casino_id"]
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casino_countries_country_id_fkey"
            columns: ["country_id"]
            referencedRelation: "countries"
            referencedColumns: ["id"]
          }
        ]
      }
      casino_features: {
        Row: {
          id: number
          casino_id: number
          feature_id: number
          created_at: string
        }
        Insert: {
          id?: number
          casino_id: number
          feature_id: number
          created_at?: string
        }
        Update: {
          id?: number
          casino_id?: number
          feature_id?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "casino_features_casino_id_fkey"
            columns: ["casino_id"]
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casino_features_feature_id_fkey"
            columns: ["feature_id"]
            referencedRelation: "features"
            referencedColumns: ["id"]
          }
        ]
      }
      casino_game_providers: {
        Row: {
          id: number
          casino_id: number
          game_provider_id: number
          created_at: string
        }
        Insert: {
          id?: number
          casino_id: number
          game_provider_id: number
          created_at?: string
        }
        Update: {
          id?: number
          casino_id?: number
          game_provider_id?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "casino_game_providers_casino_id_fkey"
            columns: ["casino_id"]
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casino_game_providers_game_provider_id_fkey"
            columns: ["game_provider_id"]
            referencedRelation: "game_providers"
            referencedColumns: ["id"]
          }
        ]
      }
      casino_licenses: {
        Row: {
          id: number
          casino_id: number
          license_id: number
          license_number: string | null
          issue_date: string | null
          created_at: string
        }
        Insert: {
          id?: number
          casino_id: number
          license_id: number
          license_number?: string | null
          issue_date?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          casino_id?: number
          license_id?: number
          license_number?: string | null
          issue_date?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "casino_licenses_casino_id_fkey"
            columns: ["casino_id"]
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casino_licenses_license_id_fkey"
            columns: ["license_id"]
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          }
        ]
      }
      casino_payment_methods: {
        Row: {
          id: number
          casino_id: number
          payment_method_id: number
          created_at: string
        }
        Insert: {
          id?: number
          casino_id: number
          payment_method_id: number
          created_at?: string
        }
        Update: {
          id?: number
          casino_id?: number
          payment_method_id?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "casino_payment_methods_casino_id_fkey"
            columns: ["casino_id"]
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casino_payment_methods_payment_method_id_fkey"
            columns: ["payment_method_id"]
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          }
        ]
      }
      casino_security_features: {
        Row: {
          id: number
          casino_id: number
          security_feature_id: number
          created_at: string
        }
        Insert: {
          id?: number
          casino_id: number
          security_feature_id: number
          created_at?: string
        }
        Update: {
          id?: number
          casino_id?: number
          security_feature_id?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "casino_security_features_casino_id_fkey"
            columns: ["casino_id"]
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casino_security_features_security_feature_id_fkey"
            columns: ["security_feature_id"]
            referencedRelation: "security_features"
            referencedColumns: ["id"]
          }
        ]
      }
      casinos: {
        Row: {
          id: number
          name: string
          slug: string
          logo_url: string
          website_url: string
          description: string
          rating: number
          established_year: number
          min_deposit: number | null
          withdrawal_time: string | null
          has_mobile_app: boolean
          has_live_streaming: boolean
          has_cash_out: boolean
          has_live_betting: boolean
          monthly_visits: number | null
          positive_rating_percentage: number | null
          user_reviews_count: number | null
          featured: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          name: string
          slug: string
          logo_url: string
          website_url: string
          description: string
          rating: number
          established_year: number
          min_deposit?: number | null
          withdrawal_time?: string | null
          has_mobile_app?: boolean
          has_live_streaming?: boolean
          has_cash_out?: boolean
          has_live_betting?: boolean
          monthly_visits?: number | null
          positive_rating_percentage?: number | null
          user_reviews_count?: number | null
          featured?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          logo_url?: string
          website_url?: string
          description?: string
          rating?: number
          established_year?: number
          min_deposit?: number | null
          withdrawal_time?: string | null
          has_mobile_app?: boolean
          has_live_streaming?: boolean
          has_cash_out?: boolean
          has_live_betting?: boolean
          monthly_visits?: number | null
          positive_rating_percentage?: number | null
          user_reviews_count?: number | null
          featured?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          id: number
          name: string
          code: string
          flag_emoji: string
          legal_status: string
          regulatory_body: string | null
          legal_age: string | null
          tax_info: string | null
          legal_info: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          name: string
          code: string
          flag_emoji: string
          legal_status: string
          regulatory_body?: string | null
          legal_age?: string | null
          tax_info?: string | null
          legal_info?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          name?: string
          code?: string
          flag_emoji?: string
          legal_status?: string
          regulatory_body?: string | null
          legal_age?: string | null
          tax_info?: string | null
          legal_info?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      features: {
        Row: {
          id: number
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      game_providers: {
        Row: {
          id: number
          name: string
          website_url: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          website_url?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          website_url?: string | null
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      licenses: {
        Row: {
          id: number
          name: string
          country: string
          established_year: number
          website_url: string
          rating: string
          trust_score: number
          description: string
          application_process: string | null
          annual_fees: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          name: string
          country: string
          established_year: number
          website_url: string
          rating: string
          trust_score: number
          description: string
          application_process?: string | null
          annual_fees?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          name?: string
          country?: string
          established_year?: number
          website_url?: string
          rating?: string
          trust_score?: number
          description?: string
          application_process?: string | null
          annual_fees?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      license_pros_cons: {
        Row: {
          id: number
          license_id: number
          content: string
          is_pro: boolean
          created_at: string
        }
        Insert: {
          id?: number
          license_id: number
          content: string
          is_pro: boolean
          created_at?: string
        }
        Update: {
          id?: number
          license_id?: number
          content?: string
          is_pro?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "license_pros_cons_license_id_fkey"
            columns: ["license_id"]
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          }
        ]
      }
      license_requirements: {
        Row: {
          id: number
          license_id: number
          requirement: string
          created_at: string
        }
        Insert: {
          id?: number
          license_id: number
          requirement: string
          created_at?: string
        }
        Update: {
          id?: number
          license_id?: number
          requirement?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "license_requirements_license_id_fkey"
            columns: ["license_id"]
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          }
        ]
      }
      license_player_protections: {
        Row: {
          id: number
          license_id: number
          protection: string
          created_at: string
        }
        Insert: {
          id?: number
          license_id: number
          protection: string
          created_at?: string
        }
        Update: {
          id?: number
          license_id?: number
          protection?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "license_player_protections_license_id_fkey"
            columns: ["license_id"]
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_methods: {
        Row: {
          id: number
          name: string
          type: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          type: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          type?: string
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      pros_cons: {
        Row: {
          id: number
          casino_id: number
          content: string
          is_pro: boolean
          created_at: string
        }
        Insert: {
          id?: number
          casino_id: number
          content: string
          is_pro: boolean
          created_at?: string
        }
        Update: {
          id?: number
          casino_id?: number
          content?: string
          is_pro?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pros_cons_casino_id_fkey"
            columns: ["casino_id"]
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          }
        ]
      }
      security_features: {
        Row: {
          id: number
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      supported_languages: {
        Row: {
          id: number
          casino_id: number
          language: string
          created_at: string
        }
        Insert: {
          id?: number
          casino_id: number
          language: string
          created_at?: string
        }
        Update: {
          id?: number
          casino_id?: number
          language?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "supported_languages_casino_id_fkey"
            columns: ["casino_id"]
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          }
        ]
      }
      support_channels: {
        Row: {
          id: number
          casino_id: number
          channel: string
          created_at: string
        }
        Insert: {
          id?: number
          casino_id: number
          channel: string
          created_at?: string
        }
        Update: {
          id?: number
          casino_id?: number
          channel?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_channels_casino_id_fkey"
            columns: ["casino_id"]
            referencedRelation: "casinos"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}