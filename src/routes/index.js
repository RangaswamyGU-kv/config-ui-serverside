// Login
import Login from "../pages/Login";
// Interviewer
import Config from "../pages/config/index";
import UploadData from "../../src/components/UploadData/index";
import NewUploadData from "../pages/Newupload/index";
import Users from "../pages/users/index";
import Compras from "../pages/comp-services/uploadPrice";

export const routes = [
    {
        path:["/","/login"],
        component:Login,
        exact:true,
        isProtected:false
    },
    {
        path:'/config/configMap',
        component:Config,
        exact:true,
        isProtected:false
    },
    {
        path: '/config/staticKeys',
        component: Config,
        exact: true,
        isProtected: false
      },
      {
        path: '/config/supplierConfig',
        component: Config,
        exact: true,
        isProtected: false
      },
      {
        path: '/config/configList',
        component: Config,
        exact: true,
        isProtected: false
      },
      {
        path: '/upload',
        component: UploadData,
        exact: true,
        isProtected: false
      },
      {
        path:'/Newupload/uploadindex',
        component: NewUploadData,
        exact: true,
        isProtected: false
      },
      {
        path:'/Newupload/view',
        component: NewUploadData,
        exact: true,
        isProtected: false
      },
      {
        path:'/users',
        component: Users,
        exact: true,
        isProtected: false
      },
      {
        path:'/users/view',
        component: Users,
        exact: true,
        isProtected: false
      },
      {
        path:'/users/create',
        component: Users,
        exact: true,
        isProtected: false
      },
      {
        path:'/compras/service',
        component: Compras,
        exact: true,
        isProtected: false
      }
       
]
