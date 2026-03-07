const issuesContainer = document.getElementById("issues-container");
let allIssues = [];

async function loadIssues() {
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;
    displayIssues(allIssues);
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
            : "./assets/Closed- Status .png";
        const card = document.createElement("div");
        card.className = `bg-white shadow-md p-4 rounded-lg space-y-4`;
        card.innerHTML = `<div class="flex justify-between">
                        <img class="h-[24px] w-[24px]" src="${statusIcon}" alt="">
                        <button class="bg-[#FEECEC] text-xs text-[#EF4444] rounded-4xl  px-7 py-1">${issue.priority}</button> 
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
                    <div class="border-t border-[#E4E4E7] grid grid-cols-2 items-center space-y-2">
                        <p class="text-[#64748B] text-xs justify-self-start">#${issue.id} by ${issue.author}</p>
                        <p class="text-[#64748B] text-xs justify-self-end">Created: ${new Date(issue.createdAt).toLocaleDateString()}</p>
                        <p class="text-[#64748B] text-xs justify-self-start">${issue.assignee}</p>
                        <p class="text-[#64748B] text-xs justify-self-end">Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</p>
                    </div>
        `;
        issuesContainer.appendChild(card);
    });
}

loadIssues();