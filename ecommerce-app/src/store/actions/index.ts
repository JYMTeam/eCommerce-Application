import * as LoginActionCreators from "./userLoginActions";
import * as SignupActionCreators from "./userSignupActions";
import * as ProductsActionCreators from "./productsActions";
import * as ProductDetailsActionCreators from "./productDetailsActions";
import * as AttributeActionsCreators from "./attributesActions";

const ActionCreators = {
  ...LoginActionCreators,
  ...SignupActionCreators,
  ...ProductsActionCreators,
  ...ProductDetailsActionCreators,
  ...AttributeActionsCreators,
};

export default ActionCreators;
