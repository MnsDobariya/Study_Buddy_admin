import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// React components
import SoftBox from "components/SoftBox";

// React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// React themes
import theme from "assets/theme";

// React routes
import routes from "routes";

// React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from '../src/layouts/img/original-removebg.png';
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ForgotPassword from "layouts/authentication/forgot-password";
import EmailVerify from "layouts/authentication/verify-email";
import { useDispatch } from "react-redux";
import { setAssignmentList } from "store/slices/assignmentSlice";
import { ApiGet } from "config/Api/ApiData";
import { EndPoint } from "config/EndPoint/Endpoint";
import { setCalendarList } from "store/slices/calendarSlice";
import { setTodoList } from "store/slices/todoSlice";
import { setResourceList } from "store/slices/resourceSlice";
import LandingPage from "landing/landing";

export default function App() {

  // const ueseTeacher = "Admin";
  const role = localStorage.getItem("role")
  // console.log('role', role)
  const filterRout = routes?.filter((route) => route?.role?.includes(role));
  // console.log('filterRout', filterRout)

  const [controller, dispatch] = useSoftUIController();
  const AppDispatch = useDispatch();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();


  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };


  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getToken = localStorage.getItem("token");
  // const getToken = localStorage.getItem("token");

  const getRoutes = (allRoutes) =>

    allRoutes.map((route) => {
      if (localStorage.getItem("token")) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
        // <Route exact path={"/dashboard"} element={<Dashboard />} key={"sign-up"}/>;

      } else {
        //  <Route path="/authentication/sign-in" element={<Navigate to="/authentication/sign-in" />} />;
        <Route exact path={"/landingPage"} element={<SignUp />} key={"landing"} />;
        <Route exact path={"/authentication/sign-up"} element={<SignUp />} key={"sign-up"} />;
        <Route exact path={"/authentication/sign-in"} element={<SignIn />} key={"sign-in"} />;
        <Route exact path={"/authentication/forgot-password"} element={<ForgotPassword />} key={"forgot-password"} />;
        <Route exact path={"/authentication/verify-email"} element={<EmailVerify />} key={"verify-email"} />;
      }
      return null;
    });

  // const getToken = localStorage.getItem("token");


  // console.log('assignment', assignment)
  const getAssignmentRecord = () => {
    // axios.get("http://localhost:3000/api/v1/users/teacher/get",
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
          AppDispatch(setResourceList(res?.data));
      });
}

useEffect((e) => {
    getAssignmentRecord();
    getCalendarRecord();
    getTodosData();
    getResources();
}, []);


const userToken = localStorage.getItem("token");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {userToken && layout === "dashboard" && (
        <div>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            // brandName="Study Buddy1"
            routes={filterRout}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            sx={{
              "& .css-5fzm53": { width: '9.2rem', height: "5rem" },
              "& .css-ixyk52-MuiTypography-root ": { fontSize: '1.1rem', marginTop: "10%" }
            }}
          />
          <Configurator />

        </div>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/landingPage" />} />
        <Route exact path={"/landingPage"} element={<LandingPage />} key={"landing"} />;
        <Route exact path={"/authentication/sign-up"} element={<SignUp />} key={"sign-up"} />;
        <Route exact path={"/authentication/sign-in"} element={<SignIn />} key={"sign-in"} />;
        <Route exact path={"/authentication/forgot-password"} element={<ForgotPassword />} key={"forgot-password"} />;
        <Route exact path={"/authentication/verify-email"} element={<EmailVerify />} key={"verify-email"} />;
      </Routes>
    </ThemeProvider>
  )
}
