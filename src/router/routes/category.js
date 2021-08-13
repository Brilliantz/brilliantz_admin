import BlankView from "../../layouts/BlankView";
import CategoryListManagement from "../../views/category/CategoryListManagement";
import CategoryManagement from "../../views/category/CategoryManagement";

export default {
    path: 'category',
    name: 'category',
    redirect: {name: 'list'},
    component: BlankView,
    children: [
        {
            path: 'list',
            name: 'list',
            exact: true,
            component: CategoryListManagement,
        },
        {
            path: ':category',
            name: 'category',
            component: CategoryManagement
        }
    ]}
