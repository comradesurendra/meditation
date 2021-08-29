import React, { useEffect, useState, useContext } from "react";
import { Trainer } from "./Trainer";
import { User } from "./User";
import { UserAuthData } from "../helpers/accountContext";
import { db } from "../services/firebase";

export function Dashboard(props) {
  const [userdata, setUserData] = useState(
    JSON.parse(localStorage.getItem("data"))
  );
  const [availdata, setAvailData] = useState([{}]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const handleAvailUser = () => {
      let availableTrainer = 0;
      if (isMounted) {
        db.ref(`user_data`)
          .orderByChild("type")
          .equalTo(userdata.type=="trainer"?"customer":"trainer")
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
    };

    db.ref(`user_data`).on("child_changed", handleAvailUser);

    db.ref(`user_data`).on("child_changed", handleAvailUser);

    return () => {
      isMounted = false;
    };
  }, []);
 console.log(availdata);
  return (
    <UserAuthData.Provider value={{ userdata, setUserData,count,availdata }}>
      {userdata?.type == "customer" ? <User /> : <Trainer />}
    </UserAuthData.Provider>
  );
}
