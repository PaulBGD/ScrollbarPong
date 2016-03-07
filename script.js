(function() {

var paddle = document.getElementById('paddle');
var ball = document.getElementById('ball');

var height;
var width;

var changeXAdd;
var changeYAdd;

var totalHeight;
var otherPaddleHeight;

function recalculateHeight() {
    height = window.innerHeight;
    width = window.innerWidth;

    changeXAdd = width / 1920;
    changeYAdd = height / 1080;

    totalHeight = window.innerHeight * 5;
    otherPaddleHeight = window.innerHeight / 5;
    document.body.style.height = totalHeight + 'px';
}
recalculateHeight();
window.addEventListener('resize', recalculateHeight);

var startTime = Date.now();

var changeX = 1;
var changeY = 1;

var speed = 4;

var ballX = 15;
var ballY = 0;

function draw() {
    ball.style.transform = 'translate(' + ballX + 'px, ' + ballY + 'px)';
    paddle.style.transform = 'translate(10px, ' + ballY + 'px)';

    requestAnimationFrame(draw);
}
draw();

setInterval(function tick() {
    ballX += changeX + ((changeX < 0 ? -changeXAdd : changeXAdd) * speed);
    ballY += changeY + ((changeY < 0 ? -changeYAdd : changeYAdd) * speed);

    if (ballX + 40 > width) {
        // check if touching, otherwise he dropped it
        var start = ((window.scrollY + 1) / totalHeight) * height - (height / 10);
        var end = start + (height / 2.5);
        if (ballY > start && ballY < end) {
            changeX = -changeX;
            speed++;
        } else {
            // reset
            startTime = Date.now();
            changeX = 1;
            changeY = 1;
            speed = 4;
            ballX = 15;
            ballY = 0;
        }
    } else if (ballX < 15) {
        changeX = -changeX;
    }
    if (ballY + 40 > height) {
        changeY = -changeY;
    } else if (ballY < 0) {
        changeY = -changeY;
    }
}, 1000 / 60);

})();
