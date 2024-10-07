import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import CoverLayout from 'layouts/authentication/components/CoverLayout';
import bgImage from 'assets/images/bg-sign-up-cover.jpeg';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserUnit } from 'services/userunity';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object().shape({
  dsNome: yup.string().required('Nome é obrigatório'),
  cdUnidade: yup
    .number()
    .typeError('Código da Unidade deve conter ao menos um número')
    .required('Código da Unidade é obrigatório'),
  dsEmail: yup.string().email('Email inválido').required('Email é obrigatório'),
  dsSenha: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
});

function SignUpPartner() {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    const userData = {
      cdUsuario: 5,
      cdUnidade: data.cdUnidade,
      dsEmail: data.dsEmail,
      dsNome: data.dsNome,
      dsSenha: data.dsSenha,
      dtCadastro: new Date().toISOString(),
      snAtivo: 'S',
      cdUnidadeNavigation: null,
    };

    localStorage.setItem('user', JSON.stringify(userData));

    navigate('/authentication/paymentMethod', { state: { userData } });
  };

  return (
    <>
      <ToastContainer />
      <CoverLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Seja um Membro Exclusivo FarmaNotifica!
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Entre com seu E-mail e senha para se registrar
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <FormProvider {...methods}>
              <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Nome"
                    variant="standard"
                    fullWidth
                    {...register('dsNome')}
                    error={Boolean(errors.dsNome)}
                    helperText={errors.dsNome?.message}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="number"
                    label="Código da Unidade"
                    variant="standard"
                    fullWidth
                    {...register('cdUnidade')}
                    error={Boolean(errors.cdUnidade)}
                    helperText={errors.cdUnidade?.message}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    {...register('dsEmail')}
                    error={Boolean(errors.dsEmail)}
                    helperText={errors.dsEmail?.message}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    label="Senha"
                    variant="standard"
                    fullWidth
                    {...register('dsSenha')}
                    error={Boolean(errors.dsSenha)}
                    helperText={errors.dsSenha?.message}
                  />
                </MDBox>
                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Checkbox />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{
                      cursor: 'pointer',
                      userSelect: 'none',
                      ml: -1,
                    }}
                  >
                    &nbsp;&nbsp;Eu aceito os&nbsp;
                  </MDTypography>
                  <MDTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    color="info"
                    textGradient
                  >
                    Termos e condições
                  </MDTypography>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth type="submit">
                    Sign Up
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Já tem uma conta?{' '}
                    <MDTypography
                      type="submit"
                      component={Link}
                      to="/authentication/sign-in"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign In
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </FormProvider>
          </MDBox>
        </Card>
      </CoverLayout>
    </>
  );
}

export default SignUpPartner;
