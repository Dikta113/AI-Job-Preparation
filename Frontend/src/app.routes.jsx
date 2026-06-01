import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./features/auth/components/Protected.jsx"
import Home from "./features/interview/pages/Home.jsx"
import Interview from "./features/interview/pages/Interview";
import Privacy from "./features/interview/pages/Privacy";
import Terms from "./features/interview/pages/Terms";
import Help from "./features/interview/pages/Help";



export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }, {
        path: "/",
        element: <Protected><Home /></Protected>
    }, {
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    }, {
        path: "/privacy",
        element: <Protected><Privacy /></Protected>
    }, {
        path: "/terms",
        element: <Protected><Terms /></Protected>
    }, {
        path: "/help",
        element: <Protected><Help /></Protected>
    }
])