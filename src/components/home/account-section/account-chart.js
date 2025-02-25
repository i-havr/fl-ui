import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler
} from "chart.js";
import { mockup } from "../../../constants";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler
);

let accountChartInstance = null;

const getFontSize = () => {
  if (window.innerWidth < 1024) {
    return 9;
  } else {
    return 14;
  }
};

function renderChart(account) {
  const canvas = document.getElementById("accountChart");
  if (!canvas) return;

  if (accountChartInstance !== null) {
    accountChartInstance.destroy();
  }

  const ctx = canvas.getContext("2d");

  const dateArr = account.history.map((entry) => entry.date);
  const balanceArr = account.history.map((entry) => entry.amount);
  const maxBalanceValue = balanceArr.length ? Math.max(...balanceArr) : 500;

  accountChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: dateArr,
      datasets: [
        {
          label: mockup.home.balance.balance,
          data: balanceArr,

          borderColor: "#074FDA",
          fill: true,
          cubicInterpolationMode: "monotone",
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 3,
          pointHoverRadius: 3,
          tension: 0.4
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      datasets: { line: { backgroundColor: "#ff0000" } },
      responsive: true,

      plugins: {
        legend: { display: true }
      },
      interaction: {
        intersect: false,
        mode: "nearest"
      },
      scales: {
        x: {
          display: true,
          ticks: {
            align: "inner",
            font: { family: "Montserrat", size: getFontSize() },
            maxRotation: 0,
            autoSkip: true,
            autoSkipPadding: 60
          }
        },
        y: {
          display: true,
          grid: {
            color: "rgba(86, 87, 122, 0.5)",
            drawTicks: false
          },
          ticks: {
            display: true,
            padding: 8,
            font: { family: "Montserrat", size: getFontSize() }
          },
          border: {
            color: "transparent",
            dash: [3]
          },
          title: {
            display: false
          },
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: maxBalanceValue * 1.2
        }
      }
    }
  });

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "rgba(7, 79, 218, 0.4)");
  gradient.addColorStop(1, "rgba(7, 79, 218, 0)");

  accountChartInstance.data.datasets[0].backgroundColor = gradient;
  accountChartInstance.update();
}

function handleResize(account) {
  setTimeout(() => {
    renderChart(account);
  }, 0);
}

export function AccountChart(account) {
  setTimeout(() => {
    renderChart(account);
  }, 0);

  window.addEventListener("resize", () => handleResize(account));

  return `<canvas id="accountChart"></canvas>
    `;
}
