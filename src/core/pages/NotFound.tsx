import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Result from "../../core/components/Result";
import { ReactComponent as NotFoundSvg } from "../assets/404.svg";

const NotFound = () => {
  return (
    <Result
      extra={
        <Button
          color="secondary"
          component={RouterLink}
          to={`/${process.env.PUBLIC_URL}/admin`}
          variant="contained"
        >
          Back Home
        </Button>
      }
      image={<NotFoundSvg />}
      maxWidth="sm"
      subTitle="Not Found"
      title="Not Found"
    />
  );
};

export default NotFound;
