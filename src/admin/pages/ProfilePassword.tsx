import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import type { RootState } from "../../store";
import { ACCOUNT_UPDATE_PASSWORD } from "../../store/actions";

const ProfilePassword = () => {
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.account.user);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      newPassword: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) =>
      handleUpdatePassword(values.oldPassword, values.newPassword),
  });

  const handleUpdatePassword = async (
    oldPassword: string,
    newPassword: string
  ) => {
    console.log(user);
    if (user.password === oldPassword) {
      await dispatch<any>({
        type: ACCOUNT_UPDATE_PASSWORD,
        payload: { user: { password: newPassword, id: user.id } },
      });
      snackbar.success("Password changed successfully");
    } else {
      console.log(user.password, oldPassword);
      snackbar.error("Current password is wrong");
    }
    // await dispatch<any>({
    //   type: ACCOUNT_UPDATE,
    //   payload: { user: { ...values, id: data.id } },
    // });
    // snackbar.success("Information updated successfully");
    // updatePassword({ oldPassword, newPassword })
    //   .then(() => {
    //     formik.resetForm();
    //     snackbar.success(t("profile.notifications.passwordChanged"));
    //   })
    //   .catch(() => {
    //     snackbar.error(t("common.errors.unexpected.subTitle"));
    //   });
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Card>
        <CardHeader title="Update Password" />
        <CardContent>
          <TextField
            margin="normal"
            required
            fullWidth
            name="oldPassword"
            label="oldPassword"
            type="password"
            id="oldPassword"
            autoComplete="current-password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="newPassword"
            type="password"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirmPassword"
            type="password"
            id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </CardContent>
        <CardActions>
          <LoadingButton type="submit" variant="contained">
            Update
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  );
};

export default ProfilePassword;
