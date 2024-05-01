/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images

import bgImage from "assets/images/bg-sign-up-cover.jpeg";
// prettier-ignore
function Cover() {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState(" ");
  
  const [password, setPassword] = useState(" ");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleInput = (e) => ( 
    console.log(e.target.value),
    setUsername(e.target.value));
    const handlePassword = (e) => ( 
      console.log(e.target.value),
      setPassword(e.target.value));

      const handleClick = async () => { 
        const data = {
          email: "SSS",
          password: "SSSSSSSS"
        };
        
        // Make the fetch request with the URL, method, headers, and body
        fetch('http://localhost:3001/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
             },
          body: JSON.stringify(data) // Convert data to JSON format
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          
            return response.json(); // Parse the JSON response
           })
          .then(data => {
            console.log('POST request successful:', data);
            // Handle the data returned from the server
          })
          .catch(error => {
            console.error('There was a problem with the POST request:', error);
            // Handle any errors that occurred during the fetch
          });
        }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth  />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth  />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleClick}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                  
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
