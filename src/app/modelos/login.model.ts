export class Login {

    public message: string;
    public permiso: string;
    public token: string;
    public imagen: string;
    public usuario: string;
    public nombrecomercial: string;
    public sucursales?: number;
    
    deserialize(input: any): this {
        return Object.assign(this, input);
     }
}
