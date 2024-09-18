import React, { useState } from 'react';
import DashboardLayout from 'helpers/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'helpers/Navbars/DashboardNavbar';
import Footer from 'helpers/Footer';
import StorageList from './component';

function TableStorage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <StorageList />

      <Footer />
    </DashboardLayout>
  );
}

export default TableStorage;
