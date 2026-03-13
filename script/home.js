const issuesContainer = document.getElementById("issues-container");
const loadingSpinner = document.getElementById("loadingSpinner");
const searchInput = document.getElementById("search-input");
const issueModalBox = document.getElementById("issueModalBox");
const modalTitle = document.getElementById("modalTitle");
const statusBadge = document.getElementById("statusBadge");
const authorName = document.getElementById("authorName");
const createdDate = document.getElementById("createdDate");
const modalBadge = document.getElementById("modalBadge");
const modalDescription = document.getElementById("modalDescription");
const assigneeName = document.getElementById("assigneeName");
const priorityBadge = document.getElementById("priorityBadge");
let allIssues = [];
let badgePriorityStyle = [];
let borderStyle = [];

function showSpinner() {
    loadingSpinner.classList.remove("hidden");
    issuesContainer.innerHTML = "";
}

function hideSpinner() {
    loadingSpinner.classList.add("hidden")
}

async function loadIssues() {
    showSpinner();
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;
    displayIssues(allIssues);
    document.getElementById("total-issue").innerText = allIssues.length;
    hideSpinner();
}

// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"

function displayIssues(issues) {
    issuesContainer.innerHTML = "";
    issues.forEach((issue) => {
        // For dynamically put the open or close logo
        const statusIcon = issue.status === "open" 
            ? "./assets/Open-Status.png" 
            : "./assets/Closed-Status.png";
        
        // For border to color
        if (issue.status === "open") {
            borderStyle = "border-t-4 border-[#00A96E]";
        }
        if (issue.status === "closed") {
            borderStyle = "border-t-4 border-[#A855F7]";
        }

        // For assignee checked
        let assigneeName = "";
        if (issue.assignee) {
            assigneeName = issue.assignee;
        } else {
            assigneeName = "Unassigned"
        }

        
        // Added style based on priority
        if (issue.priority === "high") {
            badgePriorityStyle = "bg-[#FEECEC] text-xs text-[#EF4444] rounded-4xl  px-7 py-1";
        }
        else if (issue.priority === "medium") {
            badgePriorityStyle = "bg-[#FFF6D1] text-[#F59E0B]";
        }
        else if (issue.priority === "low") {
            badgePriorityStyle = "bg-[#EEEFF2] text-[#9CA3AF]";
        }
            
        const card = document.createElement("div");
        card.className = `bg-white shadow-md p-4 rounded-lg space-y-4 ${borderStyle}`;
        card.innerHTML = `<div onclick="openIssueModal(${issue.id})" class="cursor-pointer space-y-3">
                        <div class="flex justify-between">
                            <img class="h-[24px] w-[24px]" src="${statusIcon}" alt="">
                            <button class="text-xs rounded-4xl  px-7 py-1 ${badgePriorityStyle}">${issue.priority.toUpperCase()}</button> 
                        </div>
                        <h2 class="font-semibold text-lg">${issue.title}</h2>
                        <p class="line-clamp-2 text-[#64748B] text-xs">${issue.description}</p>
                    </div>
                    <div class="flex flex-wrap space-x-2 space-y-2">
                        ${issue.labels.map(label => {

                            if (label === "bug") {
                            return `
                            <div class="badge badge-soft rounded-xl text-xs bg-[#FEECEC] border-2 border-[#FECACA] text-[#EF4444]">
                                <span><img src="./assets/bug.png" alt=""></span>
                                ${label.toUpperCase()}
                            </div>`;
                            } 
                            else if (label === "help wanted") {
                            return `
                            <div class="badge badge-warning rounded-xl text-xs bg-[#FFF8DB] text-[#D97706] border-2 border-[#fde68a]">
                                <span><img src="./assets/help.png" alt=""></span>
                                ${label.toUpperCase()}
                            </div>`;
                            }
                            else if (label === "enhancement") {
                            return `
                            <div class="badge badge-warning rounded-xl text-xs bg-[#DEFCE8] text-[#00A96E] border-2 border-[#BBF7D0]">
                                <span><img src="./assets/enhance.png" alt=""></span>
                                ${label.toUpperCase()}
                            </div>`;
                            }
                            else if (label === "documentation") {
                            return `
                            <div class="badge badge-soft badge-secondary text-xs bg-gray-50 text-gray-500 rounded-xl border-2 border-gray-300">
                                <span><i class="fa-brands fa-readme"></i></span>
                                ${label.toUpperCase()}
                            </div>`;
                            }
                            else if (label === "good first issue") {
                            return `
                            <div class="badge badge-primary text-xs bg-primary/50 text-primary-content rounded-xl border-2 border-primary-300">
                                <span><i class="fa-solid fa-envelope"></i></span>
                                ${label.toUpperCase()}
                            </div>`;
                            }

                        }).join("")}
                    </div>
                    <div class="border-t border-[#E4E4E7] grid grid-cols-2">
                        <p class="text-[#64748B] text-xs justify-self-start mt-2 py-2">#${issue.id} by ${issue.author}</p>
                        <p class="text-[#64748B] text-xs justify-self-end mt-4">Created: ${new Date(issue.createdAt).toLocaleDateString()}</p>
                        <p class="text-[#64748B] text-xs justify-self-start">Assignee: ${assigneeName}</p>
                        <p class="text-[#64748B] text-xs justify-self-end">Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</p>
                    </div>
        `;
        issuesContainer.appendChild(card);
    });
}

