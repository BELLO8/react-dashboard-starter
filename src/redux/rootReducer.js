import auth from "./auth";
import customer from "./store/customer";
import order from "./store/order";
import partner from "./store/partner";
const rootReducer = { auth, customer, partner, order };

export default rootReducer;
