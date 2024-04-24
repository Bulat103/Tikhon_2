// -----------------------------------------------------------------------
const hidePreloader = () => {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("hidden");
};

// -----------------------------------------------------------------------
function resetVideos(videoItems) {
  videoItems.forEach((videoItem) => {
    videoItem.style.display = "block";
  });
}

// -----------------------------------------------------------------------
const changeFooterAboutInfoVisibility = () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 20) {
    footer.classList.add("visible");
  } else {
    footer.classList.remove("visible");
  }
};

// -----------------------------------------------------------------------
const onDocumentLoadedHandler = () => {
  const videoItems = document.querySelectorAll(".video");
  const tags = document.querySelectorAll("[data-tag]");
  const resetTagsButton = document.querySelector(".reset-tags");

  // hidePreloader вызывается только когда загружены все внешние ресурсы
  hidePreloader();

  function filterVideos() {
    const selectedTags = Array.from(tags).filter((tag) =>
      tag.classList.contains("selected")
    );
    videoItems.forEach((videoItem) => {
      const videoTags = videoItem.getAttribute("data-tags").split(" ");
      let matchCount = 0;
      selectedTags.forEach((tag) => {
        if (videoTags.includes(tag.getAttribute("data-tag"))) {
          matchCount++;
        }
      });
      if (matchCount === selectedTags.length) {
        videoItem.style.display = "block";
      } else {
        videoItem.style.display = "none";
      }
    });
    // Отключаем выбранные теги, если они не соответствуют видео
    tags.forEach((tag) => {
      if (!selectedTags.includes(tag) && !tag.classList.contains("disabled")) {
        const tagVideos = Array.from(videoItems).filter((videoItem) =>
          videoItem
            .getAttribute("data-tags")
            .split(" ")
            .includes(tag.getAttribute("data-tag"))
        );
        if (tagVideos.every((video) => video.style.display === "none")) {
          tag.classList.add("disabled");
        }
      }
    });
  }

  function toggleTag(tag) {
    if (tag.classList.contains("selected")) {
      tag.classList.remove("selected");
    } else if (
      Array.from(tags).filter((tag) => tag.classList.contains("selected"))
        .length < 8
    ) {
      tag.classList.add("selected");
    }
    filterVideos();
  }

  function restoreDisabledTags() {
    tags.forEach((tag) => {
      if (tag.classList.contains("disabled")) {
        const tagVideos = Array.from(videoItems).filter((videoItem) =>
          videoItem
            .getAttribute("data-tags")
            .split(" ")
            .includes(tag.getAttribute("data-tag"))
        );
        if (tagVideos.some((video) => video.style.display !== "none")) {
          tag.classList.remove("disabled");
        }
      }
    });
  }

  tags.forEach((tag) => {
    tag.addEventListener("click", function () {
      toggleTag(tag);
      restoreDisabledTags();
    });
  });

  resetTagsButton.addEventListener("click", function () {
    tags.forEach((tag) => {
      tag.classList.remove("selected");
      tag.classList.remove("disabled");
    });
    resetVideos(videoItems);
  });
};

// -----------------------------------------------------------------------
window.onload = onDocumentLoadedHandler;

const footer = document.querySelector("footer");

window.addEventListener("scroll", changeFooterAboutInfoVisibility);

document.querySelector(".feedback_btn").addEventListener("click", () => {
  footer.classList.add("visible");
});

// если раскомментить эту строчку и закомментить строку №34-вызов функции hidePreloader, то лоадер будет исчезать сразу после того как браузер построит каркас страницы, но не обязательно загрузит все внешние ресурсы
// document.addEventListener("DOMContentLoaded", hidePreloader);
