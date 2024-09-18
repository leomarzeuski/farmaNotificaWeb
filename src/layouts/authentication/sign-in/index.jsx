import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

import BasicLayout from 'layouts/authentication/components/BasicLayout';
import bgImage from 'assets/images/bg-sign-in-basic.jpeg';
import * as unityService from 'services/userunity';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../context/auth';

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [userLogin, setUserLogin] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  function generateRandomToken(length = 32) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

  const handleSignIn = async () => {
    try {
      const pendingToastId = toast.loading('Fazendo login, por favor aguarde...');

      const response = await unityService.getUserUnitsLogin(userLogin.dsEmail, userLogin.dsSenha);

      const token = generateRandomToken();

      if (token && response) {
        login(response);
        const userString = JSON.stringify(response);
        if (rememberMe) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', userString);
        } else {
          sessionStorage.setItem('authToken', token);
          sessionStorage.setItem('user', userString);
        }

        toast.update(pendingToastId, {
          render: 'Login realizado com sucesso!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });

        navigate('/dashboard');
      } else {
        toast.update(pendingToastId, {
          render: 'Erro de login: Token não encontrado.',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(pendingToastId, {
        render: 'Falha no login. Verifique suas credenciais.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      console.error('Falha no login', error);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}></Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                onChange={(e) => setUserLogin({ ...userLogin, dsEmail: e.target.value })}
                type="email"
                label="Email"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                onChange={(e) => setUserLogin({ ...userLogin, dsSenha: e.target.value })}
                type="password"
                label="Password"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;Lembrar de mim
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={() => handleSignIn()} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Na&apos;o tem uma conta?{' '}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Cadastre-se
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <ToastContainer />
    </BasicLayout>
  );
}

export default Basic;
