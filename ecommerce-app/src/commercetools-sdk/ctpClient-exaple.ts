// This file for testing requests
import { getApiRoot, projectKey } from "./ClientBuilder";

const getCustomer = async () => {
  try {
    const customer = await getApiRoot()
      .withProjectKey({ projectKey })
      .categories()
      .get()
      .execute();
    return customer;
  } catch (e) {
    console.log(e);
  }
};

getCustomer().then(console.log).catch(console.error);
