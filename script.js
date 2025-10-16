

const container = document.getElementById("scheduleContainer");
const errorMsg = document.getElementById("errorMsg");
const triggerBar = document.getElementById("triggerBar");

// Friends' JSON filenames
const friends = ["HarrisonKleinSchedule.JSON", "SalMontecalvo.JSON", "ZahrEvansSchedule.JSON"];
let currentIndex = 0;

/**
 * Async function to load a friend's schedule from a JSON file
 * @param {string} fileName - name of JSON file to load
 */
async function loadSchedule(fileName) {
  try {
    container.innerHTML = "";
    errorMsg.classList.add("d-none");

    const response = await fetch(`./json/${fileName}`);

    if (!response.ok) throw new Error(`Failed to load ${fileName}`);

    const data = await response.json();


    data.forEach((cls) => {
      const html = `
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${cls.className}</h5>
              <p class="card-text">
                <strong>Teacher:</strong> ${cls.teacher}<br>
                <strong>Room:</strong> ${cls.roomNumber}<br>
                <strong>Period:</strong> ${cls.period}<br>
                <strong>Subject:</strong> ${cls.subjectArea}<br>
                <strong>Quarters:</strong> ${cls.quarters.join(", ")}
              </p>
            </div>
          </div>
        </div>
      `;

      container.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error(error);
    errorMsg.textContent = `Error: Unable to load schedule (${error.message}). Please try again later.`;
    errorMsg.classList.remove("d-none");
  }
}

triggerBar.addEventListener("mouseenter", () => {
  currentIndex = (currentIndex + 1) % friends.length;
  loadSchedule(friends[currentIndex]);
});

window.addEventListener("DOMContentLoaded", () => {
  loadSchedule(friends[currentIndex]);
});
