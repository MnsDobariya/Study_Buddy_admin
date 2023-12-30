

/* eslint-disable*/
import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import axios from "axios";
import { element } from "prop-types";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ userProfile,imagePreview,profilePicture,updateData}) => {
  // console.log("userProfileuserProfile",userProfile);
  // console.log("userProfileuserProfile",imagePreview);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  // const [userProfile, setUserProfile] = useState();



  // const token = localStorage.getItem("token");

  // const getProfileUser = () => {
  //   axios.get("http://localhost:3000/api/v1/users/teacher/me", { headers: { "Authorization": `Bearer ${token}` } })
  //     .then((res) => {
  //       // console.log(res, "qqqqqqqqq");
  //       setUserProfile(res?.data)

  //     })
  // }

  // useEffect(() => {
  //   getProfileUser("")
  // }, [])



  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  //  const handleClick = () => {
  //   document.getElementById("imageUpload").click();
  //  }

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            {/* <FontAwesomeIcon icon={faPen} /> */}
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              height='20px'
              width='30px'
              className='edit-icon'
              // type="file"
            // style={{ marginRight: "10px", cursor: "pointer" }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
              />
            </svg> */}
            {/* <SoftTypography component={Link}  variant="body2" color="secondary">
              <Tooltip placement="top" onClick={()=> handleClick()} >
                <Icon>edit</Icon>
              </Tooltip>
            </SoftTypography> */}
            <SoftAvatar
              // src={burceMars}
              // src={imagePreview ? imagePreview : `http://localhost:3000${userProfile?.profileImage}`}
              src={imagePreview ? imagePreview :`http://localhost:3000/${profilePicture}`}
              alt="profile-image"
              // style={{width:50,height:50}}
              variant="rounded"
              size="xl"
              shadow="sm"
            />

            {/* <label htmlFor="imageUpload" className="button">
              <span className="">Upload</span>
            </label> */}
            {/* <input
              type="file"
              id="imageUpload"
              style={{ display: "none" }}
              onChange={(e) => {
                handleImageChange(e);
              }}
            /> */}
          </Grid>

          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {/* Alex Thompson */}
                {userProfile?.firstName}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {/* CEO / Co-Founder */}
                {userProfile?.lastName}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="App" icon={<Cube />} />
                <Tab label="Message" icon={<Document />} />
                <Tab label="Settings" icon={<Settings />} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}



export default Header;
