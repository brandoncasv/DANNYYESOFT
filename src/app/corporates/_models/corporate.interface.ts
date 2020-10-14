export interface ResponseCorporateI {
    data: {
        corporativo: CorporateI;
    }
}
export interface CorporateI {
    id: 1;
    S_NombreCompleto: string;
    S_NombreCorto: string;
    S_LogoURL: string;
    S_DBName: string;
    S_DBUsuario: string;
    S_SystemUrl: string;
    S_Activo: number;
    D_FechaIncorporacion: Date;
    created_at: Date;
    updated_at: Date;
    tw_users_id: number;
    FK_Asignado_id: number;
    tw_contactos_corporativo: ContactosI[];
    tw_contratos_corporativo: ContratosI[];
    tw_documentos_corporativo: DocumentosI[];
    tw_empresas_corporativo: EmpresasI[];
}

export interface EmpresasI {
    id: number;
    S_RazonSocial: string;
    S_RFC: string;
    S_Pais: string;
    S_Estado: string;
    S_Municipio: string;
    S_ColoniaLocalidad: string;
    S_Domicilio: string;
    N_CodigoPostal: number;
    S_UsoCFDI: string;
    S_UrlRFC: string;
    S_UrlActaConstitutiva: string;
    S_Activo: number;
    S_Comentarios: string;
    created_at: Date;
    updated_at: Date;
    tw_corporativo_id: number;
}

export interface ContactosI {
    id: number;
    S_Nombre: string;
    S_Puesto: string;
    S_Comentarios: null,
    N_TelefonoFijo: number;
    N_TelefonoMovil: number;
    S_Email: string;
    created_at: Date;
    updated_at: Date;
    tw_corporativo_id: number;
}

export interface ContratosI {
    id: number;
    D_FechaInicio: Date;
    D_FechaFin: Date;
    S_URLContrato: string;
    created_at: Date;
    updated_at: Date;
    tw_corporativo_id: number;
}

export interface DocumentosI {
    id: number;
    tw_corporativo_id: number;
    tw_documento_id: number;
    S_ArchivoUrl: string;
    created_at: Date;
    updated_at: Date;
    tw_documento: {
        id: number;
        S_Nombre: string;
        N_Obligatorio: number;
        S_Descripcion: string;
        created_at: Date;
        updated_at: Date;
    }
}


