import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectRefreshing } from "./redux/auth/selector";
import type { AppDispatch } from "./redux/store";
import { refreshUser } from "./redux/auth/operations";
import Modal from "react-modal";

Modal.setAppElement("#root");

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegistrationPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const FriendsPage = lazy(() => import("./pages/FriendsPage"));
const NoticesPage = lazy(() => import("./pages/NoticesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AddPetPage = lazy(() => import("./pages/AddPetPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const isRefreshing = useSelector(selectRefreshing);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>Loading...</div>
  ) : (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/" component={<LoginPage />} />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
            }
          />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute redirectTo="/login" component={ProfilePage} />
            }
            />
            <Route path="/add-pet" element={<PrivateRoute redirectTo="/login" component={AddPetPage} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
