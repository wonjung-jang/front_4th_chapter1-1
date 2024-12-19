import { submitEventHandler, clickEventHandler } from "@/utils";
import { addRoutes, navigator, setRenderTarget } from "./router/router";
import userStore from "@/store/userStore";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

setRenderTarget(document.getElementById("root"));
addRoutes("/", MainPage);
addRoutes("/profile", ProfilePage);
addRoutes("/login", LoginPage);
addRoutes("#/", MainPage);
addRoutes("#/profile", ProfilePage);
addRoutes("#/login", LoginPage);
addRoutes("*", NotFoundPage);

function validateRouteUser(path) {
  const user = userStore.getUser();
  if (!user && path === "/profile") path = "/login";
  if (user && path === "/login") path = "/";
  return path;
}

function validateHashRouteUser(hash) {
  const user = userStore.getUser();
  if (!user && hash === "#/profile") hash = "#/login";
  if (user && hash === "#/login") hash = "#/";
  return hash;
}

function branchRoute() {
  let { hash, pathname } = window.location;
  if (hash) {
    hash = validateHashRouteUser(hash);
    navigator(hash);
  } else {
    pathname = validateRouteUser(pathname);
    navigator(pathname);
  }
}

document.body.addEventListener("submit", submitEventHandler);
document.body.addEventListener("click", clickEventHandler);
window.addEventListener("load", () => branchRoute());
window.addEventListener("popstate", () => branchRoute());
window.addEventListener("hashchange", () => branchRoute());
