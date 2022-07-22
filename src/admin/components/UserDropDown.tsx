// ** React Imports
import { useState, SyntheticEvent, Fragment } from "react";

// ** MUI Imports
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
// ** Icons Imports
import PersonIcon from "@material-ui/icons/Person";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: "transparent",
}));

const UserDropdown = () => {
  // ** States
  const navigate = useNavigate();
  const { logout, userInfo: account } = useAuth();
  const snackbar = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  //   const account = useSelector((state: RootState) => state.account);
  console.log(account);

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      if (url === "logout") {
        logout();
        snackbar.success("Logout successfully");
      }
      if (url === "profile") {
        navigate(`/${process.env.PUBLIC_URL}/admin/profile`);
      }
      //   router.push(url)
    }
    setAnchorEl(null);
  };

  const styles = {
    py: 2,
    px: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.primary",
    textDecoration: "none",
    "& svg": {
      fontSize: "1.375rem",
      color: "text.secondary",
    },
  };

  if (!account) return null;
  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Badge
            overlap="circular"
            badgeContent={<BadgeContentSpan />}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            {account.avatar && (
              <Avatar
                onClick={handleDropdownOpen}
                sx={{ width: 40, height: 40 }}
                src={account.avatar}
              />
            )}
            {!account.avatar && (
              <Avatar
                onClick={handleDropdownOpen}
                sx={{ width: 40, height: 40 }}
              >
                <PersonIcon sx={{ fontSize: 60 }} />
              </Avatar>
            )}
          </Badge>
          <Box
            sx={{
              display: "flex",
              marginLeft: 3,
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>
              {account.firstName} {account.lastName}
            </Typography>
          </Box>
        </Box>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{
          "& .MuiMenu-paper": { width: 230, marginTop: 4 },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        // style={{ top: "99px" }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              {account.avatar && (
                <Avatar
                  onClick={handleDropdownOpen}
                  sx={{ width: 40, height: 40 }}
                  src={account.avatar}
                />
              )}
              {!account.avatar && (
                <Avatar
                  onClick={handleDropdownOpen}
                  sx={{ width: 40, height: 40 }}
                >
                  <PersonIcon sx={{ fontSize: 120 }} />
                </Avatar>
              )}
            </Badge>
            <Box
              sx={{
                display: "flex",
                marginLeft: 3,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
                {account.firstName} {account.lastName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", color: "text.disabled" }}
              >
                Admin
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose("profile")}>
          <PersonIcon
            sx={{
              marginRight: 2,
              fontSize: "1.375rem",
              color: "text.secondary",
            }}
          />
          Profile
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose("logout")}>
          <ExitToAppIcon
            sx={{
              marginRight: 2,
              fontSize: "1.375rem",
              color: "text.secondary",
            }}
          />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
