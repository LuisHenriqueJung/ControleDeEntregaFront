export class Entrega{
  idEmpresa!: number
  idEmpregado!: number
  id!: number
  tipo!: string
  nome!: string
  ca!: string
  qtde!: number
  dataEntrega!: Date
  dataPrevista!: Date
  dataRevisao!: Date
  dataInspecao!: Date
  dataDevolucao!: Date
  dataConfirmacaoDesc!: Date
  motivo!: string
  statusEntrega!: string
  statusEntregaCor!: string
  statusConfirmacao!: string
  statusConfirmacaoCor!: string
  statusPrevistoCargo!: string
  statusPrevistoCargoCor!:string
}

export class EntregaFilter{
  page = 0
  size = 10
  searchvalue?: string
  idEmpresa!: number
  idEmpregado!: number
}
