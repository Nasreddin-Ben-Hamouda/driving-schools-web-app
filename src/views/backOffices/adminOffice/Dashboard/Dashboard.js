import React, {lazy, useEffect, useState} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardGroup,
  CWidgetProgressIcon, CSpinner,

} from '@coreui/react'
import {
  CChartPie,

} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import axios from "../../../../axios/subscription-service";
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler";
import {useSelector} from "react-redux";
import {cilArrowRight, cilBan, cilCheckCircle} from "@coreui/icons";

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  useEffect(() => {
    getStatistics()
  }, []);

  const getStatistics = () => {
    axios.get('/admin/statistics')
        .then((response) => {
          setStatistics(response.data);
        })
  }
  return (
      <>
        {
          statistics ?
              <>
                <CCardGroup className="mb-4">
                  <CWidgetProgressIcon
                      header={statistics.countOfUsers.toString()}
                      text="Users"
                      color="gradient-info"
                      value={statistics.countOfUsers * 100 / 100}
                  >
                    <CIcon name="cil-people" height="36"/>
                  </CWidgetProgressIcon>
                  <CWidgetProgressIcon
                      header={statistics.countOfUsersActive.toString()}
                      text="Active Users"
                      color="gradient-success"
                      value={statistics.countOfUsersActive * 100 / 100}
                  >
                    <CIcon name="cilCheck" height="36"/>
                  </CWidgetProgressIcon>
                  <CWidgetProgressIcon
                      header={statistics.countOfUsersSuspended.toString()}
                      text="Suspended Users"
                      color="gradient-danger"
                      value={statistics.countOfUsersSuspended * 100 / 100}
                  >
                    <CIcon name="cilBan" height="36"/>
                  </CWidgetProgressIcon>
                  <CWidgetProgressIcon
                      header={statistics.countOfUsersConfirmed.toString()}
                      text="Confirmed Users"
                      color="gradient-success"
                      value={statistics.countOfUsersConfirmed * 100 / 100}
                  >
                    <CIcon name="cilCheckCircle" height="36"/>
                  </CWidgetProgressIcon>
                  <CWidgetProgressIcon
                      header={statistics.countOfAgencies.toString()}
                      text="Agencies"
                      color="gradient-primary"
                      value={statistics.countOfAgencies * 100 / 100}
                  >
                    <CIcon name="cilBank" height="36"/>
                  </CWidgetProgressIcon>


                </CCardGroup>

                <CCard>
                  <CCardHeader>
                   Count Of Customers Per Agency
                  </CCardHeader>
                  <CCardBody>
                    <CChartPie
                        datasets={[
                          {
                            backgroundColor: statistics.backgroundColors,
                            data:statistics.data
                          }
                        ]}
                        labels={statistics.labels}
                        options={{
                          tooltips: {
                            enabled: true
                          }
                        }}
                    />
                  </CCardBody>
                </CCard>
              </>

              :
              <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
        }
      </>
  )
}

export default withErrorHandler(Dashboard,axios)
