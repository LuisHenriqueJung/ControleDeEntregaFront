export class Item{
  id!: number
  descricao!: string
  grade = null
}

export class Grade{
  id!: number
  descricao!: string
  tamanhos =[]
}

export class DataPrevistaItem{
    idEmpresa!:number
    idEmpregado!:number
    idProduto!:number
    dataEntrega!: string
    qtd!: number
}
