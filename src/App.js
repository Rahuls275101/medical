import React from "react";
import FrontendRoutes from "./FrontendRoutes";
import BackendRoutes from "./BackendRoutes";

const App = () => {
  return (
    <>
      {/* Public Frontend Routes */}
      <FrontendRoutes />

      {/* Admin Routes */}
      <BackendRoutes />
    </>
  );
};

export default App;