import { emailRegex, pwRegex } from "../util.js";
import { authService } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// 로그인 성공시 loginMain 화면으로 이동
export const handleAuth = (event) => {
    event.preventDefault();
    const email = document.getElementById("email");
    const emailVal = email.value;
    const pw = document.getElementById("pw");
    const pwVal = pw.value;

    // 유효성 검사 진행
    if (!emailVal) {
        alert("이메일을 입력해주세요");
        email.focus();
        return;
    }
    if (!pwVal) {
        alert("비밀번호를 입력해주세요");
        pw.focus();
        return;
    }

    const correctEmail = emailVal.match(emailRegex);
    const correctPW = pwVal.match(pwRegex);

    if (correctEmail === null) {
        alert("이메일 형식에 맞게 입력해주세요!");
        email.focus();
        return;
    }
    if (correctPW === null) {
        alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다!");
        pw.focus();
        return;
    }

    // 유효성 검사 통과 후 로그인 혹은 회원가입 요청
    const loginBtnText = document.querySelector("#authBtn").value;

    if (loginBtnText === "로그인") {
        // 로긍니 성공 시 loginmain 페이지로

        signInWithEmailAndPassword(authService, emailVal, pwVal)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.hash = "#loginMain";
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log("errorMessage: ", errorMessage);
            if (errorMessage.includes("user-not-found")) {
                alert("가입되지 않은 회원입니다!");
                return;
            }
            else if (errorMessage.includes("wrong-pw")) {
                alert("비밀번호가 틀렸습니다!");
            }
        });
    }
    else {
        // 회원가입 화면
        createUserWithEmailAndPassword(authService, emailVal, pwVal)
        .then((userCredential) => {
            console.log("회원가입 성공");
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log("errorMessage: ", errorMessage);
            if (errorMessage.includes("eamil-already-in-use")) {
                alert("이미 가입된 메일입니다.");
            }
        });
    }
};

// 로그인-회원가입 토글
export const onToggle = () => {
    const authBtn = document.querySelector("#authBtn");
    const authToggle = document.querySelector("#authToggle");
    const authTitle = document.querySelector("#authTitle");

    if (authBtn.value === "로그인") {
      authBtn.value = "회원가입";
      authToggle.textContent = "로그인";
      authTitle.textContent = "회원가입 페이지";
    } 
    else {
      authBtn.value = "로그인";
      authToggle.textContent = "회원가입";
      authTitle.textContent = "로그인 페이지";
    }
  };

// social login
export const socialLogin = (event) => {
    const { name } = event.target;
    let provider;

    if (name === "google") {
        provider = new GoogleAuthProvider();
    }
    else if (name === "github") {
        provider = new GithubAuthProvider();
    }
    signInWithPopup(authService, provider)
    .then((result) => {
        const user = result.user;
    })
    .catch((error) => {
        console.log("error: ", error);
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

// logout
export const logout = () => {
    signOut(authService)
    .then(() => {
        localStorage.clear();
        console.log("로그아웃 성공");
    })
    .catch((error) => {
        console.log("error: ", error);
    })
}