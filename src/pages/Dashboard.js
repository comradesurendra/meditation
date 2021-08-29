import React, { useEffect, useState, useContext } from "react";
import { Trainer } from "./Trainer";
import { User } from "./User";
import { UserAuthData } from "../helpers/accountContext";

export function Dashboard(props) {
  const [userdata, setUserData] = useState(
    JSON.parse(localStorage.getItem("data"))
  );
  const [availdat, setAvailData] = useState(false);

  useEffect(() => {}, [userdata, availdat]);

  return (
    <UserAuthData.Provider value={{ userdata, setUserData }}>
      {userdata?.type == "customer" ? <User /> : <Trainer />}
    </UserAuthData.Provider>
  );
}
