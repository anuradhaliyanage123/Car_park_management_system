// Toggle sidebar on mobile
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
  });
  
  // Toggle user profile menu
  document.getElementById('userProfile').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('userProfileMenu').classList.toggle('show');
  });
  
  // Close user profile menu when clicking elsewhere
  document.addEventListener('click', function() {
    document.getElementById('userProfileMenu').classList.remove('show');
  });
  
  // Payment modal functionality
  const paymentsMenuItem = document.getElementById('paymentsMenuItem');
  const paymentModal = document.getElementById('paymentModal');
  const closeModal = document.getElementById('closeModal');
  const visaOption = document.getElementById('visaOption');
  const mastercardOption = document.getElementById('mastercardOption');
  
  // Open payment modal when payments menu item is clicked
  paymentsMenuItem.addEventListener('click', function(e) {
    e.preventDefault();
    paymentModal.style.display = 'flex';
  });
  
  // Close modal when X button is clicked
  closeModal.addEventListener('click', function() {
    paymentModal.style.display = 'none';
  });
  
  // Close modal when clicking outside the modal content
  paymentModal.addEventListener('click', function(e) {
    if (e.target === paymentModal) {
      paymentModal.style.display = 'none';
    }
  });
  
  // Toggle between payment options
  visaOption.addEventListener('click', function() {
    visaOption.classList.add('selected');
    mastercardOption.classList.remove('selected');
  });
  
  mastercardOption.addEventListener('click', function() {
    mastercardOption.classList.add('selected');
    visaOption.classList.remove('selected');
  });
  
  // Handle form submission
  document.querySelector('.submit-payment').addEventListener('click', function() {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      alert('Please fill in all payment details');
      return;
    }
    
    // In a real app, you would process the payment here
    alert('Payment processed successfully!');
    paymentModal.style.display = 'none';
  });
  
  // Settings modal functionality
  const settingsMenuItem = document.getElementById('settingsMenuItem');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettingsModal = document.getElementById('closeSettingsModal');
  
  // Open settings modal when settings menu item is clicked
  settingsMenuItem.addEventListener('click', function(e) {
    e.preventDefault();
    settingsModal.style.display = 'flex';
  });
  
  // Close modal when X button is clicked
  closeSettingsModal.addEventListener('click', function() {
    settingsModal.style.display = 'none';
  });
  
  // Close modal when clicking outside the modal content
  settingsModal.addEventListener('click', function(e) {
    if (e.target === settingsModal) {
      settingsModal.style.display = 'none';
    }
  });
  
  // Handle settings form submission
  document.getElementById('saveSettings').addEventListener('click', function() {
    const parkingRate = document.getElementById('parkingRate').value;
    const totalSlots = document.getElementById('totalSlots').value;
    const businessHours = document.getElementById('businessHours').value;
    const enableNotifications = document.getElementById('enableNotifications').checked;
    
    // In a real app, you would save these settings
    alert('Settings saved successfully!');
    settingsModal.style.display = 'none';
  });
  
  // Dashboard functionality
  const slotData = {
    Slot1: { status: "Occupied", updated: "2025-05-27 10:00 AM", price: 20, parkingTime: 2 },
    Slot2: { status: "Available", updated: "2025-05-27 10:15 AM", price: 5, parkingTime: 0 },
    Slot3: { status: "Occupied", updated: "2025-05-27 10:20 AM", price: 15, parkingTime: 1.5 },
    Slot4: { status: "Available", updated: "2025-05-27 10:25 AM", price: 10, parkingTime: 0 },
    Slot5: { status: "Occupied", updated: "2025-05-27 10:30 AM", price: 25, parkingTime: 3 },
    Slot6: { status: "Occupied", updated: "2025-05-27 10:35 AM", price: 30, parkingTime: 4 },
  };
  
  const parkingTableBody = document.querySelector('#parkingTable tbody');
  let availableCount = 0;
  let bookedCount = 0;
  let totalRevenue = 0;
  const slotLabels = [];
  const priceValues = [];
  
  for (const [slotId, slot] of Object.entries(slotData)) {
    const row = parkingTableBody.insertRow();
  
    // Slot ID
    const slotCell = row.insertCell(0);
    slotCell.innerHTML = `<div><strong>${slotId}</strong><div class="time">${slot.updated}</div></div>`;
  
    // Status
    const statusCell = row.insertCell(1);
    const statusClass = slot.status === "Available" ? "status-available" : "status-booked";
    statusCell.innerHTML = `<span class="status ${statusClass}">${slot.status}</span>`;
  
    // Parking Time
    row.insertCell(2).innerHTML = slot.parkingTime > 0 
      ? `${slot.parkingTime.toFixed(1)} hrs` 
      : '<span class="time">Not occupied</span>';
  
    // Price
    row.insertCell(3).innerHTML = slot.price > 0 
      ? `<span class="price">$${slot.price.toFixed(2)}</span>` 
      : '<span class="time">-</span>';
  
    // Actions
    const actionCell = row.insertCell(4);
    actionCell.innerHTML = `
      <div class="actions">
        <button class="report-button" onclick="printSlotReport('${slotId}')">
          <i class="fas fa-file-alt"></i> Report
        </button>
        <div class="action-btn" onclick="showSlotDetails('${slotId}')">
          <i class="fas fa-eye"></i>
        </div>
      </div>
    `;
  
    if (slot.status === "Available") availableCount++;
    else bookedCount++;
  
    totalRevenue += slot.price;
  
    slotLabels.push(slotId);
    priceValues.push(slot.price);
  }
  
  document.getElementById("availableSlots").textContent = availableCount;
  document.getElementById("bookedSlots").textContent = bookedCount;
  document.getElementById("totalRevenue").textContent = totalRevenue.toFixed(2);
  
  // Update time
  function updateTime() {
    const now = new Date();
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    };
    document.getElementById('updateTime').textContent = now.toLocaleTimeString('en-US', options);
  }
  updateTime();
  setInterval(updateTime, 1000);
  
  // Chart
  const ctx = document.getElementById('slotChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: slotLabels,
      datasets: [{
        label: 'Revenue ($)',
        data: priceValues,
        backgroundColor: '#4361ee',
        borderRadius: 6,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#e2e8f0'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
  
  function printSlotReport(slotId) {
    const slot = slotData[slotId];
    const reportHTML = `
      <html>
      <head>
        <title>Report for ${slotId}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 30px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h2 { color: #4361ee; margin-bottom: 5px; }
          .header p { color: #666; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #4361ee; color: white; }
          .logo { font-size: 24px; font-weight: bold; color: #4361ee; margin-bottom: 10px; }
          .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">PARK<span style="color: #333;">ING</span></div>
          <h2>Parking Slot Report - ${slotId}</h2>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
        <table>
          <tr><th>Slot ID</th><td>${slotId}</td></tr>
          <tr><th>Last Updated</th><td>${slot.updated}</td></tr>
          <tr><th>Parking Time</th><td>${slot.parkingTime > 0 ? slot.parkingTime.toFixed(2) + ' hours' : 'Not occupied'}</td></tr>
          <tr><th>Total Price</th><td>$${slot.price > 0 ? slot.price.toFixed(2) : '0.00'}</td></tr>
        </table>
        <div class="footer">
          <p>This is an automatically generated report from Parking System Dashboard</p>
        </div>
      </body>
      </html>
    `;
  
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(reportHTML);
    printWindow.document.close();
    
    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }
  
  function showSlotDetails(slotId) {
    alert(`Showing details for ${slotId}\nThis would open a detailed modal in a real application.`);
  }