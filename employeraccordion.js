// Dependency GSAP

// Function to handle accordion behavior
function handleAccordion(accordion, contentWrapper, iconPlus) {
  accordion.addEventListener("click", function () {
    const isActive = accordion.classList.contains("active");

    // Close all accordions
    const allAccordions = document.querySelectorAll('[accordion="wrapper"]');
    allAccordions.forEach((item) => {
      const itemContentWrapper = item.querySelector('[accordion="content"]');
      gsap.to(itemContentWrapper, {
        height: 0,
        duration: 0.3,
        ease: "ease-in"
      });
      item.classList.remove("active");
      item.querySelector(".icon--plus").classList.remove("active");
    });

    // If the clicked accordion was not active, open it
    if (!isActive) {
      const contentHeight = contentWrapper.scrollHeight;
      gsap.to(contentWrapper, {
        height: contentHeight,
        duration: 0.3,
        ease: "ease-in"
      });
      accordion.classList.add("active");
      iconPlus.classList.add("active");
    }
  });
}

// Document ready event
document.addEventListener("DOMContentLoaded", function () {
  const accWrappers = document.querySelectorAll('[accordion="wrapper"]');

  if (accWrappers.length > 0) {
    accWrappers.forEach((accordion, index) => {
      const contentWrapper = accordion.querySelector('[accordion="content"]');
      const iconPlus = accordion.querySelector(".icon--plus");

      // Handle the accordion behavior
      handleAccordion(accordion, contentWrapper, iconPlus);

      // Open the first accordion by default
      if (index === 0) {
        const contentHeight = contentWrapper.scrollHeight;
        gsap.set(contentWrapper, { height: contentHeight });
        accordion.classList.add("active");
        iconPlus.classList.add("active");
      }
    });
  }
});

// Get the left accordion wrapper
const accordionLeftTriggerWrapper = document.querySelector(
  '[accordion="left"]'
);

// Get the right accordion wrapper
const accordionRightTargetWrapper = document.querySelector(
  '[accordion="right"]'
);

// Get all the child elements of the left accordion
const accordionLeftChildren = accordionLeftTriggerWrapper.children;

// Get all the child elements of the right accordion
const accordionRightChildren = accordionRightTargetWrapper.children;

// Add click event listeners to the left accordion children
for (let i = 0; i < accordionLeftChildren.length; i++) {
  accordionLeftChildren[i].addEventListener("click", function () {
    // Trigger the click event on the corresponding child element in the right accordion
    accordionRightChildren[i].click();
  });
}
