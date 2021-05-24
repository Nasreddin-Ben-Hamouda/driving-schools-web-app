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
const Profile =lazy(() => import('../../../views/backOffices/managerOffice/Profile/Profile'));
const Agency =lazy(() => import('../../../views/backOffices/managerOffice/Agency/Agency'));

const routes = [
    { path: '/companies/:id', exact: true, name: 'Companies' },
    { path: '/companies/:id/dashboard',exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/companies/:id/customers',exact: true, name: 'Customers', component: Customers},
    { path: '/companies/:id/monitors', exact: true,name: 'Monitors', component: Monitors },
    { path: '/companies/:id/cars',exact: true, name: 'Cars', component: Cars },
    { path: '/companies/:id/exams',exact: true, name: 'Exams', component: Exams },
    { path: '/companies/:id/sessions',exact: true, name: 'Sessions', component: Sessions },
    { path: '/companies/:id/settings', exact: true, name: 'Settings', component:Configuration },
    { path: '/companies/:id/sessions/calendar',exact: true,  name: 'Calendar', component: SessionsCalendar },
    { path: '/companies/:id/exams/calendar', exact: true, name: 'Calendar', component:ExamsCalendar },
    { path: '/companies/:id/profile', exact: true, name: 'Profile', component:Profile },
    { path: '/companies/:id/agency', exact: true,name: 'Agency', component:Agency },
];

export default routes;
