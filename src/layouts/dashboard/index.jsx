import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "helpers/LayoutContainers/DashboardLayout";
import DashboardNavbar from "helpers/Navbars/DashboardNavbar";
import Footer from "helpers/Footer";
import ReportsBarChart from "helpers/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "helpers/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "helpers/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Consultas"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "em relação à semana passada",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Usuários Hoje"
                count="2.300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "em relação ao mês passado",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Faturamento"
                count="34 mil"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "em relação a ontem",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Novos Seguidores"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Atualizado recentemente",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="visualizações do site"
                  description="Desempenho da Última Campanha"
                  date="campanha enviada há 2 dias"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="vendas diárias"
                  description={
                    <>
                      (<strong>+15%</strong>) aumento nas vendas de hoje.
                    </>
                  }
                  date="atualizado há 4 min"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="tarefas concluídas"
                  description="Desempenho da Última Campanha"
                  date="atualizado recentemente"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
