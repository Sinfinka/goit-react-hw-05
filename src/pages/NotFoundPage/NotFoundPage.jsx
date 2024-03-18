import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>Not Found Page</h2>
      <Link to="/">Back to Home page</Link>
    </div>
  );
};

export default NotFoundPage;
