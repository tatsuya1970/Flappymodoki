// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&


class Pipe {
  constructor() {
    //this.spacing = 175;
    this.spacing = 220;

    console.log("height",height);

    // this.top = random(height / 6, (3 / 4) * height);
    this.top = random(height / 10, (1 / 2) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 6;

    this.highlight = false;

    this.hits = function (bird) {
      if (bird.y < this.top || bird.y > height - this.bottom) {
        if (bird.x > this.x && bird.x < this.x + this.w) {
          this.highlight = true;
          return true;
        }
      }
      if (bird.x > this.x + this.w) {
        if (scoreFlag == 1){
        score = score +1;
        scoreFlag = 0;
        debug_document = document.getElementById("score");
        debug_document.innerHTML = "SCORE: "+String(score);
        }
        
      }

      this.highlight = false;
      return false;
    };

    this.show = function () {
      fill(255);
      if (this.highlight) {
        fill(255, 0, 0);
        gameStatus = 0;
        textSize(50);
        text("Game Over", this.x+100, 0);

        if (score > hiscore){
          fill(255);
          text("HI SCORE!!!", this.x+120, 100);
          hiscore = score;
          debug_document = document.getElementById("hiscore");
          debug_document.innerHTML = "HI SCORE: "+String(hiscore);
        }
       
      }
      rect(this.x, 0, this.w, this.top);
      rect(this.x, height - this.bottom, this.w, this.bottom);
      
    };

    this.update = function () {
      this.x -= this.speed;
    };

    this.offscreen = function () {
      if (this.x < -this.w) {
        scoreFlag = 1;
        return true;
      }
      else {
        return false;
      }
    };
  }
}
