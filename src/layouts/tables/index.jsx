import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

import DashboardLayout from 'helpers/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'helpers/Navbars/DashboardNavbar';
import Footer from 'helpers/Footer';
import DataTable from 'helpers/Tables';

// Data
import authorsTableData from 'layouts/tables/data/authorsTableData';

function Tables() {
  const { columns, rows } = authorsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
