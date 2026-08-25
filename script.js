const SUPABASE_URL = "https://rbcgxbzanwwiqhwpiqie.supabase.co";
const SUPABASE_KEY = "sb_publishable_lAfG4lEaeLbRlUvmphKzzQ_cZYDuImm";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const sceneImages = [
    "images/scene1.png",
    "images/scene2.png",
    "images/scene3.png",
    "images/scene4.png",
    "images/scene5.png"
];

function preloadScenes() {
    return Promise.all(
        sceneImages.map(src => {
            return new Promise((resolve, reject) => {
                const image = new Image();

                image.onload = resolve;
                image.onerror = reject;

                image.src = src;
            });
        })
    );
}

let answers = {};

const condition = Math.random() < 0.5 ? "neutral" : "leading";

console.log("Condition:", condition);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [array[i], array[randomIndex]] =
            [array[randomIndex], array[i]];
    }

    return array;
}

const beginButton = document.getElementById("begin-button");

beginButton.disabled = true;
beginButton.textContent = "LOADING EXPERIMENT...";

preloadScenes()
    .then(function () {
        beginButton.disabled = false;
        beginButton.textContent = "BEGIN EXPERIMENT";
    })
    .catch(function (error) {
        console.error("Error loading scene images:", error);
        beginButton.textContent = "ERROR LOADING EXPERIMENT";
    });

beginButton.addEventListener("click", function () {
    
	document.querySelector(".intro-screen").innerHTML = `
		<h2>The experiment will begin shortly.</h2>
		<p id="countdown">3</p>
	`;

	const countdown = document.getElementById("countdown");

	setTimeout(function () {
		countdown.textContent = "2";
	}, 1000);

	setTimeout(function () {
		countdown.textContent = "1";
	}, 2000);

	setTimeout(function () {
		showScene1();
	}, 3000);
});

function showScene1() {
	document.querySelector(".intro-screen").innerHTML = `<img src="images/scene1.png" class="scene-image">`;
	setTimeout(showScene2, 3000);
}

function showScene2() {
	document.querySelector(".intro-screen").innerHTML = `<img src="images/scene2.png" class="scene-image">`;
	setTimeout(showScene3, 3000);
}

function showScene3() {
	document.querySelector(".intro-screen").innerHTML = `<img src="images/scene3.png" class="scene-image">`;
	setTimeout(showScene4, 3000);
}

function showScene4() {
	document.querySelector(".intro-screen").innerHTML = `<img src="images/scene4.png" class="scene-image">`;
	setTimeout(showScene5, 3000);
}

function showScene5() {
	document.querySelector(".intro-screen").innerHTML = `<img src="images/scene5.png" class="scene-image">`;
	setTimeout(endIncident, 3000);
}

function endIncident() {
	document.querySelector(".intro-screen").innerHTML = `
		<h2>The event is over.</h2>
		<p>You will now be asked a series of questions about what you witnessed.</p>
		<button id="continue-button">CONTINUE</button>
	`;
	document.getElementById("continue-button").addEventListener("click", showQuestion1);
}

function showQuestion1() {
    const options = shuffleArray([
        "Black",
        "Gray",
        "Blue",
        "Brown"
    ]);

    document.querySelector(".intro-screen").innerHTML = `
        <div class="question-container">

            <p class="question-number">QUESTION 1 OF 6</p>

            <h2>What color was the perpetrator's jacket?</h2>

            ${options.map(option => `
                <button
                    class="answer-button"
                    onclick="saveAnswer1('${option}')"
                >
                    ${option}
                </button>
            `).join("")}

        </div>
    `;
}

function saveAnswer1(answer) {
	answers.question1 = answer;
	showQuestion2();
}

function showQuestion2() {

    const questionText = condition === "neutral"
        ? "How clearly do you remember the object taken from the counter?"
        : "How clearly do you remember the phone taken from the counter?";

    const options = shuffleArray([
        "Very clearly",
        "Somewhat clearly",
        "Not very clearly",
        "Not at all"
    ]);

    document.querySelector(".intro-screen").innerHTML = `
        <div class="question-container">

            <p class="question-number">QUESTION 2 OF 6</p>

            <h2>${questionText}</h2>

            ${options.map(option => `
                <button
                    class="answer-button"
                    onclick="saveAnswer2('${option}')"
                >
                    ${option}
                </button>
            `).join("")}

        </div>
    `;
}

function saveAnswer2(answer) {
	answers.question2 = answer;
	answers.condition = condition;
	showQuestion3();
}

