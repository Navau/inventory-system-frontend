import { AdminLayout } from "../layouts";
import {
  InventoryAdmin,
  DepositsAdmin,
  CategoriesAdmin,
  ProductsAdmin,
} from "../pages";
import { adminRoutesOptions } from "../utils";

const routesAdmin = [
  {
    path: adminRoutesOptions.inventory.path,
    layout: AdminLayout,
    component: InventoryAdmin,
  },
  {
    path: adminRoutesOptions.deposits.path,
    layout: AdminLayout,
    component: DepositsAdmin,
  },
  {
    path: adminRoutesOptions.categories.path,
    layout: AdminLayout,
    component: CategoriesAdmin,
  },
  {
    path: adminRoutesOptions.products.path,
    layout: AdminLayout,
    component: ProductsAdmin,
  },
];

export default routesAdmin;
