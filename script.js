const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const botResult = document.querySelector(".bot_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");
const userScoreEl = document.getElementById("user-score");
const botScoreEl = document.getElementById("bot-score");
const drawScoreEl = document.getElementById("draw-score");

let userScore = 0;
let botScore = 0;
let drawScore = 0;

function updateScoreDisplay() {
  userScoreEl.textContent = userScore;
  botScoreEl.textContent = botScore;
  drawScoreEl.textContent = drawScore;
}

// Define possible images and outcomes
const botImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
const outcomes = {
  RR: "Draw",
  RP: "BOT",
  RS: "YOU",
  PP: "Draw",
  PR: "YOU",
  PS: "BOT",
  SS: "Draw",
  SR: "BOT",
  SP: "YOU"
};
updateScoreDisplay();

// Event handler for image click
function handleOptionClick(event) {
  const clickedImage = event.currentTarget;
  const clickedIndex = Array.from(optionImages).indexOf(clickedImage);
  // Reset results and display "Wait..."
  userResult.src = botResult.src = "images/rock.png";
  result.textContent = "Wait...";
  // Activate clicked image and deactivate others
  optionImages.forEach((image, index) => {
    image.classList.toggle("active", index === clickedIndex);
  });
  gameContainer.classList.add("start");
  setTimeout(() => {
    gameContainer.classList.remove("start");
    // Set user and bot images
    const userImageSrc = clickedImage.querySelector("img").src;
    userResult.src = userImageSrc;
    const randomNumber = Math.floor(Math.random() * botImages.length);
    const botImageSrc = botImages[randomNumber];
    botResult.src = botImageSrc;
    // Determine the result
    const userValue = ["R", "P", "S"][clickedIndex];
    const botValue = ["R", "P", "S"][randomNumber];
    const outcomeKey = userValue + botValue;
    const outcome = outcomes[outcomeKey] || "Unknown";

    if (outcome === "YOU") {
      userScore += 1;
    } else if (outcome === "BOT") {
      botScore += 1;
    } else {
      drawScore += 1;
    }

    updateScoreDisplay();

    // Display the result
    result.textContent = outcome === "Draw" ? "Match Draw" : `${outcome} WON!`;
  }, 2500);
}
// Attach event listeners to option images
optionImages.forEach(image => {
  image.addEventListener("click", handleOptionClick);
});