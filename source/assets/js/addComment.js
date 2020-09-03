import axios from "axios";

const formComment = document.getElementById("jsCommentForm");
const ulComment = document.getElementById("jsCommentUl");
const spanNumComments = document.getElementById("jsNumComments");

function init() {
  formComment.addEventListener("submit", async (event) => {
    const inputComment = document.querySelector("textarea");
    const videoId = window.location.href.split("/videos/")[1];
    event.preventDefault();
    /*const response = await axios({
            url: `/api/${videoId}/comment`,
            method: "post",
            data: {
                comment: inputComment.value
            }
        });*/
    await axios
      .post(`/api/${videoId}/comment`, {
        comment: inputComment.value,
      })
      .then(function (response) {
        console.log(response);
        let numLi;
        const newLi = document.createElement("li");
        const newSpanUser = document.createElement("span");
        const newSpanText = document.createElement("span");
        const newAvatar = document.createElement("div");
        const commentContent = document.createElement("div");

        commentContent.classList.add("comment__content");
        newAvatar.classList.add("avatarContainer");
        newAvatar.style.backgroundImage = `url('${response.data.creator.avatarUrl}')`;
        newAvatar.style.width = "30px";
        newAvatar.style.height = "30px";
        newLi.classList.add("comment__list");
        newSpanText.innerText = response.data.text;
        newSpanText.classList.add("comment__text");
        newSpanUser.innerText = response.data.creator.name;
        newSpanUser.classList.add("comment__user");

        commentContent.appendChild(newSpanUser);
        commentContent.appendChild(newSpanText);

        newLi.appendChild(newAvatar);
        newLi.appendChild(commentContent);
        ulComment.prepend(newLi);
        numLi = ulComment.childElementCount;
        spanNumComments.innerText = `${numLi} comment${numLi > 1 ? "s" : ""}`;
        inputComment.value = "";
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

if (formComment) {
  init();
}