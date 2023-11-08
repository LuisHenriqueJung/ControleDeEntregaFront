import { Cidade } from "./cidade"

export class Empresa {
  id!: number
  cnpj!: string
  razaoSocial!:string
  denominacao!: string
  codIntegracao!:string
  cidade = new Cidade
  inscricaoEmpregadorESocial!: string
  pessoaEmpregadorESocial!: string
  pessoa!: string
}
