import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
    senha: '', // Adicionando senha
  });
  const [profileImage, setProfileImage] = useState(defaultProfile); // Imagem do perfil
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data from localStorage or sessionStorage
    const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
    const storedImage = localStorage.getItem('profileImage');
    if (userString) {
      const user = JSON.parse(userString);
      setUserData({
        nome: user.dsNome || '',
        email: user.dsEmail || '',
        senha: '', // Senha não será exibida
      });
    }
    if (storedImage) {
      setProfileImage(storedImage); // Carrega a imagem de perfil do localStorage, se houver
    }

    // Handle responsive orientation of tabs
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
      setProfileImage(base64String); // Atualiza a imagem de perfil com base64
      localStorage.setItem('profileImage', base64String); // Salva a imagem no localStorage
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleCancelEdit = () => {
    setEditMode(false); // Cancela a edição sem salvar
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
                src={profileImage} // Mostra a imagem de perfil, se disponível
                alt="profile-image"
                size="xl"
                shadow="sm"
                sx={{ cursor: 'pointer' }} // Torna a imagem clicável
              />
              <input
                id="profileImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }} // Esconde o input
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
