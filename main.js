var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext('2d');

var wheelSize = 250;
var wheelRatio = 0.3;
var angleDiff = 90;
var amount = 30;
var speed = 5;
c.lineWidth = 2;

function get(x)
{
  return document.getElementById(x);
}

class Line
{
  constructor(angle,color)
  {
    this.angle1 = angle;
    this.angle2 = angle+angleDiff;
    this.color = color;
  }

  update()
  {
    this.angle1+=speed/10;
    this.angle2=this.angle1+angleDiff;
    this.x1 = Math.cos(this.angle1/180*Math.PI)*wheelSize+innerWidth/2;
    this.y1 = Math.sin(this.angle1/180*Math.PI)*wheelSize*wheelRatio-wheelSize*wheelRatio;
    this.x2 = Math.cos(this.angle2/180*Math.PI)*wheelSize+innerWidth/2;
    this.y2 = Math.sin(this.angle2/180*Math.PI)*wheelSize*wheelRatio+innerHeight+wheelSize*wheelRatio;
  }

  draw()
  {
    c.beginPath();
    c.moveTo(this.x1,this.y1);
    c.lineTo(this.x2,this.y2);
    c.strokeStyle = this.color;
    c.stroke();
  }
}

var reading = false;
get("settings").addEventListener('mouseup',function(){reading = false;});
get("settings").addEventListener('mousedown',function(){reading = true;});

function addRadioListener(x)
{
  get(x).addEventListener('mousemove',function()
  {
    if(reading)
    {
      if(x=="lineWidth")
      {
        c.lineWidth = parseInt(get(x).value);
      }
      window[x] = parseInt(get(x).value);
      if(x=="amount")
      {
        lines = [];
        for(let i=0;i<360;i+=360/amount)
        {
          lines.push(new Line(i,"hsl("+i+",100%,50%)"));
        }
      }
    }
  });
}

addRadioListener("wheelSize");
addRadioListener("angleDiff");
addRadioListener("amount");
addRadioListener("speed");
addRadioListener("lineWidth");

var lines = [];
for(let i=0;i<360;i+=360/amount)
{
  lines.push(new Line(i,"hsl("+i+",100%,50%)"));
}

function animate()
{
  c.fillStyle = "#111111";
  c.fillRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<lines.length;i++)
  {
    lines[i].update();
    lines[i].draw();
  }
  window.requestAnimationFrame(animate);
}
animate();
