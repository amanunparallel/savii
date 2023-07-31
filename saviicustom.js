// Marquee Code

// This code is an example of code

const init = () => {
  const marquees = document.querySelectorAll('[wb-data="marquee"]');
  if (!marquees) {
    return;
  }
  marquees.forEach((marquee) => {
    const duration = parseInt(marquee.getAttribute("duration"), 10) || 5;
    const marqueeContent = marquee.firstChild;
    if (!marqueeContent) {
      return;
    }

    const marqueeContentClone = marqueeContent.cloneNode(true);
    marquee.append(marqueeContentClone);

    let tween;

    const playMarquee = () => {
      let progress = tween ? tween.progress() : 0;
      tween && tween.progress(0).kill();
      const width = parseInt(
        getComputedStyle(marqueeContent).getPropertyValue("width"),
        10
      );
      const gap = parseInt(
        getComputedStyle(marqueeContent).getPropertyValue("column-gap"),
        10
      );
      const distanceToTranslate = -1 * (gap + width);

      tween = gsap.fromTo(
        marquee.children,
        { x: 0 },
        { x: distanceToTranslate, duration, ease: "none", repeat: -1 }
      );
      tween.progress(progress);
      console.log({ width });
    };
    playMarquee();

    function debounce(func) {
      var timer;
      return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(
          () => {
            func();
          },
          500,
          event
        );
      };
    }

    window.addEventListener("resize", debounce(playMarquee));
  });
};

document.addEventListener("DOMContentLoaded", init);


// Faqs Functionality

const getAllFaqs = document.querySelectorAll("[faq='item']");
if (getAllFaqs.length > 0) {
  getAllFaqs.forEach(item => {
    const wrapper = item.querySelector("[faq='wrapper']");
    gsap.set(wrapper, { backgroundColor: "#F7F7F7" });

    item.addEventListener("click", () => {
      const content = item.querySelector("[faq='content']");
      const icon = item.querySelector("[faq='icon']");

      const tl = gsap.timeline();
      if (content.offsetHeight > 10) {
        tl.to(content, { height: 0, duration: 0.3, ease: "ease-in" })
          .to(wrapper, { backgroundColor: "transparent", duration: 0.3, ease: "ease-in" }, 0)
          .to(icon, { rotation: 0, duration: 0.3, ease: "ease-in" }, 0);
      } else {
        tl.to(content, { height: "auto", duration: 0.3, ease: "ease-in" })
          .to(wrapper, { backgroundColor: "white", duration: 0.3, ease: "ease-in" }, 0)
          .to(icon, { rotation: 45, duration: 0.3, ease: "ease-in" }, 0);
      }
    });
  });
} else {
  console.log("No FAQs found. The code will not execute.");
}

// Employers Page Code

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
const accordionLeftTriggerWrapper = document.querySelector('[accordion="left"]');

// Get the right accordion wrapper
const accordionRightTargetWrapper = document.querySelector('[accordion="right"]');

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



// Calculator Loan Page

const piectx = document.querySelector("[calc='chart']");

