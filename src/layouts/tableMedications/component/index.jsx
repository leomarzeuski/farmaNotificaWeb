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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import {
  getMedicamentos,
  updateMedicamento,
  deleteMedicamento,
} from '../../../services/medicamento/medicamentoService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function MedicamentosList() {
  const [loading, setLoading] = useState(true);
  const [medicamentos, setMedicamentos] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMedicamento, setEditMedicamento] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedMedicamento, setSelectedMedicamento] = useState(null);

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const fetchMedicamentos = async () => {
    try {
      const response = await getMedicamentos();
      setMedicamentos(response);
    } catch (error) {
      console.error('Error fetching medicamentos', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (medicamento) => {
    setEditMedicamento(medicamento);
    setOpenEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateMedicamento(editMedicamento.cdMedicamento, editMedicamento);
      fetchMedicamentos();
      setOpenEditModal(false);
    } catch (error) {
      console.error('Error updating medicamento', error);
    }
  };

  const handleDeleteClick = (medicamento) => {
    setSelectedMedicamento(medicamento);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMedicamento(selectedMedicamento.cdMedicamento);
      fetchMedicamentos();
      setOpenDeleteModal(false);
    } catch (error) {
      console.error('Error deleting medicamento', error);
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
                Lista de Medicamentos
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
                          <TableCell style={{ fontWeight: 'bold' }}>Nome</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Dosagem</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Fabricante</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Registro Anvisa</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                          <TableCell style={{ fontWeight: 'bold' }}>Ações</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {medicamentos
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((medicamento) => (
                            <TableRow key={medicamento.cdMedicamento}>
                              <TableCell>{medicamento.dsMedicamento}</TableCell>
                              <TableCell>{medicamento.dsDosagem}</TableCell>
                              <TableCell>{medicamento.dsFabricante}</TableCell>
                              <TableCell>{medicamento.dsCodigoRegistroAnvisa}</TableCell>
                              <TableCell>
                                {medicamento.snAtivo === 'S' ? 'Ativo' : 'Inativo'}
                              </TableCell>
                              <TableCell>
                                <IconButton onClick={() => handleEditClick(medicamento)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteClick(medicamento)}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={medicamentos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Linhas por página:"
                  />
                </>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Editar Medicamento</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome do Medicamento"
            fullWidth
            margin="normal"
            value={editMedicamento?.dsMedicamento || ''}
            onChange={(e) =>
              setEditMedicamento({ ...editMedicamento, dsMedicamento: e.target.value })
            }
          />
          <TextField
            label="Dosagem"
            fullWidth
            margin="normal"
            value={editMedicamento?.dsDosagem || ''}
            onChange={(e) => setEditMedicamento({ ...editMedicamento, dsDosagem: e.target.value })}
          />
          <TextField
            label="Fabricante"
            fullWidth
            margin="normal"
            value={editMedicamento?.dsFabricante || ''}
            onChange={(e) =>
              setEditMedicamento({ ...editMedicamento, dsFabricante: e.target.value })
            }
          />
          <TextField
            label="Registro Anvisa"
            fullWidth
            margin="normal"
            value={editMedicamento?.dsCodigoRegistroAnvisa || ''}
            onChange={(e) =>
              setEditMedicamento({ ...editMedicamento, dsCodigoRegistroAnvisa: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Excluir Medicamento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o medicamento {selectedMedicamento?.dsMedicamento}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

export default MedicamentosList;
