import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import Logo from "../assets/yoga.svg";
import { logout } from "../helpers/auth";
import { UserAuthData } from "../helpers/accountContext";

const BoxContainer = styled.div`
  width: 380px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  top: 154px;
  left: 1100px;
  overflow: hidden;
`;

const BoxContainerTwo = styled.div`
  width: 802px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: absolute;
  top: 97px;
  left: 100px;
  overflow: hidden;
`;

const BoxContainerThree = styled.div`
  width: 380px;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: absolute;
  top: 101px;
  left: 1100px;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 50%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const HeaderContainer = styled.div`
  width: 400px;
  display: flex;
  position: absolute;
  left: 100px;
  top: 20px;
  flex-direction: column;
`;

const HeaderText = styled.span`
  font-weight: 600;
  line-height: 1.24;
  margin: 0;
  padding: 0;
  font-size: 2.25rem;
  font-family: "Sacramento", cursive;
  color: #64cefd;
  z-index: 10;
  right: 40px;
  margin: 0;
`;

const SmallText = styled.div`
  color: #64cefd;
  float: center;
  font-weight: 500;
  font-size: 19px;
  margin: 0;
  right: 25px;
`;

const InnerContainer = styled.div`
  width: 80%;
  display: flex;
  position: absolute;
  flex-direction: column;
  padding: 0 1.8em;
  top: 40px;
`;

const ImageBoxContainer = styled.img`
  width: 700px;
  height: 500px;
  position: absolute;
  left: 30px;
  top: 30px;
`;

export const StartButton = styled.button`
  width: 10px;
  padding: 11px 4%;
  position: relative;
  top: 656px;
  left: 289px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: #64cefd;
  &:hover {
    filter: brightness(1.03);
  }
`;

export const LogOutButton = styled.button`
  width: 10px;
  padding: 11px 4%;
  position: relative;
  top: 20px;
  left: 1350px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: #64cefd;
  &:hover {
    filter: brightness(1.03);
  }
`;

export const RoundCircleOne = styled.div`
  float: left;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: #80ed99;
  margin: 5px;
`;

export const RoundCircleTwo = styled.div`
  float: left;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: #ff2442;
  margin: 5px;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function Trainer() {
  const { userdata, count, availdata } = useContext(UserAuthData);
  const [signout, setSignout] = useState(false);
  const handleSubmit = () => {};
  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        setSignout(true);
      }
    } catch (e) {}
  };
  console.log(availdata);
  if (signout) {
    return <Redirect to="/" push={true} />;
  } else {
    return (
      <>
        <HeaderContainer>
          <HeaderText>Welcome {userdata?.name}</HeaderText>
        </HeaderContainer>
        <LogOutButton type="submit" onClick={handleLogout}>
          logout
        </LogOutButton>
        <BoxContainerTwo>
          <ImageBoxContainer src={Logo} />
        </BoxContainerTwo>
        <StartButton
          type="submit"
          disable={count != 0 ? false : true}
          onClick={handleSubmit}
        >
          End
        </StartButton>
        <BoxContainerThree></BoxContainerThree>
        <BoxContainer>
          {count === 0 || availdata.length === 0 ? (
            <InnerContainer>
              <SmallText>No user onlin.</SmallText>
            </InnerContainer>
          ) : (
            <InnerContainer>
              {availdata.map((d) =>
                d.status == "offline" ? (
                  <span key={d.uid}>
                    <RoundCircleTwo />
                    <SmallText>{d.name}</SmallText>
                  </span>
                ) : (
                  <span key={d.uid}>
                    <RoundCircleOne />
                    <SmallText>{d.name}</SmallText>
                  </span>
                )
              )}
            </InnerContainer>
          )}
        </BoxContainer>
      </>
    );
  }
}
