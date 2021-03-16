import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from 'react-router-dom';


const MobileDisplay = ({ headersData }) => {
  const [drawer, setDrawer] = useState({
    isDrawerOpen: false,
  });

  const { isDrawerOpen } = drawer;

  const handleDrawerOpen = () => {
    setDrawer((prevState) => ({ ...prevState, isDrawerOpen: true }));
  };
  const handleDrawerClose = () => {
    setDrawer((prevState) => ({ ...prevState, isDrawerOpen: false }));
  };

  return (
    <Toolbar>
      <IconButton
        {...{
          edge: "start",
          color: "inherit",
          "aria-label": "menu",
          "aria-haspopup": "true",
          onClick: handleDrawerOpen,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        {...{
          anchor: "left",
          open: isDrawerOpen,
          onClose: handleDrawerClose,
        }}
      >
        <div>
          {headersData.map(({ label, href }, index) => {
            return (
              <NavLink to={href} key={index}>
                <MenuItem>{label}</MenuItem>
              </NavLink>
            );
          })}
        </div>
      </Drawer>
      <Typography>Math Test</Typography>
    </Toolbar>
  );
};

export default MobileDisplay;