function showQuestion3() {
    const options = shuffleArray([
        "Red",
        "Blue",
        "Black",
        "White"
    ]);

    document.querySelector(".intro-screen").innerHTML = `
        <div class="question-container">

            <p class="question-number">QUESTION 3 OF 6</p>

            <h2>What color shirt was the cashier wearing?</h2>

            ${options.map(option => `
                <button
                    class="answer-button"
                    onclick="saveAnswer3('${option}')"
                >
                    ${option}
                </button>
            `).join("")}

        </div>
    `;
}

function saveAnswer3(answer) {
	answers.question3 = answer;
	showQuestion4();
}

function showQuestion4() {
    const options = shuffleArray([
        "Near the drink coolers",
        "Near the register",
        "Near the entrance",
        "Outside the store"
    ]);

    document.querySelector(".intro-screen").innerHTML = `
        <div class="question-container">

            <p class="question-number">QUESTION 4 OF 6</p>

            <h2>Where was the bystander customer located?</h2>

            ${options.map(option => `
                <button
                    class="answer-button"
                    onclick="saveAnswer4('${option}')"
                >
                    ${option}
                </button>
            `).join("")}

        </div>
    `;
}

function saveAnswer4(answer) {
    answers.question4 = answer;
    showQuestion5();
}

function showQuestion5() {
    const options = shuffleArray([
        "Yes",
        "No",
        "I'm not sure"
    ]);

    document.querySelector(".intro-screen").innerHTML = `
        <div class="question-container">

            <p class="question-number">QUESTION 5 OF 6</p>

            <h2>Was the perpetrator wearing a hat?</h2>

            ${options.map(option => `
                <button
                    class="answer-button"
                    onclick="saveAnswer5('${option}')"
                >
                    ${option}
                </button>
            `).join("")}

        </div>
    `;
}

function saveAnswer5(answer) {
	answers.question5 = answer;
	showQuestion6();
}

function showQuestion6() {
    const options = shuffleArray([
        "Phone",
        "Wallet",
        "Cash",
        "Keys",
        "I don't remember"
    ]);

    document.querySelector(".intro-screen").innerHTML = `
        <div class="question-container">

            <p class="question-number">QUESTION 6 OF 6</p>

            <h2>What item do you remember being taken from the counter?</h2>

            ${options.map(option => `
                <button
                    class="answer-button"
                    onclick="saveAnswer6('${option}')"
                >
                    ${option}
                </button>
            `).join("")}

        </div>
    `;
}

function saveAnswer6(answer) {
    answers.question6 = answer;
    showConfidenceQuestion();
}

function showConfidenceQuestion() {
    document.querySelector(".intro-screen").innerHTML = `
        <div class="question-container">

            <p class="question-number">CONFIDENCE RATING</p>

            <h2>
                How confident are you that your answer about the stolen item was correct?
            </h2>

            <input
                type="range"
                id="confidence-slider"
                min="0"
                max="100"
                value="50"
            >

            <p id="confidence-value">50%</p>

            <button id="confidence-submit">
                SUBMIT
            </button>

        </div>
    `;

    const slider = document.getElementById("confidence-slider");
    const valueDisplay = document.getElementById("confidence-value");

    slider.addEventListener("input", function () {
        valueDisplay.textContent = slider.value + "%";
    });

    document
        .getElementById("confidence-submit")
        .addEventListener("click", saveConfidence);
}

function saveConfidence() {
    const slider = document.getElementById("confidence-slider");

    answers.confidence = Number(slider.value);

    showResults();
}

function showResults() {

    let score = 0;

    if (answers.question1 === "Black") {
        score++;
    }

    if (answers.question3 === "Red") {
        score++;
    }

    if (answers.question4 === "Near the drink coolers") {
        score++;
    }

    if (answers.question5 === "No") {
        score++;
    }

    if (answers.question6 === "Phone") {
        score++;
    }

    const percentage = (score / 5) * 100;
    saveResponseToDatabase(score);
    document.querySelector(".intro-screen").innerHTML = `
        <div class="question-container">

            <p class="question-number">MEMORY RESULTS</p>

            <h2>${score} / 5 Correct</h2>

            <p class="result-score">
                ${percentage}% Memory Accuracy
            </p>

            <button id="reveal-button">
                REVEAL EXPERIMENT
            </button>

        </div>
    `;

    document
        .getElementById("reveal-button")
        .addEventListener("click", showExperimentReveal);
}

