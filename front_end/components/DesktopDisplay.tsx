import React from "react";
import Link from "next/link";
import Image from "next/image";
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

interface headerData {
  label: string;
  href: string;
}

interface probs {
  headersData: Array<headerData>;
}

const DesktopDisplay = ({ headersData }: probs) => {
  const styles = useStyles();

  return (
    <Toolbar className={styles.toolbar}>
      <div className={styles.logoSection}>
        <Image src="/navbar_svg.svg" alt="Site title" width={50} height={50} />
        <Link href="/">
          <Typography className={styles.logo}>Math Placement Test</Typography>
        </Link>
      </div>
      <div>
        {headersData.map(({ label, href }, index) => {
          return (
            <Link href={href} key={index}>
              <a className={styles.menuLink}>{label}</a>
            </Link>
          );
        })}
      </div>
    </Toolbar>
  );
};

export default DesktopDisplay;
