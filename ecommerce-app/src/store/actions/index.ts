import * as LoginActionCreators from "./userLoginActions";
import * as SignupActionCreators from "./userSignupActions";
import * as ProductsActionCreators from "./productsActions";
import * as ProductDetailActionCreators from "./productDetailActions";

const ActionCreators = {
  ...LoginActionCreators,
  ...SignupActionCreators,
  ...ProductsActionCreators,
  ...ProductDetailActionCreators,
};

export default ActionCreators;
