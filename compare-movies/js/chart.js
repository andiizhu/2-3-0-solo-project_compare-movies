import Chart from "chart.js/auto";
import movieData from "../../movie-data.json";
import {
  getLocalStorageKey,
  setLocalStorageKey,
} from "./local-storage-helpers";

export const renderChart = () => {
  let movieChartData = getLocalStorageKey("movieList");
  console.log(movieChartData);

  const barChart = document.getElementById("bar-chart");
  if (window.myBarChart) {
    window.myBarChart.destroy();
  }
  window.myBarChart = new Chart(barChart, {
    type: "bar",
    data: {
      labels: movieChartData.map((movie) => movie.title),
      datasets: [
        {
          label: "Domestic Box Office",
          data: movieChartData.map((movie) => movie.domestic),
        },
      ],
    },
  });

  const genreRevenue = movieChartData.reduce((acc, movie) => {
    if (!acc[movie.genre]) {
      acc[movie.genre] = 0;
    }
    acc[movie.genre] += movie.domestic;
    return acc;
  }, {});

  // Prepare the data for the pie chart
  const labels = Object.keys(genreRevenue);
  const data = Object.values(genreRevenue);

  const doughnutChart = document.getElementById("doughtnut-chart");

  if (window.myDoughnutChart) {
    window.myDoughnutChart.destroy();
  }
  window.myDoughnutChart = new Chart(doughnutChart, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
        },
      ],
    },
  });

  const scatterplotData = {
    datasets: [
      {
        label: "Critic Score vs Audience Score",
        data: movieChartData.map((movie) => ({
          x: movie.criticScore,
          y: movie.audienceScore,
        })),
      },
    ],
  };

  const scatterplotChart = document.getElementById("scatterplot");
  if (window.myScatterplotChart) {
    window.myScatterplotChart.destroy();
  }
  window.myScatterplotChart = new Chart(scatterplotChart, {
    type: "scatter",
    data: scatterplotData,
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: "Critic Score",
          },
        },
        y: {
          title: {
            display: true,
            text: "Audience Score",
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: "Critic Score vs Audience Score",
        },
        tooltip: {
          callbacks: {
            // Custom label format
            label: function (context) {
              const movie = movieChartData[context.dataIndex];
              return `Title: ${movie.title}\nCritic Score: ${context.raw.x}\nAudience Score: ${context.raw.y}`;
            },
          },
        },
      },
    },
  });
};
