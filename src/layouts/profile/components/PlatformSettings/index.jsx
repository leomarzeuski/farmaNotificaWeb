import { useState } from 'react';

// @mui material components
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

function PlatformSettings() {
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [newArrivals, setNewArrivals] = useState(false);

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Configurações da Plataforma
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          Conta
        </MDTypography>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={orderUpdates} onChange={() => setOrderUpdates(!orderUpdates)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Notificações sobre atualizações de pedidos
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox mt={3}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            Aplicativo
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={newArrivals} onChange={() => setNewArrivals(!newArrivals)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Novos produtos em estoque
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default PlatformSettings;
