import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";

import Login from "./components/login/Login.js";
import Dashboard from "./components/dashboard/Dashboard";
import NavbarPage from "./components/navbar/NavbarPage";
import Index from "./components/manager/exceltojson/index";
import SheetDetails from "./components/manager/managetasks/SheetDetails";
import TaskDetails from "./components/manager/managetasks/TaskDetails";
import TaskTabs from "./components/manager/showtasks/TaskTabs";
import signUp from "./components/signup/signUp.js";
import Users from "./components/ManageUsers/Users.js";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.js";
import CreateProject from "./components/Projects/CreateProject";
import Projects from "./components/Projects/Projects";
import UploadFile from "./components/UploadFile/UploadFile.js";


const App = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <NavbarPage />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={signUp} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/addtasks" component={Index} />
        <ProtectedRoute path="/managetasks" component={SheetDetails} />
        <ProtectedRoute path="/tasktabs" component={TaskTabs} />
        <ProtectedRoute path="/managetaskdetails" component={TaskDetails} />
        <ProtectedRoute path="/users" component={Users} />
        <ProtectedRoute path="/projects" component={Projects} />
        <ProtectedRoute path="/projects/create" component={CreateProject} />
        <ProtectedRoute path="/profile" component={UploadFile} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </HashRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
