import * as LoginActionCreators from "./userLoginActions";
import * as SignupActionCreators from "./userSignupActions";
import * as ProductsActionCreators from "./productsActions";
import * as ProductDetailsActionCreators from "./productDetailsActions";
import * as AttributeActionsCreators from "./attributesActions";
import * as NotificationActionsCreators from "./notificationActions";
import * as CategoriesActionsCreators from "./attributesActions";
import * as CartActionsCreators from "./cartActions";

const ActionCreators = {
  ...LoginActionCreators,
  ...SignupActionCreators,
  ...ProductsActionCreators,
  ...ProductDetailsActionCreators,
  ...AttributeActionsCreators,
  ...NotificationActionsCreators,
  ...CategoriesActionsCreators,
  ...CartActionsCreators,
};

export default ActionCreators;
