import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

import DashboardLayout from 'helpers/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'helpers/Navbars/DashboardNavbar';
import Footer from 'helpers/Footer';
import ProfileInfoCard from 'helpers/Cards/InfoCards/ProfileInfoCard';
import ProfilesList from 'helpers/Lists/ProfilesList';
import DefaultProjectCard from 'helpers/Cards/ProjectCards/DefaultProjectCard';

import Header from 'layouts/profile/components/Header';
import PlatformSettings from 'layouts/profile/components/PlatformSettings';

// Data
import profilesListData from 'layouts/profile/data/profilesListData';

import farmaciaImg from 'assets/images/Farmacia-Autos-Custo-de-Paulinia.jpeg';
import team1 from 'assets/images/profile.jpeg';
import team2 from 'assets/images/profile.jpeg';
import team3 from 'assets/images/profile.jpeg';
import team4 from 'assets/images/profile.jpeg';
import { useAuth } from '../../context/auth';

function Overview() {
  const { user } = useAuth();

  console.log({ user });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: 'flex' }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Farmacias
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Melhoria no atendimento e entrega de medicamentos
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={farmaciaImg}
                label="Farmacia Droga+"
                title="Entrega Rápida"
                description="Implementação de um sistema de entrega expressa para medicamentos urgentes."
                action={{
                  type: 'internal',
                  route: '/pages/profile/profile-overview',
                  color: 'info',
                  label: 'ver projeto',
                }}
                authors={[
                  { image: team3, name: 'Fernanda Lima' },
                  { image: team4, name: 'Lucas Pereira' },
                  { image: team1, name: 'Maria Andrade' },
                  { image: team2, name: 'Carlos Eduardo' },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={farmaciaImg}
                label="Farmacia DrogaRaia"
                title="Aprimoramento do Atendimento"
                description="Treinamento contínuo da equipe para garantir o melhor atendimento aos nossos clientes."
                action={{
                  type: 'internal',
                  route: '/pages/profile/profile-overview',
                  color: 'info',
                  label: 'ver projeto',
                }}
                authors={[
                  { image: team4, name: 'Lucas Pereira' },
                  { image: team3, name: 'Fernanda Lima' },
                  { image: team2, name: 'Carlos Eduardo' },
                  { image: team1, name: 'Maria Andrade' },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={farmaciaImg}
                label="Farmacia Drogasil"
                title="Campanha de Vacinação"
                description="Organização de uma campanha de vacinação para a comunidade local."
                action={{
                  type: 'internal',
                  route: '/pages/profile/profile-overview',
                  color: 'info',
                  label: 'ver projeto',
                }}
                authors={[
                  { image: team4, name: 'Lucas Pereira' },
                  { image: team3, name: 'Fernanda Lima' },
                  { image: team2, name: 'Carlos Eduardo' },
                  { image: team1, name: 'Maria Andrade' },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
