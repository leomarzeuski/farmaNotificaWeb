export type MedicamentoPayload = {
  cdMedicamento: number;
  dsMedicamento: string;
  dsDosagem: string;
  dsFabricante: string;
  dsGrupoFinanciamento: string;
  dsCodigoRegistroAnvisa: string;
  dsObservacao: string;
  urlBula: string;
  dsCid: string;
};

export type Medicamento = {
  cdMedicamento: number;
  dsMedicamento: string;
  dsDosagem: string;
  dsFabricante: string;
  dsGrupoFinanciamento: string;
  dsCodigoRegistroAnvisa: string;
  dsObservacao: string;
  urlBula: string;
  dsCid: string;
  dtCadastro: string;
  snAtivo: string;
  fnMedicamentoCids: MedicamentoCids[];
};

export type MedicamentoCids = {
  cdMedicamentoCid: number;
  cdMedicamento: number;
  cdCid: number;
  cdC: {
    cdCid: number;
    codigoCid: string;
    dsCid: string;
    fnMedicamentoCids: string[];
  };
  cdMedicamentoNavigation: string;
};
