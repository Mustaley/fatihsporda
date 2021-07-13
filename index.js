document.addEventListener("DOMContentLoaded", function () {
    
    document.addEventListener("click", clikHandle);
    document.addEventListener("keydown", handleShort);
    document.addEventListener("visibilitychange", onchange);

    let isStarted = false;
    let isRunning = false;
    let clickXtimes = 0;
    const runnerAssets = [".\\static\\fatih\\1.png", ".\\static\\fatih\\2.png", ".\\static\\fatih\\3.png"];
    let curIndex = 0;
    const runnerElement = document.getElementById("runner");
    let padCount = { left: -.045 , right: 2.25  };
    const runningGround = document.getElementById("runningground");
    const scoreboard = document.getElementById("scoreboard");
    const clickcounter = document.getElementById("clickcounter");
    let isFinished;
    let leapsed = 0;

    function onchange(e) {
        if (document.hidden && isRunning) {
            isRunning = false;
        } else {
            isRunning = true;
        }
    }

    function handleShort(e){
        if (e.key == "r") {
            location.reload();
        }
        else if (e.key == "p") {
            ns = !isRunning
            isRunning = ns;
        }
    }

    function clikHandle(e) {
        ++clickXtimes;
        if(!isStarted) {
            isStarted = true;
            isRunning = true;
        }
        else if (!isRunning){
            isRunning = true;
        }
        else if (!isFinished){
            padFatih(padCount.right)
            runnerElement.src = cycleFatih();
        }
    };

    function cycleFatih() {
        ++curIndex
        if (curIndex == runnerAssets.length) {
            curIndex = 0;
            return runnerAssets[0];
        }
        return runnerAssets[curIndex]
    }

    function padFatih(pc){
        let curPad = runnerElement.style.paddingLeft.slice(0, -2);
        runnerElement.style.paddingLeft = `${parseFloat(curPad) + pc}px`;
    }

    function appLoop(){
        // game logic - kills game process
        if (isFinished){
            document.getElementById('game-state').style.display = "block";
            isRunning = false;
        }
        // do task while running
        else if (isRunning){
            isFinished = parseInt(runnerElement.style.paddingLeft.slice(0, -2)) < 5.0
            leapsed += 1
            padFatih(padCount.left);
            scoreboard.innerHTML = (leapsed * 5) / 1000 + 'sec';
            clickcounter.innerHTML = clickXtimes + ' clicked times so far';
        }
        // do task on start
        else if(!isStarted){
            runnerElement.style.paddingLeft = `${runningGround.offsetWidth - 275}px`;
        }
    }
    
    setInterval(appLoop, 5);
});
