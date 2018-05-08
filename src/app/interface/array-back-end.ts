// array para enviar al back end
export interface ArrayBackEnd {
    paginacion_desde?: number;
    paginacion_filas?: number;
    tabla?: string;  
    campos?: string;
    valuesPOST?: any[]; // insert update
    id?: number;
}
