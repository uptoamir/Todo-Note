import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import BoxedLayout from "../../core/components/BoxedLayout";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import { useAuth } from "../contexts/AuthProvider";

const Login = () => {
  const { isLoggingIn, login } = useAuth();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const handleLogin = async (username: string, password: string) => {
    try {
      const promise = await login(username, password);
      snackbar.success("Logged In successfully");
      // console.log(promise.then());
      navigate(`/${process.env.PUBLIC_URL}/admin`, { replace: true });
    } catch (error) {
      console.log(error);
      snackbar.error(error + "");
    }
    // .then(
    //   () => console.log("login accepted")
    //   // navigate(`/${process.env.PUBLIC_URL}/admin`, { replace: true })
    // )
    // .catch((e) => console.log(e));
  };

  const formik = useFormik({
    initialValues: {
      username: "amirhosein",
      password: "a.m.h.optimist@gmail.com",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => handleLogin(values.username, values.password),
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(./img/startup.svg)",
          backgroundRepeat: "no-repeat",
          bgcolor: "background.default",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <BoxedLayout>
          <Typography component="h1" variant="h5">
            title
          </Typography>
          <Box
            component="form"
            marginTop={3}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              disabled={isLoggingIn}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
              disabled={isLoggingIn}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <LoadingButton
              type="submit"
              fullWidth
              loading={isLoggingIn}
              variant="contained"
              sx={{ mt: 3 }}
            >
              submit
            </LoadingButton>
            <Button
              component={RouterLink}
              to={`/${process.env.PUBLIC_URL}/register`}
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Don't have an account? Sign Up!
            </Button>
          </Box>
        </BoxedLayout>
      </Grid>
    </Grid>
  );
};

export default Login;
