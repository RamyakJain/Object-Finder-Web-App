status = "";
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    canvas.position(445,280);
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocoSSD', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_value = document.getElementById("input").value;
}
function modelLoaded(){
    console.log("CocoSSD Is Initialized");
    status= true;
}
function draw(){
    image(video, 0, 0, 380, 380);
}