function showExperimentReveal() {
	const conditionTitle = condition === "neutral" ? "NEUTRAL CONDITION" : "LEADING CONDITION";
	const conditionExplanation = condition === "neutral"
		? `You were asked how clearly you remembered "the object" taken from the counter. The question did not tell you what that object was.`
		: `You were asked how clearly you remembered "the phone" taken from the counter. Unlike the neutral question, this wording identified the object before you were later asked to recall it.`;

	document.querySelector(".intro-screen").innerHTML = `
		<div class="question-container">
			<p class="question-number">EXPERIMENT 01</p>
			<h2>${conditionTitle}</h2>
			<p class="explanation">${conditionExplanation}</p>
			<h3>Why does this matter?</h3>
			<p class="explanation">Eyewitness memory is reconstructive rather than a perfect recording of an event. The wording of questions can provide information that may influence how an eyewitness later remembers an event.</p>
			<button id="results-button">
                VIEW LIVE RESULTS
            </button>

			<button id="restart-button">
				TRY ANOTHER CONDITION
			</button>
		</div>
	`;

    document
    .getElementById("results-button")
    .addEventListener("click", showLiveResults);

	document.getElementById("restart-button").addEventListener("click", function () {
		location.reload();
	});
}

async function saveResponseToDatabase(score) {

    const { data, error } = await supabaseClient
        .from("responses")
        .insert([
            {
                condition: condition,
                question1: answers.question1,
                question2: answers.question2,
                question3: answers.question3,
                question4: answers.question4,
                question5: answers.question5,
                question6: answers.question6,
                confidence: answers.confidence,
                score: score
            }
        ]);

    if (error) {
        console.error("Error saving response:", error);
    } else {
        console.log("Response saved successfully!");
    }
}

async function showLiveResults() {

    document.querySelector(".intro-screen").innerHTML = `
        <div class="question-container">
            <p class="question-number">EXPERIMENT 01</p>
            <h2>Loading live results...</h2>
        </div>
    `;

    const { data, error } = await supabaseClient
        .rpc("get_recall_stats");

    if (error) {
        console.error("Error loading results:", error);

        document.querySelector(".intro-screen").innerHTML = `
            <div class="question-container">
                <p class="question-number">EXPERIMENT 01</p>
                <h2>Unable to load results.</h2>
                <button onclick="location.reload()">RETURN HOME</button>
            </div>
        `;

        return;
    }

    const stats = data[0];

    const neutralRate =
        stats.neutral_phone_rate === null
            ? "—"
            : stats.neutral_phone_rate + "%";

    const leadingRate =
        stats.leading_phone_rate === null
            ? "—"
            : stats.leading_phone_rate + "%";

    const averageConfidence =
        stats.avg_confidence === null
            ? "—"
            : stats.avg_confidence + "%";

    const correctConfidence =
        stats.correct_avg_confidence === null
            ? "—"
            : stats.correct_avg_confidence + "%";

    const incorrectConfidence =
        stats.incorrect_avg_confidence === null
            ? "—"
            : stats.incorrect_avg_confidence + "%";

    let sampleNotice = "";

    if (stats.total_participants < 10) {
        sampleNotice = `
            <p class="sample-warning">
                Early sample — these results are descriptive only
                and should not be interpreted as scientific conclusions.
            </p>
        `;
    }

    document.querySelector(".intro-screen").innerHTML = `
        <div class="results-container">

            <p class="question-number">
                EXPERIMENT 01 // LIVE RESULTS
            </p>

            <h2>Eyewitness Memory</h2>

            <div class="participant-total">
                <span>${stats.total_participants}</span>
                PARTICIPANTS
            </div>

            ${sampleNotice}

            <div class="condition-grid">

                <div class="stat-card">
                    <p>NEUTRAL CONDITION</p>

                    <span class="big-stat">
                        ${neutralRate}
                    </span>

                    <small>
                        recalled the phone
                    </small>

                    <small>
                        n = ${stats.neutral_count}
                    </small>
                </div>

                <div class="stat-card">
                    <p>LEADING CONDITION</p>

                    <span class="big-stat">
                        ${leadingRate}
                    </span>

                    <small>
                        recalled the phone
                    </small>

                    <small>
                        n = ${stats.leading_count}
                    </small>
                </div>

            </div>

            <h3 class="results-heading">
                Confidence & Accuracy
            </h3>

            <div class="condition-grid">

                <div class="stat-card">
                    <p>CORRECT RECALL</p>

                    <span class="big-stat">
                        ${correctConfidence}
                    </span>

                    <small>
                        average confidence
                    </small>
                </div>

                <div class="stat-card">
                    <p>INCORRECT RECALL</p>

                    <span class="big-stat">
                        ${incorrectConfidence}
                    </span>

                    <small>
                        average confidence
                    </small>
                </div>

            </div>

            <p class="overall-confidence">
                Overall average confidence:
                <strong>${averageConfidence}</strong>
            </p>

            <button id="restart-button">
                RUN EXPERIMENT AGAIN
            </button>

        </div>
    `;

    document
        .getElementById("restart-button")
        .addEventListener("click", function () {
            location.reload();
        });
}
