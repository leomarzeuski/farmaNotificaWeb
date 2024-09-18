import React, { useState } from 'react';
import TableCadastroMedicamento from './component';
import DashboardLayout from 'helpers/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'helpers/Navbars/DashboardNavbar';
import Footer from 'helpers/Footer';

function CadastroMedicamento() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <TableCadastroMedicamento />

      <Footer />
    </DashboardLayout>
  );
}

export default CadastroMedicamento;
