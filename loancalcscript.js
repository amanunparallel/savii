// dependency chartjs

const piectx = document.querySelector("[calc='chart']");

if (piectx) {
  var loanAmountTrack = document.querySelector("[calc='loan-amount']");
  var rateTrack = document.querySelector("[calc='rate']");
  var timeTrack = document.querySelector("[calc='time']");

  var loanAmountText = document.querySelector("[calc='text-loan-amount']");
  var rateText = document.querySelector("[calc='text-rate']");
  var timeText = document.querySelector("[calc='text-time']");
  var emiText = document.querySelector("[calc='emi']");
  var interestText = document.querySelector("[calc='interest-amount']");

  // Default values
  var defaultAmount = 100000;
  var defaultRate = 2;
  var defaultTime = 48;
  var thresholdRate = 3.6;

  loanAmountTrack.value = defaultAmount;
  rateTrack.value = defaultRate;
  timeTrack.value = defaultTime;
  loanAmountText.textContent = formatNumber(defaultAmount);
  rateText.textContent = defaultRate;
  timeText.textContent = defaultTime;

  // Variables for calculations
  var p = Number(defaultAmount); // principal amount
  var r = Number(defaultRate) / 100 / 12; // rate of interest per month
  var ntime = Number(defaultTime); // time in months

  // Calculate EMI and Interest
  var emi;
  var totalInterest;

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
              return " " + formatNumber(Math.round(value)); // Round and format the tooltip label
            },
            title: function () {
              return ""; // Hide the title in tooltips
            }
          }
        }
      }
    };

    function formatNumber(value) {
      // Implement your custom number formatting logic here if needed
      return value.toString();
    }

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

  var legendInterest = document.querySelector("[calc=legend-interest]");
  var legendPrincipal = document.querySelector("[calc=legend-principal]");
  var pieHeader = document.querySelector(".piechart-calculator--bottom--top");
  var pieFooter = document.querySelector(".piechart-calculator--bottom");
  var offerTag = document.querySelector("[calc=offer]");
  var offerTagText = offerTag.querySelector("p");

  var star = document.querySelector("[calc=star]");

  function ColorChange() {
    legendInterest.style.backgroundColor =
      rateTrack.value < thresholdRate ? "#7FA708" : "#DF5258";
    legendPrincipal.style.backgroundColor =
      rateTrack.value < thresholdRate ? "#D5F37B" : "#FFCBC7";
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
      rateTrack.value < thresholdRate ? "SAVII offers" : "Other offers";
  }

  ColorChange();
}
