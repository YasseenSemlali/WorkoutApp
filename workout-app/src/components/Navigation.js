import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Nav = styled(AppBar)({
  backgroundColor: "#E6E6E6",
});

const Logo = styled(Typography)({
  flexGrow: "1",
  cursor: "pointer",
  color: "#f89b29",
});

const LinksDiv = styled("div")({
  marginLeft: "10px",
  display: "flex",
});

const NavLink = styled(Link)({
  textDecoration: "none",
  color: "black",
  fontSize: "20px",
  fontWeight: "bold",
  marginLeft: "20px",
  "&:hover": {
    color: "#f89b29",
    textDecoration: "none",
  },
});

function Navigation() {
  return (
    <Nav position="sticky">
      <CssBaseline />
      <Toolbar>
        <Logo variant="h4">Workout App #1</Logo>
        <LinksDiv>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
          <NavLink to="/graphs">Graphs</NavLink>
        </LinksDiv>
      </Toolbar>
    </Nav>
  );
}
export default Navigation;
