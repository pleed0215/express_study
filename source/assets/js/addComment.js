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
        await axios.post(`/api/${videoId}/comment`, {
            comment: inputComment.value
        })
            .then(function (response) {
                console.log(response);
                const newLi = document.createElement("li");
                const newSpan = document.createElement("span");
                let numLi;
                newSpan.innerText = inputComment.value;
                newLi.appendChild(newSpan);
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