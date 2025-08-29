// 🔹 Укажи свои данные
const repoOwner = "rentomingbaev"; // ← замени на свой GitHub логин
const repoName = "Novels Rus and Uzb";           // ← название репозитория

async function loadStories(lang = "ru") {
  const container = document.getElementById("stories");
  container.innerHTML = "<p>Загрузка...</p>";

  try {
    // получаем список файлов в stories/lang
    const res = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/stories/${lang}`);
    const files = await res.json();

    container.innerHTML = "";

    for (let file of files) {
      if (file.name.endsWith(".md")) {
        const contentRes = await fetch(file.download_url);
        const text = await contentRes.text();

        const div = document.createElement("div");
        div.className = "story";
        div.innerHTML = marked.parse(text); // конвертируем markdown → html
        container.appendChild(div);
      }
    }
  } catch (err) {
    container.innerHTML = "<p>Историй пока нет.</p>";
  }
}

// при загрузке показываем русские истории
loadStories("ru");
