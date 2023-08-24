import * as LoginActionCreators from "./userLoginActions";
import * as SignupActionCreators from "./userSignupActions";
import * as ProductsActionCreators from "./productsActions";

const ActionCreators = {
  ...LoginActionCreators,
  ...SignupActionCreators,
  ...ProductsActionCreators,
};

export default ActionCreators;
