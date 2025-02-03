function nextStage(stageNumber) {
  // Hide all stages
  document.querySelectorAll(".stage").forEach((stage) => {
    stage.classList.remove("active");
  });

  // Show the next stage
  document.getElementById(`stage-${stageNumber}`).classList.add("active");
}

function showResponseButtons() {
  document.getElementById("response-buttons").classList.remove("hidden");
}

function respond(answer) {
  const responseMessage = document.getElementById("response-message");
  if (answer === "yes") {
    responseMessage.textContent = "Yay! You've made me the happiest person! 💖";
  } else {
    responseMessage.textContent =
      "Aww, that's okay. I'll always admire you! 😊";
  }
}
