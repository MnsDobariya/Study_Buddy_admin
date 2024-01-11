import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
// import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "@mui/material";
import '../profile/profile.css';
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import { toast } from "react-toastify";
import { ApiGet } from "config/Api/ApiData";
import { EndPoint } from "config/EndPoint/Endpoint";
import { ApiPut } from "config/Api/ApiData";

function Overview() {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    profilePicture: ""
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    profilePicture: ""
  });

  const [imagePreview, setImagePreview] = useState(null);

  const token = localStorage.getItem("token");

  const getUserProfile = () => {
    ApiGet(`${EndPoint.PROFILE_GET}`)
      .then((res) => {
        // console.log(res,"userProfile");
        setUserProfile(res?.data)
      })
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const textRegex = /^[A-Za-z\s]+$/;

    if (name === "firstName" || name === "lastName" || name === "email" || name === "gender") {
      if (!textRegex.test(value)) {
        setError({
          ...error,
          [name]: "",
        });
        return;
      }
    }

    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUserProfile({
          ...userProfile,
          profilePicture: file,
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }



  const updateuserProfile = () => {
    const error = {};

    if(!userProfile?.phone){
      error.phone = "Please Phone Required"
    }

    if(error.phone){
      setError(error)
      return;
    }



    const form_data = new FormData();

    form_data.append("firstName", userProfile?.firstName)
    form_data.append("lastName", userProfile?.lastName)
    form_data.append("email", userProfile?.email)
    form_data.append("phone", userProfile?.phone)
    form_data.append("gender", userProfile?.gender)
    if(userProfile?.profilePicture){
      form_data.append("profileImage", userProfile?.profilePicture)
    }


    ApiPut(`${EndPoint.PROFILE_UPDATE}`, form_data)
      .then((res) => {
        console.log(res,"userProfileupdate");
        toast.success(<p style={{ fontSize: "80%" }}>{"Profile Update Successfully"}</p>);
      })
      .catch((error) => {
        console.log(error, "error");
      })
  }

  return (
    <DashboardLayout>
      <Header userProfile={userProfile} imagePreview={imagePreview} handleImageChange={handleImageChange} />
      {/* <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <PlatformSettings />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                FirstName: "abc",
                LastName: "gfrt",
                Mobile: "1515478963",
                Email: "abc@gmail.com",
                Location: "USA",
              }}
              // handleOpen={handleOpen}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}

            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <ProfilesList title="conversations" profiles={profilesListData} />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                Projects
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Architects design houses
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor1}
                  label="project #2"
                  title="modern"
                  description="As Uber works through a huge amount of internal management turmoil."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor2}
                  label="project #1"
                  title="scandinavian"
                  description="Music is something that every person has his or her own specific opinion about."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor3}
                  label="project #3"
                  title="minimalist"
                  description="Different people have different taste, and various types of music."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team4, name: "Peterson" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team1, name: "Elena Morison" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <PlaceholderCard title={{ variant: "h5", text: "New project" }} outlined />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox> */}
      <SoftBox mt={4} mb={1}>
        {/* <h2 style={{ textAlign: "left", marginTop: "5%" }}>
        Profile
        </h2> */}

        <div className="container" style={{ marginTop: "0%", marginRight: "5%" }}>
          <h2 style={{ textAlign: "left" }}>
            Profile
          </h2>
          <form className="profile">
            <div className="col-sm-12 mx-t3 mb-3">
            </div>
            <div className="form-row" style={{ display: "flex", marginTop: "10%", paddingLeft: "41px", paddingRight: "41px" }}>
              <div className="col-sm-6 form-group">
                <label htmlFor="name-f" style={{ fontWeight: "500" }} >FirstName</label>
                <SoftInput
                  type="text"
                  name="firstName"
                  value={userProfile?.firstName}
                  placeholder="FirstName"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="col-sm-6 form-group">
                <label htmlFor="name-l" style={{ fontWeight: "500" }} >LastName</label>
                <SoftInput
                  type="text"
                  name="lastName"
                  value={userProfile?.lastName}
                  placeholder="LastName"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
            <div className="form-row" style={{ display: "flex", paddingLeft: "41px", paddingRight: "41px" }}>
              <div className="col-sm-6 form-group">
                <label htmlFor="portable" style={{ fontWeight: "500" }}>Email</label>
                <SoftInput
                  type="email"
                  name="email"
                  disabled
                  value={userProfile?.email}
                  placeholder="Email"
                // onChange={(e) => {
                //   handleChange(e);
                // }}
                />
              </div>
              <div className="col-sm-6 form-group">
                <label htmlFor="description" style={{ fontWeight: "500" }} >Phone</label>
                <SoftInput
                  type="text"
                  name="phone"
                  value={userProfile?.phone}
                  placeholder="Phone"
                  onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^[0-9\b]+$/;
                    if (input === '' || regex.test(input) && input.length <= 10 ) {
                      setError({
                        ...error,
                        Mobile: "",
                      });
                      handleChange(e);
                    } else {
                      setError({
                        ...error,
                        Mobile: "Please enter valid 10-digit mobile number",
                      })
                    }
                  }}
                />
                {error.phone && <p style={{ color: "red", fontSize: "60%" }}>{error.phone}</p>}
              </div>
            </div>
            <div className="form-row" style={{ display: "flex", paddingLeft: "41px", paddingRight: "41px" }}>
              <div className="col-sm-6 form-group mt-1">
                <h5 style={{ display: "flex" }}>
                  <label htmlFor='Gender' style={{ fontWeight: "500" }} >Gender :{""}</label>
                </h5>
                <input
                  type='radio'
                  name='gender'
                  checked={userProfile?.gender === "male" ? true : false}
                  onChange={(e) => {
                    setUserProfile({
                      ...userProfile,
                      gender: "male"
                    })
                  }}
                />
                Male
                <input
                  type='radio'
                  name='gender'
                  style={{ marginLeft: "20px" }}
                  checked={userProfile?.gender === "female" ? true : false}
                  onChange={(e) => {
                    setUserProfile({
                      ...userProfile,
                      gender: "female",
                    })
                  }}
                />
                Female
              </div>
            </div>
            <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "32%", width: "30%" }}>
              <SoftButton className="teacher1" variant="gradient" color="info" fullWidth onClick={updateuserProfile} style={{ boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)" }}
              >
                Update
              </SoftButton>
              <SoftButton variant="gradient" color="info" marginLeft="50%" fullWidth style={{ boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)" }}>
                Cancel
              </SoftButton>
            </SoftBox>
          </form>
        </div >
      </SoftBox >
      <Footer />


      {/* <Modal>

      </Modal> */}
    </DashboardLayout>
  );
}

export default Overview;
