import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EpiService {

  constructor() { }

  getAllEpis(){
    return [{
      id: 1,
      nome:"Óculos de proteção",
      marca:"Ledan"
    },
    {
      id: 1,
      nome:"Luva de latex",
      marca:"Ledan"
    },{
      id: 1,
      nome:"Bota de PVC",
      marca:"Ledan"
    },{
      id: 1,
      nome:"Bota de PVC",
      marca:"Ledan"
    },{
      id: 1,
      nome:"Bota de PVC",
      marca:"Ledan"
    },{
      id: 1,
      nome:"Bota de PVC",
      marca:"Ledan"
    },{
      id: 1,
      nome:"Bota de PVC",
      marca:"Ledan"
    },{
      id: 1,
      nome:"Bota de PVC",
      marca:"Ledan"
    }]
  }

  getAllMotivosTroca(){
    return [
      "Rasgou","Estragou","Não quero mais esse","Troca ae pa nois"
    ]
  }
}
