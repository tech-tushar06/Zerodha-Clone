import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // capture token from URL if present (landing redirects with ?token=...)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      // remove token from URL for cleanliness
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState(null, '', url.toString());
      setIsAuthorized(true);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      const loginUrl = process.env.REACT_APP_LANDING_URL ? `${process.env.REACT_APP_LANDING_URL}/login` : 'http://localhost:3004/login';
      window.location.replace(loginUrl);
      return;
    }
    setIsAuthorized(true);
  }, []);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
