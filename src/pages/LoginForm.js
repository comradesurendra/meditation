import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./Common";
import { Marginer } from "./Marginer";
import { signin } from "../helpers/auth";
import { AccountContext } from "../helpers/accountContext";

export function LoginForm() {
  const { switchToSignup, setAuth } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await signin(email, pass);
      if (response) {
        setAuth(true);
      }
    } catch (e) {}
  };
  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          autocomplete="false"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          autocomplete="false"
          onChange={(event) => setPass(event.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit}>
        Signin
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink onClick={switchToSignup}>
        Don't have an accoun? <BoldLink>Signup</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
