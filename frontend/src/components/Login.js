import React from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import LoginCard from "./LoginCard";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div style={{ paddingTop: "5rem" }}>
        <Container
          maxWidth="xs"
          style={{
            marginTop: "3rem",
            zIndex: "4",
            opacity: "1",
            padding: "1rem",
          }}
        >
          <Card elevation={5}>
            <LoginCard />
          </Card>
        </Container>
        <Container maxWidth="sm" style={{ maxWidth: "28.8rem" }}>
          <Card
            style={{ padding: "1.3rem", marginTop: "1rem", width: "90%" }}
            elevation={5}
          >
            <Typography align="center">
              Don't have an account &nbsp;?&nbsp; &nbsp;
              <NavLink
                style={{
                  outline: "2px solid #303030",
                  padding: "0.5rem",
                  outlineRadius: "1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                to="/register"
              >
                {" "}
                Sign up
              </NavLink>
            </Typography>
          </Card>
        </Container>
      </div>
    </>
  );
}
