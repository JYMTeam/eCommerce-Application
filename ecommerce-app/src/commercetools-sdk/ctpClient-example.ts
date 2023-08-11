// This file for testing requests
import { getApiRoot, projectKey } from "./ClientBuilder";

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
