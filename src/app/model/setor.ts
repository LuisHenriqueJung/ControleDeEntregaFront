import { Empresa } from "./empresa"

export class Setor{
  id!: number
  idEmpresa!: number
  nome!: string
  descritivo!: string
  codSetor!: string
  empresa = new Empresa()
}
