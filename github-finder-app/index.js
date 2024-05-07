import { Octokit } from "https://esm.sh/@octokit/core";
const octokit = new Octokit({
  auth: "",
});

const searchForm = document.querySelector("#searchForm");
const userInfoBox = document.querySelector("#userInfo");
// 프로필 정보
const profileImg = document.querySelector("#profileImg");
const profileLink = document.querySelector("#profileLink");
const publicRepos = document.querySelector("#publicRepos");
const publicGists = document.querySelector("#publicGists");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const company = document.querySelector("#company");
const blogLink = document.querySelector("#blogLink");
const location = document.querySelector("#location");
const memberSince = document.querySelector("#memberSince");
// 레포지토리 ul
const reposList = document.querySelector("#reposList");

// 검색 이벤트
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // 현재 검색 유저
  const username = e.target[0].value;
  !username && alert("유저 이름을 입력해주세요.");
  try {
    // 검색 input 초기화
    const usernameInput = document.querySelector("#usernameInput");
    usernameInput.value = "";
    // 유저 정보 요청
    const userInfo = await octokit.request(`GET /users/${username}`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    // 유저 레포지토리 요청
    const userRepos = await octokit.request(`GET /users/${username}/repos`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    // 응답 값
    const {
      avatar_url,
      html_url,
      public_repos,
      public_gists,
      followers: followers_count,
      following: following_count,
      company: company_value,
      blog,
      location: location_value,
      created_at,
    } = userInfo.data;
    const repository = userRepos.data.sort((a, b) => b.id - a.id).slice(0, 10);
    const EMPTY = "-";
    // 값 바인딩
    profileImg.setAttribute("src", avatar_url);
    profileLink.setAttribute("href", html_url);
    publicRepos.textContent = public_repos;
    publicGists.textContent = public_gists;
    publicGists.textContent = public_gists;
    followers.textContent = followers_count;
    following.textContent = following_count;
    company.textContent = company_value || EMPTY;
    blogLink.textContent = blog || EMPTY;
    blogLink.setAttribute("href", blog);
    location.textContent = location_value || EMPTY;
    memberSince.textContent = new Date(created_at).toLocaleString();

    let repos = "";
    repository.forEach((repo) => {
      const { name, html_url, stargazers_count, watchers_count, forks_count } =
        repo;
      repos += `<li>
      <a href="${html_url}" target="_blank">${name}</a>
      <div>
      <span>Stars: ${stargazers_count}</span>
      <span>Watchers: ${watchers_count}</span>
      <span>Forks: ${forks_count}</span>
      </div>
      </li>`;
    });
    reposList.innerHTML = repos;
    // 요소 노출
    userInfoBox.style.display = "block";
  } catch (error) {
    alert("Not Found");
    console.error(error);
  }
});
