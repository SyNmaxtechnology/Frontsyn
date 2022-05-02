export class Permiso {
   public id: number;
   public descripcion: string;

   deserialize(input: any): this {
      return Object.assign(this, input);
   }
}


