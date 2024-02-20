import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import image from '../../../img/istockphoto-533441604-612x612-removebg.png';
import wavesWhite from "assets/images/shapes/waves-white.svg";
// import overview from "assets/images/illustrations/rocket-white.png";

function BuildByDevelopers() {
  return (
    <Card>
      <SoftBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5}>
                
              </SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                Overview
              </SoftTypography>
              <SoftBox mb={6}>
                <SoftTypography variant="body2" color="text">
                Study-Buddy, a context-aware system designed to enhance the learning experience, has been developed as a proof of concept across various everyday life domains, particularly in education.
                </SoftTypography>
              </SoftBox>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                color="text"
                fontWeight="medium"
                sx={{
                  mt: "auto",
                  mr: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",

                  "& .material-icons-round": {
                    fontSize: "1.125rem",
                    transform: `translate(2px, -0.5px)`,
                    transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                  },

                  "&:hover .material-icons-round, &:focus  .material-icons-round": {
                    transform: `translate(6px, -0.5px)`,
                  },
                }}
              >
                Read More
                <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={5} sx={{ position: "relative", ml: "auto" }}>
            <SoftBox
              height="100%"
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="info"
              borderRadius="lg"
              variant="gradient"
            >
              <SoftBox
                component="img"
                src={wavesWhite}
                alt="waves"
                display="block"
                position="absolute"
                left={0}
                width="100%"
                height="100%"
              />
              <SoftBox component="img" src={`https://media.istockphoto.com/id/533441604/photo/library-search-loupe-and-book-educational-concept.jpg?s=612x612&w=0&k=20&c=PIade-Ah3K5cyFVMn9kGhXAGqk4rTW-tJ9kp24ZuMCY=`} alt="overview" marginLeft="30px" height="35%" width="65%" borderRadius="100%"/>
              {/* <SoftBox component="img" src={image} alt="overview" marginLeft="5px" height="60%" width="100%" borderRadius="100%"/> */}
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default BuildByDevelopers;
