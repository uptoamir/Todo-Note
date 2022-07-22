import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import { ACCOUNT_INITIALIZE } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import BoxedLayout from "../../core/components/BoxedLayout";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import { UserInfo } from "../types/userInfo";
import type { RootState } from "../../store";

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const Register = () => {
  const allUsers: any[] = useSelector(
    (state: RootState) => state.account.allUsers
  );
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      firstName: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      lastName: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      confirm_password: Yup.string()
        .label("confirm password")
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => handleRegister(values),
  });

  const handleRegister = async (values: Partial<UserInfo>) => {
    const temp = allUsers.map(
      (element: any) => element.username === values.username
    );
    if (temp.length !== 0) {
      snackbar.success("The Username has already existed");
      return;
    }
    let myuuid = uuid();
    const obj = {
      isLoggedIn: false,
      user: {
        id: myuuid,
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      },
    };
    await dispatch<any>({ type: ACCOUNT_INITIALIZE, payload: obj });
    snackbar.success("Registered successfully");
    navigate(`/${process.env.PUBLIC_URL}/login`);
    // register(values as UserInfo)
    //   .then(() => {
    //     snackbar.success(t("auth.register.notifications.success"));
    //     navigate(`/${process.env.PUBLIC_URL}/login`);
    //   })
    //   .catch(() => {
    //     snackbar.error(t("common.errors.unexpected.subTitle"));
    //   });
  };

  return (
    <BoxedLayout>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box
        component="form"
        marginTop={3}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="family-name"
          autoFocus
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
          label="First name"
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
          label="Last name"
          name="lastName"
          autoComplete="given-name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          autoComplete="email"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirm_password"
          label="Confirm password"
          name="confirm_password"
          autoComplete="email"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          error={
            formik.touched.confirm_password &&
            Boolean(formik.errors.confirm_password)
          }
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </LoadingButton>
        <Button
          component={Link}
          to={`/${process.env.PUBLIC_URL}/login`}
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Back to Login
        </Button>
      </Box>
    </BoxedLayout>
  );
};

export default Register;
