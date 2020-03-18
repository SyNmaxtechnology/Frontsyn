export class Login {
    public message: string;
    public permiso: string;
    public token: string;
    public imagen: string;
    public usuario: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
     }
}
