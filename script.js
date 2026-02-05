// --- State Management ---
let currentMode = 'parking';
let isOccupied = false;

// --- Wait for DOM to be fully loaded ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // DOM Elements
    const sensor = document.getElementById('sensorLight');
    const statusText = document.getElementById('statusText');
    const scanBtn = document.getElementById('scanBtn');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const modeButtons = document.querySelectorAll('.mode-btn');

    // Asset Groups
    const parkingAssets = document.querySelectorAll('.asset-parking');
    const deskAssets = document.querySelectorAll('.asset-desk');
    const evAssets = document.querySelectorAll('.asset-ev');
    
    // Animated Elements
    const parkingCar = document.getElementById('parkingCar');
    const worker = document.getElementById('worker');
    const evCar = document.getElementById('evCar');

    // --- Helper Functions ---
    
    function hideAllAssets() {
        console.log('Hiding all assets');
        parkingAssets.forEach(el => el.style.display = 'none');
        deskAssets.forEach(el => el.style.display = 'none');
        evAssets.forEach(el => el.style.display = 'none');
    }

    function showAssets(mode) {
        console.log('Showing assets for mode:', mode);
        hideAllAssets();
        
        if (mode === 'parking') {
            parkingAssets.forEach(el => el.style.display = 'block');
        } else if (mode === 'desk') {
            deskAssets.forEach(el => el.style.display = 'block');
        } else if (mode === 'ev') {
            evAssets.forEach(el => el.style.display = 'block');
        }
    }

    function resetVisuals() {
        console.log('Resetting visuals');
        
        // Reset sensor
        sensor.classList.remove('occupied');
        statusText.textContent = "Available";
        statusText.style.color = "#22c55e";
        
        // Reset all animations
        if (parkingCar) {
            parkingCar.style.transform = "translateY(0)";
        }
        if (evCar) {
            evCar.style.transform = "translateY(0)";
        }
        if (worker) {
            worker.style.opacity = "0";
            worker.style.transform = "scale(0.5)";
        }
    }

    // --- Mode Switching ---
    function setMode(mode, buttonElement) {
        console.log('Setting mode to:', mode);
        
        currentMode = mode;
        isOccupied = false;
        
        // Update button states
        modeButtons.forEach(btn => btn.classList.remove('active'));
        buttonElement.classList.add('active');
        
        // Reset and show appropriate assets
        resetVisuals();
        showAssets(mode);
    }

    // --- QR Scan Simulation ---
    function simulateScan() {
        console.log('Simulating scan, current mode:', currentMode, 'occupied:', isOccupied);
        
        isOccupied = !isOccupied;

        if (isOccupied) {
            // Mark as occupied
            sensor.classList.add('occupied');
            statusText.textContent = "Occupied";
            statusText.style.color = "#ef4444";

            // Trigger animation based on mode
            if (currentMode === 'parking') {
                console.log('Animating parking car');
                parkingCar.style.transform = "translateY(-160px)";
            } else if (currentMode === 'desk') {
                console.log('Animating worker');
                worker.style.opacity = "1";
                worker.style.transform = "scale(1)";
            } else if (currentMode === 'ev') {
                console.log('Animating EV car');
                evCar.style.transform = "translateY(-160px)";
            }

        } else {
            // Mark as available
            sensor.classList.remove('occupied');
            statusText.textContent = "Available";
            statusText.style.color = "#22c55e";

            // Reverse animation based on mode
            if (currentMode === 'parking') {
                console.log('Reversing parking car');
                parkingCar.style.transform = "translateY(0)";
            } else if (currentMode === 'desk') {
                console.log('Reversing worker');
                worker.style.opacity = "0";
                worker.style.transform = "scale(0.5)";
            } else if (currentMode === 'ev') {
                console.log('Reversing EV car');
                evCar.style.transform = "translateY(0)";
            }
        }
    }

    // --- Event Listeners ---
    
    // Mode button clicks
    modeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            console.log('Mode button clicked:', mode);
            setMode(mode, this);
        });
    });

    // Scan button click
    if (scanBtn) {
        scanBtn.addEventListener('click', simulateScan);
    }

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // --- Initialize ---
    console.log('Initializing with parking mode');
    hideAllAssets();
    
    // Set parking as default
    if (modeButtons.length > 0) {
        setMode('parking', modeButtons[0]);
    }
    
    console.log('Initialization complete');
});
