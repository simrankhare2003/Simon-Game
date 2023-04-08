// alert("hi");
// $("h1").css("color" , "red");
var buttoncolors=["red","blue","green","yellow"];
var gamePattern = []
var userClickedPattern=[]
var level=0;
var started=false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    sound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        if(gamePattern.length==userClickedPattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            }, 1000);
            userClickedPattern=[];
        }
    }
    else
    {
        sound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over,Press Any Key To Restart");
        setTimeout(function()
        {
            $("body").removeClass("game-over")
        },200);
        startover();
    }
}

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("LEVEL " + level);
    var randomnumber=Math.random();
    randomnumber=randomnumber*4; //0-3.9999
    randomnumber=Math.floor(randomnumber); //0-3
    var randomChosenColor = buttoncolors[randomnumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    sound(randomChosenColor);
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function sound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function startover()
{
    level=0;
    gamePattern=[];
    started=false;
}