// ... (your existing JavaScript code for transactions, event listeners, and balance)

// Now, add the Chart.js-related code below:

// Select the canvas element
const ctx = document.getElementById("myChart").getContext("2d");

// Sample data for income and expenses
const data = {
  labels: ["Income", "Expense"],
  datasets: [
    {
      data: [1000, 500], // Replace with your actual income and expense values
      backgroundColor: ["#2ecc71", "#e74c3c"], // Green for income, Red for expense
    },
  ],
};

// Create a new chart with the data
const myChart = new Chart(ctx, {
  type: "doughnut", // Use a doughnut chart for a circular theme
  data: data,
  options: {
    legend: {
      display: true, // Show the legend
    },
  },
});

// Function to update chart data
function updateChart(income, expense) {
  // Update the data with new income and expense values
  myChart.data.datasets[0].data = [income, expense];

  // Update the chart
  myChart.update();
}

// Example usage:
// Call updateChart with your actual income and expense values
// updateChart(2000, 800);
