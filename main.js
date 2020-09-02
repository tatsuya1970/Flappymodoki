// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

let bird;
let pipes = [];
let score;
let scoreFlag;
let hiscore = 0;
let gameStatus = 0;
let loading;
const imageModelURL = 'https://teachablemachine.withgoogle.com/models/udstQuj_S/';

addEventListener("keydown", keydownfunc);
 
function keydownfunc( event ) {
  if (gameStatus == 0) {
  gameStart();

  }

}


function setup() {

  let canvas = createCanvas(640, 480);
  canvas.parent('GameScreen');
  background(0);

  fill(255);
  textSize(50);
  text("握力 FlappyBird", 150, 200);
  textSize(30);
  text("Push Any Key", 230, 270);
 
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
  const video = document.getElementById('video');
  // 自作モデルのロード
  classifier = ml5.imageClassifier(
    imageModelURL + 'model.json',
    video,
    modelLoaded
  );

  // モデルのロード完了時に実行される
  function modelLoaded() {
    console.log('Model Loaded!');
  }
}


function draw() {

  if (gameStatus == 1){
    background(0);

    if (loading == 1){
      fill(255,0,0);
      textSize(30);
      text("Now Loading...", 200, 200);
    }
  
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      if (pipes[i].hits(bird)) {
        console.log('HIT');
        fill(255,0,0);
        textSize(50);
        text("Game Over", 200, 200);
        textSize(30);
        text("Push Any Key", 230, 270);
    　}
    　if (pipes[i].offscreen()) {
      　pipes.splice(i, 1);
    　}    
  　}

 　 AIclassify();  //グーかパーか判定
  　bird.update();
  　bird.show();
  　if (frameCount % 95 == 0) {
    　pipes.push(new Pipe());
  　} 
　}
}

function gameStart(){

  loading = 1;
　gameStatus = 1;
　bird = new Bird();
　pipes.length = 0;
  score = 0;
  scoreFlag = 1;
  debug_document = document.getElementById("score");
  debug_document.innerHTML = "SCORE: "+String(score);
  debug_document = document.getElementById("hiscore");
  debug_document.innerHTML = "HI SCORE: "+String(hiscore);

}


async function AIclassify() {
    
  classifier.classify(onDetect);
  
  function onDetect(err, results) {
    console.log(results);
    
    if (results[0]) {
      if (loading == 1){
        loading = 0;      
      }
      console.log(results[0].label);
      debug_document = document.getElementById("hand");
      debug_document.innerHTML = String(results[0].label);

      if (results[0].label == "グー"){
        bird.up();
      }
           
   }
     
  }
}
