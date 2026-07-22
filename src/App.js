import React from "react";
import FrontendRoutes from "./FrontendRoutes";
import BackendRoutes from "./BackendRoutes";
import UserRoutes from "./UserRoutes";

const App = () => {
  return (
    <>
      {/* Public Frontend Routes */}
      <FrontendRoutes />

      {/* Admin Routes */}
      <BackendRoutes />

      <UserRoutes />

    </>
  );
};

export default App;