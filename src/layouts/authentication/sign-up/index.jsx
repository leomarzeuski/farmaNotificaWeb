import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDInput from 'components/MDInput'
import MDButton from 'components/MDButton'
import CoverLayout from 'layouts/authentication/components/CoverLayout'
import bgImage from 'assets/images/bg-sign-up-cover.jpeg'
import userService from 'services/user/userService'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Definindo o esquema de validação com Yup
const schema = yup.object().shape({
    dsNome: yup.string().required('Nome é obrigatório'),
    dsEmail: yup
        .string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    dsSenha: yup
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('Senha é obrigatória'),
    nrCpf: yup
        .string()
        .matches(/^\d{11}$/, 'CPF deve ter 11 dígitos')
        .required('CPF é obrigatório'),
})

function Cover() {
    const methods = useForm({
        resolver: yupResolver(schema),
    })

    const { handleSubmit, register } = methods

    const onSubmit = async (data) => {
        try {
            const result = await userService.createUser(data)
            console.log('User created successfully', result)
        } catch (error) {
            console.error('Failed to create user', error)
        }
    }

    return (
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
                    <MDTypography
                        variant="h4"
                        fontWeight="medium"
                        color="white"
                        mt={1}
                    >
                        Seja um apoiador FarmaNotifica
                    </MDTypography>
                    <MDTypography
                        display="block"
                        variant="button"
                        color="white"
                        my={1}
                    >
                        Entre com seu E-mail e senha para se registrar
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <FormProvider {...methods}>
                        <MDBox
                            component="form"
                            role="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Nome"
                                    variant="standard"
                                    fullWidth
                                    {...register('dsNome')}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="email"
                                    label="Email"
                                    variant="standard"
                                    fullWidth
                                    {...register('dsEmail')}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="CPF"
                                    variant="standard"
                                    fullWidth
                                    {...register('nrCpf')}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="password"
                                    label="Senha"
                                    variant="standard"
                                    fullWidth
                                    {...register('dsSenha')}
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
                                <MDButton
                                    variant="gradient"
                                    color="info"
                                    fullWidth
                                    type="submit"
                                >
                                    Sign Up
                                </MDButton>
                            </MDBox>
                            <MDBox mt={3} mb={1} textAlign="center">
                                <MDTypography variant="button" color="text">
                                    Já tem uma conta?{' '}
                                    <MDTypography
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
    )
}

export default Cover
