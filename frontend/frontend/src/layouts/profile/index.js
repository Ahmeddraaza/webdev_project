import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/profile/components/Header";

// Example images (replace with actual image imports)
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Overview() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data from the API
        const response = await fetch("http://localhost:3001/user/getUser/123456"); // Replace 123456 with actual user ID
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userDataResponse = await response.json();
        setUserData(userDataResponse);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              {userData && (
                <ProfileInfoCard
                  title="profile information"
                  info={{
                    fullName: userData.name,
                    mobile: userData.phone,
                    email: userData.email,
                    location: userData.branchId,
                  }}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
              )}
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