async function openIssueModal(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issueDetails = data.data;
    console.log("Modal clicked", id);
  modalTitle.innerText = issueDetails.title;

  statusBadge.innerText = issueDetails.status;
  statusBadge.className = issueDetails.status === "open"
    ? "badge badge-success rounded-xl text-white"
    : "badge badge-error rounded-xl";

  authorName.innerText = issueDetails.author;
  createdDate.innerText = new Date(issueDetails.createdAt).toLocaleDateString(); 
  modalDescription.innerText = issueDetails.description;
  assigneeName.innerText = issueDetails.assignee || "Unassigned";

  priorityBadge.innerText = issueDetails.priority.toUpperCase();
  let priorityBadgeColors = "";
    if (issueDetails.priority === "high") {
        priorityBadgeColors = "bg-red-500 text-white rounded-4xl text-xs px-4 py-1";
    }
    else if (issueDetails.priority === "medium") {
        priorityBadgeColors = "bg-[#F59E0B] text-black rounded-4xl text-xs px-4 py-1";
    }
    else if (issueDetails.priority === "low") {
        priorityBadgeColors = "bg-[#EEEFF2] text-[#9CA3AF] rounded-4xl text-xs px-4 py-1";
    }
    priorityBadge.className = priorityBadgeColors;

//   const priorityBadgeColors = {
//     high: "bg-red-500",
//     medium: "bg-yellow-300",
//     low: "bg-gray-500"
//   }
//   const prioBadge = document.createElement("span");
//   priorityBadge.innerText = issueDetails.priority;
//   prioBadge.className = `text-white rounded-xl px-2 py-1 ${priorityBadgeColors[issueDetails.priority.toLowerCase()]}`;
//   console.log(issueDetails.priority);

  modalBadge.innerHTML = "";
  issueDetails.labels.forEach(label => {
    let labelsHTML = "";
    if (label === "bug") {
        labelsHTML += `
        <div class="badge badge-soft rounded-xl text-xs bg-[#FEECEC] border-2 border-[#FECACA] text-[#EF4444]">
            <span><img src="./assets/bug.png" alt=""></span>${label.toUpperCase()}
        </div>`;
    }
    else if (label === "help wanted") {
        labelsHTML += `
        <div class="badge badge-warning rounded-xl text-xs bg-[#FFF8DB] text-[#D97706] border-2 border-[#fde68a]">
            <span><img src="./assets/help.png" alt=""></span>${label.toUpperCase()}
        </div>`;
    }
    else if (label === "enhancement") {
        labelsHTML += `
        <div class="badge badge-warning rounded-xl text-xs bg-[#DEFCE8] text-[#00A96E] border-2 border-[#BBF7D0]">
            <span><img src="./assets/enhance.png" alt=""></span>${label.toUpperCase()}
        </div>`;
    }
    else if (label === "documentation") {
        labelsHTML += `
        <div class="badge badge-soft badge-secondary text-xs bg-gray-50 text-gray-500 rounded-xl border-2 border-gray-300">
            <span><i class="fa-brands fa-readme"></i></span>${label.toUpperCase()}
        </div>`;
    }
    else if (label === "good first issue") {
        labelsHTML += `
        <div class="badge badge-primary text-xs bg-primary/50 text-primary-content rounded-xl border-2 border-primary-300">
            <span><i class="fa-solid fa-envelope"></i></span>${label.toUpperCase()}
        </div>`;
    }
    modalBadge.innerHTML += labelsHTML;
  })

  issueModalBox.showModal();
}

async function filterIssues(st, clickedBtn) {
    showSpinner();
    const allButtons = document.querySelectorAll(".issueBtn");

    allButtons.forEach((btn) => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });
    clickedBtn.classList.add("btn-primary");
    clickedBtn.classList.remove("btn-outline");

    let filteredIssues = [];
    if (st === "open") {
        filteredIssues = allIssues.filter(issue => issue.status === "open");
    }
    else if (st === "closed") {
        filteredIssues = allIssues.filter(issue => issue.status === "closed");
    }
    else {
        filteredIssues = allIssues;
    }
    displayIssues(filteredIssues);
    document.getElementById("total-issue").innerText = filteredIssues.length;
    hideSpinner();
}

loadIssues();


// Search a issue by keyword from the title
searchInput.addEventListener("keydown", (event) => {
  
  if (event.key === "Enter") {
    showSpinner()
    const searchValue = searchInput.value.trim().toLowerCase();
      const filterWords = allIssues.filter((issue) =>
        issue.title.toLowerCase().includes(searchValue)
      );

      displayIssues(filterWords);
      document.getElementById("total-issue").innerText = filterWords.length;
      hideSpinner();
    }
    searchInput.value = "";
});