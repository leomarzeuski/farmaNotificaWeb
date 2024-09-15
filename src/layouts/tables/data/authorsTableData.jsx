import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Typography, FormControl, InputLabel, Box } from '@mui/material';
import MDBadge from 'components/MDBadge';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import {
  getSolicitacoes,
  alterarStatusSolicitacao,
} from '../../../services/solicitacoes/solicitacaoService';

import './table.css';

const statusOptions = [
  { cdStatus: 1, dsStatus: 'Em análise' },
  { cdStatus: 2, dsStatus: 'Reenviar' },
  { cdStatus: 3, dsStatus: 'Agendar' },
  { cdStatus: 4, dsStatus: 'Retirado' },
  { cdStatus: 5, dsStatus: 'Fora do Prazo' },
];

function TableSolicitation() {
  const [loading, setLoading] = useState(true);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [filteredSolicitacoes, setFilteredSolicitacoes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState(null);
  const [checked, setChecked] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const fetchSolicitacoes = async () => {
    try {
      const response = await getSolicitacoes();
      setSolicitacoes(response);
      setFilteredSolicitacoes(response);
    } catch (error) {
      console.error('Error fetching solicitacoes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Em análise':
        return 'warning';
      case 'Reenviar':
        return 'info';
      case 'Agendar':
        return 'primary';
      case 'Retirado':
        return 'success';
      case 'Fora do Prazo':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (solicitacao) => {
    setSelectedSolicitacao(solicitacao);
    if (
      solicitacao.cdStatusNavigation.dsStatus === 'Retirado' ||
      solicitacao.cdStatusNavigation.dsStatus === 'Agendar'
    ) {
      setModalMessage(`Aguardando resposta do cliente ${solicitacao.cdPessoaNavigation.dsNome}`);
    } else {
      setModalMessage('');
    }

    setOpenModal(true);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleConfirm = async () => {
    const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
    const user = JSON.parse(userString);

    const solicitacao = {
      cdUsuario: user.cdUsuario,
      cdStatus: selectedStatus,
      cdSolicitacao: selectedSolicitacao.cdSolicitacao,
    };

    try {
      const response = await alterarStatusSolicitacao(solicitacao);

      if (response.status === 200) {
        fetchSolicitacoes();
        setOpenModal(false);
        setChecked(false);
        setSelectedStatus('');
        alert('Status alterado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setChecked(false);
    setSelectedStatus('');
    setModalMessage('');
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
                Tabela de Solicitações para Agendamentos
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
                          <TableCell align="left" style={{ fontWeight: 'bold' }}>
                            Nome
                          </TableCell>
                          <TableCell align="center" style={{ fontWeight: 'bold' }}>
                            Status
                          </TableCell>
                          <TableCell align="center" style={{ fontWeight: 'bold' }}>
                            Data de Solicitação
                          </TableCell>
                          <TableCell align="center" style={{ fontWeight: 'bold' }}>
                            Baixar Arquivo
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredSolicitacoes
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((solicitacao) => {
                            const {
                              cdPessoaNavigation,
                              cdStatusNavigation,
                              dtSolicitacao,
                              fnSolicitacaoItens,
                            } = solicitacao;

                            return (
                              <TableRow
                                key={solicitacao.cdSolicitacao}
                                className="table-row-hover"
                                onClick={() => handleRowClick(solicitacao)}
                                style={{ cursor: 'pointer' }}
                              >
                                <TableCell align="left">{cdPessoaNavigation.dsNome}</TableCell>
                                <TableCell align="center">
                                  <MDBadge
                                    badgeContent={
                                      <Typography variant="caption">
                                        {cdStatusNavigation.dsStatus}
                                      </Typography>
                                    }
                                    color={getStatusColor(cdStatusNavigation.dsStatus)}
                                    variant="gradient"
                                    size="lg"
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {new Date(dtSolicitacao).toLocaleDateString()}
                                </TableCell>
                                <TableCell align="center">
                                  <MDTypography
                                    component="a"
                                    href={
                                      fnSolicitacaoItens[0]?.cdUnidadeMedicamentoNavigation
                                        ?.cdMedicamentoNavigation?.urlBula || '#'
                                    }
                                    variant="caption"
                                    color="text"
                                    fontWeight="medium"
                                    target="_blank"
                                  >
                                    Baixar
                                  </MDTypography>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={filteredSolicitacoes.length}
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

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Mudar Status da Solicitação
          </Typography>
          {modalMessage && <Typography color="textSecondary">{modalMessage}</Typography>}
          <FormControl fullWidth>
            <Grid container alignItems="center" spacing={1} sx={{ flexDirection: 'row' }}>
              <Grid item>
                <Typography>O arquivo foi conferido?</Typography>
              </Grid>
              <Grid item>
                <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  label="O arquivo foi conferido?"
                />
              </Grid>
            </Grid>

            <FormControl fullWidth margin="normal" disabled={!checked}>
              <InputLabel>Status</InputLabel>
              <Select style={{ height: 45 }} value={selectedStatus} onChange={handleStatusChange}>
                {statusOptions.map((option) => (
                  <MenuItem key={option.cdStatus} value={option.cdStatus}>
                    {option.dsStatus}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              disabled={!checked || !selectedStatus}
              fullWidth
            >
              Confirmar
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </MDBox>
  );
}

export default TableSolicitation;
