// This file for testing requests
import { getApiRoot, projectKey } from "./ClientBuilder";
import { passOptions } from "./ClientBuilderWithPass";

const getProjects = async () => {
  try {
    const projects = await getApiRoot()
      .withProjectKey({ projectKey })
      .categories()
      .get()
      .execute();
    return projects;
  } catch (e) {
    console.log(e);
  }
};

getProjects().then(console.log).catch(console.error);
console.log("token");
console.log(passOptions?.tokenCache?.get());
