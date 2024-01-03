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
import brand from "assets/images/logo-ct.png";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ForgotPassword from "layouts/authentication/forgot-password";
import EmailVerify from "layouts/authentication/verify-email";

export default function App() {

  const ueseTeacher = "teacher";
  const filterRout = routes.filter((roles)=> roles.role !== ueseTeacher);
  // console.log("filterRout",filterRout);
  const [controller, dispatch] = useSoftUIController();
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
      // console.log("route",route.route, "***",route.component);
      if (localStorage.getItem("token")) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
        // <Route exact path={"/dashboard"} element={<Dashboard />} key={"sign-up"}/>;

      } else{
          //  <Route path="/authentication/sign-in" element={<Navigate to="/authentication/sign-in" />} />;
        <Route exact path={"/authentication/sign-up"} element={<SignUp />} key={"sign-up"}/>;
        <Route exact path={"/authentication/sign-in"} element={<SignIn />} key={"sign-in"}/>;
        <Route exact path={"/authentication/forgot-password"} element={<ForgotPassword />} key={"forgot-password"}/>;
        <Route exact path={"/authentication/verify-email"} element={<EmailVerify />} key={"verify-email"}/>;
      }
      return null;
    });

  // const getToken = localStorage.getItem("token");

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* {console.log(layout,"qqqqqq")} */}
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Soft UI Dashboard"
            routes={filterRout}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
        <Route exact path={"/authentication/sign-up"} element={<SignUp />} key={"sign-up"}/>;
        <Route exact path={"/authentication/sign-in"} element={<SignIn />} key={"sign-in"}/>;
        <Route exact path={"/authentication/forgot-password"} element={<ForgotPassword />} key={"forgot-password"}/>;
        <Route exact path={"/authentication/verify-email"} element={<EmailVerify />} key={"verify-email"}/>;
      </Routes>

      {/* <Routes>
        {getToken ? (
          <>
            <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes> */}
      {/* <Routes>
        {getToken && 
        <Route path="*" element={<Navigate to="/authentication/sign-in"/>}/>
        }
      </Routes>  */}
    </ThemeProvider>
  )
}
