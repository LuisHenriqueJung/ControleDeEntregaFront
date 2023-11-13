export class Item{
  id!: number
  descricao!: string
  grade = new Grade
  tipoEpi? : false
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


export class ItemFields{
  public static ITEM =  'item'
  public static QUANTIDADE = "quantidade"
  public static TAMANHO = "tamanho"
  public static DATA_ENTREGA = "dataEntrega"
  public static PROXIMA_TROCA = "proximaTroca"
  public static MOTIVO = "motivo"
  public static DESCRICAO_MOTIVO = "descricaoMotivo"
  public static CA_EPI = "caEPI"
}

