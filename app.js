// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var ImgArr=[];
// Define constants
const cameraView = document.querySelector("#camera--view"),
cameraOutput = document.querySelector("#camera--output"),
cameraSensor = document.querySelector("#camera--sensor"),
cameraTrigger = document.querySelector("#camera--trigger")
popTrigger = document.querySelector("#instore--trigger")
//wechatTrigger = document.querySelector("#wechat--trigger")


// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
       
          track = stream.getTracks()[0];
          cameraView.srcObject = stream;
          })
    .catch(function(error) {
           console.error("Oops. Something is broken.", error);
           });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    console.log("test ",cameraOutput.src);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    ImgArr.push(cameraOutput.src);
    imageUpload(cameraOutput.src);
    galleryview();
    console.log(ImgArr[0]);
};
popTrigger.onclick = function(){
 
    document.getElementById("popid").style.display="block";
}
function imageUpload(dataURI){
    var Blob=dataURItoBlob(dataURI);
// var fd = new FormData(document.forms[0]);
// var xhr = new XMLHttpRequest();

// fd.append("myFile", Blob);
// xhr.open('POST', "http://40.117.87.175:8080/GenesisV1/uploadFileNew", true);
// xhr.send(fd);
var data = new FormData();
data.append("file", Blob);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
    alert(this.responseText);
  }
});

xhr.open("POST", "http://40.117.87.175:8080/GenesisV1/uploadFileNew");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "ae0512b6-99c4-b001-e8c8-5d81c07746f8");

xhr.send(data);
}

function galleryview(){
    for(i=0;i<=ImgArr.length;i++){
        var element = document.createElement("img");
        document.getElementById("gallery").appendChild(element);
        element.src = ImgArr[i];
    }
}
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

// Take a picture when cameraTrigger is tapped
// wechatTrigger.onclick = function() {
// console.log("wechat console");
// <a href="instagram://user?username=di.vya2280">Link to Instagram Profile</a>
//<div>
// <a href="instagram://user?username=Divya">Link to Instagram Profile</a>
//<a href="http://instagram.com/_u/Divya/">visit our instagram page</a>
// </div>
//};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

// https://www.instagram.com/di.vya2280/