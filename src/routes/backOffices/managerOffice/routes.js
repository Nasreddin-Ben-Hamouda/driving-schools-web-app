import React,{lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/backOffices/managerOffice/Dashboard/Dashboard'));
const Configuration =lazy(() => import('../../../views/backOffices/managerOffice/Configuration/Configuration'));
const Customers =lazy(() => import('../../../views/backOffices/managerOffice/Customers/Customers'));

const routes = [
    { path: '/companies/:id', exact: true, name: 'Companies' },
    { path: '/companies/:id/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/companies/:id/customers', name: 'Customers', component: Customers},
    { path: '/companies/:id/monitors', name: 'Monitors', component: Dashboard },
    { path: '/companies/:id/cars', name: 'Cars', component: Dashboard },
    { path: '/companies/:id/exams', name: 'Exams', component: Dashboard },
    { path: '/companies/:id/sessions', name: 'Sessions', component: Dashboard },
    { path: '/companies/:id/configuration',  name: 'Configuration', component:Configuration },
    { path: '/companies/:id/calendar',  name: 'Calendar', component: Dashboard },
];

export default routes;
