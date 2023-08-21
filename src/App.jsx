import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useUserAuth } from "./context/UserAuthContext";
import { Button } from "react-bootstrap";

function App() {
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
    console.log("success", res);
  };

  const onFailure = (res) => {
    console.log("failed", res);
  };

  const logout = () => {
    setProfile(null);
    navigate("/login");
  };

  const { logOut, user } = useUserAuth();

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {profile ? (
        <div>
          <h1>Welcome</h1>
          <br />
          <img src={profile.imageUrl} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Log our"
            onLogoutSuccess={logout}
          />
        </div>
      ) : user ? (
        <div>
          <h1>Welcome</h1>
          <br />
          <p>Hi, {user?.email}</p>
          <p>UID, {user?.uid}</p>
          <Button onClick={handleLogout} variant="danger">
            Logout
          </Button>
        </div>
      ) : (
        <>
          <h1>Welcome Page</h1>
          <img src={reactLogo} alt="" />
          <br />
          <br />
          <Link to="/login" className="btn btn-success mx-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
          <div className="p-4 box mt-3 text-center d-none">
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
