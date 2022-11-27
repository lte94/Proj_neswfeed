import { authService } from "./firebase.js";
import { getcomments } from "./pages/loginMain.js";
export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  404: "/pages/404.html",
  "/": "/pages/mainpage.html",
  auth: "/pages/auth.html",
  loginMain: "/pages/loginMain.html",
  review: "./pages/review.html",
  search: "./pages/search.html",
};

import { myReviewList } from "./pages/review.js";
import { searchBar } from "./pages/search.js";

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", "");
  const pathName = window.location.pathname;

  // live server를 index.html에서 오픈할 경우
  if (pathName === "/index.html") {
    window.history.pushState({}, "", "/");
  }
  if (path.length == 0) {
    path = "/";
  }

  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("root").innerHTML = html;

  if (path === "/") {
    getcomments();
  }

  // 특정 화면 랜더링 되면 DOM 처리

  // login 성공한 메인 페이지
  if (path === "loginMain") {
    document.getElementById("profileImg").src =
      authService.currentUser.photoURL ?? "../assets/blank_profile.png";
    //searchBar();
    getcomments(); 
  }

  // search page
  if (path === "search") {
    document.getElementById("profileImg").src =
      authService.currentUser.photoURL ?? "../assets/blank_profile.png";
    searchBar();
    getcomments();
  }

  // 내 글 보러가기 페이지
  if (path === "review") {
    // 로그인한 회원의 프로필 사진 표시

    document.getElementById("profileImg").src =
      authService.currentUser.photoURL ?? "../assets/blank_profile.png";

    myReviewList();
  }
};

export const goToMain = () => {
  window.location.hash = "";
};
