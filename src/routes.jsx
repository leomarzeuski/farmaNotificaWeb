import Dashboard from 'layouts/dashboard';
import Tables from 'layouts/tables';
import Profile from 'layouts/profile';
import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';

// @mui icons
import Icon from '@mui/material/Icon';
import CadastroMedicamento from './layouts/addMedications';
import TableMedicamentos from './layouts/tableMedications';
import TableStorage from './layouts/storage';
import Payments from './layouts/authentication/payment-method';
import SignUpPartner from './layouts/authentication/sign-up-partner';

const routes = [
  {
    type: 'collapse',
    name: 'Perfil',
    key: 'profile',
    icon: <Icon fontSize="small">person</Icon>,
    route: '/profile',
    component: <Profile />,
    protected: true,
  },
  {
    type: 'collapse',
    name: 'Dashboard',
    key: 'dashboard',
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: '/dashboard',
    component: <Dashboard />,
    protected: true,
  },
  {
    type: 'collapse',
    name: 'Solicitações',
    key: 'tables',
    icon: <Icon fontSize="small">table_view</Icon>,
    route: '/tables',
    component: <Tables />,
    protected: true,
  },
  {
    type: 'collapse',
    name: 'Estoque de Medicamentos',
    key: 'medicamentos-estoque',
    icon: <Icon fontSize="small">inventory</Icon>,
    route: '/medicamentos/estoque',
    component: <TableStorage />,
    protected: true,
  },
  {
    type: 'collapse',
    name: 'Lista de Medicamentos',
    key: 'medicamentos-lista',
    icon: <Icon fontSize="small">list</Icon>,
    route: '/medicamentos/lista',
    component: <TableMedicamentos />,
    protected: true,
  },
  {
    type: 'collapse',
    name: 'Cadastrar Medicamento',
    key: 'medicamentos-cadastrar',
    icon: <Icon fontSize="small">add_circle</Icon>,
    route: '/medicamentos/cadastrar',
    component: <CadastroMedicamento />,
    protected: true,
  },
  {
    type: 'collapse',
    name: 'Login',
    key: 'sign-in',
    icon: <Icon fontSize="small">login</Icon>,
    route: '/authentication/sign-in',
    component: <SignIn />,
    protected: false,
  },
  {
    type: 'collapse',
    name: 'Cadastro',
    key: 'sign-up',
    icon: <Icon fontSize="small">assignment</Icon>,
    route: '/authentication/sign-up',
    component: <SignUp />,
    protected: false,
  },
  {
    type: 'collapse',
    name: 'Cadastro Parceiro',
    key: 'sign-up-partner',
    icon: <Icon fontSize="small">assignment</Icon>,
    route: '/authentication/sign-up/partner',
    component: <SignUpPartner />,
    protected: false,
  },
  {
    type: 'collapse',
    name: 'Pagamentos',
    key: 'payments',
    icon: <Icon fontSize="small">assignment</Icon>,
    route: '/authentication/paymentMethod',
    component: <Payments />,
    protected: false,
  },
];

export default routes;
