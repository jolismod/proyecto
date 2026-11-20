// 1. LÓGICA DE MODALES
function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
    }
}

// 2. LÓGICA DEL SIMULADOR M
const mBtn = document.getElementById('m-trigger-btn');
const stBtn = document.getElementById('st-btn');
const stRf = document.getElementById('st-rf');
const stBuzzer = document.getElementById('st-buzzer');
const stLeds = document.getElementById('st-leds');
const terminalLog = document.getElementById('terminal-log');

function getTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
}

function addLog(text, color = '#38bdf8') {
    const p = document.createElement('p');
    p.style.color = color;
    p.innerText = `[${getTime()}] > ${text}`;
    terminalLog.appendChild(p);
    terminalLog.scrollTop = terminalLog.scrollHeight;
}

mBtn.addEventListener('click', () => {
    if(mBtn.disabled) return;
    mBtn.disabled = true;

    stBtn.innerText = 'PRESIONADO';
    stBtn.className = 'status-badge active-red';
    addLog('¡INTERRUPCIÓN DETECTADA EN PIN 2! (Botón de pánico activo)', '#ef4444');

    setTimeout(() => {
        stRf.innerText = 'TRANSMITIENDO...';
        stRf.className = 'status-badge active-red';
        addLog('Enviando ráfaga de datos por Radiofrecuencia (433MHz)...', '#f59e0b');
    }, 500);

    setTimeout(() => {
        stBuzzer.innerText = 'DISPARADO (HIGH)';
        stBuzzer.className = 'status-badge active-red';
        stLeds.innerText = 'DESTELLANDO';
        stLeds.className = 'status-badge active-red';
        mBtn.innerText = '🚨 ALERTA ACTIVA EN PROCESO';
        mBtn.style.background = '#ef4444';
        addLog('Receptor RF sincronizado. Salidas activadas: Buzzer (Pin 10) y LEDs (Pin 12)', '#10b981');
    }, 1200);

    setTimeout(() => {
        stBtn.innerText = 'INACTIVO';
        stBtn.className = 'status-badge';
        stRf.innerText = 'STANDBY';
        stRf.className = 'status-badge';
        stBuzzer.innerText = 'OFF';
        stBuzzer.className = 'status-badge';
        stLeds.innerText = 'OFF';
        stLeds.className = 'status-badge';
        mBtn.innerText = '🚨 ACCIONAR BOTÓN DE PÁNICO';
        mBtn.style.background = 'linear-gradient(135deg, #06b6d4, #2563eb)';
        addLog('Ciclo de alerta finalizado. Reiniciando escuchas del sistema...', '#38bdf8');
        mBtn.disabled = false;
    }, 4500);
});

// 3. NAVEGACIÓN ACTIVA Y ANIMACIONES AL SCROLL
document.addEventListener('DOMContentLoaded', () => {
    console.log('SISPA Web: Sistema cargado correctamente.');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');

    function updateActiveLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    function revealSections() {
        sections.forEach(section => {
            const windowHeight = window.innerHeight;
            const sectionTop = section.getBoundingClientRect().top;
            const revealPoint = 150;
            if (sectionTop < windowHeight - revealPoint) {
                section.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', () => {
        updateActiveLink();
        revealSections();
    });

    updateActiveLink();
    revealSections();
});