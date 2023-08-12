// This file for testing requests
import { getApiAnonymRoot } from "./ClientBuilderAnonym";

const getProjects = async () => {
  try {
    const projects = await getApiAnonymRoot().categories().get().execute();
    return projects;
  } catch (e) {
    console.log(e);
  }
};

getProjects().then(console.log).catch(console.error);
