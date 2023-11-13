export class Empregado {
  id!: number
  nome?: string
  razaoSocial?: string
  setor?: string
  matricula?: string
  sexo?: string
  cargo?: string
  nascimento?: any
  admissao?: any
}

export class EmpregadoInfo{
  nome!: string
  matricula!:string
  idade!: string
  setor!: string
  titleGhePosicaoCargo!:string
  ghePosicaoCargo!: string
  foto!: any
}


export class EmpregadoFilter{
  page = 0
  size = 20
}

export class EmpregadosDigital{
  e1!: string
  e2!:string
  e3!: string
  e4!: string
  e5!: string
  d1!: string
  d2!: string
  d3!: string
  d4!: string
  d5!: string
}

export interface Finger{
  name: string
  status: string
  motivo: string
}
