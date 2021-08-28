import React, { useState, useContext,useEffect } from "react";
import styled from "styled-components";
import { LoginForm } from "./LoginForm";
import { motion } from "framer-motion";
import { Redirect } from "react-router-dom";
import { AccountContext } from "../helpers/accountContext";
import { UserAuthData } from "../helpers/accountContext";
import Logo from "../assets/mindfulness.svg";
import { SignupForm } from "./SignupForm";

const BoxContainer = styled.div`
  width: 380px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: absolute;
  top: 30px;
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

const BackDrop = styled(motion.div)`
  width: 100%;
  height: 450px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: #64cefd;
  background: #64cefd;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  left: 30%;
  top: 80px;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  right: 40px;
  margin: 0;
`;

// const HomeHeaderText = styled.h2`
//   font-size: 2.25rem;
//   font-weight: 600;
//   position: relative;
//   top:70px;
//   left:250px;
//   position: absolute;
//   line-height: 1.24;
//   font-family: 'Sacramento', cursive;
//   color: #64CEFD;
//   text-align: center;
//   margin: 0;
// `;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const ImageBoxContainer = styled.img`
  width: 700px;
  height: 550px;
  position: absolute;
  top: 120px;
  left: 140px;
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

export function AccountBox(props) {
  const [authenticate, setAuth] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin, setAuth };

  useEffect(() =>{
  
  },[authenticate])

  console.log(authenticate);
  if (authenticate) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <AccountContext.Provider value={contextValue}>
        {/* <HomeHeaderText>Welcome to meditation center</HomeHeaderText> */}
        <ImageBoxContainer src={Logo} />
        <BoxContainer>
          <TopContainer>
            <BackDrop
              initial={false}
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={backdropVariants}
              transition={expandingTransition}
            />
            {active === "signin" && (
              <HeaderContainer>
                <HeaderText>Welcome</HeaderText>
                <HeaderText>Back</HeaderText>
                <SmallText>Please sign-in to continue!</SmallText>
              </HeaderContainer>
            )}
            {active === "signup" && (
              <HeaderContainer>
                <HeaderText>Create</HeaderText>
                <HeaderText>Account</HeaderText>
                <SmallText>Please sign-up to continue!</SmallText>
              </HeaderContainer>
            )}
          </TopContainer>
          <InnerContainer>
            {active === "signin" && <LoginForm />}
            {active === "signup" && <SignupForm />}
          </InnerContainer>
        </BoxContainer>
      </AccountContext.Provider>
    );
  }
}
