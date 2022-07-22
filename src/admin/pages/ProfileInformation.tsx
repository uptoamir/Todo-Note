import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import { ProfileInfo } from "../types/profileInfo";
import type { RootState } from "../../store";
import { ACCOUNT_UPDATE_INFORMATION } from "../../store/actions";

const ProfileInformation = () => {
  const snackbar = useSnackbar();
  // const { user } = useProfileInfo();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.account.user);

  const formik = useFormik({
    initialValues: {
      username: user ? user.username : "",
      firstName: user ? user.firstName : "",
      lastName: user ? user.lastName : "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      firstName: Yup.string()
        .min(4, "Must be 8 characters or more")
        .required("Required"),
      lastName: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (values: Partial<ProfileInfo>) => {
    console.log(values, { ...values, id: user.id });
    // const obj = {
    //   id: string;
    //   avatar?: string;
    //   firstName?: string;
    //   lastName?: string;
    //   username?: string;
    //   password?: string;
    // };
    await dispatch<any>({
      type: ACCOUNT_UPDATE_INFORMATION,
      payload: { user: { ...values, id: user.id } },
    });
    snackbar.success("Information updated successfully");
    // updateProfileInfo({ ...values, id: user?.id } as ProfileInfo)
    //   .then(() => {
    //   })
    //   .catch(() => {
    //     snackbar.error(t("common.errors.unexpected.subTitle"));
    //   });
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Card>
        <CardHeader title="Update Information" />
        <CardContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            aria-readonly
            disabled={true}
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="firstName"
            name="firstName"
            autoComplete="given-name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="lastName"
            name="lastName"
            autoComplete="family-name"
            autoFocus
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </CardContent>
        <CardActions>
          <Button onClick={() => formik.resetForm()}>Reset</Button>
          <LoadingButton type="submit" variant="contained">
            Update
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  );
};

export default ProfileInformation;
