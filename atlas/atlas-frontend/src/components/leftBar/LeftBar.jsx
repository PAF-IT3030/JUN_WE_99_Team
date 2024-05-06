import "./leftBar.scss";
import { useSelector } from "react-redux";

const LeftBar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="leftBar">
      <div className="container"></div>
    </div>
  );
};

export default LeftBar;
