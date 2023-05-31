import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { map } from "lodash";
import routes from "./routes";

export function Navigation(props) {
  const { themeDark, setThemeDark } = props;
  return (
    <Router>
      <Routes>
        {map(routes, (route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout themeDark={themeDark} setThemeDark={setThemeDark}>
                <route.component themeDark={themeDark} />
              </route.layout>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}
