import {
  HomeOutlined,
  TagsOutlined,
  ApartmentOutlined,
  ClusterOutlined,
} from "@ant-design/icons";
export const adminRoutesOptions = {
  inventory: {
    path: "/",
    nameMenuSider: "Inventarios",
    iconMenuSider: <HomeOutlined />,
  },
  products: {
    path: "/productos",
    nameMenuSider: "Productos",
    iconMenuSider: <TagsOutlined />,
  },
  categories: {
    path: "/categorias",
    nameMenuSider: "Categorías",
    iconMenuSider: <ClusterOutlined />,
  },
  deposits: {
    path: "/depositos",
    nameMenuSider: "Depósitos",
    iconMenuSider: <ApartmentOutlined />,
  },
};
