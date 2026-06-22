let jobsData = [];

const jobList = document.getElementById("job-list");
const modal = document.getElementById("jobModal");
const modalBody = document.getElementById("modalBody");

fetch("jobs.json")
.then(response => response.json())
.then(data => {

    jobsData = data;

    renderJobs();

})
.catch(error => {

    jobList.innerHTML =
        "<div class='loading'>Không thể tải dữ liệu tuyển dụng.</div>";

    console.error(error);

});

function renderJobs(){

jobList.innerHTML = "";

jobsData.forEach(job => {

    const badgeClass = job.status || "normal";

    const badgeText = {
        hot: "🔥 HOT",
        new: "🆕 NEW",
        urgent: "⚡ URGENT"
    }[badgeClass] || "";

    jobList.innerHTML += `
        <div class="job-card">

            ${badgeText
                ? `<div class="badge ${badgeClass}">${badgeText}</div>`
                : ""}

            <div class="job-title">
                ${job.title}
            </div>

            <div class="job-info">
                💰 ${job.salary}
            </div>

            <div class="job-info">
                ⭐ ${job.experience}
            </div>

            <div class="job-info">
                📍 ${job.location}
            </div>

            <button
                class="btn btn-primary"
                onclick="showJob(${job.id})">
                Xem JD
            </button>

        </div>
    `;
});

}

function showJob(id){

const job = jobsData.find(x => x.id === id);

if(!job) return;

modalBody.innerHTML = `
    <h2 class="jd-title">
        ${job.title}
    </h2>

    <div class="jd-section">
        <p><strong>💰 Mức lương:</strong> ${job.salary}</p>
        <p><strong>⭐ Kinh nghiệm:</strong> ${job.experience}</p>
        <p><strong>📍 Địa điểm:</strong> ${job.location}</p>
    </div>

    <div class="jd-section">
        <h3>Mô tả công việc</h3>

        <ul>
            ${job.description
                .map(item => `<li>${item}</li>`)
                .join("")}
        </ul>
    </div>

    <div class="action-buttons">

        <a
            href="tel:${job.phone}"
            class="call-btn">
            📞 Gọi ngay
        </a>

        <a
            href="https://zalo.me/${job.zalo}"
            target="_blank"
            class="zalo-btn">
            💬 Chat Zalo
        </a>

    </div>
`;

modal.classList.add("show");

}

document
.getElementById("closeModal")
.addEventListener("click", () => {
modal.classList.remove("show");
});

modal.addEventListener("click", e => {

if(e.target === modal){

    modal.classList.remove("show");

}

});