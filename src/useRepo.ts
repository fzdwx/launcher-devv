export const getRepo = async (value?: string) => {
  if (value === undefined || value === "" || value.length === 0) {
    return undefined
  }

  const url = `https://api.github.com/search/repositories?q=${value}`;
  const data = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (data.status > 400) {
    return { result: "error" };
  }

  return await data.json() as SearchRepositoriesResponse;

}


export interface Repository {
  id: string;
  url: string;
  name: string;
  full_name: string;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  clone_url: string;
  watchers_count: number;
  open_issues_count: number;
  visibility: string;
  topics: string[];
  stargazers_count: number;
  language: string;
  html_url: string;
  forks_count: number;
  license: {
    key: string;
    name: string;
    url: string;
  }
  owner: {
    id: number;
    login: string;
    avatar_url: string;
    type: string;
    html_url: string;
  }
}

export interface SearchRepositoriesResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export interface Release {
  id: string;
  description: string;
  name: string;
  publishedAt: string;
  createdAt: string;
  tagName: string;
  url: string;
}

export interface RepositoryReleasesResponse {
  repository: {
    releases: {
      nodes: Release[];
    };
  };
}
