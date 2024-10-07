/* eslint-disable */

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import MDBox from 'components/MDBox';
import DashboardLayout from 'helpers/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'helpers/Navbars/DashboardNavbar';
import Footer from 'helpers/Footer';
import { Card } from '@mui/material';

import { Link } from 'react-router-dom';
import * as chartData from './data/salesData';
function Dashboard() {
  const [isPaymentUser, setIsPaymentUser] = useState(false);
  const [isUserValidPlan, setIsUserValidPlan] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.isPaymentUser) {
      setIsPaymentUser(true);
      setIsUserValidPlan(userData.selectedPlan);
    }
  }, []);

  const salesData = [
    { name: 'Jan', vendas: 4000, receita: 2400 },
    { name: 'Feb', vendas: 3000, receita: 1398 },
    { name: 'Mar', vendas: 2000, receita: 9800 },
    { name: 'Apr', vendas: 2780, receita: 3908 },
    { name: 'May', vendas: 1890, receita: 4800 },
    { name: 'Jun', vendas: 2390, receita: 3800 },
    { name: 'Jul', vendas: 3490, receita: 4300 },
  ];
  
  const performanceData = [
    { name: 'Campanha 1', performance: 400 },
    { name: 'Campanha 2', performance: 300 },
    { name: 'Campanha 3', performance: 200 },
    { name: 'Campanha 4', performance: 278 },
    { name: 'Campanha 5', performance: 189 },
  ];
  
  const productPieData = [
    { name: 'Isotretinoina ', value: 400 },
    { name: 'Dapagliflozina ', value: 300 },
    { name: 'Olanzapina', value: 300 },
    { name: 'Pravastatina', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const affiliateData = [
    { name: 'Link Afiliado 1', vendas: 1500 },
    { name: 'Link Afiliado 2', vendas: 1000 },
    { name: 'Link Afiliado 3', vendas: 1200 },
    { name: 'Link Afiliado 4', vendas: 1300 },
    { name: 'Link Afiliado 5', vendas: 900 },
  ];
  
  const engagementData = [
    { name: '01/07', engagement: 2400 },
    { name: '08/07', engagement: 1398 },
    { name: '15/07', engagement: 9800 },
    { name: '22/07', engagement: 3908 },
    { name: '29/07', engagement: 4800 },
  ];
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isPaymentUser && isUserValidPlan && (
        <MDBox py={3}>
          <Grid container spacing={3}>
          {isUserValidPlan?.price !== "R$ 99,00/mês" && (
        <>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <MDBox p={2}>
                <h4>Vendas e Receita Mensal</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="vendas" fill="#8884d8" />
                    <Bar dataKey="receita" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <MDBox p={2}>
                <h4>Performance de Campanhas</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData.performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="performance"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </MDBox>
            </Card>
          </Grid>
        </>
      )}

            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox p={2}>
                  <h4>Vendas por Produto</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData.productPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {productPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </MDBox>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox p={2}>
                  <h4>Vendas Mensais</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="vendas" stroke="#8884d8" />
                      <Line type="monotone" dataKey="receita" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </MDBox>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox p={2}>
                  <h4>Vendas por Link Afiliado</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData.affiliateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="vendas" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </MDBox>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox p={2}>
                  <h4>Engajamento com FarmaNotifica</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData.engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="engagement" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      )}
      {!isUserValidPlan && (
        <MDBox py={3}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <MDBox p={3} textAlign="center">
                  <h4>Você não possui um plano válido 😢</h4>
                  <p>
                    Por favor, acesse a página de{' '}
                    <Link to="/profile" style={{ color: '#1976d2', textDecoration: 'none' }}>
                      Perfil
                    </Link>{' '}
                    para atualizar seu plano.
                  </p>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      )}

      {!isPaymentUser && (
        <iframe
          title="RelatorioFarmaNotifica"
          width="100%"
          height="1000"
          src="https://app.powerbi.com/view?r=eyJrIjoiNmRhNzczOWYtMWVmNC00MmVjLTgwYjAtOTRiNTFjMWRiOWI3IiwidCI6IjU5ZDRmMjQ5LTA1MjAtNDZjZi1iNmIyLTg3M2Q1ZGE1NDNmZSJ9"
          frameBorder="0"
          allowFullScreen="true"
        ></iframe>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
