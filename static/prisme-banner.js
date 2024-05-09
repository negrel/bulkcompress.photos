document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelectorAll(".prisme-banner-close-btn");
  const banner = document.querySelector("#prisme-banner");
  banner.dataset.closed = localStorage.getItem("prismeBannerClosed");
  [...btn].forEach(
    (btn) => (btn.onclick = () => {
      banner.dataset.closed = true;
      localStorage.setItem("prismeBannerClosed", true);
    }),
  );
});
