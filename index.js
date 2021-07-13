document.addEventListener("DOMContentLoaded", function () {
    
    document.addEventListener("click", clikHandle);
    document.addEventListener("keydown", handleShort);
    document.addEventListener("visibilitychange", onchange);

    let isStarted = false;
    let isRunning = false;
    // let startTime;
    let clickXtimes = 0;
    const runnerAssets = [".\\static\\fatih\\1.png", ".\\static\\fatih\\2.png", ".\\static\\fatih\\3.png"];
    let curIndex = 0;
    const runnerElement = document.getElementById("runner");
    let padCount = { left: -0.05 , right: 2.5  };
    const runningGround = document.getElementById("runningground");
    const scoreboard = document.getElementById("scoreboard");
    const clickcounter = document.getElementById("clickcounter");

    function onchange(e) {
        if (document.hidden && isRunning) {
            isRunning = false;
        } else {
            console.log('well back');
        }
    }

    function handleShort(e){
        if (e.key == "r") {
            location.reload();
            // endGame();
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
            // startTime = new Date().valueOf();
        }
        else if (!isRunning){
            isRunning = true;
        }
        else if (runnerElement.style.paddingLeft < 0 || true ){
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
        // broken condition
        // if (parseInt(curPad + 296 )> document.body.clientWidth) {
        //     console.log("out of side");
        //     return false;
        // }
        // return true;
    }
    let leapsed = 0;
    function appLoop(){
        // let curPad = runnerElement.style.paddingLeft.slice(0, -2);
        // let runnerRect = runnerElement.offsetLeft;
        // console.log(groundRect.right, runnerRect.right);
        // console.log(runnerElement.offsetWidth , runningGround.offsetWidth);
        let now = new Date().valueOf();

        // game logic kills game process
        if (runnerElement.style.paddingLeft == '20px'){
            console.log("Game Ended")
            isRunning = false;
        }
        // do task while running
        else if (isRunning){
            // freq = (clickXtimes / (now - startTime)) * 1000;
            leapsed += 1
            padFatih(padCount.left);
            // scoreboard.innerHTML = (now - startTime) / 1000 + 'sec';
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
