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
import { useEffect, useState } from "react";
import { ApiGet } from "config/Api/ApiData";
import { EndPoint } from "config/EndPoint/Endpoint";
import { setAssignmentList } from "store/slices/assignmentSlice";
import { MdEvent } from "react-icons/md";
import { Bar, Bubble, Doughnut, Line, Pie, Radar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { setTodoList } from "store/slices/todoSlice";
import { setCalendarList } from "store/slices/calendarSlice";
import { setResourceList } from "store/slices/resourceSlice";
import { useNavigate } from "react-router-dom";


function Dashboard() {

  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const assignment = useSelector((state) => state.assignment);
  const todo = useSelector((state) => state.todo);
  const calendar = useSelector((state) => state.calendar);
  const resource = useSelector((state) => state.resource);
  const [todosData, setTodosData] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
  const [assignmentChartData, setAssignmentChartData] = useState([]);
  const [todoChartData, setTodoChartData] = useState([]);
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

  const navigate = useNavigate();

  const getAssignmentRecord = () => {

    ApiGet(`${EndPoint.ASSIGNMENT_GET}`)
      .then((res) => {

        const pieChartData = {
          labels: ['Pending', 'Started', 'Finished'],
          datasets: [
            {
              data: [
                res?.data?.filter((item) => item.status == "Pending").length || 0,
                res?.data?.filter((item) => item.status == "Started").length || 0,
                res?.data?.filter((item) => item.status == "Finished").length || 0,
              ],
              backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
              hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
          ],
        };
        // setAssignmentChartData(res?.data.filter((item)=>console.log('first', item.status)))
        setAssignmentChartData(res?.data)
        setAssignmentData(pieChartData);
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
        // console.log(res?.data, "response");
        // const convertedData = res?.data.map((todo) => ({
        //   task: todo.task,  
        //   portable: parseInt(todo.portable, 10), 
        // }));

        const pieChartData = {
          labels: ['Low', 'High', 'Medium'],
          datasets: [
            {
              data: [
                res?.data?.filter((item) => item.portable == "Low").length || 0,
                res?.data?.filter((item) => item.portable == "High").length || 0,
                res?.data?.filter((item) => item.portable == "Medium").length || 0,
              ],
              backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
              hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
          ],
        };
        setTodoChartData(res?.data)
        setTodosData(pieChartData);
        AppDispatch(setTodoList(res?.data));
        // setTodosData(res?.data);

      })
  }


  const getResources = () => {
    ApiGet(`${EndPoint.RESOURCES_GET}`)
      .then((res) => {
        // console.log('res.data', res.data)
        AppDispatch(setResourceList(res?.data))
      })
  }


  useEffect((e) => {
    getAssignmentRecord();
    getCalendarRecord();
    getTodosData();
    getResources();
  }, []);

  // const pieChartData = {
  //   labels: ['Completed', 'In Progress', 'Not Started'],
  //   datasets: [
  //     {
  //       data: [
  //         todosData.filter((todo) => todo.task === 'Completed')[0]?.portable || 0,
  //         todosData.filter((todo) => todo.task === 'In Progress')[0]?.portable || 0,
  //         todosData.filter((todo) => todo.task === 'Not Started')[0]?.portable || 0,
  //       ],
  //       backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
  //       hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
  //     },
  //   ],
  // };
  const options = {
    legend: {
      display: true,
      position: 'right',
    },
    onClick: (event, elements) => {
      navigate("/chartdata", { state: todoChartData })

      if (elements.length) {
        const clickedElementIndex = elements[0]._index;
        const datasetIndex = elements[0]._datasetIndex;
        const label = todosData.labels[clickedElementIndex];
        const value = todosData.datasets[datasetIndex].data[clickedElementIndex];
        handleOnClick(label, value);
      }
    },
  };
  const options1 = {
    legend: {
      display: true,
      position: 'right',
    },
    onClick: (event, elements) => {
      
      if (elements.length) {
        navigate("/chartdata", { state: assignmentChartData })
        const clickedElementIndex = elements[0]._index;
        const datasetIndex = elements[0]._datasetIndex;
        const label = assignmentData.labels[clickedElementIndex];
        const value = assignmentData.datasets[datasetIndex].data[clickedElementIndex];
        handleOnClick(label, value);
      }
    },
  };

  

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
          <Grid container spacing={3} style={{ justifyContent: "space-between" }}>
            <Grid item xs={12} lg={4.5}>
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
              <Card  >
                <CardContent>
                  <Typography variant="h6" gutterBottom marginTop={1}>
                    Task Status
                  </Typography>
                  <SoftBox mb={3} >
                    <Pie
                      data={todosData}
                      // options={{
                      //   legend: {
                      //     display: true,
                      //     position: 'right',
                      //   },
                      // }}
                      options={options}
                    />
                    {/* <p>
                      Deep and meaningful formal learning is supported as long as one of the three forms of interaction
                      (student–teacher; student-student; student-content) is at a high level. The other two may be
                      offered at minimal levels, or even eliminated, without degrading the educational experience.
                    </p> */}
                    {/* <Pie
                    data={{
                      labels: todosData.map((todo) => todo.task),
                      datasets: [
                        {
                          data: todosData.map((todo) => todo.portable),
                          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                          hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                        },
                      ],
                    }}
                    options={{
                      legend: {
                        display: true,
                        position: 'right',
                      },
                    }}
                  /> */}
                  </SoftBox>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4.5}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom marginTop={1}>
                    Assignment Status
                  </Typography>
                  <SoftBox mb={3}>
                    <Doughnut
                      data={assignmentData}
                      // options={{
                      //   legend: {
                      //     display: true,
                      //     position: 'right',
                      //   },
                      //   height: 400
                      // }}
                      options={options1}
                    />

                    {/* <Pie
                    data={{
                      labels: todosData.map((todo) => todo.task),
                      datasets: [
                        {
                          data: todosData.map((todo) => todo.portable),
                          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                          hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                        },
                      ],
                    }}
                    options={{
                      legend: {
                        display: true,
                        position: 'right',
                      },
                    }}
                  /> */}
                  </SoftBox>
                </CardContent>
              </Card>

            </Grid>
          </Grid>
        </SoftBox>
        {/* <SoftBox mb={3}>
          <Grid item xs={12} lg={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom marginTop={1}>
                  Assignment Status
                </Typography>
                <SoftBox mb={3}>
                  <Line
                    data={assignmentData}
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
        </SoftBox> */}
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
