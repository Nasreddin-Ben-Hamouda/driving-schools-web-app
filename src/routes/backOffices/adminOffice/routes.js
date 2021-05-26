import React,{lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/backOffices/adminOffice/Dashboard/Dashboard'));
const Users =lazy(() => import('../../../views/backOffices/adminOffice/Users/Users'));
const Agencies =lazy(() => import('../../../views/backOffices/adminOffice/Agencies/Agencies'));
const Profile =lazy(() => import('../../../views/backOffices/adminOffice/Profile/Profile'));

const routes = [
    { path: '/administrator', exact: true, name: 'Administrator' },
    { path: '/administrator/dashboard',exact: true, name: 'dash', component: Dashboard },
    { path: '/administrator/users',exact: true, name: 'Users', component: Users},
    { path: '/administrator/agencies', exact: true,name: 'Agencies', component: Agencies },
    { path: '/administrator/profile', exact: true, name: 'Profile', component:Profile },
];

export default routes;
