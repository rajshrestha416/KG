/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from "react-router-dom";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

export function AuthPage() {
  let history = useHistory()
  const [value, setValue] = React.useState(0);

  const handleChange = () => {
    if (value) {
      console.log("Sign in clicked")
      setValue(0);

      console.log(value)
    }
    else {
      console.log("Sign up clicked")
      setValue(1);

      console.log(value)
    }
  };

  
  useEffect(() => {
    function changeLay(){
      if (value===1) {
        console.log("Registration");
        history.push("/auth/registration");
      }
      else {
        console.log("Login");
        history.push("/auth/login");
      }
    }
    changeLay()
  }, );

  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-4.jpg")})`
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl("/media/logos/logo-letter-1.png")}
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">
                  Welcome to Gaadi!
                </h3>
                <p className="font-weight-lighter text-white opacity-80">
                  Find Every thing you need about the Cars.
                  {/* The ultimate Bootstrap & React 16 admin theme framework for next
                    generation web apps. */}
                </p>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">
                  &copy; 2021 Gaadi
                </div>
                <div className="d-flex">
                  <Link to="/terms" className="text-white">
                    Privacy
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    Legal
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    Contact
                  </Link>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute path="/auth/registration" component={Registration} />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}
            {/*begin::Content header*/}
            <div className="text-center mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Sign in" />
                <Tab label="Sign up" />
              </Tabs>
              {/* <span className="font-weight-bold text-dark-50">Don't have an account yet?</span>
              <Link to="/auth/registration" className="font-weight-bold ml-2" id="kt_login_signup">Sign Up!</Link> */}
            </div>
            {/*end::Content header*/}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
