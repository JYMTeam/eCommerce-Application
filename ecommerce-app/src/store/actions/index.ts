import * as LoginActionCreators from "./userLoginActions";
import * as SignupActionCreators from "./userSignupActions";
import * as ProductDetailActionCreators from "./productDetailActions";

const ActionCreators = {
  ...LoginActionCreators,
  ...SignupActionCreators,
  ...ProductDetailActionCreators,
};

export default ActionCreators;
