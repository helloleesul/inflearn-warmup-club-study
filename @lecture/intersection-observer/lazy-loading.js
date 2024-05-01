const observer = new IntersectionObserver(
  (entries, observer) => {
    console.log("🚀 ~ observer ~ entries:", entries);
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        // 관찰이 되었으면 관찰 해제하기
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 1,
  }
);

const imgs = document.querySelectorAll("img");
imgs.forEach((img) => {
  observer.observe(img);
});
