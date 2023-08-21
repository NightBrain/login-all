import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button} from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "../context/AuthContext";
import ProfileCard from "./ProfileCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function Login() {
  // Github Login

  const { login, isPending } = useLogin();
  const { logout } = useLogout();

  const { user, authIsReady } = useContext(AuthContext);
  console.log(user);

  //Google Login

  const [profile, setProfile] = useState(null);

  const clientId =
    "1042352288192-7tmh0sub9euvv4njj58tr5mlapcnuo5n.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    navigate("/");
    console.log("success", res);
  };

  const onFailure = (res) => {
    console.log("failed", res);
  };

  const logOut = () => {
    setProfile(null);
  };

  //Register

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="p-4 box mt-3 text-center">
        {user ? (
          <ProfileCard user={user} />
        ) : (
          <div className="row">
            <div className="col-md-6 mx-auto">
              <h2 className="mb-3">Login</h2>
              <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Sign In
                  </Button>
                </div>

                <div className="p-4 box mt-3 text-center d-flex justify-content-center ">
                  <GoogleLogin
                    className="mx-2"
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                  />
                  <Button variant="light" onClick={login}><FontAwesomeIcon icon={faGithub} /> Login With Github</Button>
                </div>

                <div className="p-4 box mt-3 text-center">
                  Don't have and account? <Link to="/register">Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
