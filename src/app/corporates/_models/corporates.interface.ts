export interface ResponseCorporatesI {
  data: CorporatesI[];
}
export interface CorporatesI {
  D_FechaIncorporacion: Date;
  FK_Asignado_id: number;
  S_Activo: number;
  S_DBName: string;
  S_DBUsuario: string;
  S_LogoURL: string;
  S_NombreCompleto: string;
  S_NombreCorto: string;
  S_SystemUrl: string;
  asignado: {
    S_Activo: number;
    S_Apellidos: string;
    S_FotoPerfilURL: string;
    S_Nombre: string;
    created_at: Date;
    deleted_at: Date;
    email: string;
    id: number;
    tw_role_id: number;
    updated_at: string;
    username: string;
    verification_token: string;
    verified: string;
  };
}
