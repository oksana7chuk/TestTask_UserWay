const pageImagesScaner = () => {
  const images = document.querySelectorAll("img");
  const pageBody = document.querySelector("body");

  const getRandomWords = () =>
    fetch(
      `https://random-word-api.herokuapp.com/word?number=${images.length}`
    ).then((response) => response.json());
  getRandomWords().then((randomWords) => {
    images.forEach((image, index) => {
      image.setAttribute("alt", randomWords[index]);
      image.classList.add("renewedImg");
    });
  });
  const showInput = (e) => {
    const tagForm = `<form class="tagForm"><input class="tagInput" type="text" placeholder="Add ALT name" size="40"/><button type="submit">Submit</button></form>`;
    el.insertAdjacentHTML("afterend", tagForm);
    const form = document.querySelector(".tagForm");
    const input = form.querySelector(".tagInput");

    const handleSubmit = (e) => {
      e.preventDefault();
      el.setAttribute("alt", input.value);
      input.value("");
      form.remove();
    };
    form.addEventListener("submit", handleSubmit);
  };
  pageBody.addEventListener("click", showInput);

  const callback = (mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          const newImages = node.querySelectorAll("img");
          getRandomWords().then((randomWords) => {
            newImages.forEach((newImage, index) => {
              newImage.setAttribute("alt", randomWords[index]);
              newImage.classList.add("renewedImg");
            });
          });
        });
      }
    });
  };

  const observer = new MutationObserver(callback);

  observer.observe(pageBody, { childList: true, subtree: true });
};

pageImagesScaner();
