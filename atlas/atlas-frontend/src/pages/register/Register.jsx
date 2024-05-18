import  { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import  { useReducer } from "react";
import request from "../../util/fetchUtil";
import  { API_BASE_URL } from "../../constants";
import  { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    {
      name: "",
      email: "",
      password: "",
    }
  );
  const handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    setState({
      [inputName]: inputValue,
    });
  };

  function signup(signupRequest) {
    return request({
      url: API_BASE_URL + "/auth/signup",
      method: "POST",
      body: JSON.stringify(signupRequest),
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const signUpRequest = Object.assign({}, state);

    signup(signUpRequest)
      .then((response) => {
        toast("You're successfully registered. Please login to continue!", {
          type: "success",
        });

        navigate("/login");
      })
      .catch((error) => {
        toast(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!",
          { type: "error" }
        );
      });
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-item">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={state.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-item">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={state.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-item">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={state.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
