import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  BoxContainerUser,
  BoxContainerTwoUser,
  BoxContainerThreeUser,
  HeaderContainerUser,
  HeaderTextUser,
  SmallTextUser,
  InnerContainerUser,
  ImageBoxContainerUser,
  StartButton,
  LogOutButton,
  RoundCircleOne,
  RoundCircleTwo,
  SmallTimerText,
  TimerContainerUser,
  StartButtonGrey,
} from "./Common";
import Logo from "../assets/yoga.svg";
import { logout } from "../helpers/auth";
import { endCall, readData } from "../helpers/db";
import { UserAuthData } from "../helpers/accountContext";
import { db } from "../services/firebase";

export function Trainer() {
  const { userdata, count, availdata, setAvailData, setCount, userid } =
    useContext(UserAuthData);
  const [signout, setSignout] = useState(false);
  const [timer, setTimer] = useState();

  useEffect(() => {
    let isMounted = true;
    const handleAvailUser = () => {
      let availableTrainer = 0;
      if (isMounted) {
        db.ref("user_data")
          .orderByChild("uid")
          .equalTo(userdata?.uid)
          .limitToFirst(1)
          .once("value")
          .then((snapshot) => {
            let result = snapshot.val();
            let key = Object.keys(result)[0];
            localStorage.setItem("data", JSON.stringify(result[key]));
          });
      }
    };

    const handleTimer = () => {
      let serverTimeOffset = 0;
      db.ref(".info/serverTimeOffset").on("value", (snapshot) => {
        serverTimeOffset = snapshot.val();
        return serverTimeOffset;
      });
      db.ref(`user_data/${userid}/countdown`).on("value", (snapshot) => {
        let seconds = snapshot.val().seconds;
        let startAt = snapshot.val().startAt;

        let interval = setInterval(() => {
          let timeLeft =
            seconds * 1000 - (Date.now() - startAt - serverTimeOffset);
          if (timeLeft < 0) {
            clearInterval(interval);
            setTimer(0);
          } else {
            setTimer(`${Math.floor(timeLeft / 1000)}`);
          }
        }, 100);
        return seconds;
      });
    };
    db.ref(`user_data`).on("child_changed", handleAvailUser);
    db.ref(`user_data/${userid}/countdown`).on("child_added", handleTimer);

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async () => {
    await endCall(userdata?.pair);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        setSignout(true);
      }
    } catch (e) {}
  };
  console.log(userdata?.uid);
  if (signout) {
    return <Redirect to="/" push={true} />;
  } else {
    return (
      <>
        <HeaderContainerUser>
          <HeaderTextUser>Welcome {userdata?.name}</HeaderTextUser>
        </HeaderContainerUser>
        <LogOutButton type="submit" onClick={handleLogout}>
          logout
        </LogOutButton>
        <BoxContainerTwoUser>
          <ImageBoxContainerUser src={Logo} />
        </BoxContainerTwoUser>
        {count !== 0 ? (
          <StartButton type="submit" onClick={handleSubmit}>
            End
          </StartButton>
        ) : (
          <StartButtonGrey type="submit">Start</StartButtonGrey>
        )}
        <BoxContainerThreeUser>
          <TimerContainerUser>
            <SmallTimerText>{timer}</SmallTimerText>
          </TimerContainerUser>
        </BoxContainerThreeUser>
        <BoxContainerUser>
          {count === 0 ? (
            <InnerContainerUser>
              <SmallTextUser>No tariner onlin.</SmallTextUser>
            </InnerContainerUser>
          ) : (
            <InnerContainerUser>
              {availdata.map((d) =>
                d.status == "offline" ? (
                  <span key={d.uid}>
                    <RoundCircleTwo />
                    <SmallTextUser>{d.name}</SmallTextUser>
                  </span>
                ) : (
                  <span key={d.uid}>
                    <RoundCircleOne />
                    <SmallTextUser>{d.name}</SmallTextUser>
                  </span>
                )
              )}
            </InnerContainerUser>
          )}
        </BoxContainerUser>
      </>
    );
  }
}
