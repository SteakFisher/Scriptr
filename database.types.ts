export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Edits: {
        Row: {
          Content: string
          id: string
          ScriptId: string | null
          Updated_at: string
        }
        Insert: {
          Content?: string
          id?: string
          ScriptId?: string | null
          Updated_at?: string
        }
        Update: {
          Content?: string
          id?: string
          ScriptId?: string | null
          Updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Edits_ScriptId_fkey"
            columns: ["ScriptId"]
            isOneToOne: false
            referencedRelation: "Scripts"
            referencedColumns: ["id"]
          }
        ]
      }
      Scripts: {
        Row: {
          Author: string | null
          Created_at: string | null
          Description: string
          EmailID: string
          id: string
          Title: string
        }
        Insert: {
          Author?: string | null
          Created_at?: string | null
          Description?: string
          EmailID?: string
          id?: string
          Title?: string
        }
        Update: {
          Author?: string | null
          Created_at?: string | null
          Description?: string
          EmailID?: string
          id?: string
          Title?: string
        }
        Relationships: []
      }
      Sharing: {
        Row: {
          id: string
          ScriptId: string | null
          UserId: string | null
        }
        Insert: {
          id?: string
          ScriptId?: string | null
          UserId?: string | null
        }
        Update: {
          id?: string
          ScriptId?: string | null
          UserId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Sharing_ScriptId_fkey"
            columns: ["ScriptId"]
            isOneToOne: false
            referencedRelation: "Scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Sharing_UserId_fkey"
            columns: ["UserId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Users: {
        Row: {
          Author: string
          Email: string
        }
        Insert: {
          Author?: string
          Email: string
        }
        Update: {
          Author?: string
          Email?: string
        }
        Relationships: []
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
