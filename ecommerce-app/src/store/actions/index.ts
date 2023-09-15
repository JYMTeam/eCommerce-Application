import * as LoginActionCreators from "./userActions/userLoginActions";
import * as UserUpdateActionCreators from "./userActions/userUpdateActions";
import * as SignupActionCreators from "./userActions/userSignupActions";
import * as ProductsActionCreators from "./productsActions";
import * as ProductDetailsActionCreators from "./productDetailsActions";
import * as AttributeActionsCreators from "./attributesActions";
import * as NotificationActionsCreators from "./notificationActions";
import * as CategoriesActionsCreators from "./attributesActions";
import * as CartActionsCreators from "./cartActions/cartActions";
import * as CartRemoveActionsCreators from "./cartActions/cartRemoveActions";

const ActionCreators = {
  ...LoginActionCreators,
  ...UserUpdateActionCreators,
  ...SignupActionCreators,
  ...ProductsActionCreators,
  ...ProductDetailsActionCreators,
  ...AttributeActionsCreators,
  ...NotificationActionsCreators,
  ...CategoriesActionsCreators,
  ...CartActionsCreators,
  ...CartRemoveActionsCreators,
};

export default ActionCreators;
