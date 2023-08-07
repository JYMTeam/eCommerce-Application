// import React from "react";
import { getApiRoot, projectKey } from "./ClientBuilder";

const getProducts = async () => {
  try {
    const project = await getApiRoot()
      .withProjectKey({ projectKey })
      // .shoppingLists()
      // .categories()
      .productTypes()
      .get()
      .execute();

    // setProjectDetails(project.body);
    return project;
  } catch (e) {
    console.log(e);
  }
};

getProducts().then(console.log).catch(console.error);
