import { makeStyles } from "@mui/styles";

const NavbarStyles = makeStyles({
  navbar: {
    height: "50px",
    width: "100vw",
    display: "flex",
    justifyContent: "flex-end",
    color: "green",
  },
  navbarContent: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginRight: "20px",
  },
  typography: {
    cursor: "pointer",
  },
});

export default NavbarStyles;
