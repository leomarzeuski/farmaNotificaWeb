import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';
import MDAvatar from 'components/MDAvatar';
import defaultProfile from 'assets/images/default-profile.png';
import backgroundImage from 'assets/images/farmaciaBackgorundProfile.jpg';
import PropTypes from 'prop-types';

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState('horizontal');
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '',
  });
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPaymentUser, setIsPaymentUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const userLoged = JSON.parse(localStorage.getItem('user'));
    // const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
    const storedImage = localStorage.getItem('profileImage');
    if (userLoged) {
      setUserData({
        nome: userLoged.dsNome || '',
        email: userLoged.dsEmail || '',
        senha: '',
      });
      setSelectedPlan(userLoged.selectedPlan);
      setIsPaymentUser(userLoged.isPaymentUser);
    }

    console.log({ userLoged });
    if (storedImage) {
      setProfileImage(storedImage);
    }

    function handleTabsOrientation() {
      return window.innerWidth < 960
        ? setTabsOrientation('vertical')
        : setTabsOrientation('horizontal');
    }

    window.addEventListener('resize', handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener('resize', handleTabsOrientation);
  }, []);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfileImage(base64String);
      localStorage.setItem('profileImage', base64String);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSave = async () => {
    setLoading(true);

    const updatedUser = {
      dsNome: userData.nome,
      dsEmail: userData.email,
      dsSenha: userData.senha,
    };

    const cdUsuario = localStorage.getItem('cdUsuario');

    try {
      await updatedUser(cdUsuario, updatedUser);
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário');
    } finally {
      setLoading(false);
      setEditMode(false);
    }
  };

  const handleCancelPlan = () => {
    const userLoged = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({ ...userLoged, selectedPlan: null }));
    setSelectedPlan(null);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectPlan = (plan) => {
    const userLoged = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({ ...userLoged, selectedPlan: plan }));
    setSelectedPlan(plan);
    setModalOpen(false);
  };

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: '50%',
          overflow: 'hidden',
        }}
      />
      <Card
        sx={{
          position: 'relative',
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <label htmlFor="profileImageUpload">
              <MDAvatar
                src={profileImage}
                alt="profile-image"
                size="xl"
                shadow="sm"
                sx={{ cursor: 'pointer' }}
              />
              <input
                id="profileImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              {editMode ? (
                <>
                  <TextField
                    label="Nome"
                    name="nome"
                    value={userData.nome}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="Senha"
                    name="senha"
                    type="password"
                    value={userData.senha}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />
                </>
              ) : (
                <>
                  <MDTypography variant="h5" fontWeight="medium">
                    {userData.nome}
                  </MDTypography>
                  <MDTypography variant="subtitle1" color="text">
                    {userData.email}
                  </MDTypography>
                </>
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: 'auto' }}>
            <AppBar position="static" />
          </Grid>
        </Grid>

        {isPaymentUser ? (
          selectedPlan ? (
            <MDBox
              mt={2}
              p={3}
              sx={{
                background: selectedPlan.background,
                borderRadius: '12px',
                color: '#fff',
              }}
            >
              <MDTypography variant="subtitle1" fontWeight="medium" mb={1} color="#fff">
                {selectedPlan?.subtitle}
              </MDTypography>
              <MDTypography variant="h6" fontWeight="bold" mb={1} color="#fff">
                {selectedPlan?.title} - {selectedPlan?.price}
              </MDTypography>
              <MDTypography variant="body2" mb={2} color="#fff">
                Benefícios:
              </MDTypography>
              <List>
                {(selectedPlan?.benefits || []).map((benefit, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>

              <MDButton variant="contained" color="error" onClick={handleCancelPlan}>
                Cancelar Plano
              </MDButton>
            </MDBox>
          ) : (
            <MDBox mt={2}>
              <MDButton variant="outlined" color="info" onClick={handleOpenModal}>
                Contratar Plano
              </MDButton>
            </MDBox>
          )
        ) : null}

        <Grid container spacing={2} mt={2}>
          <Grid item>
            {editMode ? (
              <>
                <MDButton variant="contained" color="info" onClick={handleSave} disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </MDButton>
                <IconButton onClick={handleCancelEdit} sx={{ ml: 2 }}>
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <MDButton variant="outlined" color="secondary" onClick={toggleEditMode}>
                Editar
              </MDButton>
            )}
          </Grid>
        </Grid>
        {children}
      </Card>

      {/* Modal para escolher um novo plano */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
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
          <Typography variant="h6" gutterBottom>
            Selecione um Plano
          </Typography>
          <Button
            fullWidth
            onClick={() =>
              handleSelectPlan({
                title: 'Visibilidade com anúncios',
                price: 'R$ 99,00/mês',
                subtitle: 'Nível Básico',
                benefits: [
                  'Maior exposição na lista de farmácias',
                  'Destaque com anúncios',
                  'Até 2 campanhas',
                ],
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              })
            }
          >
            Plano Básico - R$99/mês
          </Button>
          <Button
            fullWidth
            onClick={() =>
              handleSelectPlan({
                title: 'Premium com Consultoria',
                price: 'R$ 299,00/mês',
                subtitle: 'Nível Profissional',
                benefits: [
                  'Máxima visibilidade',
                  'Maior exposição na lista de farmácias',
                  'Consultoria personalizada',
                  'Destaque sempre no topo',
                  'Até 5 campanhas',
                ],
                background: 'linear-gradient(135deg, #d53369 0%, #daae51 100%)',
              })
            }
          >
            Plano Premium - R$299/mês
          </Button>
        </Box>
      </Modal>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: '',
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
