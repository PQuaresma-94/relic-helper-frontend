import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} {...rest} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
