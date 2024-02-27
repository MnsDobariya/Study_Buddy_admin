import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ApiGet } from "config/Api/ApiData";
import { EndPoint } from "config/EndPoint/Endpoint";
import { setAssignmentList } from "store/slices/assignmentSlice";
import { MdEvent } from "react-icons/md";
import { Pie } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { setTodoList } from "store/slices/todoSlice";
import { setCalendarList } from "store/slices/calendarSlice";
import { setResourceList } from "store/slices/resourceSlice";


function Dashboard() {

  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const assignment = useSelector((state) => state.assignment);
  const todo = useSelector((state) => state.todo);
  const calendar = useSelector((state) => state.calendar);
  const resource = useSelector((state) => state.resource);



  const pieChartData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [20, 30, 50], // Example percentages for each category
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'], // Example colors for each category
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  const AppDispatch = useDispatch();


  const getAssignmentRecord = () => {

    ApiGet(`${EndPoint.ASSIGNMENT_GET}`)
      .then((res) => {
        AppDispatch(setAssignmentList(res?.data))
        // setAssignmentCount(res?.data.length);
      }).catch((error) => {
      })
  };

  const getCalendarRecord = () => {
    ApiGet(`${EndPoint.EVENT_GET}`)
      .then((res) => {
        let updated = res?.data?.map((x) => ({
          ...x,
          title: x?.Title,
          start: x?.StartDate,
          end: x?.EndDate
        }))
        AppDispatch(setCalendarList(updated))

      })
  };

  const getTodosData = () => {
    ApiGet(`${EndPoint.TODOS_GET}`)
      .then((res) => {
        AppDispatch(setTodoList(res?.data))
      })
  }



  const getResources = () => {
    ApiGet(`${EndPoint.RESOURCES_GET}`)
      .then((res) => {
        console.log('res.data', res.data)
        AppDispatch(setResourceList(res?.data))
      })
  }


  useEffect((e) => {
    getAssignmentRecord();
    getCalendarRecord();
    getTodosData();
    getResources();
  }, []);



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Todos" }}
                count={todo.todoList?.length}
                // percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
              {/* <FontAwesomeIcon icon={faListCheck} size="xs" style={{ color: "#3a416f" }} />, */}

            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Calendar Events" }}
                count={calendar.calendarList?.length}
                // percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Resources" }}
                count={resource.resourceList?.length}
                // percentage={{ color: "success", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Assignments" }}
                count={assignment.assignmentList?.length}
                // percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              // icon={<MdEvent />}
              />

            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              {/* <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              /> */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Task Status
                  </Typography>
                  <SoftBox mb={3}>
                    <Pie
                      data={pieChartData}
                      options={{
                        legend: {
                          display: true,
                          position: 'right',
                        },
                      }}
                    />
                  </SoftBox>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={5}>
              {/* <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              /> */}

            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            {/* <Projects /> */}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {/* <OrderOverview /> */}
          </Grid>
        </Grid>
      </SoftBox>
      {/* <Footer />  	 */}
    </DashboardLayout>
  );
}

export default Dashboard;
