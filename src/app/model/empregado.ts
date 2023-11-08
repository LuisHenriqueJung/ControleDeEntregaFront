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
