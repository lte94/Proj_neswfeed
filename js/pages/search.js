import {
    doc, 
    collection,
    query,
    getDocs,
    where,
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
  import { dbService }  from "../firebase.js";

export const searchBar = async (event) => {
    let searchInput = document.getElementById("inputSearch").value;
    let objectList = [];
    const q = query(
      collection(dbService, "reviews"),
      where("movieTitle", "==", searchInput)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      objectList.push(obj);
    });
    console.log(objectList);
    let filteredList = document.getElementById("listOn");
    filteredList.innerHTML = "";
    objectList.forEach((cmtObj) => {
        // 전체 리스트 모달창과 동일한 temp_html
      let temp_html =
      `<div id = "${cmtObj.id}" class ="search-card-body">
          <img src="${cmtObj.movieImage}" class="card-img-top" alt="...">
          <div class=card-body">
                <div class="my-content">
                  <div class="my-cmtAt">${new Date(cmtObj.createdAt).toString().slice(0, 15)}</div>
                  <p class="commentText my-title" style="color:black">${cmtObj.movieTitle}</p>
                  <p class="commentText my-review-text" style="color:black">${cmtObj.review}</p>
                  </div> 
                </div>
          </div>
      </div>`;
      const div = document.createElement("div");
      div.classList.add('search-cards');
      div.innerHTML = temp_html;
      filteredList.appendChild(div);
    });
  };