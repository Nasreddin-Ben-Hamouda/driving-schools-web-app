import React, {lazy, useEffect, useState} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardGroup,
  CWidgetProgressIcon, CSpinner,

} from '@coreui/react'
import {
  CChartLine,

} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import axios from "../../../../axios/scheduling-service";
import withErrorHandler from "../../../../hoc/backOffices/withErrorHandler";
const agencyId="606f0dc7e3bf6a72dd524d4f";
const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  useEffect(() => {
    getStatistics()
  }, []);

  const getStatistics = () => {
    axios.get('/statistic/' + agencyId)
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
                      header={statistics.countOfCustomers.toString()}
                      text="Customers"
                      color="gradient-info"
                      value={statistics.countOfCustomers * 100 / 100}
                  >
                    <CIcon name="cil-people" height="36"/>
                  </CWidgetProgressIcon>
                  <CWidgetProgressIcon
                      header={statistics.countOfMonitors.toString()}
                      text="Monitors"
                      color="gradient-success"
                      value={statistics.countOfMonitors * 100 / 100}
                  >
                    <CIcon name="cilListRich" height="36"/>
                  </CWidgetProgressIcon>
                  <CWidgetProgressIcon
                      header={statistics.countOfCars.toString()}
                      text="Cars"
                      color="gradient-warning"
                      value={statistics.countOfCars * 100 / 100}
                  >
                    <CIcon name="cilGarage" height="36"/>
                  </CWidgetProgressIcon>
                  <CWidgetProgressIcon
                      header={statistics.countOfExams.toString()}
                      text="Exams"
                      color="gradient-primary"
                      value={statistics.countOfExams * 100 / 100}
                  >
                    <CIcon name="cilTask" height="36"/>
                  </CWidgetProgressIcon>
                  <CWidgetProgressIcon
                      header={statistics.countOfSessions.toString()}
                      text="Session"
                      color="gradient-danger"
                      value={statistics.countOfSessions * 100 / 100}
                  >
                    <CIcon name="cilNotes" height="36"/>
                  </CWidgetProgressIcon>


                </CCardGroup>

                <CCard>
                  <CCardHeader>
                    Session and Exams Per Month
                  </CCardHeader>
                  <CCardBody>
                    <CChartLine
                        datasets={[
                          {
                            label: 'Exams',
                            backgroundColor: 'rgb(228,102,81,0.9)',
                            data:statistics.examsPerMonth
                          },
                          {
                            label: 'Sessions',
                            backgroundColor: 'rgb(0,216,255,0.9)',
                            data: statistics.sessionsPerMonth
                          }
                        ]}
                        options={{
                          tooltips: {
                            enabled: true
                          }
                        }}
                        labels="months"
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
