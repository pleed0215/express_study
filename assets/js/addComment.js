import axios from "axios";

const formComment = document.getElementById("jsCommentForm");

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
            })
            .catch(function (error) {
                console.log(error);
            });
    });
}

if (formComment) {
    init();
}