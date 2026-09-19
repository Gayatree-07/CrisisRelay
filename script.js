let countdownInterval;
let mediaRecorder, chunks = [];
let targetSafePin = "1234";
let targetDuressPin = "9999";
let systemState = "IDLE"; // IDLE, COUNTING
let countdown = 10; 

// Memory Storage Matrix 
let secureHashedSafePin = "";
let secureHashedDuressPin = "";

const safetyQuotes = [
    `"Safety isn't expensive, it's priceless."`,
    `"Preparation is the best shield against danger."`,
    `"Your safety is your family's peace of mind."`
];

window.onload = function() {
    const randomIndex = Math.floor(Math.random() * safetyQuotes.length);
    document.getElementById("safetyQuote").innerText = safetyQuotes[randomIndex];

    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); 
        if (!e.target.value.startsWith('+91')) {
            e.target.value = '+91 ';
            return;
        }
        let rawNum = e.target.value.replace('+91', '').replace(/\s+/g, '').replace('-', '');
        if (rawNum.length > 0) {
            let part1 = rawNum.substring(0, 5);
            let part2 = rawNum.substring(5, 10);
            if (rawNum.length > 5) { e.target.value = `+91 ${part1}-${part2}`; } 
            else { e.target.value = `+91 ${part1}`; }
        }
    });
};

function cypherScramble(inputString) {
    let hash = 0;
    for (let i = 0; i < inputString.length; i++) {
        let char = inputString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; 
    }
    return "CR_HASH_" + Math.abs(hash);
}

function handleMainTap() {
    if (systemState === "IDLE") {
        const phone = document.getElementById('phone').value;
        const rawSafe = document.getElementById('safePin').value;
        const rawDuress = document.getElementById('duressPin').value;

        if (!phone || phone.length < 14) { alert('Please enter a valid emergency phone number!'); return; }
        if (!rawSafe || !rawDuress) { alert('Please configure both Security PIN parameters first!'); return; }
        if (rawSafe === rawDuress) { alert('Security Error: PIN inputs cannot be identical!'); return; }
        
        targetSafePin = rawSafe;
        targetDuressPin = rawDuress;
        secureHashedSafePin = cypherScramble(rawSafe);
        secureHashedDuressPin = cypherScramble(rawDuress);

        if (navigator.vibrate) { navigator.vibrate(60); }
        startGuard();
    }
}

function startGuard() {
    systemState = "COUNTING";
    const btn = document.getElementById('actionBtn');
    
    btn.classList.add('counting');
    document.getElementById('setupForm').style.display = 'none';
    document.getElementById('pinArea').style.display = 'block';
    document.getElementById('instantSosLink').style.display = 'flex'; 
    
    countdown = 10; 

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    btn.innerText = formatTime(countdown);
    document.getElementById('statusText').innerText = "Cloud Timer Active. Tap to Disarm.";

    countdownInterval = setInterval(() => {
        countdown--;
        btn.innerText = formatTime(countdown);
        if (countdown <= 3 && countdown > 0) {
            btn.classList.add('critical-flash');
            if (navigator.vibrate) { navigator.vibrate(); } 
        }
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            btn.classList.remove('critical-flash');
            executeFinalCrisisTrigger("AUTOMATIC_TIMEOUT");
        }
    }, 1000);
}

async function verifyPin() {
    const enteredInput = document.getElementById('enteredPin').value;
    const phone = document.getElementById('phone').value;
    const covertScreen = document.getElementById('covertCrashScreen');

    if (enteredInput === targetSafePin) {
        clearInterval(countdownInterval);
        if (navigator.vibrate) { navigator.vibrate(60); }
        resetToDefault("System safely disarmed.");
    } 
    else if (enteredInput === targetDuressPin) {
        clearInterval(countdownInterval);
        if (navigator.vibrate) { navigator.vibrate(500); } 
        
        // Lock UI view instantly by shifting display over to your dark visualizer mask layer
        document.getElementById('app-window') ? document.getElementById('app-window').style.display = 'none' : document.querySelector('.card').style.display = 'none';
        covertScreen.style.display = 'block';

        // Launch ambient micro-audio evidence stream extraction framework in background
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            chunks = [];
            mediaRecorder.ondataavailable = e => chunks.push(e.data);
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/mp3' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `crisis_forensic_evidence.mp3`;
                link.innerText = "[EXPORT SECURITY AUDIO RECORDS]";
                link.style.cssText = "position:absolute; bottom:30px; left:30px; color:#475569; font-family:sans-serif; text-decoration:none; font-size:0.8rem; font-weight:bold;";
                covertScreen.appendChild(link);
            };
            mediaRecorder.start();
            setTimeout(() => { if(mediaRecorder.state !== "inactive") { mediaRecorder.stop(); stream.getTracks().forEach(t => t.stop()); } }, 10000);
        } catch(e) { console.log("Audio pipeline armed local fallback."); }
        
        executeFinalCrisisTrigger("SILENT_DURESS");
    } else {
        if (navigator.vibrate) { navigator.vibrate(100); } 
        alert("Security Breach: Incorrect Validation Token.");
        document.getElementById('enteredPin').value = "";
    }
}

function triggerInstantCloudSos() {
    clearInterval(countdownInterval);
    if (navigator.vibrate) { navigator.vibrate(200); } 
    executeFinalCrisisTrigger("INSTANT_OVERRIDE_TAP");
}

function executeFinalCrisisTrigger(triggerReason) {
    const phone = document.getElementById('phone').value;
    const selectedLang = document.querySelector('input[name="lang"]:checked').value;
    
    if(triggerReason !== "SILENT_DURESS") {
        document.getElementById('instantSosLink').style.display = 'none';
        document.getElementById('statusText').innerText = "🚨 SOS Triggered! Routing alerts...";
        
        // 📢 SHOW DYNAMIC MOCK ALERT DIALOG IMMEDIATELY
        alert(`🚨 [CRISISRELAY LOCAL SYSTEM DISPATCH]\n\n` +
              `Distress payload sent successfully!\n` +
              `📞 Target Phone: ${phone}\n` +
              `🌐 Language Track: [${selectedLang}]\n` +
              `⚡ Trigger Reason: ${triggerReason}\n` +
              `📍 Status: GPS Coordinates Mapped & Dispatched.`);
    } else {
        console.log(`Silent Duress sent to ${phone} with lang [${selectedLang}]`);
    }
}

function resetToDefault(message) {
    systemState = "IDLE";
    const btn = document.getElementById('actionBtn');
    clearInterval(countdownInterval);
    btn.className = "circle-btn";
    btn.innerText = "START";
    document.getElementById('setupForm').style.display = 'block';
    document.getElementById('pinArea').style.display = 'none';
    document.getElementById('instantSosLink').style.display = 'none'; 
    document.getElementById('enteredPin').value = "";
    document.getElementById('safePin').value = ""; 
    document.getElementById('duressPin').value = "";
    secureHashedSafePin = "";
    secureHashedDuressPin = "";
    document.getElementById('statusText').innerText = "System: " + message;
}
