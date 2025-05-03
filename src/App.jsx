import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Hero from "./components/Hero";
import Feed from "./components/Feed";
import { Toaster } from "react-hot-toast";
import Connections from "./components/Connections";
import ConnectionRequests from "./components/Request";
import SignUp from "./components/SignUp";
import PageNotFound from "./components/PageNotFound";
import Header from "./components/Header";
import VerifyEmail from "./components/VerifyEmail";
import FeedProfile from "./components/FeedProfile";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <Footer />
            </>
          }
        />
        {/* <Route
          path="/feed"
          element={
            <>
              <Header />
              <Feed />
              <Footer />
            </>
          }
        /> */}
        <Route path="/" element={<Body />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/:userId/profile/view" element={<FeedProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<ConnectionRequests />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
