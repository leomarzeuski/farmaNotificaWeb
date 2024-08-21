// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "helpers/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Visão Geral das Vendas
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            este mês
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="R$2400, Alterações no design das embalagens"
          dateTime="22 DEZ 19:20"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="Novo pedido #1832412"
          dateTime="21 DEZ 23:00"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="Pagamento dos fornecedores de Abril"
          dateTime="21 DEZ 21:34"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="Novo cartão adicionado para pedido #4395133"
          dateTime="20 DEZ 02:20"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="Novo cartão adicionado para pedido #4395133"
          dateTime="18 DEZ 04:54"
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
