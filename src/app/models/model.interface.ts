export interface rankingTask {
    id?: string;
    username: string;
    puntuacionS:number;
    puntuacionG:number;
    ultimaPartida:string;
    grupos:string[];
}

export interface galderakTask {
    id?: string;
    pregunta:string,
    respuesta:string,
    respuesta2:string,
    respuesta3:string,   
}

export interface groupTask {
    id?: string;
    nombre: string;
    contra: string;
    usuarios:string[];
}

export interface groupRelTask {
    id?: string;
    idGrupo: string;
    idUsuario: string;
}