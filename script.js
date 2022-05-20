const canvas =
{
    w: 800,
    h: 600,
    html: document.getElementById("canvas")
}

var p =
{
    x: canvas.w/2,
    y: canvas.h/2,
    w: 8,
    h: 8,
};

var bgColor = document.getElementById("bgColor");
var tileColor = document.getElementById("tileColor");
var shadowColor = document.getElementById("shadowColor");

var isBGDrawn = false;
var currCount = 0;
var maxCount = 1200;
var font = "14px Arial";
var isRunning = true;

const CTX = canvas.html.getContext("2d");

window.onload = function()
{
    canvas.html.setAttribute("width", canvas.w);
    canvas.html.setAttribute("height", canvas.h);
    loop(0);
}

function loop(time)
{
    if(isRunning)
    {
        update(time);
        draw();
    }

    requestAnimationFrame(loop);
}

function update(time)
{
    if(currCount <= maxCount)
    {
        movePoint();
        currCount++;
    }
}

function draw()
{
    if(!isBGDrawn)
    {
        clearBG();
        drawCanvasBG(bgColor.value);
        isBGDrawn = true;
    }
    if (currCount < maxCount)
    {
        drawPoint(tileColor.value);
    }
    else if(currCount === maxCount)
    {
        drawPoint("red");
    }
    else
    {
        p.x = canvas.w/2;
        p.y = canvas.h/2;
        drawPoint("green");
        isRunning = false;
    }
}

function clearBG()
{
    CTX.clearRect(0, 0, canvas.w, canvas.h);
}

function drawCanvasBG(fill)
{
    CTX.fillStyle = fill;
    CTX.fillRect(0, 0, canvas.w, canvas.h);
}

function drawPoint(fill)
{
    CTX.fillStyle = fill;
    CTX.shadowColor = shadowColor.value;
    if(currCount < maxCount)
    {
        CTX.shadowOffsetX = 2;
        CTX.shadowOffsetY = 2;
        CTX.shadowBlur = 15;
    }
    CTX.fillRect(p.x, p.y, p.w, p.h);

    CTX.shadowOffsetX = 0;
    CTX.shadowOffsetY = 0;
    CTX.shadowBlur = 0;
}

function getRandomDir()
{
    return Math.floor(Math.random() * 4);
}

function movePoint()
{
    var prevX = p.x;
    var prevY = p.y;

    switch (getRandomDir())
    {
        //up
        case 0:
            p.y -= p.h;
            break;
        //right
        case 1:
            p.x += p.w;
            break;
        //down
        case 2:
            p.y += p.h;
            break;
        //left
        case 3:
            p.x -= p.w;
            break
    }

    //skip every other "cell"
    if(prevX === p.x - p.w)
    {
        p.x += p.w;
    }
    if(prevX === p.x + p.w)
    {
        p.x -= p.w;
    }
    if(prevY === p.y - p.h)
    {
        p.y += p.h;
    }
    if(prevY === p.y + p.h)
    {
        p.y -= p.h;
    }

    //keep it in bounds
    if(p.x - p.w/2 <= 0 || p.x >= canvas.w + p.w/2)
    {
        p.x = prevX;
    }
    if(p.y + p.h/2 <= 0 || p.y >= canvas.h - p.h/2)
    {
        p.y = prevY;
    }
}

function reset()
{
    currCount = 0;
    maxCount = 1200;
    p.x = canvas.w/2;
    p.y = canvas.h/2;
    isRunning = true;
    isBGDrawn = false;
}