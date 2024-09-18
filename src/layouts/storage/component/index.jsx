import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import {
  getUnidadeMedicamento,
  UnidadeMedicamento,
} from '../../../services/unidadeMedicamento/unidadeMedicamentoService';
import { getMedicamentos } from '../../../services/medicamento/medicamentoService';

function StorageList() {
  const [loading, setLoading] = useState(true);
  const [unidadeMedicamentos, setUnidadeMedicamentos] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [selectedMedicamento, setSelectedMedicamento] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchUnidadeMedicamentos();
    fetchMedicamentos();
  }, []);

  const fetchUnidadeMedicamentos = async () => {
    try {
      const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (!userString) {
        console.error('User not found in local/session storage');
        return;
      }

      const user = JSON.parse(userString);
      const cdUnidade = user.cdUnidade;

      const response = await getUnidadeMedicamento(cdUnidade);
      setUnidadeMedicamentos(response);
    } catch (error) {
      console.error('Error fetching unidade medicamentos', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicamentos = async () => {
    try {
      const response = await getMedicamentos();
      setMedicamentos(response);
    } catch (error) {
      console.error('Error fetching medicamentos', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setSelectedMedicamento('');
  };

  const handleAddMedicamento = async () => {
    const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!userString) {
      console.error('User not found in local/session storage');
      return;
    }

    const user = JSON.parse(userString);
    const cdUnidade = user.cdUnidade;

    const newMedicamento = {
      cdMedicamento: selectedMedicamento,
      cdUnidade: cdUnidade,
      snUtilizado: 'N',
      cdMedicamentoNavigation: null,
      cdUnidadeNavigation: null,
    };

    try {
      await UnidadeMedicamento(newMedicamento);
      fetchUnidadeMedicamentos();
      handleCloseAddModal();
    } catch (error) {
      console.error('Error adding medicamento', error);
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
                Lista de Medicamentos por Unidade
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              {loading ? (
                <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
                  <CircularProgress />
                </MDBox>
              ) : (
                <>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead
                        style={{
                          display: 'table-header-group',
                        }}
                      >
                        <TableRow>
                          <TableCell style={{ fontWeight: 'bold' }}>Medicamento</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Dosagem</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Fabricante</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Registro Anvisa</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Unidade Utilizada</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {unidadeMedicamentos
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((unidadeMedicamento) => (
                            <TableRow key={unidadeMedicamento.cdUnidadeMedicamento}>
                              <TableCell>
                                {unidadeMedicamento.cdMedicamentoNavigation.dsMedicamento}
                              </TableCell>
                              <TableCell>
                                {unidadeMedicamento.cdMedicamentoNavigation.dsDosagem}
                              </TableCell>
                              <TableCell>
                                {unidadeMedicamento.cdMedicamentoNavigation.dsFabricante}
                              </TableCell>
                              <TableCell>
                                {unidadeMedicamento.cdMedicamentoNavigation.dsCodigoRegistroAnvisa}
                              </TableCell>
                              <TableCell>
                                {unidadeMedicamento.snUtilizado === 'S' ? 'Sim' : 'Não'}
                              </TableCell>
                              <TableCell>
                                {unidadeMedicamento.cdMedicamentoNavigation.snAtivo === 'S'
                                  ? 'Ativo'
                                  : 'Inativo'}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={unidadeMedicamentos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Linhas por página:"
                  />
                </>
              )}
            </MDBox>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenAddModal}
              style={{ color: '#fff', alignSelf: 'end', maxWidth: 300, margin: 20 }}
            >
              Adicionar Medicamento +
            </Button>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogTitle>Adicionar Medicamento</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Medicamento</InputLabel>
            <Select
              value={selectedMedicamento}
              onChange={(e) => setSelectedMedicamento(e.target.value)}
              label="Medicamento"
              style={{ height: 45 }}
            >
              {medicamentos.map((medicamento) => (
                <MenuItem key={medicamento.cdMedicamento} value={medicamento.cdMedicamento}>
                  {medicamento.dsMedicamento}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancelar</Button>
          <Button onClick={handleAddMedicamento} color="primary" disabled={!selectedMedicamento}>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

export default StorageList;
