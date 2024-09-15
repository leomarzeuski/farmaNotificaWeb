import DashboardLayout from 'helpers/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'helpers/Navbars/DashboardNavbar';
import Footer from 'helpers/Footer';
import TableSolicitation from './data/authorsTableData';

function Tables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <TableSolicitation />

      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
