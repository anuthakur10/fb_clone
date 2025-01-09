import React, { useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Hidden, Paper, CircularProgress } from "@material-ui/core";
import { LoginAction, LogoutAction } from "./store/actions/auth";
import { auth } from "./firebase";
import { lightPrimary } from "./assets/Colors";
import Style from "./Style";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Lazy load components
const Login = React.lazy(() => import("./components/login/Login"));
const Header = React.lazy(() => import("./components/header/Header"));
const Sidebar = React.lazy(() => import("./components/sidebar/Sidebar"));
const Contacts = React.lazy(() => import("./components/contacts/Contacts"));
const Stories = React.lazy(() => import("./components/stories/Stories"));
const Form = React.lazy(() => import("./components/form/Form"));
const Posts = React.lazy(() => import("./components/posts/Posts"));

const App = () => {
  const dispatch = useDispatch();

  const { displayName } = useSelector((state) => state.user);
  const mode = useSelector((state) => state.util);

  const muiTheme = createMuiTheme({
    palette: {
      type: mode ? "dark" : "light",
    },
  });

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(LoginAction(authUser));
      } else {
        dispatch(LogoutAction());
      }
    });
  }, [dispatch]);

  const classes = Style();
  return (
    <ThemeProvider theme={muiTheme}>
      <Paper
        elevation={0}
        className={classes.root}
        style={{ backgroundColor: !mode && lightPrimary }}
      >
        {!displayName ? (
          <Suspense fallback={<CircularProgress />}>
            <Login />
          </Suspense>
        ) : (
          <Grid className={classes.app}>
            <Grid item container className={classes.app__header}>
              {/* ----Header---- */}
              <Suspense fallback={<CircularProgress />}>
                <Header />
              </Suspense>
            </Grid>
            <Grid item container className={classes.app__body}>
              {/* ----Body---- */}
              <Hidden smDown>
                <Grid item container className={classes.body__left} md={3}>
                  {/* ----Sidebar---- */}
                  <Suspense fallback={<CircularProgress />}>
                    <Sidebar />
                  </Suspense>
                </Grid>
              </Hidden>
              <Grid item container className={classes.body__feed} xs={12} sm={8} md={6}>
                {/* ----Feed---- */}
                <Grid item container className={classes.feed__stories}>
                  {/* ----Stories---- */}
                  <Suspense fallback={<CircularProgress />}>
                    <Stories />
                  </Suspense>
                </Grid>
                <Grid item container className={classes.feed__form}>
                  {/* ----Upload Form---- */}
                  <Suspense fallback={<CircularProgress />}>
                    <Form />
                  </Suspense>
                </Grid>
                <Grid item container className={classes.feed__posts}>
                  {/* ----Posts---- */}
                  <Suspense fallback={<CircularProgress />}>
                    <Posts />
                  </Suspense>
                </Grid>
              </Grid>
              <Hidden smDown>
                <Grid item container className={classes.body__right} md={3}>
                  {/* ----Right sidebar---- */}
                  <Suspense fallback={<CircularProgress />}>
                    <Contacts />
                  </Suspense>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default App;
