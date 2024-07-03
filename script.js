const items = [
  {
    id: "618",
    preview: "https://musicreel.moscow/pics/rzd.jpg",
    video: "https://player.vimeo.com/video/915310027?h=d272ad52ce&autoplay=1",
    tags: "rzd uprising music epic beats synth string orchestral cinematic",
    width: 200,
    height: 200,
    format: "vimeo",
  },
  {
    id: "4",
    preview: "https://musicreel.moscow/pics/zarina/zarina_20.jpg",
    video: "https://www.youtube.com/embed/u_OTfAIx1GU?autoplay=1",
    tags: "zarina music beats songs vocal hip-hop",
    width: 300,
    height: 200,
    format: "youtube",
  },
  {
    id: "1",
    preview: "https://musicreel.moscow/pics/baltika/baltika_7.jpg",
    video: "https://musicreel.moscow/vids/baltika_7.mov",
    tags: "other music guitar rock dark vocal foley soundfx cinematic",
    width: 300,
    height: 200,
    format: "mov",
  },
  {
    id: "2",
    preview: "https://musicreel.moscow/pics/casio_gshock.jpg",
    video: "https://player.vimeo.com/video/710819339?h=4e09a7b8f5&autoplay=1",
    tags: "casio piano music orchestal string epic cinematic uprising",
    width: 300,
    height: 200,
    format: "vimeo",
  },
  {
    id: "3",
    preview: "https://musicreel.moscow/pics/zg/zg_3mugs.jpg",
    video: "https://musicreel.moscow/vids/zg_3mugs.mov",
    tags: "orchestal string epic cinematic",
    width: 300,
    height: 200,
    format: "mov",
  },
  {
    id: "70",
    preview: "https://musicreel.moscow/pics/zg/zg_3mugs.jpg",
    video: "https://musicreel.moscow/vids/zg_3mugs.mov",
    tags: "orchestal string epic cinematic",
    width: 300,
    height: 200,
    format: "mov",
  },

  {
    id: "69",
    preview: "https://musicreel.moscow/pics/baltika/baltika_7.jpg",
    video: "https://musicreel.moscow/vids/baltika_7.mov",
    tags: "other music guitar rock dark vocal foley soundfx cinematic",
    width: 300,
    height: 200,
    format: "mov",
  },

  {
    id: "68",
    preview: "https://musicreel.moscow/pics/rzd.jpg",
    video: "https://player.vimeo.com/video/915310027?h=d272ad52ce",
    tags: "rzd uprising music epic beats synth string orchestral cinematic",
    width: 300,
    height: 200,
    format: "vimeo",
  },

  {
    id: "67",
    preview: "https://musicreel.moscow/pics/bork/bork_MaskLuzhnik.jpg",
    video: "https://musicreel.moscow/vids/bork_MaskLuzhnik.mov",
    tags: "bork music electronic beats synth string orchestral cinematic",
    width: 200,
    height: 200,
    format: "mov",
  },
  {
    id: "66",
    preview: "https://musicreel.moscow/pics/bork/bork_Styler.jpg",
    video: "https://musicreel.moscow/vids/bork_Styler.mov",
    tags: "bork music electronic beats synth string orchestral cinematic",
    width: 200,
    height: 200,
    format: "mov",
  },
  {
    id: "65",
    preview: "https://musicreel.moscow/pics/bork/bork_decanther.jpg",
    video: "https://musicreel.moscow/vids/bork_decanther.mov",
    tags: "bork music acoustic funky cinematic",
    width: 200,
    height: 200,
    format: "mov",
  },
];

// -----------------------------------------------------------------------
const windowWidth = window.innerWidth;
let scale = 1;
let mobile = false;

