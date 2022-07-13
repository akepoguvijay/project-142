rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;

game_status = "";

function preload() 
{

}
  
function setup()
{
  canvas =  createCanvas(700,600);
  canvas.parent('canvas');
  video = createCapture(VIDEO);
  video.size(700, 600);
  video.hide();
  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() 
{
  console.log('PoseNet Is Initialized');
}

function draw()
{
  image(video,0,0,700,600);

  if(scoreRightWrist > 0.2)
  {
    fill("red");
    stroke("red");
    circle(rightWristX, rightWristY, 20);
  }

  if(game_status == "start")
  {
  document.getElementById("status").innerHTML = "Game Is Loaded";
  }  
}


function gotPoses(results)
{
  if(results.length > 0)
  {

    rightWristY = results[0].pose.rightWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    console.log(scoreRightWrist);
  }
}


function startGame()
{
  game_status = "start";
  document.getElementById("status").innerHTML = "Game Is Loading";
}


