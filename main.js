status = '';

img = "";
object = [];

function preload() {
    img = loadImage('dog_cat.jpg');

}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(300,300);
    video.hide();
    
    
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status:Detecting Objects";

}
function modelLoaded() {
    console.log("modelLoaded");
    status =true;
    objectDetector.detect(video, gotResult);


}
function gotResult(error, results) {
    if (error) {
        console.log(error);

    }
    console.log(results);
    object = results;


}



function draw() {
    image(video, 0, 0,380,380);
    if (status != "") {
        r=random(255);
        g=random(255);
        b=random(255);

     objectDetector.detect(video,gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "status=objectDetected";
            document.getElementById("number_of_objects").innerHTML="number of object detected are:"+object.length;
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
    
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }



}

