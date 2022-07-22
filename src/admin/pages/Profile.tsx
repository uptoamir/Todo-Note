import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import QueryWrapper from "../../core/components/QueryWrapper";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";
import type { RootState } from "../../store";
import { ACCOUNT_UPDATE_AVATAR } from "../../store/actions";
import "./Profile.css";

const profileMenuItems = [
  {
    key: "Information",
    path: ".",
  },
  {
    key: "Password",
    path: "./password",
  },
];

const Profile = () => {
  const { isLoggingOut, logout, userInfo } = useAuth();
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.account.user);
  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  useEffect(() => {
    const UPLOAD_BUTTON: any = document.getElementById("upload-button");
    const FILE_INPUT: any = document.querySelector("input[type=file]");
    const AVATAR: any = document.getElementById("avatar");
    console.log(user.avatar);
    if (user.avatar) {
      setSelectedImage(user.avatar);
      AVATAR.setAttribute("aria-label", "avatar");
      AVATAR.style.background = `url(${user.avatar}) center center/cover`;
    }
    FILE_INPUT.addEventListener("change", (event: any) => {
      var file: any = null;
      if (event.target.files[0]) {
        file = event.target.files[0];
      }
      if (file === null) return;
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        AVATAR.setAttribute("aria-label", file.name);
        AVATAR.style.background = `url(${reader.result}) center center/cover`;
        setSelectedImage(file);
        console.log(file);
        dispatch<any>({
          type: ACCOUNT_UPDATE_AVATAR,
          payload: { user: { avatar: reader.result, id: user.id } },
        });
      };
    });
  }, []);

  // useEffect(() => {
  //   if (selectedImage) {
  //     await dispatch<any>({
  //       type: ACCOUNT_UPDATE_PASSWORD,
  //       payload: { user: { password: newPassword, id: user.id } },
  //     });
  //     snackbar.success("Password changed successfully");
  //   } else {
  //     console.log(user.password, oldPassword);
  //     snackbar.error("Current password is wrong");
  //   }
  // }, [selectedImage]);
  const handleLogout = () => {
    logout();
    snackbar.success("Logout successfully");
    // logout().catch(() =>
    //   snackbar.error(t("common.errors.unexpected.subTitle"))
    // );
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title="Profile">
          <Fab
            aria-label="logout"
            color="secondary"
            disabled={isLoggingOut}
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>
      <Grid container spacing={12}>
        <Grid item xs={12} md={4} marginTop={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 6,
            }}
          >
            <div id="preview">
              <div id="avatar">
                {!selectedImage && (
                  <Avatar
                    sx={{
                      bgcolor: "background.paper",
                      mb: 3,
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 120 }} />
                  </Avatar>
                )}
              </div>
              <label
                className="upload-emoji"
                id="upload-button"
                // onClick={handleUpload}
                htmlFor="image-upload"
                aria-labelledby="image"
                aria-describedby="image"
              >
                🙂
              </label>
              <input
                type="file"
                name="image"
                id="image-upload"
                accept="image/*"
              />
            </div>
            {/* <Avatar
              sx={{
                bgcolor: "background.paper",
                mb: 3,
                height: 160,
                width: 160,
              }}
            >
              <PersonIcon sx={{ fontSize: 120 }} />
            </Avatar> */}
            <Typography
              component="div"
              variant="h4"
              margin="1rem"
            >{`${userInfo?.firstName} ${userInfo?.lastName}`}</Typography>
            <Typography variant="body2">{userInfo?.role}</Typography>
          </Box>
          {/* <SvgContainer>
            <ConfirmSvg style={{ maxWidth: 280, width: "100%" }} />
          </SvgContainer> */}
        </Grid>
        <Grid item xs={12} md={8} marginTop={3}>
          <Box sx={{ mb: 4 }}>
            <Tabs aria-label="profile nav tabs" value={false}>
              {profileMenuItems.map((item) => (
                <Tab
                  key={item.key}
                  activeClassName="Mui-selected"
                  end={true}
                  component={NavLink}
                  label={item.key}
                  to={item.path}
                />
              ))}
            </Tabs>
          </Box>
          <QueryWrapper>
            <Outlet />
          </QueryWrapper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
