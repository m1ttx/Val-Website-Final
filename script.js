const apiUrl = "https://valorant-api.com/v1/agents";
const apiKey = "YOUR_API_KEY";  // Replace with your RapidAPI key

const dataContainer = document.getElementById("data-container");

// Fetch data from Valorant API
async function fetchData() {
  const response = await fetch(apiUrl, {
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'valorant-api.com'
    }
  });
  const data = await response.json();
  renderData(data);
}

// Render data into the page
function renderData(data) {
  const agents = data.data;
  agents.forEach(agent => {
    const card = document.createElement('div');
    card.classList.add('card');

    // Create clickable link for agent
    const cardContent = `
      <a href="agent.html?id=${agent.uuid}" style="text-decoration: none; color: inherit;">
        <img class="agent-image" src="${agent.fullPortrait}" alt="${agent.displayName}"/>
        <h2>${agent.displayName}</h2>
        <p><strong>Role:</strong> ${agent.role.displayName}</p>
        <p><strong>Bio:</strong> ${agent.description}</p>
      </a>
    `;
    card.innerHTML = cardContent;
    dataContainer.appendChild(card);
  });
}

// Initialize the SPA
fetchData();

// Function to get query parameters from the URL
function getQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    id: urlParams.get('id')
  };
}

// Fetch agent details from the Valorant API
async function fetchAgentDetails() {
  const { id } = getQueryParams();
  const apiUrl = `https://valorant-api.com/v1/agents/${id}`;
  const apiKey = "YOUR_API_KEY";  // Replace with your RapidAPI key

  const response = await fetch(apiUrl, {
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'valorant-api.com'
    }
  });
  const data = await response.json();
  renderAgentDetail(data.data);
}

// Render agent details on the page
function renderAgentDetail(agent) {
  const agentDetailContainer = document.getElementById("agent-detail");

  const agentContent = `
    <img class="agent-image" src="${agent.fullPortrait}" alt="${agent.displayName}"/>
    <h2>${agent.displayName}</h2>
    <p><strong>Role:</strong> ${agent.role.displayName}</p>
    <p><strong>Bio:</strong> ${agent.description}</p>

    <div class="abilities">
      <h3>Abilities:</h3>
      ${renderAbilities(agent.abilities)}
    </div>
  `;
  
  agentDetailContainer.innerHTML = agentContent;
}

// Render abilities for the agent
function renderAbilities(abilities) {
  return abilities.map(ability => {
    return `
      <div class="ability">
        <img src="${ability.displayIcon}" alt="${ability.displayName}"/>
        <p><strong>${ability.displayName}:</strong> ${ability.description}</p>
      </div>
    `;
  }).join('');
}

// Fetch and display agent details
fetchAgentDetails();