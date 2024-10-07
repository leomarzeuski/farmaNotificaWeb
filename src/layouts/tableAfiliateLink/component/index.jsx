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
  Checkbox,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';

function LinkAfiliadoTableList() {
  const [loading, setLoading] = useState(false);
  const [linksAfiliados, setLinksAfiliados] = useState([]);
  const [newLink, setNewLink] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isUserValidPlan, setIsUserValidPlan] = useState({});
  const [disabledLinks, setDisabledLinks] = useState([]);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const navigate = useNavigate();

  // Lista de medicamentos de alto custo
  const highCostMedicines = [
    'Adalimumabe',
    'Etanercepte',
    'Rituximabe',
    'Secuquinumabe',
    'Tocilizumabe',
    'Infliximabe',
  ];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.isPaymentUser) {
      setIsUserValidPlan(userData.selectedPlan);

      if (userData.selectedPlan?.price === 'R$ 99,00/mês' && linksAfiliados.length > 20) {
        setDisabledLinks(linksAfiliados);
      } else if (userData.selectedPlan?.price === 'R$ 299,00/mês' && linksAfiliados.length > 50) {
        setDisabledLinks(linksAfiliados);
      } else {
        setDisabledLinks([]);
      }
    }
  }, [linksAfiliados]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddLink = () => {
    if (isUserValidPlan?.price === 'R$ 99,00/mês' && linksAfiliados.length >= 20) {
      setModalMessage('Seu plano permite cadastrar até 2 links. Aumente seu plano.');
      setOpenModal(true);
    } else if (isUserValidPlan?.price === 'R$ 299,00/mês' && linksAfiliados.length >= 50) {
      setModalMessage(
        'Seu plano permite cadastrar até 5 links. Contate-nos para um plano personalizado.'
      );
      setOpenModal(true);
    } else {
      setLinksAfiliados([
        ...linksAfiliados,
        { link: newLink, performance: Math.random() * 100, medicine: selectedMedicine },
      ]);
      setNewLink('');
      setSelectedMedicine('');
    }
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = linksAfiliados.filter((_, i) => i !== index);
    setLinksAfiliados(updatedLinks);
  };

  const handleLinkSelection = (index) => {
    const updatedSelectedLinks = [...selectedLinks];

    if (updatedSelectedLinks.includes(index)) {
      updatedSelectedLinks.splice(updatedSelectedLinks.indexOf(index), 1);
    } else if (updatedSelectedLinks.length < 20) {
      updatedSelectedLinks.push(index);
    }

    setSelectedLinks(updatedSelectedLinks);
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
                Cadastrar Link Afiliado
              </MDTypography>
            </MDBox>
            <MDBox pt={3} px={3} pb={3}>
              <TextField
                label="Novo Link Afiliado"
                fullWidth
                margin="normal"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Medicamento Associado</InputLabel>
                <Select
                  style={{ height: '45px' }}
                  value={selectedMedicine}
                  onChange={(e) => setSelectedMedicine(e.target.value)}
                >
                  {highCostMedicines.map((medicine) => (
                    <MenuItem key={medicine} value={medicine}>
                      {medicine}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                style={{ color: '#fff' }}
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                onClick={handleAddLink}
                disabled={newLink === '' || selectedMedicine === ''}
              >
                Adicionar Link
              </Button>
            </MDBox>
          </Card>
        </Grid>
        {linksAfiliados.length > 0 && (
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
                  Links Afiliados Cadastrados
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <MDBox display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                  </MDBox>
                ) : (
                  <>
                    {disabledLinks.length > 0 && (
                      <MDTypography variant="subtitle1" color="error" textAlign="center">
                        Os links abaixo foram desabilitados por conta do seu plano. Selecione dois
                        para continuar.
                      </MDTypography>
                    )}
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead
                          style={{
                            display: 'table-header-group',
                          }}
                        >
                          <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Link</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Medicamento</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Performance</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Ações</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {linksAfiliados
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((link, index) => (
                              <TableRow key={index}>
                                <TableCell>{link.link}</TableCell>
                                <TableCell>{link.medicine}</TableCell>
                                <TableCell>
                                  {link.performance.toFixed(0)} visualizações
                                </TableCell>{' '}
                                <TableCell>
                                  {disabledLinks.length > 0 ? (
                                    <>
                                      <Checkbox
                                        checked={selectedLinks.includes(index)}
                                        onChange={() => handleLinkSelection(index)}
                                        disabled={
                                          selectedLinks.length >= 2 &&
                                          !selectedLinks.includes(index)
                                        }
                                      />
                                      {selectedLinks.length < 2 && 'Escolha até dois.'}
                                    </>
                                  ) : (
                                    <>
                                      <IconButton onClick={() => handleDeleteLink(index)}>
                                        <DeleteIcon />
                                      </IconButton>
                                      <IconButton onClick={() => navigate('/dashboard')}>
                                        <DashboardIcon />
                                      </IconButton>
                                    </>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50]}
                      component="div"
                      count={linksAfiliados.length}
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
        )}
      </Grid>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Limite de Links Atingido</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button component={Link} to="/profile" color="primary">
            Aumentar Plano
          </Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

export default LinkAfiliadoTableList;
