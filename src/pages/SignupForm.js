import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  SwitchLink,
} from "./Common";
import Switch from "@material-ui/core/Switch";
import { Marginer } from "./Marginer";
import { signup } from "../helpers/auth";
import { AccountContext } from "../helpers/accountContext";

export function SignupForm(props) {
  const { switchToSignin,setAuth } = useContext(AccountContext);
  const [check, setCheck] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(email, password, name, check);
      if(response){
        setAuth(true)
      }
    } catch (e) {}
  };

  return (
    <BoxContainer>
      <SwitchLink>
        Practitioner
        <Switch
          checked={check}
          onChange={(event) => setCheck(check ? false : true)}
          name="check"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        Trainer
      </SwitchLink>
      <FormContainer>
        <Input
          type="text"
          placeholder="Full Name"
          name="name"
          autocomplete="false"
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          autocomplete="false"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          autocomplete="false"
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleSubmit}>
        Signup
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink onClick={switchToSignin}>
        Already have an account?
        <BoldLink>Signin</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
