import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, TextField, Button, Box } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { postMedicamento } from '../../../services/medicamento/medicamentoService';

const initialMedicamentoState = {
  cdMedicamento: '',
  dsMedicamento: '',
  dsDosagem: '',
  dsFabricante: '',
  dsCodigoRegistroAnvisa: '',
  dsGrupoFinanciamento: '',
  dsCid: '',
  urlBula: '',
  dsObservacao: '',
};

function TableCadastroMedicamento() {
  const [medicamento, setMedicamento] = useState(initialMedicamentoState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicamento({ ...medicamento, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await postMedicamento(medicamento);
      if (response.status === 200) {
        alert('Medicamento cadastrado com sucesso!');
        setMedicamento(initialMedicamentoState);
      }
    } catch (error) {
      console.error('Erro ao cadastrar medicamento:', error);
      setError('Erro ao cadastrar medicamento. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Cadastro de Medicamento
              </MDTypography>
            </MDBox>
            <MDBox pt={3} px={3}>
              {loading ? (
                <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
                  <CircularProgress />
                </MDBox>
              ) : (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nome do Medicamento"
                        name="dsMedicamento"
                        value={medicamento.dsMedicamento}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Dosagem"
                        name="dsDosagem"
                        value={medicamento.dsDosagem}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Fabricante"
                        name="dsFabricante"
                        value={medicamento.dsFabricante}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Registro Anvisa"
                        name="dsCodigoRegistroAnvisa"
                        value={medicamento.dsCodigoRegistroAnvisa}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Grupo de Financiamento"
                        name="dsGrupoFinanciamento"
                        value={medicamento.dsGrupoFinanciamento}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="CID"
                        name="dsCid"
                        value={medicamento.dsCid}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="URL da Bula"
                        name="urlBula"
                        value={medicamento.urlBula}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {/* Campo para Observação */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Observação"
                        name="dsObservacao"
                        value={medicamento.dsObservacao}
                        onChange={handleInputChange}
                        multiline
                        rows={4} // Área de texto maior para observações
                      />
                    </Grid>
                  </Grid>

                  {error && (
                    <Typography color="error" variant="body2" mt={2}>
                      {error}
                    </Typography>
                  )}

                  <Box mt={4} justifyContent={'end'} display={'flex'}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={loading}
                      style={{ color: '#fff', marginBottom: 20 }}
                    >
                      Cadastrar Medicamento
                    </Button>
                  </Box>
                </>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default TableCadastroMedicamento;
