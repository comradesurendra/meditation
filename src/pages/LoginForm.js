import React, { useContext,useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./Common";
import { Marginer } from "./Marginer";
import {signin} from "../helpers/auth";
import { AccountContext } from "../helpers/accountContext";
import { UserAuthData } from "../helpers/accountContext";


export function LoginForm() {
  const { switchToSignup } = useContext(AccountContext);
  const { auth,setAuth,date,setdata } = useContext(UserAuthData)
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      let response = signin(email,pass);
    } catch(e){}
    
  }

  return (
        <BoxContainer>
          <FormContainer>
            <Input type="email" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
            <Input type="password" placeholder="Password" onChange={event => setPass(event.target.value)}/>
          </FormContainer>
          <Marginer direction="vertical" margin={10} />
          <MutedLink href="#">Forget your password?</MutedLink>
          <Marginer direction="vertical" margin="1.6em" />
          <SubmitButton type="submit" onClick={handleSubmit}>Signin</SubmitButton>
          <Marginer direction="vertical" margin="1em" />
          <MutedLink href="#">
            Don't have an accoun?{" "}
            <BoldLink href="#" onClick={switchToSignup}>
              Signup
            </BoldLink>
          </MutedLink>
        </BoxContainer>
  );
}

