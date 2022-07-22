import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { useSettings } from "../../core/contexts/SettingsProvider";
import UserDropDown from "./UserDropDown";

type AdminToolbarProps = {
  children?: React.ReactNode;
  title?: string;
};

const AdminToolbar = ({ children, title }: AdminToolbarProps) => {
  const { toggleDrawer } = useSettings();

  return (
    <Toolbar sx={{ px: { xs: 3, sm: 6 } }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
        sx={{
          display: { lg: "none" },
          marginRight: 2,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <div>{title !== "Profile" && <UserDropDown />}</div>
      {children}
    </Toolbar>
  );
};

export default AdminToolbar;
