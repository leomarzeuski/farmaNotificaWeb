import React, { useState } from 'react';
import { Card, CircularProgress } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import CoverLayout from 'layouts/authentication/components/CoverLayout';
import bgImage from 'assets/images/bg-sign-up-cover.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';

function Payments() {
  const { login } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const navigate = useNavigate();

  const plans = [
    {
      title: 'Visibilidade com anúncios',
      price: 'R$ 99,00/mês',
      subtitle: 'Nível Básico',
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      benefits: [
        'Maior exposição na lista de farmácias',
        'Destaque com anúncios',
        'Até 2 campanhas',
      ],
    },
    {
      title: 'Premium com Consultoria',
      price: 'R$ 299,00/mês',
      subtitle: 'Nível Profissional',
      background: 'linear-gradient(135deg, #d53369 0%, #daae51 100%)',
      benefits: [
        'Máxima visibilidade',
        'Maior exposição na lista de farmácias',
        'Consultoria personalizada',
        'Destaque sempre no topo',
        'Até 5 campanhas',
      ],
    },
  ];

  function generateRandomToken(length = 32) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

  const handlePayment = () => {
    setLoading(true);

    setLoading(false);
    toast.success('Pagamento confirmado com sucesso!');
    setTimeout(() => {
      const userData = JSON.parse(localStorage.getItem('user')) || {};

      const token = generateRandomToken();

      const updatedUserData = {
        ...userData,
        selectedPlan,
        cardDetails: {
          cardNumber: cardDetails.cardNumber,
          expiryDate: cardDetails.expiryDate,
        },
        isPaymentUser: true,
      };

      localStorage.setItem('user', JSON.stringify(updatedUserData));
      localStorage.setItem('authToken', token);

      login();
      navigate('/dashboard');
    }, 2000);
  };

  const handleBack = () => {
    setSelectedPlan(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  if (selectedPlan) {
    return (
      <CoverLayout image={bgImage}>
        <ToastContainer />
        <Card style={{ padding: '20px', maxWidth: '1200px', margin: 'auto', borderRadius: '15px' }}>
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
              Pagamento do {selectedPlan.title}
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDTypography variant="h5" fontWeight="medium" mb={2} textAlign="center">
              {selectedPlan?.title}
            </MDTypography>
            <MDTypography variant="h6" fontWeight="bold" color="info" mb={3} textAlign="center">
              {selectedPlan?.price}
            </MDTypography>

            <MDBox component="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Nome do Titular"
                  variant="standard"
                  fullWidth
                  name="cardName"
                  value={cardDetails?.cardName}
                  onChange={handleInputChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Número do Cartão"
                  variant="standard"
                  fullWidth
                  name="cardNumber"
                  value={cardDetails?.cardNumber}
                  onChange={handleInputChange}
                />
              </MDBox>
              <MDBox display="flex" gap={2} mb={2}>
                <MDInput
                  type="text"
                  label="Data de Validade (MM/AA)"
                  variant="standard"
                  fullWidth
                  name="expiryDate"
                  value={cardDetails?.expiryDate}
                  onChange={handleInputChange}
                />
                <MDInput
                  type="text"
                  label="CVV"
                  variant="standard"
                  fullWidth
                  name="cvv"
                  value={cardDetails?.cvv}
                  onChange={handleInputChange}
                />
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirmar Pagamento'}
                </MDButton>
              </MDBox>
              <MDBox mt={2}>
                <MDButton variant="outlined" color="info" fullWidth onClick={handleBack}>
                  Voltar
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
    );
  }

  return (
    <CoverLayout image={bgImage}>
      <ToastContainer />
      <MDBox pt={4} pb={3} px={3}>
        <Card
          style={{ padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
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
              Escolha o plano ideal para sua farmácia
            </MDTypography>
          </MDBox>

          <MDBox display="flex" justifyContent="space-between" flexWrap="wrap" gap={3} mt={3}>
            {plans.map((plan, index) => (
              <Card
                key={index}
                style={{
                  width: '45%',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
                onClick={() => setSelectedPlan(plan)}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div
                  style={{
                    background: plan.background,
                    padding: '10px',
                    borderRadius: '12px 12px 0 0',
                    textAlign: 'center',
                  }}
                >
                  <MDTypography variant="h5" fontWeight="bold" style={{ color: '#fff' }}>
                    {plan.title}
                  </MDTypography>
                  <MDTypography variant="h6" fontWeight="medium">
                    {plan.subtitle}
                  </MDTypography>
                </div>

                <MDBox p={3} textAlign="left" color="#000">
                  {/* Price Section */}
                  <MDTypography variant="h6" fontWeight="bold" mb={2}>
                    Preço mensal
                  </MDTypography>
                  <MDTypography variant="h6" color="textPrimary" mb={2}>
                    {plan.price}
                  </MDTypography>

                  {/* Divider */}
                  <hr />

                  {/* Benefits Section */}
                  <MDTypography variant="h6" fontWeight="bold" mb={2}>
                    Benefícios:
                  </MDTypography>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {plan.benefits.map((benefit, index) => (
                      <li key={index}>
                        <MDTypography variant="body2" color="textPrimary">
                          {benefit}
                        </MDTypography>
                      </li>
                    ))}
                  </ul>

                  <MDBox mt={3}>
                    <MDButton variant="contained" color="info" fullWidth>
                      Escolher Plano
                    </MDButton>
                  </MDBox>
                </MDBox>
              </Card>
            ))}
          </MDBox>
        </Card>
      </MDBox>
    </CoverLayout>
  );
}

export default Payments;
