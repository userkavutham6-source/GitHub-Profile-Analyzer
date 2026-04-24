const API_BASE_URL = 'https://api.github.com';

// Use a Personal Access Token (PAT) if provided in localStorage or env to increase rate limits
const getHeaders = () => {
  const token = localStorage.getItem('github_pat');
  const headers = {
    'Accept': 'application/vnd.github.v3+json'
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  return headers;
};

export const fetchUserProfile = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}`, {
    headers: getHeaders()
  });

  if (!response.ok) {
    if (response.status === 404) throw new Error('User not found');
    if (response.status === 403) throw new Error('API rate limit exceeded. Please try again later or add a token.');
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

export const fetchUserRepos = async (username) => {
  // Fetch up to 100 recent repos, sorted by updated
  const response = await fetch(`${API_BASE_URL}/users/${username}/repos?per_page=100&sort=updated`, {
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }

  return response.json();
};

export const analyzeRepos = (repos) => {
  let totalStars = 0;
  let totalForks = 0;
  const languageMap = {};
  let activeRepos = 0; // updated in last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  repos.forEach(repo => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }

    if (new Date(repo.updated_at) > sixMonthsAgo) {
      activeRepos++;
    }
  });

  // Calculate most used language
  let mostUsedLanguage = 'N/A';
  let maxCount = 0;
  for (const [lang, count] of Object.entries(languageMap)) {
    if (count > maxCount) {
      mostUsedLanguage = lang;
      maxCount = count;
    }
  }

  // Calculate Repository Quality Score (Heuristic: stars + description presence + activity)
  const qualityScore = repos.length > 0 ? Math.min(100, Math.round(
    (totalStars * 2) + 
    (repos.filter(r => r.description).length / repos.length * 50) + 
    (activeRepos / repos.length * 30)
  )) : 0;

  // Format languages for chart
  const languages = Object.entries(languageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // top 5 languages

  const chartData = {
    labels: languages.map(l => l[0]),
    data: languages.map(l => l[1])
  };

  return {
    totalStars,
    totalForks,
    mostUsedLanguage,
    qualityScore,
    activeRepos,
    inactiveRepos: repos.length - activeRepos,
    chartData,
    topRepos: [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)
  };
};
