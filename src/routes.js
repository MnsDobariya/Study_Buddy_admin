/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
// import VirtualReality from "layouts/virtual-reality";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Teacher from "layouts/teacher/Teacher";
import ForgotPassword from "layouts/authentication/forgot-password";
import EmailVerify from "layouts/authentication/verify-email";
import Addtodos from "layouts/to-dos/Addtodos";
// import Form from "layouts/authentication/form";
// import Assignment from "layouts/authentication/assignments";

// import Form1 from "layouts/form/Form1";
// import Form2 from "layouts/form/Form2";
// import Form3 from "layouts/form/Form3";
// import To_dos from "layouts/to-dos/To_dos";

import TeacherForm from "layouts/teacher/TeacherForm";
import AssignmentForm from "layouts/authentication/assignments/assignmentForm";
import AssignmentList from "layouts/authentication/assignments/assignmentList";
import Calendar from "layouts/authentication/calendar/calendar";
import Todos from "layouts/to-dos/Todos";
import Resources from "layouts/resources/Resources";
import Notification from "layouts/notification/notification";
import Chat from "layouts/chat/Chat";
import Assignments from "layouts/authentication/assignments";
import { faBell, faCalendarDays, faCommentDots, faFileArrowDown, faFileSignature, faListCheck, faRectangleList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import LandingPage from "landing/landing";
import AssignmentDetails from "layouts/authentication/assignments/assignmentDetails";
import Details from "layouts/authentication/assignments/Details";
import Tasks from "layouts/authentication/assignments/Tasks";
import Discussion from "layouts/authentication/assignments/Discussion";
import User from "layouts/user/User";
import ChartData from "examples/ChartData/chartData";
import TaskChartData from "examples/ChartData/taskChartData";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",   
    role:["User","Teacher","Admin"],
    icon: <MdDashboardCustomize />,
    // icon: <MdDashboard />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Teacher",
    key: "teacher",
    route: "/teacher",
    role:["Admin"],
    icon: <FontAwesomeIcon icon={faRectangleList} size="xs" style={{color:"#3a416f"}}/>,
    component: <Teacher />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Todos",
    key: "todos",
    route: "/todos",
    role:["User","Teacher","Admin"],
    icon: <FontAwesomeIcon icon={faListCheck} size="xs" style={{color:"#3a416f"}}/>,
    component: <Todos />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Calendar",
    key: "calendar",
    route: "/calendar",
    role:["User","Teacher","Admin"],
    icon: <FontAwesomeIcon icon={faCalendarDays} size="sm" style={{color:"#3a416f"}}/>,
    // icon: <FaCalendarDays />,
    component: <Calendar />,
    noCollapse: true,
  },
  
  {
    // type: "collapse",
    name: "Add To-dos",
    key: "addtodos",
    route: "/todos/addtodos",
    icon: <Office size="12px" />,
    component: <Addtodos />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Resources",
    key: "resources",
    role:["User","Teacher","Admin"],
    route: "/resources",
    icon: <FontAwesomeIcon icon={faFileArrowDown} size="sm" style={{color:"#3a416f"}}/>,
    component: <Resources />,
    noCollapse:true,
},
  {
    type: "collapse",
    name: "Assignments",
    key: "assignments",
    route: "/assignments",
    role:["User","Teacher","Admin"],
    icon: <FontAwesomeIcon icon={faFileSignature} size="xs" style={{color:"#3a416f"}}/>,
    component: <Assignments />,
    noCollapse:true,
},

{
  type: "collapse",
  name: "Chat",
  key: "chat",
  route: "/chat",
  role:["User","Teacher"],
  // icon: <FontAwesomeIcon icon={faCommentDots} size="xs" style={{color:"#3a416f"}}/>,
  icon: <FaWhatsapp />,

  component: <Chat />,
  noCollapse: true,
},
  {
    // type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    role:"Teacher",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },  
  
  // {  
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: <VirtualReality />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: <RTL />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    role:["User","Teacher","Admin"],
    icon: <CustomerSupport size="15px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Notification",
    key: "notification",
    route: "/notification",
    role:["User","Admin","Teacher"],
    // icon: <NotificationBell size="12px" />,
    icon:<FontAwesomeIcon icon={faBell} size="xs" style={{color:"#3a416f"}}/>,
    component: <Notification />,
    noCollapse: true,
  },
  {
    name: "ChartData",
    key: "chartData",
    route: "/chartdata",
    role:["User","Admin","Teacher"],
    // icon: <NotificationBell size="12px" />,
    icon:<FontAwesomeIcon icon={faBell} size="xs" style={{color:"#3a416f"}}/>,
    component: <ChartData />,
    noCollapse: true,
  },
  {
    name: "TaskChartData",
    key: "taskchartData",
    route: "/taskChartdata",
    role:["User","Admin","Teacher"],
    // icon: <NotificationBell size="12px" />,
    icon:<FontAwesomeIcon icon={faBell} size="xs" style={{color:"#3a416f"}}/>,
    component: <TaskChartData />,
    noCollapse: true,
  },
  {
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  
  {
    name: "Forgort Password",
    key: "forgot-password",
    route: "/authentication/forgot-password",
    icon: <SpaceShip size="12px" />,
    component: <ForgotPassword />,
    noCollapse: true,
  },
  {
    name: "Verify Email",
    key: "verify-email",
    route: "/authentication/verify-email",
    icon: <SpaceShip size="12px" />,
    component: <EmailVerify />,
    noCollapse: true,
  },
 
  // {
  //   type: "collapse",
  //   name: "Form ",
  //   key: "form",
  //   route: "/authentication/form",
  //   icon: <SpaceShip size="12px" />,
  //   component: <Form />,
  //   name: "Form1",
  //   key: "form1",
  //   route: "/form1",
  //   icon: <SpaceShip size="12px" />,
  //   component: <Form1 />,
  //   noCollapse: true,
  // },
  {
    name: "Landing",
    key: "landing",
    route: "/landingpage",
    role:["User","Teacher","Admin"],
    icon: <FontAwesomeIcon icon={faCalendarDays} size="sm" style={{color:"#3a416f"}}/>,
    // icon: <FaCalendarDays />,
    component: <LandingPage />,
    noCollapse: true,
  },

  {
    name: "Teacher Form",
    key: "teacherform",
    route: "/teacher/teacherform",
    icon: <SpaceShip size="12px" />,
    component: <TeacherForm />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "assignment Form",
    key: "assignmentform",
    route: "/assignments/assignmentform",
    icon: <SpaceShip size="12px" />,
    component: <AssignmentForm />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "assignment List",
    key: "assignmentlist",
    route: "/assignments/assignmentList",
    icon: <SpaceShip size="12px" />,
    component: <AssignmentList />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "assignment Details",
    key: "assignmentdetails",
    route: "/assignments/assignmentDetails",
    icon: <SpaceShip size="12px" />,
    component: <AssignmentDetails />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "details",
    key: "details",
    route: "/assignments/details",
    icon: <SpaceShip size="12px" />,
    component: <Details />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "tasks",
    key: "tasks",
    route: "/assignments/tasks",
    icon: <SpaceShip size="12px" />,
    component: <Tasks />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "discussion",
    key: "discussion",
    route: "/assignments/discussion",
    icon: <SpaceShip size="12px" />,
    component: <Discussion />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "User",
    key: "user",
    route: "/user",
    role:["Teacher"],
    icon: <FontAwesomeIcon icon={faUser} size="sm" style={{color:"#3a416f"}}/>,
    component: <User />,
    noCollapse: true,
  },
  
];

export default routes;
