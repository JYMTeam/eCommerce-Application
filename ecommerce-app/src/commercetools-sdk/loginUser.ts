// import React from "react";
import { MyCustomerDraft } from "@commercetools/platform-sdk";
import { getApiRoot, projectKey } from "./ClientBuilder";
import { ClientResponse } from "@commercetools/sdk-client-v2";
import { IErrorResponse } from "../models/errorModels";

const existingUser: MyCustomerDraft = {
  email: "johndoe44@example.com",
  password: "secret123",
  firstName: "John",
  lastName: "Doe",
};

const loginUser = async (existingUser: MyCustomerDraft) => {
  try {
    const answer = await getApiRoot()
      .withProjectKey({ projectKey })
      .me()
      .login()
      .post({
        body: existingUser,
      })
      .execute();
    console.log(answer.body);
    return answer;
  } catch (e) {
    const error = e as ClientResponse<IErrorResponse>;
    console.log("error");
    console.log(error.body?.message);
    console.log("error");
  }
};

loginUser(existingUser).then(console.log).catch(console.error);
