import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`;

export const MutedLink = styled.a`
  font-size: 11px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  margin-bottom: 8px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

export const BoldLink = styled.span`
  font-size: 11px;
  color: #64cefd;
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
  &:hover {
    cursor: pointer;
  }
`;

export const SwitchLink = styled.span`
  position: relative;
  align-content: center;
  font-size: 20px;
  color: #64cefd;
  font-weight: 800;
  text-decoration: none;
  height: 42px;
  border: 1px solid #fff;
  outline: none;
  slef-align: center;
  margin: 0 4px;
  &:hover {
    cursor: pointer;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: #64cefd;
  background: #64cefd;
  &:hover {
    filter: brightness(1.03);
  }
`;

export const BoxContainerUser = styled.div`
  width: 380px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #515E63;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  top: 154px;
  left: 1100px;
  overflow: hidden;
`;

export const BoxContainerTwoUser = styled.div`
  width: 802px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #C7FFD8;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: absolute;
  top: 97px;
  left: 100px;
  overflow: hidden;
`;

export const BoxContainerThreeUser = styled.div`
  width: 380px;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #515E63;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: absolute;
  top: 101px;
  left: 1100px;
  overflow: hidden;
`;

export const HeaderContainerUser = styled.div`
  width: 400px;
  display: flex;
  position: absolute;
  left: 100px;
  top: 20px;
  flex-direction: column;
`;

export const HeaderTextUser = styled.span`
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

export const SmallTextUser = styled.div`
  color: #64cefd;
  float: center;
  font-weight: 500;
  font-size: 19px;
  margin: 0;
  right: 25px;
`;

export const InnerContainerUser = styled.div`
  width: 80%;
  display: flex;
  position: absolute;
  flex-direction: column;
  padding: 0 1.8em;
  top: 40px;
`;

export const ImageBoxContainerUser = styled.img`
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

export const StartButtonGrey = styled.button`
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
  background: #c8c6c6;
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

export const SmallTimerText = styled.div`
  color: #64cefd;
  float: center;
  font-weight: 500;
  font-size: 29px;
  margin: 0;
  right: 25px;
`;

export const TimerContainerUser = styled.div`
  width: 80%;
  display: flex;
  position: absolute;
  font-size: 19px;
  flex-direction: column;
  padding: 0 1.8em;
  top: 15px;
`;
