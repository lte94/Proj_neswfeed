import { handleAuth, onToggle, logout, socialLogin } from './pages/auth.js';
import { handleLocation, route, goToMain } from './router.js';
import { authService } from './firebase.js';
import { 
    save_review, 
    update_comment, 
    onEditing, 
    delete_comment,
    uploadImage,
    writeToggle,
    openMyReview,
    closeMyReviewModal,
} from './pages/review.js';
import { getcomments, openReview, closeMainReviewModal } from "./pages/loginMain.js";
import {
    closeModal,
    handleClickModal,
    changeProfile,
    onFileChange,
  } from "./pages/modal.js";
import { searchBar } from './pages/search.js';


// url 바뀌면 handleLocation 실행
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로 고침 실행 시 handleLocation 실행
document.addEventListener("DOMContentLoaded", function () {
    authService.onAuthStateChanged((user) => {
        handleLocation();
        const hash = window.location.hash;

        if (user) {
            // 로그인 상태
            if (hash === "") {
                // 로그인 상태에서는 이전으로 돌아갈 수 없다
                window.location.replace("#loginMain");
            }
        }
        else {
            // 로그아웃 상태
            if (hash !== "") {
                window.location.replace("");
            }
        }
    });
});

// 이밴트 핸들러 리스트
window.route = route;

window.onToggle = onToggle;
window.handleAuth = handleAuth;
window.socialLogin = socialLogin;
window.logout = logout;

window.goToMain = goToMain;
window.save_review = save_review;

window.closeModal = closeModal;
window.handleClickModal = handleClickModal;
window.changeProfile = changeProfile;
window.onFileChange = onFileChange;

window.getcomments = getcomments;
window.openReview = openReview;
window.closeMainReviewModal = closeMainReviewModal;

window.update_comment = update_comment;
window.onEditing = onEditing;
window.delete_comment = delete_comment;
window.uploadImage = uploadImage;
window.writeToggle = writeToggle;
window.searchBar = searchBar;
window.openMyReview = openMyReview;
window.closeMyReviewModal = closeMyReviewModal;