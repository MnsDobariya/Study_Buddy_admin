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

function Overview() {
  const [open, setOpen] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const [userProfile, setUserProfile] = useState();
  // console.log(userProfile,"userProfile");

  const [updateData, setUpdateData] = useState();
  // console.log(updateData, "updateData");
  const [profilePicture, setProfilePicture] = useState();
  console.log("profilePicture",profilePicture);



  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setUpdateData(userProfile)
    setOpen(false)
  }

  // const handleClick = () => {
  //   document.getElementById("imageUpload").click();
  // }

  const token = localStorage.getItem("token");


  const getProfileUser = () => {
    axios.get("http://localhost:3000/api/v1/users/teacher/me", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        // console.log(res, "res");
        setUpdateData(res?.data)
        setUserProfile(res?.data)
        setProfilePicture(res?.data?.profileImage === "undefined" ? "" : res?.data?.profileImage);

      })
  }

  useEffect(() => {
    getProfileUser("")
  }, [])

  const handleChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleUpdate = () => {

  // }

  const handleImageChange = (e) => {
    // console.log(e?.target?.files, "22222222");
    // e.preventDefault();
    setProfilePicture(
      // ...updateData,
      e?.target?.files[0],
    );

    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfilePicture(
          file,
        );
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

  };



  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: ""
  })

  const UpdateProfile = () => {
    const error = {};

    const fname = /^[a-zA-Z]{2,40}([a-zA-Z]{2,40})+$/;
    if (!updateData?.firstName) {
      error.firstName = "Please FirstName Required";
    }else if(!fname.test(updateData?.firstName)){
      error.firstName = "Invalid FirstName";
    }

    const lname = /^[a-zA-Z]{2,40}([a-zA-Z]{2,40})+$/;
    if (!updateData?.lastName) {
      error.lastName = "Please LastName Required";
    }else if(!lname.test(updateData?.lastName)){
      error.lastName = "Invalid LastName";
    }

    const mobileRegex = /^\d{1,10}$/;
    if (!updateData?.phone) {
      error.phone = "Please Mobile Required";
    } else if (!mobileRegex.test(updateData?.phone)) {
      error.phone = "Invalid Mobile";
    }


    if (
      error.firstName ||
      error.lastName ||
      error.phone ||
      error.gender
    ) {
      setError(error);
      return;
    }

    const form_data = new FormData();

    form_data.append("firstName", updateData?.firstName)
    form_data.append("lastName", updateData?.lastName)
    form_data.append("phone", updateData?.phone)
    form_data.append("email", updateData?.email)
    form_data.append("gender", updateData?.gender)
    form_data.append("profileImage",profilePicture)
    // console.log("form_data",form_data);

    axios.put(`http://localhost:3000/api/v1/users/teacher/update/${updateData?.id}`, form_data,
    { headers: { "content-type": "multipart/form-data"}})
      .then((res) => {
        // console.log("res", res);
        setUserProfile(res?.data)
        toast.success("Update Successfully");

        handleClose();
      }).catch((error) => {
        // console.log("error", error);
        toast.error("Somthing went to wrong");
      })
  }



  return (
    <DashboardLayout>
      <Header userProfile={userProfile} imagePreview={imagePreview} updateData={updateData} profilePicture={profilePicture} />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            {/* <PlatformSettings /> */}
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                FirstName: userProfile?.firstName,
                LastName: userProfile?.lastName,
                Mobile: userProfile?.phone,
                Email: userProfile?.email,
                Location: "USA",
              }}
              handleOpen={handleOpen}
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
            {/* <ProfilesList title="conversations" profiles={profilesListData} /> */}
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
      </SoftBox>
      <Footer />
      <SoftBox mt={4} mb={1}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="form_wrapper">
            <div className="form_container">
              <div className="title_container">
                <h2 style={{ color: "rgb(95, 142, 224)" }}>Profile Update</h2>
              </div>
              {/* <div className="user-avatar">
                <img src={imagePreview ? imagePreview : `http://localhost:3000${userProfile?.profileImage}`} /> */}
              {/* <input
                  type='button'
                  name="Submit"
                  id='imageUpload'
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                /> */}
              {/* </div> */}
              <div className="row clearfix">
                <div className="">
                  <form>
                    <div className="input_field">
                      <SoftBox mb={0.5}>
                        <SoftBox mb={0} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            FirstName
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          type="text"
                          name="firstName"
                          value={updateData?.firstName}
                          placeholder="First Name"
                          onChange={(e) => {
                            setError({
                              ...error,
                              firstName: "",
                            });
                            handleChange(e);
                          }}
                        />
                        {error.firstName && <p style={{ color: "red", fontSize: "60%", marginTop: "0px", marginBottom: "0px" }}>{error.firstName}</p>}
                      </SoftBox>
                    </div>
                    <div className="input_field">
                      <SoftBox mb={0.5}>
                        <SoftBox mb={0} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            LastName
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          type="text"
                          name="lastName"
                          value={updateData?.lastName}
                          placeholder="Last Name"
                          onChange={(e) => {
                            setError({
                              ...error,
                              lastName: "",
                            });
                            handleChange(e);
                          }}
                        />{error.lastName && <p style={{ color: "red", fontSize: "60%" }}>{error.lastName}</p>}
                      </SoftBox>
                    </div>
                    <div className="input_field">
                      <SoftBox mb={0.5}>
                        <SoftBox mb={0} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Email
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          type="email"
                          name="email"
                          value={updateData?.email}
                          placeholder="Email"
                        // onChange={(e) => {
                        //   handleChange(e);
                        // }}
                        />
                      </SoftBox>
                    </div>
                    {/* <div className="input_field">
                      <SoftBox>
                        <SoftInput
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                      </SoftBox>
                    </div> */}
                    {/* <div className="row clearfix">
                                                <div className="col_half"> */}
                    <div className="input_field">
                      <SoftBox mb={0.5}>
                        <SoftBox mb={0} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Mobile
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          type="mobile"
                          name="phone"
                          value={updateData?.phone}
                          placeholder="Mobile No"
                          onChange={(e) => {
                            setError({
                              ...error,
                              phone: "",
                            });
                            handleChange(e);
                          }}
                        />
                        {error.phone && <p style={{ color: "red", fontSize: "60%" }}>{error.phone}</p>}

                      </SoftBox>
                    </div>
                    <SoftBox mb={1} mt={0} style={{ marginRight: "20%", marginTop: "4%" }}>
                      <div className='form-group col-md-6 mt-4'>
                        <h6 style={{ display: "flex" }}>
                          Gender :{" "}
                        </h6>
                        <input
                          type='radio'
                          name='gender'
                          style={{ marginTop: "1%" }}
                          checked={updateData?.gender == "male" ? true : false}
                          onChange={(e) =>
                            setUpdateData({
                              ...updateData,
                              gender: "male"
                            })}
                        />
                        Male
                        <input
                          type='radio'
                          name='gender'
                          style={{ marginLeft: "20px" }}
                          checked={updateData?.gender == "female" ? true : false}
                          onChange={(e) =>
                            setUpdateData({
                              ...updateData,
                              gender: "female"
                            })}
                        />
                        Female
                      </div>
                    </SoftBox>
                    <SoftBox>
                      <input
                        type="file"
                        id="imageUpload"
                        // value={updateData?.profileImage}
                        // style={{ display: "none" }}
                        onChange={(e) => {
                          handleImageChange(e);
                        }}
                      />
                      {/* <div className='form-group col-md-6 mb-3'>
                        <label htmlFor='inputImage'>Image</label>
                        <div className='custom-file'>
                          <input
                            type='file'
                            className='custom-file-input'
                            id='Image'
                            onChange={(e) => {
                              handleImageChange(e);
                            }}
                          />
                        </div>

                      </div> */}
                    </SoftBox>
                    <SoftBox mt={4} mb={1} style={{ display: "flex", justifyContent: "center", justifyContent: "space-between" }}>
                      {/* {
                        addTeacher?.id ?
                          <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={updateTeacher} >
                            update
                          </SoftButton> : <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={addNewTeacher} >
                            Add Teacher
                          </SoftButton>

                      } */}
                      {/* <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={addNewTeacher()} >
                                                    {addTeacher?.id ? "Update" : "Add Teacher"}
                                                </SoftButton> */}

                      <SoftButton variant="gradient" color="info" marginLeft="50%" onClick={() => UpdateProfile()} >
                        Update
                      </SoftButton>
                      <SoftButton variant="gradient" color="info" marginLeft="50%" onClick={handleClose} >
                        Cancel
                      </SoftButton>
                    </SoftBox>


                    {/* <div className="input_field select_option">
                                                <select>
                                                    <option>Select a country</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>x
                                                <div className="select_arrow"></div>
                                            </div>
                                            <div className="input_field checkbox_option">
                                                <input type="checkbox" id="cb1" />
                                                <label>I agree with terms and conditions</label>
                                            </div>
                                            <div className="input_field checkbox_option">
                                                <input type="checkbox" id="cb2" />
                                                <label >I want to receive the newsletter</label>
                                            </div> */}
                    {/* <input className="button" type="submit" value="Register" /> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <p class="credit">Developed by <a href="http://www.designtheway.com" target="_blank">Design the way</a></p> */}
        </Modal>
      </SoftBox>

      {/* <Modal>

      </Modal> */}
    </DashboardLayout>
  );
}

export default Overview;
