import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  BoxContainerUser,
  BoxContainerTwoUser,
  BoxContainerThreeUser,
  HeaderContainerUser,
  HeaderTextUser,
  SmallTextUser,
  SmallTextTrainer,
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
import Logo from "../assets/undraw.svg";
import { logout } from "../helpers/auth";
import { setCounter, connectTrainer } from "../helpers/db";
import { UserAuthData } from "../helpers/accountContext";
import { db } from "../services/firebase";

export function User() {
  const { userdata, count, availdata, setAvailData, setCount, userid } =
    useContext(UserAuthData);
  const [signout, setSignout] = useState(false);
  const [timer, setTimer] = useState();

  useEffect(() => {
    let isMounted = true;
    const handleAvailUser = () => {
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
                      if (data[key]?.status === "online") availableTrainer++;
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

     //*** Set server time and update display timer ***//
    const handleTimer = () => {
      let serverTimeOffset = 0;

      //*** Get server time to check diff from user sys ***//
      db.ref(".info/serverTimeOffset").on("value", (snapshot) => {
        serverTimeOffset = snapshot.val();
        return serverTimeOffset;
      });

      //*** Get the duration of meditation session from db ***//
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

    //***  firebase on method to get realtime upate nased on db update ***//
    db.ref(`user_data`).on("child_changed", handleAvailUser);
    db.ref(`user_data/${userid}/countdown`).on("child_added", handleTimer);

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async () => {

    //*** Filter the available trainer currently online ***//
    let availabletrai = availdata.filter((obj) => obj?.status === "online");

    //*** Take first available tariner id of all available trainers ***//
    availabletrai = availabletrai[0]?.id;

    //*** Method call to start timer and update the pair id to connected trainer ***//
    await setCounter(userid, availabletrai);

    //*** Method call to update the pair id of trainer to connected user **//
    await connectTrainer(userid, availabletrai);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        setSignout(true);
      }
    } catch (e) {}
  };
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
            start
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
              <SmallTextTrainer>Available Trainer</SmallTextTrainer>
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
