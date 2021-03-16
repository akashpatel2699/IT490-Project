import React from "react";
import { NavLink } from "react-router-dom";
import { Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  logoSection: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 600,
    fontSize: "2rem",
    marginLeft: "1rem",
    color: "#FFFEFE",
    textAlign: "left",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuLink: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
}));

const DesktopDisplay = ({ headersData }) => {
  const styles = useStyles();

  return (
    <Toolbar className={styles.toolbar}>
      <div className={styles.logoSection}>
        <img src="/static/navbar_svg.svg" alt="Site title" width={50} height={50} />
        <NavLink to="/">
          <Typography className={styles.logo}>Math Placement Test</Typography>
        </NavLink>
      </div>
      <div>
        {headersData.map(({ label, href }, index) => {
          return (
            <NavLink to={href} className={styles.menuLink} key={index}>
              {/* <a className={styles.menuLink}>{label}</a> */}
              {label}
            </NavLink>
          );
        })}
      </div>
    </Toolbar>
  );
};

export default DesktopDisplay;
