const recordContainer = document.getElementById("jsRecordContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let mediaRecorder;
let recordedData;

const videoData = (event) => {
    recordedData = event.data;
}

const startRecord = () => {
    console.log(streamObject);
    mediaRecorder = new MediaRecorder(streamObject);
    mediaRecorder.ondataavailable = videoData;
    mediaRecorder.start();
    mediaRecorder.onstop = async () => {
        /*
        파일 저장하는 굉장히 중요한 부분.
         */
        const link = document.createElement('a');
        link.href = URL.createObjectURL(recordedData);
        link.download = "./recorded.webm";
        document.body.appendChild(link);
        link.click();
        //console.log(link);
        //document.querySelector("input[type=file]").value = link.href;
    };
};

const getVideo = async () => {
    try {
        // stop recording
        if (streamObject && mediaRecorder && mediaRecorder.state === "recording") {
            recordButton.innerText = "Start recording";
            videoPreview.pause();
            mediaRecorder.stop();
        }
        // start recording.
        else {
            streamObject = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 1280,
                    height: 720
                }
            });
            console.log(streamObject);
            videoPreview.srcObject = streamObject;
            videoPreview.play();
            videoPreview.muted = true;
            recordButton.innerText = "Stop recording";
            startRecord();
        }
    } catch (error) {
        console.log(error);
        recordButton.innerHTML = "Can't record.";
        recordButton.removeEventListener("click", getVideo);
    }
};

function init() {
    recordButton.addEventListener("click", getVideo);
}

if (recordContainer) {
    init();
}