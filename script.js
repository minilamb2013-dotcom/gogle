// [] - create a list
// {} - create a dictionary that stores data in key-value pairs
const database = [
    {
        question : "What is the capital of Japan?",
        options : ["Osaka", "Nagasaki", "Tokyo", "Sapporo"],
        answer : "Tokyo"
    },

    {
        question : "When was Minecraft officially released?",
        options : ["2008", "2009", "2010", "2011"],
        answer : "2011"
    },

    {
        question : "when you are knocking out someone with a weapon where should you hit?",
        options : ["leg", "back", "neck", "head"],
        answer : "head"
    },

    {
        question : "when was monkeys put in the saubidi zoo?",
        options : ["2008", "2009", "2010", "2011"],
        answer : "2009"
    },

    {
        question : "When was roblox officially released?",
        options : ["2005", "2006", "2007", "2008"],
        answer : "2006"
    },
]


const startButton = document.getElementById("start-btn")
const timerText = document.getElementById("timer-text")
const questionLabel = document.getElementById("question")
const optionBox = document.getElementById("option-box")
const ProgressBarFill = document.getElementById("fill")
const ScoreLabel = document.getElementById("score-label")
const FeedbackLabel = document.getElementById("feedback-label")

const dropdown = document.getElementById("bgm")
const musicbtn = document.getElementById("music")
let currentsong = null
let ismusicplaying = false
musicbtn.textContent = "music off"

dropdown.addEventListener("change", () => {
    let SelectedSong = dropdown.value

    //stop and reset peverious song if any
    if(currentsong)
    {
        currentsong.pause()
        currentsong.currentTime = 0
    }
    currentsong = new Audio(SelectedSong)
    currentsong.loop = true
    currentsong.volume = 0.2
    currentsong.play()
    ismusicplaying = true
    musicbtn.textcontext = "music on"
})



musicbtn.addEventListener("click", () => {
    if(ismusicplaying)
    {
        currentsong.pause()
        musicbtn.textContent = "music off"
        ismusicplaying = false
    }
    {
        currentsong.play()
        musicbtn.textContent = "music on"
        ismusicplaying = true
    }
})
    





let questionNumber = 0
let score = 0

startButton.addEventListener("click", StartQuiz)

function StartQuiz()
{
    startButton.style.display = 'none'
    FeedbackLabel.textContent = ""
    LoadQuestion()
}

function LoadQuestion()
{
    if(questionNumber < database.length)
    {
        // reset the timer
        timerText.textContent = 15

        FeedbackLabel.textContent = ""

        // update progress bar
        ProgressBarFill.style.width = `${ ( (questionNumber + 1) / database.length ) * 100 }%`

        // load a question from database
        const currentQuestionSet = database[questionNumber]
        questionLabel.textContent = currentQuestionSet.question


        // remove previos option buttons
        optionBox.innerHTML = '';

        // build 4 option buttons
        currentQuestionSet.options.forEach((item) => {
            const button = document.createElement('button')
            button.textContent = item;
            button.classList.add('option-btn')
            optionBox.appendChild(button)

            button.addEventListener('click', () => {
                disableAllOptionButtons()
                CheckAnswer(item)
            })
        })
        

        // turn on the timer
        timer = setInterval(() => {
            // reduce timer text by 1
            timerText.textContent = parseInt(timerText.textContent) - 1
            
            const redValue = Math.random() * 255
            const greenValue = Math.random() * 255
            const blueValue = Math.random() * 255
            timerText.style.color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

            // check if the time has run out
            if(parseInt(timerText.textContent) === 0)
            {
                disableAllOptionButtons()
                CheckAnswer(null)
            }
        }, 1000)
    } else 
    {
        EndQuiz()
    }
}
   



function disableAllOptionButtons()
{
    const AllOptionButtons = document.querySelectorAll('.option-btn')

    AllOptionButtons.forEach(button => {
        button.disabled = true
    })
}


function CheckAnswer(item)
{
    clearInterval(timer)

    // identify the actual answer key
    const answer = database[questionNumber].answer;

    if(item === answer)
    {
        score = score + 1
        FeedbackLabel.textContent = "That's correct! Good job!"
    } else if (item === null)
    {
        FeedbackLabel.textContent = "Time's up. You slow..."
    } else
    {
        FeedbackLabel.textContent = "hahaha... your iq has just reached a milestone of -1 iq..."
    }

    ScoreLabel.textContent = `You scored ${score} point(s)`

    setTimeout(() => {
        questionNumber = questionNumber + 1
        LoadQuestion()
    }, 2000);
}


function EndQuiz()
{
    clearInterval(timer) // reset timer
    questionLabel.textContent = "Hooray!  Quiz has ended!"
    optionBox.style.display = 'none';

    if(score >= 3)
    {   
        FeedbackLabel.textContent = "🏁 👏👏👏👏👏 🏁"
        timerText.textContent = "👍"
    } else
    {
        FeedbackLabel.textContent = "Did you even try?"
        timerText.textContent = "👎"
    }
}







