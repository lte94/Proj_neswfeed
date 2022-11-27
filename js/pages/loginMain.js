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
    <div class="flip-card" >
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="${cmtObj.movieImage}" alt="Avatar" style="width:300px;height:300px;"
          >
        </div >
        <div class="flip-card-back">
          <h1 class="title_line">${cmtObj.movieTitle}</h1> 
          <p class="name_line">${cmtObj.nickname}</p> 
          <p class="text_line">${cmtObj.review}</p>
          <button class="open-review" data-id="${cmtObj.id}" onclick="openReview(event)">자세히 보기</button>
        </div>
      </div>
    </div>`;
    $(".commentslists").append(foster);
  });
}

export const openReview = async (event) => {
  const commentId = event.target.getAttribute('data-id');
  const reviewModal = document.querySelector('.main-review-modal');
  reviewModal.classList.add('show');
  const q = query(
    collection(dbService, 'reviews'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const cmtObjList = [];
  querySnapshot.forEach((doc) => {
    const commentObj = {
      ...doc.data(),
      id: doc.id,
    };
    cmtObjList.push(commentObj);
  });
  const commentList = document.getElementById('main-review-content');
  commentList.innerHTML = '';
  const content = cmtObjList.filter((obj) => commentId === obj.id); 
  const object = content[0];
  const temp_html = `
  <div id = "${object.id}">
      <img src="${object.movieImage}" class="card-img-top" alt="...">
      <div class=card-body">
            <div class="my-content">
              <div class="my-cmtAt">${new Date(object.createdAt).toString().slice(0, 15)}</div>
              
              <p class="commentText my-title" style="color:black">${object.movieTitle}</p>
              <div class="modal-profile">
                <img class="cmtImg" width="50px" height="50px" src="${
                  object.profileImg
                }" alt="profileImg" />
                <p class="name_line">${
                  object.nickname ?? "닉네임 없음"
                }</p> 
              </div>
              <p class="commentText my-review-text" style="color:black">${object.review}</p>
              </div> 
              
            </div>
      </div>
  </div>`;
  const div = document.createElement('div');
  div.classList.add('main-cards');
  div.innerHTML = temp_html;
  commentList.appendChild(div);

};


export const closeMainReviewModal = () => {
  const reviewModal = document.querySelector('.main-review-modal');
  reviewModal.classList.remove('show');
};