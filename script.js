const container = document.getElementById("scheduleContainer");
const errorMsg = document.getElementById("errorMsg");
const triggerBar = document.getElementById("triggerBar");

const friends = ["HarrisonKleinSchedule.json", "SalMontecalvo.json", "ZahrEvansSchedule.json"];
let currentIndex = 0;

async function loadSchedule(fileName) {
  try {
    container.innerHTML = "";
    errorMsg.classList.add("d-none");

    const response = await fetch(`./json/${fileName}`);

    if (!response.ok) throw new Error(`Failed to load ${fileName}`);

    const data = await response.json();

    data.forEach((cls) => {
      const quarters = Array.isArray(cls.quarters) ? cls.quarters.join(", ") : "No quarters listed"; // Check if quarters is an array

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
                <strong>Quarters:</strong> ${quarters}
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

window.addEventListener("keydown", (event) => {
  if (event.key === "1") {
    currentIndex = 0;
    loadSchedule(friends[currentIndex]);
  } else if (event.key === "2") {
    currentIndex = 1;
    loadSchedule(friends[currentIndex]);
  } else if (event.key === "3") {
    currentIndex = 2;
    loadSchedule(friends[currentIndex]);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  loadSchedule(friends[currentIndex]);
});
