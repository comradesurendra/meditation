import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserAuthData } from "./accountContext";

export function PrivateRoute({ component: Component, authenticated, ...rest }) {
  const { auth, data } = useContext(UserAuthData);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true && data.type === "customer" ? (
          <Redirect
            to={{ pathname: "/customer", state: { from: props.location } }}
          />
        ) : (
          <Redirect
            to={{ pathname: "/trainer", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

// export function PublicRoute({ component: Component, authenticated, ...rest }) {
//   const { auth, data } = useContext(UserAuthData);
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         auth === false ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// }
