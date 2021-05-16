import React,{lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/backOffices/managerOffice/Dashboard/Dashboard'));
const Configuration =lazy(() => import('../../../views/backOffices/managerOffice/Configuration/Configuration'));
const Customers =lazy(() => import('../../../views/backOffices/managerOffice/Customers/Customers'));
const Monitors =lazy(() => import('../../../views/backOffices/managerOffice/Monitors/Monitors'));
const Cars =lazy(() => import('../../../views/backOffices/managerOffice/Cars/Cars'));
const Exams =lazy(() => import('../../../views/backOffices/managerOffice/Exams/Exams'));
const Sessions =lazy(() => import('../../../views/backOffices/managerOffice/Sessions/Sessions'));
const SessionsCalendar =lazy(() => import('../../../views/backOffices/managerOffice/Sessions/Calendar/Calendar'));
const ExamsCalendar =lazy(() => import('../../../views/backOffices/managerOffice/Exams/Calendar/Calendar'));

const routes = [
    { path: '/companies/:id', exact: true, name: 'Companies' },
    { path: '/companies/:id/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/companies/:id/customers', name: 'Customers', component: Customers},
    { path: '/companies/:id/monitors', name: 'Monitors', component: Monitors },
    { path: '/companies/:id/cars', name: 'Cars', component: Cars },
    { path: '/companies/:id/exams',exact: true, name: 'Exams', component: Exams },
    { path: '/companies/:id/sessions',exact: true, name: 'Sessions', component: Sessions },
    { path: '/companies/:id/settings',  name: 'Settings', component:Configuration },
    { path: '/companies/:id/sessions/calendar',  name: 'Calendar', component: SessionsCalendar },
    { path: '/companies/:id/exams/calendar',  name: 'Calendar', component:ExamsCalendar },
];

export default routes;
