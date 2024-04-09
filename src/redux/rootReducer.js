import auth from "./auth";
import avis from "./store/avis";
import car from "./store/car";
import categoryCar from "./store/categoryCar";
import customer from "./store/customer";
import driver from "./store/driver";
import order from "./store/order";
import partner from "./store/partner";
import stats from "./store/stats";
import user from "./store/user";

const rootReducer = {
  auth,
  customer,
  partner,
  order,
  categoryCar,
  user,
  driver,
  car,
  stats,
  avis,
};

export default rootReducer;
