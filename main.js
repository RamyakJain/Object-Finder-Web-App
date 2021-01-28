status = "";
objects = [];
input_value = "";
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
    if (status != ""){
        objectDetector.detect(video,gotResult);
        for (i = 0; i < objects.length; i++){
            percentage = floor(objects[i].confidence * 100);
            result = objects[i].label;
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r,g,b);
            text(results+" "+percentage+"%",objects[i].x + 10, objects[i].y + 15);
            noFill();
            r2 = random(255);
            g2 = random(255);
            b2 = random(255);
            stroke(r2,g2,b2);
            rect(objects[i].width, objects[i].height,objects[i].x, objects[i].y);
            if(input_value == objects[i].label){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("yes_or_no").innerHTML = "Object Mentioned Is Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(input_value + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("yes_or_no").innerHTML = "Object Mentioned Not Found";
            }
        }
    }
}
function gotResult(results){
    if (results.length > 0){
        objects = results;
    }
}