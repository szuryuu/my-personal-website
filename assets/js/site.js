(() => {
  const formatTime = (date, timeZone) => new Intl.DateTimeFormat("en-GB", {
    timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).format(date);

  const updateClock = () => {
    const now = new Date();
    const jakarta = document.querySelector("[data-jakarta-time]");
    const local = document.querySelector("[data-local-time]");
    const zone = document.querySelector("[data-local-zone]");
    if (jakarta) jakarta.textContent = formatTime(now, "Asia/Jakarta");
    if (local) local.textContent = formatTime(now);
    if (zone) {
      const part = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
        .formatToParts(now).find(({ type }) => type === "timeZoneName");
      zone.textContent = part ? part.value : "GMT";
    }
  };
  updateClock();
  window.setInterval(updateClock, 1000);

  const skills = document.querySelector(".skills");
  const visual = document.querySelector(".interactive-visual");
  const bloomOrigin = `polygon(${Array.from({ length: 18 }, () => "50% 50%").join(", ")})`;
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      if (!skills || !visual) return;
      const points = Array.from({ length: 18 }, (_, index) => {
        const angle = index / 18 * Math.PI * 2;
        const radius = 112 + (Math.random() - .5) * 20;
        return `${50 + Math.cos(angle) * radius}% ${50 + Math.sin(angle) * radius}%`;
      });
      visual.style.clipPath = `polygon(${points.join(", ")})`;
      skills.classList.add("is-revealing");
      skills.classList.toggle("profile-active", element.dataset.reveal === "profile");
    });
    element.addEventListener("mouseleave", () => {
      skills?.classList.remove("is-revealing", "profile-active");
      if (visual) visual.style.clipPath = bloomOrigin;
    });
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      document.querySelectorAll("[data-tab]").forEach((item) => {
        const selected = item.dataset.tab === tab;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-selected", String(selected));
      });
      document.querySelectorAll("[data-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.panel !== tab;
      });
    });
  });

  const certPage = document.querySelector("[data-certifications]");
  if (!certPage) return;
  let group = "All";
  let year = "All";
  const cards = [...certPage.querySelectorAll("[data-certification]")];
  const updateCertificates = () => {
    cards.forEach((card) => {
      const visible = (group === "All" || card.dataset.group === group) && (year === "All" || card.dataset.year === year);
      card.classList.toggle("is-filtered-out", !visible);
    });
  };
  certPage.querySelectorAll("[data-cert-group], [data-cert-year]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.certGroup ? "certGroup" : "certYear";
      if (key === "certGroup") group = button.dataset.certGroup; else year = button.dataset.certYear;
      certPage.querySelectorAll(`[data-${key === "certGroup" ? "cert-group" : "cert-year"}]`).forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      updateCertificates();
    });
  });

  const preview = document.createElement("div");
  preview.className = "cert-preview";
  preview.setAttribute("aria-hidden", "true");
  preview.innerHTML = '<div style="width:100%;height:100%;overflow:hidden"><img alt="" style="display:block;width:100%;height:100%;object-fit:contain"></div>';
  document.body.append(preview);
  const previewInner = preview.firstElementChild;
  const image = previewInner.firstElementChild;
  // Codrops' demo has one distinct animation per item. Certifications has only
  // 14 rows, so advance through all 23 effects in a fixed sequence instead of
  // randomly picking one (which made several hovers look identical).
  const hoverEffects = [
    ["translateX(-100%)", "translateX(100%)", "translateX(-16%) scale(1.12)", "inset(0 100% 0 0)", "0 50%", 700, "cubic-bezier(.2,.8,.2,1)"],
    ["translate(-100%, -100%)", "translate(45%, 45%)", "scale(1.3)", "inset(100% 0 0 0)", "0 0", 700, "cubic-bezier(.2,.8,.2,1)"],
    ["translate(50%, 120%) rotate(50deg) scale(2)", "translate(-25%, -20%)", "rotate(-16deg) scale(1.3)", "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", "100% 100%", 700, "cubic-bezier(.16,1,.3,1)"],
    ["translateY(50%) rotate(-15deg) scale(0)", "translateY(-65%)", "translateY(22%) scale(1.18)", "inset(0 0 100% 0)", "50% 100%", 800, "cubic-bezier(.16,1,.3,1)"],
    ["rotate(35deg) scale(0)", "scale(1.5)", "scale(.7) rotate(-18deg)", "circle(0% at 50% 50%)", "50% 50%", 800, "cubic-bezier(.16,1,.3,1)"],
    ["translate(20%, 0) rotate(10deg) scale(1.3)", "translateX(-60%)", "translateX(25%) scale(1.2)", "polygon(0 0, 0 0, 0 100%, 0 100%)", "0 50%", 800, "cubic-bezier(.2,.8,.2,1)"],
    ["translate(-50%, 10%) rotate(-35deg) scale(0)", "rotate(40deg) scale(1.6)", "rotate(-30deg) scale(.72)", "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", "0 100%", 1100, "cubic-bezier(.16,1,.3,1)"],
    ["translateY(80%) rotate(12deg) scale(.45)", "translateY(-55%)", "translateY(24%) rotate(-6deg) scale(1.15)", "inset(100% 0 0 0)", "50% 100%", 700, "cubic-bezier(.16,1,.3,1)"],
    ["translateX(80%) rotate(-12deg) scale(.6)", "translateX(-55%)", "translateX(22%) rotate(8deg) scale(1.15)", "inset(0 0 0 100%)", "100% 50%", 700, "cubic-bezier(.16,1,.3,1)"],
    ["translateY(-100%) skewX(-12deg)", "skewX(18deg) translateX(-45%)", "skewX(-12deg) translateX(18%) scale(1.18)", "polygon(0 0, 100% 0, 100% 0, 0 0)", "50% 0", 700, "cubic-bezier(.2,.8,.2,1)"],
    ["translateX(-80%) skewY(10deg)", "skewY(-16deg) translateY(35%)", "skewY(10deg) translateY(-20%) scale(1.18)", "polygon(0 0, 0 0, 0 100%, 0 100%)", "0 50%", 700, "cubic-bezier(.2,.8,.2,1)"],
    ["translate(60%, -60%) rotate(25deg) scale(.2)", "translate(-30%, 30%) rotate(-12deg)", "rotate(-12deg) scale(1.24)", "polygon(100% 0, 100% 0, 100% 0, 100% 0)", "100% 0", 750, "cubic-bezier(.16,1,.3,1)"],
    ["translate(-60%, 60%) rotate(-25deg) scale(.2)", "translate(30%, -30%) rotate(12deg)", "rotate(12deg) scale(1.24)", "polygon(0 100%, 0 100%, 0 100%, 0 100%)", "0 100%", 750, "cubic-bezier(.16,1,.3,1)"],
    ["rotateX(70deg) scale(.4)", "rotateX(-70deg) scale(1.45)", "scale(1.22)", "inset(0 0 100% 0)", "50% 0", 700, "cubic-bezier(.16,1,.3,1)"],
    ["rotateY(-70deg) scale(.4)", "rotateY(70deg) scale(1.45)", "scale(1.22)", "inset(0 0 0 100%)", "0 50%", 700, "cubic-bezier(.16,1,.3,1)"],
    ["scale(1.8) rotate(8deg)", "scale(.55)", "scale(1.55) rotate(-8deg)", "circle(0% at 50% 50%)", "50% 50%", 900, "cubic-bezier(.16,1,.3,1)"],
    ["scale(.15) rotate(-40deg)", "rotate(55deg) scale(1.8)", "rotate(-35deg) scale(.6)", "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)", "50% 50%", 700, "cubic-bezier(.16,1,.3,1)"],
    ["translate(-110%, 0) rotate(-8deg)", "translateX(110%)", "translateX(-35%) rotate(5deg) scale(1.2)", "inset(0 100% 0 0)", "0 50%", 700, "cubic-bezier(.2,.8,.2,1)"],
    ["translate(110%, 0) rotate(8deg)", "translateX(-110%)", "translateX(35%) rotate(-5deg) scale(1.2)", "inset(0 0 0 100%)", "100% 50%", 700, "cubic-bezier(.2,.8,.2,1)"],
    ["translate(0, -110%) rotate(-6deg)", "translateY(110%)", "translateY(-35%) rotate(4deg) scale(1.2)", "inset(100% 0 0 0)", "50% 0", 700, "cubic-bezier(.2,.8,.2,1)"],
    ["translate(0, 110%) rotate(6deg)", "translateY(-110%)", "translateY(35%) rotate(-4deg) scale(1.2)", "inset(0 0 100% 0)", "50% 100%", 700, "cubic-bezier(.2,.8,.2,1)"],
    ["scale(.01) rotate(180deg)", "scale(2.2) rotate(-120deg)", "scale(.5) rotate(60deg)", "circle(0% at 50% 50%)", "50% 50%", 900, "cubic-bezier(.16,1,.3,1)"],
    ["translate(35%, -35%) rotate(45deg) scale(.5)", "translate(-55%, 55%) rotate(-45deg)", "rotate(-32deg) scale(1.42)", "polygon(0 0, 100% 0, 0 0, 0 100%)", "0 0", 700, "cubic-bezier(.16,1,.3,1)"],
  ];
  let nextEffect = 0;
  let previewToken = 0;
  const movePreview = (event) => {
    preview.style.left = `${Math.min(event.clientX + 20, window.innerWidth - 190)}px`;
    preview.style.top = `${Math.min(event.clientY + 20, window.innerHeight - 190)}px`;
  };
  const showPreview = (event, imageUrl) => {
    const token = ++previewToken;
    if (image.src !== new URL(imageUrl, window.location.href).href) image.src = imageUrl;
    movePreview(event);
    const effectNumber = nextEffect++ % hoverEffects.length;
    const [transform, innerTransform, imageTransform, clipPath, origin, duration, easing] = hoverEffects[effectNumber];
    preview.dataset.effect = String(effectNumber + 1);
    preview.style.transition = "none";
    previewInner.style.transition = "none";
    image.style.transition = "none";
    preview.style.opacity = "0";
    preview.style.transformOrigin = origin;
    preview.style.transform = transform;
    preview.style.clipPath = clipPath;
    previewInner.style.transform = innerTransform;
    image.style.transform = imageTransform;
    void preview.offsetWidth;
    requestAnimationFrame(() => {
      if (token !== previewToken) return;
      preview.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}, clip-path ${duration}ms ${easing}`;
      previewInner.style.transition = `transform ${Math.max(500, duration * .8)}ms ${easing}`;
      image.style.transition = `transform ${Math.max(600, duration * 1.2)}ms ${easing}`;
      preview.style.opacity = "1";
      preview.style.transform = "none";
      preview.style.clipPath = "inset(0)";
      previewInner.style.transform = "none";
      image.style.transform = "none";
    });
  };
  const hidePreview = () => {
    ++previewToken;
    preview.style.transition = "opacity 220ms ease-out, transform 220ms ease-out";
    preview.style.opacity = "0";
    preview.style.transform = "translateY(-20%) scale(.9)";
  };
  cards.forEach((card) => {
    card.addEventListener("mouseenter", (event) => showPreview(event, card.dataset.preview));
    card.addEventListener("mousemove", movePreview);
    card.addEventListener("mouseleave", hidePreview);
  });
})();
