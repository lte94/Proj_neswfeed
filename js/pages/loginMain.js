import {
  collection,
  orderBy,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";

export async function getcomments() {
  const q = query(
    collection(dbService, "reviews"),
    orderBy("createdAt", "desc")
  );

  // query 조건에 맞는 documents 데이터를 배열로 받아오기
  const querySnapshot = await getDocs(q);
  const cmtObjList = [];
  // doc.id는 DB가 자체적으로 생성하는 값으로, id도 함께 포함시키기 위해 객체 재구성
  querySnapshot.forEach((doc) => {
    const commentObj = {
      id: doc.id,
      ...doc.data(),
    };
    cmtObjList.push(commentObj);
  });

  cmtObjList.forEach((cmtObj) => {
    const foster = `
    <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${cmtObj.movieImage}" alt="Avatar" style="width:300px;height:300px;">
      </div>
      <div class="flip-card-back">
        <h1 class="title_line">${cmtObj.movieTitle}</h1> 
        <p class="name_line">${cmtObj.nickname}</p> 
        <p class="text_line">${cmtObj.review}</p>
      </div>
    </div>
  </div>`;
    $(".commentslists").append(foster);
  });
}
