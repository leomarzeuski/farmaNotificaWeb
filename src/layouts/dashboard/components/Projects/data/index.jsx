/* eslint-disable react/prop-types */
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoDrogaRaia from "assets/images/logo-droga-raia.png";
import logoDrogasil from "assets/images/logo-drogasil.png";
import logoPacheco from "assets/images/logo-droga-raia.png";
import logoSãoJoão from "assets/images/logo-drogasil.png";
import logoUltrafarma from "assets/images/logo-droga-raia.png";
import logoPanvel from "assets/images/logo-drogasil.png";
import team1 from "assets/images/logo-droga-raia.png";
import team2 from "assets/images/logo-drogasil.png";
import team3 from "assets/images/logo-droga-raia.png";
import team4 from "assets/images/logo-drogasil.png";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "farmácias", accessor: "farmacias", width: "45%", align: "left" },
      { Header: "membros", accessor: "membros", width: "10%", align: "left" },
      { Header: "orçamento", accessor: "orcamento", align: "center" },
      { Header: "progresso", accessor: "progresso", align: "center" },
    ],

    rows: [
      {
        farmacias: <Company image={logoDrogaRaia} name="Droga Raia" />,
        membros: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "João Silva"],
              [team2, "Maria Oliveira"],
              [team3, "Carlos Souza"],
              [team4, "Ana Santos"],
            ])}
          </MDBox>
        ),
        orcamento: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            R$ 150.000
          </MDTypography>
        ),
        progresso: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={60} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        farmacias: <Company image={logoDrogasil} name="Drogasil" />,
        membros: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team2, "Maria Oliveira"],
              [team4, "Ana Santos"],
            ])}
          </MDBox>
        ),
        orcamento: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            R$ 50.000
          </MDTypography>
        ),
        progresso: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={20} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        farmacias: <Company image={logoPacheco} name="Drogaria Pacheco" />,
        membros: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "João Silva"],
              [team3, "Carlos Souza"],
            ])}
          </MDBox>
        ),
        orcamento: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Não definido
          </MDTypography>
        ),
        progresso: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        farmacias: <Company image={logoSãoJoão} name="Farmácias São João" />,
        membros: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team4, "Ana Santos"],
              [team3, "Carlos Souza"],
              [team2, "Maria Oliveira"],
              [team1, "João Silva"],
            ])}
          </MDBox>
        ),
        orcamento: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            R$ 250.000
          </MDTypography>
        ),
        progresso: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        farmacias: <Company image={logoUltrafarma} name="Ultrafarma" />,
        membros: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, "Ana Santos"]])}
          </MDBox>
        ),
        orcamento: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            R$ 10.000
          </MDTypography>
        ),
        progresso: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={30} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        farmacias: <Company image={logoPanvel} name="Panvel" />,
        membros: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "João Silva"],
              [team4, "Ana Santos"],
            ])}
          </MDBox>
        ),
        orcamento: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            R$ 70.000
          </MDTypography>
        ),
        progresso: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={45} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
    ],
  };
}
