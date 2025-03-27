const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Load token from .env file

const searchGithub = async () => {
  console.log("GitHub Token:", import.meta.env.VITE_GITHUB_TOKEN);

  try {
    console.log("Using GitHub Token:", GITHUB_TOKEN); // Debugging log

    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(`${GITHUB_API_URL}/users?since=${start}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("GitHub Users API Response:", data); // Debugging log

    if (!data.length) {
      throw new Error("No users found in API response.");
    }

    return data;
  } catch (err) {
    console.error("Error fetching GitHub users:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("GitHub User API Response:", data); // Debugging log

    return data;
  } catch (err) {
    console.error("Error fetching GitHub user:", err);
    return {};
  }
};

const getRandomCandidate = async () => {
  try {
    const users = await searchGithub(); // Fetch a list of users
    if (!users.length) throw new Error("No users found");

    const randomUser = users[Math.floor(Math.random() * users.length)]; // Pick one randomly
    console.log("Randomly selected user:", randomUser); // Debugging log

    return await searchGithubUser(randomUser.login); // Get detailed user data
  } catch (err) {
    console.error("Error fetching candidate:", err);
    return null;
  }
};

// Export all functions:
export { searchGithub, searchGithubUser, getRandomCandidate };
