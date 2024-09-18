import React, { useState } from 'react';
import DashboardLayout from 'helpers/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'helpers/Navbars/DashboardNavbar';
import Footer from 'helpers/Footer';
import MedicamentosList from './component';

function TableMedicamentos() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MedicamentosList />

      <Footer />
    </DashboardLayout>
  );
}

export default TableMedicamentos;
