import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import GoogleIcon from "@mui/icons-material/Google";
import {
  ACCESS_TOKEN,
  API_BASE_URL,
  FACEBOOK_AUTH_URL,
  GOOGLE_AUTH_URL,
} from "../../constants";
import { toast } from "react-toastify";
import { useReducer } from "react";
import request from "../../util/fetchUtil";
import { loginUser } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    {
      email: "",
      password: "",
    }
  );
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    setState({
      [inputName]: inputValue,
    });
  };
  function login(loginRequest) {
    return request({
      url: API_BASE_URL + "/auth/login",
      method: "POST",
      body: JSON.stringify(loginRequest),
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    const loginRequest = Object.assign({}, state);

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        toast("You're successfully logged in!", { type: "success" });
        dispatch(loginUser());
        navigate("/");
      })
      .catch((error) => {
        toast(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!",
          { type: "error" }
        );
      });
  };

  const handleFacebookLogin = () => {
    window.location.href = FACEBOOK_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const SocialSignUp = () => {
    return (
      <div class="social-buttons">
        <button class="facebook" onClick={handleFacebookLogin}>
          <FacebookTwoToneIcon className="social-icons" fontSize="large" />
          Login with Facebook
        </button>
        <button class="google" onClick={handleGoogleLogin}>
          <GoogleIcon className="social-icons" fontSize="large" />
          Login with Google
        </button>
      </div>
    );
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome to Atlas.</h1>
          <p>
            Discover new connections, share your stories, and stay connected
            with friends and family. With Atlas, you can create meaningful
            connections and explore diverse cultures and perspectives.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Get Started</button>
          </Link>
        </div>
        <div className="right">
          <SocialSignUp />
          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
