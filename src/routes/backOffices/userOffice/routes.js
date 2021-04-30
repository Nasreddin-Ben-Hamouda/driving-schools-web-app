import React,{lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/backOffices/userOffice/Dashboard'));

const routes = [
    { path: '/companies/:id', exact: true, name: 'Companies' },
    { path: '/companies/:id/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/companies/:id/customers', name: 'Customers', component: Dashboard },
    { path: '/companies/:id/monitors', name: 'Monitors', component: Dashboard },
    { path: '/companies/:id/cars', name: 'Cars', component: Dashboard },
    { path: '/companies/:id/exams', name: 'Exams', component: Dashboard },
    { path: '/companies/:id/sessions', name: 'Sessions', component: Dashboard },
    { path: '/companies/:id/user-companies',  name: 'Companies', component: Dashboard },
    { path: '/companies/:id/calendar',  name: 'Calendar', component: Dashboard },
];

export default routes;
