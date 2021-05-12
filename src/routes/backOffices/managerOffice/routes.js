import React,{lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/backOffices/managerOffice/Dashboard/Dashboard'));
const Configuration =lazy(() => import('../../../views/backOffices/managerOffice/Configuration/Configuration'));
const Customers =lazy(() => import('../../../views/backOffices/managerOffice/Customers/Customers'));
const Monitors =lazy(() => import('../../../views/backOffices/managerOffice/Monitors/Monitors'));
const Cars =lazy(() => import('../../../views/backOffices/managerOffice/Cars/Cars'));
const Exams =lazy(() => import('../../../views/backOffices/managerOffice/Exams/Exams'));
const Sessions =lazy(() => import('../../../views/backOffices/managerOffice/Sessions/Sessions'));
const routes = [
    { path: '/companies/:id', exact: true, name: 'Companies' },
    { path: '/companies/:id/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/companies/:id/customers', name: 'Customers', component: Customers},
    { path: '/companies/:id/monitors', name: 'Monitors', component: Monitors },
    { path: '/companies/:id/cars', name: 'Cars', component: Cars },
    { path: '/companies/:id/exams', name: 'Exams', component: Exams },
    { path: '/companies/:id/sessions', name: 'Sessions', component: Sessions },
    { path: '/companies/:id/settings',  name: 'Settings', component:Configuration },
    { path: '/companies/:id/calendar',  name: 'Calendar', component: Dashboard },
];

export default routes;