if (windowWidth > 1500) {
  scale = 2.2;
} else if (windowWidth > 1200) {
  scale = 1.6;
} else if (windowWidth > 900) {
  scale = 1.3;
}

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  scale = 2.5;
  mobile = true;
}
// -----------------------------------------------------------------------
const createPlayBtn = () => {
  const btn = document.createElement("button");
  let buttonSize;

  if (mobile) {
    buttonSize = `${scale * 1.5 * 30}px`;
  } else {
    buttonSize = `${scale * 30}px`;
  }
  const playIcon = `<?xml version="1.0" ?><svg class="feather feather-play" fill="none"  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 22 22" height="${buttonSize}" width="${buttonSize}" xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
  btn.classList.add("start_play");
  btn.innerHTML = playIcon;
  return btn;
};

// -----------------------------------------------------------------------
const createImg = (item) => {
  const img = document.createElement("img");
  img.setAttribute("src", item.preview);
  img.setAttribute("id", `video_${item.id}`);
  img.setAttribute("class", "preview_img");
  return img;
};

// -----------------------------------------------------------------------
const replaceVideoWithImg = (currentVideo) => {
  if (!currentVideo) return;

  const videos = document.querySelectorAll("video");
  const iframes = document.querySelectorAll("iframe");

  let playerItems;

  if (iframes.length) {
    playerItems = iframes;
  } else if (videos.length) {
    playerItems = videos;
  } else {
    return;
  }

  let prevVideo;
  playerItems.forEach((el) => {
    const id = el.getAttribute("id");
    if (id != currentVideo.id) {
      prevVideo = el;
    }
  });
  const prevVideoParent = prevVideo.parentElement;
  let parentId = prevVideoParent.getAttribute("id").split("_")[1];
  const elem = items.find((item) => item.id === parentId);
  prevVideoParent.style.width = `${elem.width * scale}px`;
  prevVideoParent.style.height = `${elem.height * scale}px`;

  const img = createImg(elem);
  prevVideo.replaceWith(img);
  prevVideoParent.querySelector("button").style.display = "block";
};

const videoFormats = ["mov", "mp4"];

// -----------------------------------------------------------------------
const replaceImgWithVideo = (item) => {
  const imgContainer = document.querySelector(`#video_${item.id}`);
  const img = imgContainer.querySelector(`img`);
  const btn = imgContainer.querySelector(`button`);
  let videoElement;
  const isEmbedded = videoFormats.some((el) => item.format === el);

  if (isEmbedded) {
    videoElement = document.createElement("video");
    videoElement.setAttribute("controls", true);
    videoElement.setAttribute("autoplay", true);
    videoElement.play();
  } else {
    videoElement = document.createElement("iframe");
    videoElement.setAttribute("frameborder", "0");
    videoElement.setAttribute("allow", "autoplay");
    videoElement.setAttribute("allowfullscreen", true);
  }

  videoElement.setAttribute("src", item.video);
  replaceVideoWithImg(item);
  if (!mobile) {
    img.parentElement.style.width = `${item.width * scale * 1.5}px`;
    img.parentElement.style.height = `${item.height * scale * 1.5}px`;
  }

  img.replaceWith(videoElement);

  btn.style.display = "none";
};

// -----------------------------------------------------------------------
const renderPreview = (videos) => {
  const vidoesContainer = document.querySelector(".vidoes_container");
  const renderPreviewImage = (item, number) => {
    const container = document.createElement("div");
    container.setAttribute("class", "preview_img_container");
    container.setAttribute("data-tags", item.tags);
    container.setAttribute("id", `video_${item.id}`);
    container.setAttribute("data-number", number);
    container.style.width = `${item.width * scale}px`;
    container.style.height = `${item.height * scale}px`;

    const img = createImg(item);
    const btn = createPlayBtn();
    container.append(img);
    container.append(btn);
    btn.addEventListener("click", () => replaceImgWithVideo(item));
    vidoesContainer.append(container);
  };

  for (let i = 0; i < videos.length; i++) {
    renderPreviewImage(videos[i], i);
  }
};
renderPreview(items);
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
  const videoItems = document.querySelectorAll(".preview_img_container");
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
