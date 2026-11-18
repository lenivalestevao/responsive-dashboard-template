document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  function toggleSidebar() {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");
  }

  menuToggle.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      document.querySelector(".topbar h1").textContent = link.textContent.trim().replace(/^\S+\s/, "");
      if (window.innerWidth <= 768) {
        toggleSidebar();
      }
    });
  });

  const chartPlaceholder = document.getElementById("chartPlaceholder");
  const chartValues = [40, 65, 50, 80, 60, 95, 70, 55, 85, 75, 90, 68];
  chartValues.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.height = value + "%";
    chartPlaceholder.appendChild(bar);
  });

  const trafficSources = [
    { label: "Direct", value: "42%", color: "#4e73df" },
    { label: "Organic Search", value: "28%", color: "#1cc88a" },
    { label: "Social Media", value: "18%", color: "#f6c23e" },
    { label: "Referral", value: "12%", color: "#e74a3b" }
  ];

  const trafficList = document.getElementById("trafficList");
  trafficSources.forEach((source) => {
    const li = document.createElement("li");
    li.innerHTML = '<span><span class="legend-dot" style="background:' + source.color + '"></span>' + source.label + '</span><strong>' + source.value + '</strong>';
    trafficList.appendChild(li);
  });

  const orders = [
    { id: "#3021", customer: "Marina Souza", status: "paid", amount: "$240.00" },
    { id: "#3020", customer: "Carlos Lima", status: "pending", amount: "$89.90" },
    { id: "#3019", customer: "Beatriz Alves", status: "paid", amount: "$512.30" },
    { id: "#3018", customer: "Rafael Costa", status: "failed", amount: "$75.00" },
    { id: "#3017", customer: "Juliana Pires", status: "paid", amount: "$198.50" },
    { id: "#3016", customer: "Thiago Nunes", status: "pending", amount: "$340.00" }
  ];

  const ordersBody = document.getElementById("ordersBody");
  orders.forEach((order) => {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td>' + order.id + '</td><td>' + order.customer + '</td><td><span class="badge ' + order.status + '">' + order.status + '</span></td><td>' + order.amount + '</td>';
    ordersBody.appendChild(tr);
  });
});
