import React, { useState } from "react";
import Link from "next/link";
import {
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

interface headerData {
  label: string;
  href: string;
}

interface probs {
  headersData: Array<headerData>;
}
interface drawerType {
  isDrawerOpen: boolean;
}

const MobileDisplay = ({ headersData }: probs) => {
  const [drawer, setDrawer] = useState<drawerType | null>({
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
              <Link href={href} key={index}>
                <MenuItem>{label}</MenuItem>
              </Link>
            );
          })}
        </div>
      </Drawer>
      <Typography>Math Test</Typography>
    </Toolbar>
  );
};

export default MobileDisplay;
