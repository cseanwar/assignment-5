const issuesContainer = document.getElementById("issues-container");
const loadingSpinner = document.getElementById("loadingSpinner");
const searchInput = document.getElementById("search-input");
let allIssues = [];
let badgePriorityStyle = [];
let borderStyle = [];

function showLoading() {
    loadingSpinner.classList.remove("hidden");
    issuesContainer.innerHTML = "";
}

function hideLoading() {
    loadingSpinner.classList.add("hidden")
}

async function loadIssues() {
    showLoading();
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;
    displayIssues(allIssues);
    document.getElementById("total-issue").innerText = allIssues.length;
    hideLoading();
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
        const statusIcon = issue.status === "open" 
            ? "./assets/Open-Status.png" 
            : "./assets/Closed-Status.png";
        
        if (issue.status === "open") {
            borderStyle = "border-t-4 border-[#00A96E]";
        }
        if (issue.status === "closed") {
            borderStyle = "border-t-4 border-[#A855F7]";
        }
        
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
        card.innerHTML = `<div class="flex justify-between">
                        <img class="h-[24px] w-[24px]" src="${statusIcon}" alt="">
                        <button class="text-xs rounded-4xl  px-7 py-1 ${badgePriorityStyle}">${issue.priority.toUpperCase()}</button> 
                    </div>
                    <h6 class="font-semibold text-sm">${issue.title}</h6>
                    <p class="line-clamp-2 text-[#64748B] text-xs">${issue.description}</p>
                    <div>
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
                    <div class="border-t border-[#E4E4E7] grid grid-cols-2 items-center">
                        <p class="text-[#64748B] text-xs justify-self-start my-2">#${issue.id} by ${issue.author}</p>
                        <p class="text-[#64748B] text-xs justify-self-end">Created: ${new Date(issue.createdAt).toLocaleDateString()}</p>
                        <p class="text-[#64748B] text-xs justify-self-start my-2">${issue.assignee}</p>
                        <p class="text-[#64748B] text-xs justify-self-end">Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</p>
                    </div>
        `;
        issuesContainer.appendChild(card);
    });
} 

async function filterIssues(st, clickedBtn) {
    showLoading();
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
    hideLoading();
}

loadIssues();


searchInput.addEventListener("keydown", (event) => {
  
  if (event.key === "Enter") {
    const searchValue = searchInput.value.trim().toLowerCase();
      const filterWords = allIssues.filter((issue) =>
        issue.title.toLowerCase().includes(searchValue)
      );

      displayIssues(filterWords);
  }

});