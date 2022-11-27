import { authService, storageService } from "../firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const closeModal = () => {
  const profileModal = document.querySelector(".modal");
  profileModal.classList.remove("show");
};

export const handleClickModal = () => {
  const photoUrl = authService.currentUser.photoURL;
  const profileModal = document.querySelector(".modal");
  const profImg = document.querySelector("#prof-img");
  profImg.src = photoUrl;
  profileModal.classList.add("show");
  document.getElementById("prof-img").src =
    authService.currentUser.photoURL ?? "../assets/blank_profile.png";
  console.log(profImg);
};

export const changeProfile = async (event) => {
  event.preventDefault();
  document.getElementById("btnSave").disabled = true;
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );

  const newNickname = document.getElementById("profileNickname").value;
  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    downloadUrl = await getDownloadURL(response.ref);
  }
  await updateProfile(authService.currentUser, {
    displayName: newNickname ? newNickname : null,
    photoURL: downloadUrl ? downloadUrl : null,
  })
    .then(() => {
      alert("프로필 수정 완료");
      window.location.hash = "#review";
      console.log(authService.currentUser.photoURL);
      document.getElementById("prof-img").src =
        authService.currentUser.photoURL ?? "../assets/blank_profile.png";
      document.getElementById("btnSave").disabled = false;

      // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
      document.getElementById("profileNickname").placeholder =
        authService.currentUser.displayName ?? "닉네임 없음";
    })
    .catch((error) => {
      alert("프로필 수정 실패");
      console.log("error:", error);
    });
};
export const onFileChange = (event) => {
  const theFile = event.target.files[0]; // file 객체
  const reader = new FileReader();
  reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  reader.onloadend = (finishedEvent) => {
    // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.querySelector("#prof-img").src = imgDataUrl;
    document.querySelector("#profileImg").src = imgDataUrl;
  };
};

export const reviewClickModal = () => {
  const reviewModal = document.querySelector(".review-modal");
  reviewModal.classList.add("show");
};
export const closeReview = () => {
  const reviewModal = document.querySelector(".review-modal");
  reviewModal.classList.remove("show");
};
