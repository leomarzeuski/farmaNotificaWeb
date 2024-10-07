import React, { useState } from 'react';
import DashboardLayout from 'helpers/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'helpers/Navbars/DashboardNavbar';
import Footer from 'helpers/Footer';
import LinkAfiliadoTableList from './component';

function TableLinkAfiliado() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <LinkAfiliadoTableList />

      <Footer />
    </DashboardLayout>
  );
}

export default TableLinkAfiliado;
