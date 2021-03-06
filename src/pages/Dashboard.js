import React, { useEffect, useState } from "react";
import { Trainer } from "./Trainer";
import { User } from "./User";
import { UserAuthData } from "../helpers/accountContext";
import { db } from "../services/firebase";

export function Dashboard(props) {
  const [userdata, setUserData] = useState(
    JSON.parse(localStorage.getItem("data"))
  );
  const [userid, setUserId] = useState(localStorage.getItem("userId"));
  const [availdata, setAvailData] = useState([{}]);
  const [count, setCount] = useState(0);

  //*** Fetch all the records based on user/trainer login ***//
  useEffect(() => {
    let isMounted = true;
    let availableTrainer = 0;
    if (isMounted) {
      db.ref(`user_data`)
        .orderByChild("type")
        .equalTo(userdata?.type == "trainer" ? "customer" : "trainer")
        .once("value")
        .then((snapshot) => {
          const data = snapshot?.val();
          setAvailData(
            data
              ? Object.keys(data ? data : {})
                  .map((key) => {
                    if (data[key].status === "online") availableTrainer++;
                    return {
                      id: key,
                      ...data[key],
                    };
                  })
                  ?.filter((v) => v !== undefined)
              : {}
          );
          setCount(availableTrainer);
          return data;
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <UserAuthData.Provider
      value={{
        userdata,
        setUserData,
        availdata,
        setAvailData,
        count,
        setCount,
        userid,
      }}
    >
      {userdata?.type == "customer" ? <User /> : <Trainer />}
    </UserAuthData.Provider>
  );
}
