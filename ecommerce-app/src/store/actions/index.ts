import * as LoginActionCreators from "./userLoginActions";
import * as SignupActionCreators from "./userSignupActions";
import * as ProductsActionCreators from "./productsActions";
import * as ProductDetailsActionCreators from "./productDetailsActions";

const ActionCreators = {
  ...LoginActionCreators,
  ...SignupActionCreators,
  ...ProductsActionCreators,
  ...ProductDetailsActionCreators,
};

export default ActionCreators;
