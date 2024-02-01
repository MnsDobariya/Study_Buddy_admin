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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// const today = dayjs();
// const tomorrow = dayjs().add(1, 'day');

const genderDropDown = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" }
];

const yearDropDown = [
  { label: "FYBCA", value: "FYBCA" },
  { label: "SYBCA", value: "SYBCA" },
  { label: "TYBCA", value: "TYBCA" }
];

const semesterDropDown = [
  { label: "Semester1", value: "Semester 1" },
  { label: "Semester2", value: "Semester 2" },
  { label: "Semester3", value: "Semester 3" },
  { label: "Semester4", value: "Semester 4" },
  { label: "Semester5", value: "Semester 5" },
  { label: "Semester6", value: "Semester 6" }
];

const divisionDropDown = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
];



function Overview() {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    profilePicture: "",
    // birthday: "",
    spId: "",
    year: "",
    semester: "",
    division: "",
    otherDivision: ""
  });
//   console.log(userProfile?.otherDivision, "userProfile");


  const [isAuthorSelect, setIsAuthorSelect] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    profilePicture: "",
    // birthday: "",
    spId: "",
    year: "",
    semester: "",
    division: ""
  });

  const [imagePreview, setImagePreview] = useState(null);

  // const role = localStorage.getItem("role");

  divisionDropDown.push({ label: userProfile?.otherDivision, value: userProfile?.otherDivision });


  const getUserProfile = () => {
    ApiGet(`${EndPoint.PROFILE_GET}`)
      .then((res) => {
        setUserProfile(res?.data)
      })
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target, "e.target");
    console.log(e.target,"e.target");
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

    if (!userProfile?.phone) {
      error.phone = "Please Phone Required"
    }

    if (error.phone) {
      setError(error)
      return;
    }



    const form_data = new FormData();


    form_data.append("firstName", userProfile?.firstName)
    form_data.append("lastName", userProfile?.lastName)
    form_data.append("email", userProfile?.email)
    form_data.append("phone", userProfile?.phone)
    form_data.append("gender", userProfile?.gender)
    form_data.append("birthday", startDate)
    form_data.append("spId", userProfile?.spId)
    form_data.append("year", userProfile?.year)
    form_data.append("semester", userProfile?.semester)
    form_data.append("division", userProfile?.otherDivision ? userProfile?.otherDivision : userProfile?.division)
    if (userProfile?.profilePicture) {
      form_data.append("profileImage", userProfile?.profilePicture)
    }


    ApiPut(`${EndPoint.PROFILE_UPDATE}`, form_data)
      .then((res) => {
        toast.success(<p style={{ fontSize: "80%" }}>{"Profile Update Successfully"}</p>);
        getUserProfile();
      })
      .catch((error) => {
      })



    // divisionDropDown.push({ label: userProfile?.otherDivision, value: userProfile?.otherDivision });

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
      <h1 style={{ textAlign: "left", marginLeft: "1.5%", marginTop: "3%", marginBottom: "7%" }}>
        Profile
      </h1>
      <SoftBox mt={4} mb={1}>
        <div className="container" style={{ marginTop: "0%", marginRight: "5%" }}>
          <form className={userProfile?.role === 'Teacher' ? 'profileTeacher' : 'profileUser'}>
            <div className="col-sm-12 mx-t3 mb-3">
            </div>
            <div className="form-row" style={{ display: "flex", marginTop: "5%", paddingLeft: "41px", paddingRight: "41px" }}>
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
                <label htmlFor="email" style={{ fontWeight: "500" }}>Email</label>
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
                <label htmlFor="phone" style={{ fontWeight: "500" }} >Phone</label>
                <SoftInput
                  type="text"
                  name="phone"
                  value={userProfile?.phone}
                  placeholder="Phone"
                  onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^[0-9\b]+$/;
                    if (input === '' || regex.test(input) && input.length <= 10) {
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
                {error.phone && <p>{error.phone}</p>}
              </div>
            </div>

            <div className="form-row" style={{ paddingLeft: "41px", paddingRight: "41px" }}>
              {/* <div className="col-sm-6 form-group mt-1">
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
              </div> */}

              <div className="col-sm-6 form-group">
                <label htmlFor="gender" style={{ fontWeight: "500" }} >Gender</label>
                <select
                  name="gender"
                  id="year"
                  className="form-control"
                  value={userProfile?.gender}
                  style={{ borderRadius: "0.5rem" }}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {/* <option key="">Select Gender</option> */}
                  {genderDropDown &&
                    genderDropDown?.map((x) => (
                      <option key={x.value}>{x.value}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            {userProfile?.role === "User" &&
              <>
                <div className="" >
                  <div className="col-sm-6 form-group" style={{ position: "absolute", transform: "translateY(-118%)", marginLeft: "46.4%", paddingRight: "64px" }}>
                    <label htmlFor="birthday" style={{ fontWeight: "500" }} >Birthday</label>
                    {/* <SoftInput
                      type="date"
                      name="birthday"
                      value={userProfile?.birthday}
                      placeholder="birthday"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem label="">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          // endDate={endDate}
                          // defaultValue={today}
                          // minDate={tomorrow}
                          format="DD/MM/YYYY"
                          views={['year', 'month', 'day']}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              marginLeft: "19rem",
                            }
                          }}
                        />
                      </DemoItem>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="form-row" style={{ display: "flex", paddingLeft: "41px", paddingRight: "41px" }}>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="spId" style={{ fontWeight: "500" }}>SPID</label>
                    <SoftInput
                      type="text"
                      name="spId"
                      value={userProfile?.spId}
                      placeholder="SPID"
                      onChange={(e) => {
                        const input = e.target.value;
                        const regex = /^[0-9\b]+$/;
                        if (input === '' || regex.test(input) && input.length <= 10) {
                          setError({
                            ...error,
                            spId: "",
                          });
                          handleChange(e);
                        } else {
                          setError({
                            ...error,
                            spId: "Please enter valid 12-digit mobile number",
                          })
                        }
                      }}
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="year" style={{ fontWeight: "500" }} >Year</label>
                    <select
                      name="year"
                      id="year"
                      className="form-control"
                      value={userProfile?.year}
                      style={{ borderRadius: "0.5rem" }}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {/* <option key="">Select Year</option> */}
                      {yearDropDown &&
                        yearDropDown?.map((x) => (
                          <option key={x.value}>{x.value}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="form-row" style={{ display: "flex", paddingLeft: "41px", paddingRight: "41px" }}>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="semester" style={{ fontWeight: "500" }}>Semester</label>
                    <select
                      name="semester"
                      id="semester"
                      className="form-control"
                      value={userProfile?.semester}
                      style={{ borderRadius: "0.5rem" }}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {/* <option key="">Select Semester</option> */}
                      {semesterDropDown &&
                        semesterDropDown?.map((x) => (
                          <option key={x.value}>{x.value}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="col-sm-6 form-group">
                    <label htmlFor="division" style={{ fontWeight: "500" }} >Divivsion</label>
                    <select
                      name="division"
                      id="division"
                      className="form-control"
                      value={userProfile?.division}
                      style={{ borderRadius: "0.5rem" }}
                      onChange={(e) => {
                        handleChange(e);
                        const selectedDivision = e.target.value;
                        setIsAuthorSelect(selectedDivision === "Author Select");
                      }}
                    >
                      {/* <option key="">Select Division</option> */}
                      {divisionDropDown &&
                        divisionDropDown?.map((x) => (
                          <option key={x.value}>{x.value}</option>
                        ))
                      }
                      <option key="author Select">Author Select</option>
                    </select>
                  </div>
                  {isAuthorSelect && (
                    <div className="col-sm-6 form-group">
                      {/* <label htmlFor="authorInput" style={{ fontSize: "500" }}>Author Select</label> */}
                      <SoftInput
                        type="text"
                        name="otherDivision"
                        value={userProfile?.otherDivision}
                        placeholder="Author Input"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                  )}
                </div>
              </>
            }
            <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "32%", width: "30%" }}>
              <SoftButton className="teacher1" variant="gradient" color="info" fullWidth onClick={() => {
                updateuserProfile();
              }}
                style={{ boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)" }}
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
