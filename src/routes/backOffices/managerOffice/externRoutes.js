import React,{lazy} from 'react';

const Agency =lazy(() => import('../../../views/backOffices/managerOffice/Agency/Agency'));

const routes = [
    { path: '/companies/:id/createAgency', exact: true,name: 'Agency', component:Agency },
];

export default routes;