if (piectx) {
  let loanAmountTrack = document.querySelector("[calc='loan-amount']");
  let rateTrack = document.querySelector("[calc='rate']");
  let timeTrack = document.querySelector("[calc='time']");

  let loanAmountText = document.querySelector("[calc='text-loan-amount']");
  let rateText = document.querySelector("[calc='text-rate']");
  let timeText = document.querySelector("[calc='text-time']");
  let emiText = document.querySelector("[calc='emi']");
  let interestText = document.querySelector("[calc='interest-amount']");

  // Default values
  let defaultAmount = 100000;
  let defaultRate = 2;
  let defaultTime = 48;
  let thresholdRate = 3.6;

  loanAmountTrack.value = defaultAmount;
  rateTrack.value = defaultRate;
  timeTrack.value = defaultTime;
  loanAmountText.textContent = formatNumber(defaultAmount);
  rateText.textContent = defaultRate;
  timeText.textContent = defaultTime;

  // Variables for calculations
  let p = Number(defaultAmount); // principal amount
  let r = Number(defaultRate) / 100 / 12; // rate of interest per month
  let ntime = Number(defaultTime); // time in months

  // Calculate EMI and Interest
  let emi;
  let totalInterest;

  function calcEmi() {
    emi = (p * r * Math.pow(1 + r, ntime)) / (Math.pow(1 + r, ntime) - 1);
    emiText.textContent = formatNumber(Math.round(emi)); // Display rounded EMI in international format

    totalInterest = emi * ntime - p; // Calculate total interest
    interestText.textContent = formatNumber(Math.round(totalInterest)); // Display rounded total interest in international format

    // Update doughnut chart with new values
    doughnutRender(p, totalInterest);
  }
  calcEmi(); // Calculate EMI initially

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  // Event listeners for range sliders
  loanAmountTrack.addEventListener("input", function () {
    loanAmountText.textContent = formatNumber(loanAmountTrack.value);
    p = Number(loanAmountTrack.value);
    calcEmi();
  });

  rateTrack.addEventListener("input", function () {
    rateText.textContent = rateTrack.value;
    r = Number(rateTrack.value) / 100 / 12;
    doughnutRender(p, totalInterest); // Call doughnutRender directly with the updated values
    calcEmi(); // Recalculate EMI and total interest
    ColorChange();
  });

  timeTrack.addEventListener("input", function () {
    timeText.textContent = timeTrack.value;
    ntime = Number(timeTrack.value);
    calcEmi();
  });

  function doughnutRender(Principal, Interest) {
    // Data for the chart
    const data = {
      labels: ["Principal amount", "Interest amount"],
      datasets: [
        {
          data: [Principal, Interest],
          backgroundColor: [
            rateTrack.value < thresholdRate ? "#D5F37B" : "#FFCBC7",
            rateTrack.value < thresholdRate ? "#7FA708" : "#DF5258"
          ],
          borderWidth: 0 // Set border width to 0
        }
      ]
    };

    // Configuration options with custom tooltips
    const options = {
      responsive: true,
      animation: false,
      plugins: {
        legend: {
          display: false // Hide the legend
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let value = context.parsed;
              return " " + formatNumber(value); // Format the tooltip label
            },
            title: function () {
              return ""; // Hide the title in tooltips
            }
          }
        }
      }
    };

    // If the previous chart instance exists, destroy it to prevent duplicates
    if (piectx.chart) {
      piectx.chart.destroy();
    }

    // Create the new chart
    piectx.chart = new Chart(piectx, {
      type: "doughnut",
      data: data,
      options: options
    });
  }

  // Colors Change

  let legendInterest = document.querySelector("[calc=legend-interest]");
  let legendPrincipal = document.querySelector("[calc=legend-principal]");
  let pieHeader = document.querySelector(".piechart-calculator--bottom--top");
  let pieFooter = document.querySelector(".piechart-calculator--bottom");
  let offerTag = document.querySelector("[calc=offer]");
  let offerTagText = offerTag.querySelector("p");

  let star = document.querySelector("[calc=star]");

  console.log(legendPrincipal, legendInterest);

  function ColorChange() {
    legendInterest.style.backgroundColor =
      rateTrack.value < thresholdRate ? "#D5F37B" : "#FFCBC7";
    legendPrincipal.style.backgroundColor =
      rateTrack.value < thresholdRate ? "#7FA708" : "#DF5258";
    pieHeader.style.backgroundColor =
      rateTrack.value < thresholdRate ? "#D5F37B" : "#DF5258";
    pieHeader.style.color = rateTrack.value < thresholdRate ? "black" : "white";
    pieFooter.style.backgroundColor =
      rateTrack.value < thresholdRate ? "#e7fbad" : "#FFCBC7";
    star.style.color = rateTrack.value < thresholdRate ? "#748806" : "white";

    offerTag.style.backgroundColor =
      rateTrack.value < thresholdRate ? "#E7FBAD" : "#FFCBC7";
    offerTag.style.color =
      rateTrack.value < thresholdRate ? "#748806" : "#DF5258";
    offerTagText.textContent =
      rateTrack.value < thresholdRate ? "SAVII offers" : "Others offers";
  }

  ColorChange();
}

// Savings Calculator

const amount = document.querySelector("input[calc='amount']");
const time = document.querySelector("input[calc='time']");
const textEarningSix = document.querySelector("[calc='earningsix']");
const textEarningFour = document.querySelector("[calc='earningfour']");

if (textEarningSix) {
  // Function to calculate earnings
  function calcEarnings(principal, interestRate, timeInMonths) {
    const earnings = principal * (interestRate / 100) * (timeInMonths / 12);
    return Math.round(earnings); // Round the earnings to the nearest whole number
  }

  // Function to update the text elements with the calculated earnings
  function updateEarnings() {
    const principalAmount = parseFloat(amount.value);
    const timeInMonths = parseFloat(time.value);

    const interestRateSix = 6;
    const interestRateFour = 4;

    const earningsSix = calcEarnings(
      principalAmount,
      interestRateSix,
      timeInMonths
    );
    const earningsFour = calcEarnings(
      principalAmount,
      interestRateFour,
      timeInMonths
    );

    textEarningSix.textContent = earningsSix;
    textEarningFour.textContent = earningsFour;
  }

  // Add an event listener to the slider to detect changes
  amount.addEventListener("input", updateEarnings);
  time.addEventListener("input", updateEarnings);
}


// JavaScript code
let tabsComponents = document.querySelectorAll("[products='tab']");

if (tabsComponents.length > 0) {
  function tabsfunction(tab) {
    let productTablinks = tab.querySelectorAll("[products='tablink']");
    let productTabContent = tab.querySelectorAll("[products='tab-content']");

    // Add click event listener to each tab link
    productTablinks.forEach((tablink, index) => {
      tablink.addEventListener("click", () => {
        // Remove "active" class from all tab links and tab contents
        productTablinks.forEach((tl) => tl.classList.remove("active"));
        productTabContent.forEach((tc) => tc.classList.remove("active"));

        // Add "active" class to the clicked tab link and its corresponding tab content
        tablink.classList.add("active");
        productTabContent[index].classList.add("active");
      });
    });
  }

  tabsComponents.forEach((tab) => {
    tabsfunction(tab);
  });
}

