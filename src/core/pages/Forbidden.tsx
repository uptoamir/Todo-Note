import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as ForbiddenSvg } from "../assets/403.svg";
import Result from "../components/Result";

const Forbidden = () => {
  return (
    <Result
      extra={
        <Button
          color="secondary"
          component={RouterLink}
          to={`/${process.env.PUBLIC_URL}/admin`}
          variant="contained"
        >
          backHome
        </Button>
      }
      image={<ForbiddenSvg />}
      maxWidth="sm"
      subTitle="forbidden"
      title="unexpected"
    />
  );
};

export default Forbidden;
