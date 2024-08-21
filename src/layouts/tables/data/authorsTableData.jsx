/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, surname, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={`${name} ${surname}`} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography display="block" variant="caption" fontWeight="medium">
          {surname}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Nome", accessor: "name", width: "20%", align: "left" },
      { Header: "Sobrenome", accessor: "surname", width: "20%", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Data de Recebimento", accessor: "receivedDate", align: "center" },
      { Header: "Data de Retirada", accessor: "withdrawalDate", align: "center" },
      { Header: "Visualizar Solicitação", accessor: "download", align: "center" },
    ],

    rows: [
      {
        name: <Author image={team2} name="João" surname="Silva" email="joao@farmacia.com" />,
        surname: <MDTypography variant="caption">Silva</MDTypography>,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Em Análise" color="warning" variant="gradient" size="sm" />
          </MDBox>
        ),
        receivedDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            23/04/23
          </MDTypography>
        ),
        withdrawalDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            30/04/23
          </MDTypography>
        ),
        download: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Baixar
          </MDTypography>
        ),
      },
      {
        name: <Author image={team3} name="Maria" surname="Oliveira" email="maria@farmacia.com" />,
        surname: <MDTypography variant="caption">Oliveira</MDTypography>,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Recusado" color="error" variant="gradient" size="sm" />
          </MDBox>
        ),
        receivedDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            11/01/23
          </MDTypography>
        ),
        withdrawalDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            18/01/23
          </MDTypography>
        ),
        download: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Baixar
          </MDTypography>
        ),
      },
      {
        name: <Author image={team4} name="Carlos" surname="Santos" email="carlos@farmacia.com" />,
        surname: <MDTypography variant="caption">Santos</MDTypography>,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Aprovado" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        receivedDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            19/09/22
          </MDTypography>
        ),
        withdrawalDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            26/09/22
          </MDTypography>
        ),
        download: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Baixar
          </MDTypography>
        ),
      },
      {
        name: <Author image={team3} name="Ana" surname="Pereira" email="ana@farmacia.com" />,
        surname: <MDTypography variant="caption">Pereira</MDTypography>,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Visualizar Arquivo" color="info" variant="gradient" size="sm" />
          </MDBox>
        ),
        receivedDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            24/12/22
          </MDTypography>
        ),
        withdrawalDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            31/12/22
          </MDTypography>
        ),
        download: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Baixar
          </MDTypography>
        ),
      },
      {
        name: <Author image={team3} name="Ricardo" surname="Costa" email="ricardo@farmacia.com" />,
        surname: <MDTypography variant="caption">Costa</MDTypography>,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Aprovado" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        receivedDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            04/10/22
          </MDTypography>
        ),
        withdrawalDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            11/10/22
          </MDTypography>
        ),
        download: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Baixar
          </MDTypography>
        ),
      },
      {
        name: <Author image={team4} name="Marta" surname="Ferreira" email="marta@farmacia.com" />,
        surname: <MDTypography variant="caption">Ferreira</MDTypography>,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Em Análise" color="warning" variant="gradient" size="sm" />
          </MDBox>
        ),
        receivedDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            14/09/22
          </MDTypography>
        ),
        withdrawalDate: (
          <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
            21/09/22
          </MDTypography>
        ),
        download: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Baixar
          </MDTypography>
        ),
      },
    ],
  };
}
