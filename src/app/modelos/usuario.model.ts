import { Deserializable } from './deserializable.model';
import { Permiso } from './permiso.model';

export class Usuario implements Deserializable {
    
    public idpermiso: number;
    public usuario: string;
    public contrasena: string;
    public imagen: string;
    public permisos: Permiso[];

    deserialize(input: any): this {
      return Object.assign(this, input);
    }

    deserializeLista(input: any): this {

        Object.assign(this, input);
        this.permisos = input.permisos.map(permiso => this.deserialize(permiso));
        return this;
    }
}
