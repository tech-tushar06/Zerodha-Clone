import React, { useEffect } from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      searchParams.delete("token");

      const queryString = searchParams.toString();
      const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}`;
      window.history.replaceState({}, "", nextUrl);
    }
  }, []);

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
