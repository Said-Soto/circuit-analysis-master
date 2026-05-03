const app = {
    currentTopic: null,
    currentExerciseIndex: 0,
    currentStep: 0,
    
    data: {
        mallas: [
            {
                title: "Mallas: Ejercicio 1 (Básico)",
                image: "assets/mesh1.png",
                problem: "Determine las corrientes de malla i1 e i2. V1=12V, V2=6V, R1=2Ω, R2=4Ω, R3=3Ω (centro).",
                steps: [
                    { desc: "Malla 1: KVL", content: "2i1 + 3(i1 - i2) = 12", formula: "5i1 - 3i2 = 12" },
                    { desc: "Malla 2: KVL", content: "4i2 + 3(i2 - i1) = -6", formula: "-3i1 + 7i2 = -6" },
                    { desc: "Solución", content: "Resolviendo el sistema...", formula: "i1 = 2.54 A, i2 = 0.23 A" }
                ],
                answer: "i1 = 2.54 A, i2 = 0.23 A"
            },
            {
                title: "Mallas: Ejercicio 2 (Tres Mallas)",
                image: "https://via.placeholder.com/600x300/ffffff/000000?text=Circuito+3+Mallas+(Pronto)",
                problem: "Un circuito con 3 lazos. M1 tiene 10V, M2 tiene una R de 5Ω compartida, M3 tiene 5V. Encuentre i1, i2, i3.",
                steps: [
                    { desc: "Ecuaciones", content: "Malla 1: 10i1 - 5i2 = 10\nMalla 2: -5i1 + 15i2 - 5i3 = 0\nMalla 3: -5i2 + 10i3 = -5", formula: "Sistema 3x3" },
                    { desc: "Resultado", content: "Resolviendo por Cramer...", formula: "i1 = 1.25A, i2 = 0.5A, i3 = -0.25A" }
                ],
                answer: "i1=1.25A, i2=0.5A, i3=-0.25A"
            },
            {
                title: "Mallas: Ejercicio 3 (Supermalla)",
                image: "https://via.placeholder.com/600x300/ffffff/000000?text=Supermalla",
                problem: "Encuentre las corrientes cuando hay una fuente de corriente de 2A entre dos mallas.",
                steps: [
                    { desc: "Relación", content: "i2 - i1 = 2A", formula: "Ecuación de restricción" },
                    { desc: "KVL Supermalla", content: "Ecuación recorriendo el exterior de ambas mallas.", formula: "5i1 + 10i2 = 20" },
                    { desc: "Solución", content: "Sustituyendo i2 = i1 + 2...", formula: "i1 = 0 A, i2 = 2 A" }
                ],
                answer: "i1 = 0 A, i2 = 2 A"
            }
        ],
        nodos: [
            {
                title: "Nodos: Ejercicio 1",
                image: "assets/node1.png",
                problem: "Va y Vb. I=5A, R1=10, R2=5, R3=2.",
                steps: [
                    { desc: "Nodo A", content: "5 = Va/5 + (Va-Vb)/10", formula: "3Va - Vb = 50" },
                    { desc: "Nodo B", content: "(Vb-Va)/10 + Vb/2 = 0", formula: "-Va + 6Vb = 0" },
                    { desc: "Resultado", content: "Va = 6Vb...", formula: "Va = 17.65V, Vb = 2.94V" }
                ],
                answer: "Va = 17.65V, Vb = 2.94V"
            },
            {
                title: "Nodos: Ejercicio 2 (Supernodo)",
                image: "https://via.placeholder.com/600x300/ffffff/000000?text=Supernodo",
                problem: "Dos nodos conectados por una fuente de voltaje de 10V. Halle Va y Vb.",
                steps: [
                    { desc: "Relación", content: "Va - Vb = 10", formula: "Ecuación de voltaje" },
                    { desc: "KCL Supernodo", content: "Corrientes que salen del conjunto A-B.", formula: "Va/2 + Vb/4 = 5" },
                    { desc: "Solución", content: "...", formula: "Va = 10V, Vb = 0V" }
                ],
                answer: "Va = 10V, Vb = 0V"
            },
            {
                title: "Nodos: Ejercicio 3 (3 Nodos)",
                image: "https://via.placeholder.com/600x300/ffffff/000000?text=3+Nodos",
                problem: "Halle V1, V2, V3 en una red de 4 resistencias y 2 fuentes.",
                steps: [
                    { desc: "Planteamiento", content: "3 ecuaciones de nodo.", formula: "Matriz G * V = I" },
                    { desc: "Respuesta", content: "...", formula: "V1=12V, V2=8V, V3=4V" }
                ],
                answer: "V1=12V, V2=8V, V3=4V"
            }
        ],
        thevenin: [
            {
                title: "Thévenin: Ejercicio 1",
                image: "assets/thevenin1.png",
                problem: "Vth y Rth en A-B.",
                steps: [
                    { desc: "Rth", content: "Fuentes apagadas...", formula: "Rth = 4.0 Ω" },
                    { desc: "Vth", content: "Circuito abierto...", formula: "Vth = 0V" }
                ],
                answer: "Vth = 0V, Rth = 4.0 Ω"
            },
            {
                title: "Thévenin: Ejercicio 2",
                image: "https://via.placeholder.com/600x300/ffffff/000000?text=Thevenin+Ex2",
                problem: "Circuito con fuente de 10V y 3 resistencias en serie-paralelo.",
                steps: [
                    { desc: "Vth", content: "Divisor de voltaje.", formula: "Vth = 5V" },
                    { desc: "Rth", content: "Paralelo de R1 y R2.", formula: "Rth = 250 Ω" }
                ],
                answer: "Vth=5V, Rth=250Ω"
            },
            {
                title: "Thévenin: Ejercicio 3",
                image: "https://via.placeholder.com/600x300/ffffff/000000?text=Thevenin+Ex3",
                problem: "Circuito con fuente de corriente.",
                steps: [
                    { desc: "Vth", content: "Ley de Ohm.", formula: "Vth = I * R" },
                    { desc: "Rth", content: "Resistencia vista.", formula: "Rth = 100 Ω" }
                ],
                answer: "Vth=20V, Rth=100Ω"
            }
        ],
        inductors: [
            {
                title: "Inductancia: Carga RL",
                image: "assets/rl1.png",
                problem: "L=10mH, R=5Ω, V=10V. i(t) para t>0.",
                steps: [
                    { desc: "Tau", content: "τ = L/R", formula: "τ = 2ms" },
                    { desc: "Ecuación", content: "i(t) = 2(1-e^(-t/τ))", formula: "i(t) = 2(1-e^-500t)" }
                ],
                answer: "i(t) = 2(1-e^-500t) A"
            },
            {
                title: "Inductancia: Descarga RL",
                image: "https://via.placeholder.com/600x300/ffffff/000000?text=Descarga+RL",
                problem: "Inductor cargado con 5A se descarga a través de R=10Ω.",
                steps: [
                    { desc: "Ecuación", content: "i(t) = Io * e^(-Rt/L)", formula: "i(t) = 5e^(-1000t)" }
                ],
                answer: "i(t) = 5e^(-1000t) A"
            },
            {
                title: "Inductancia: Cambio de estado",
                image: "https://via.placeholder.com/600x300/ffffff/000000?text=Transitorio+Complejo",
                problem: "Dos resistencias en el transitorio.",
                steps: [
                    { desc: "Análisis", content: "Calcular R equivalente durante t>0.", formula: "Req = 15Ω" },
                    { desc: "Resultado", content: "...", formula: "i(t) = 1e^-1500t" }
                ],
                answer: "i(t) = 1e^-1500t A"
            }
        ],
        capacitors: [
            {
                title: "Capacitancia: Carga RC",
                image: "assets/rc1.png",
                problem: "C=100uF, R=1k, V=20V. v(t) para t>0.",
                steps: [
                    { desc: "Tau", content: "τ = RC", formula: "τ = 0.1s" },
                    { desc: "Ecuación", content: "v(t) = 20(1-e^-10t)", formula: "v(t) = 20(1-e^-10t)" }
                ],
                answer: "v(t) = 20(1-e^-10t) V"
            },
            {
                title: "Capacitancia: Descarga RC",
                image: "https://via.placeholder.com/600x300/ffffff/000000?text=Descarga+RC",
                problem: "Capacitor con 50V se descarga en R=2k.",
                steps: [
                    { desc: "Ecuación", content: "v(t) = Vo * e^(-t/RC)", formula: "v(t) = 50e^-5t" }
                ],
                answer: "v(t) = 50e^-5t V"
            },
            {
                title: "Capacitancia: Energía",
                image: "https://via.placeholder.com/600x300/ffffff/000000?text=Energia+C",
                problem: "Calcule la energía almacenada al final de la carga.",
                steps: [
                    { desc: "Fórmula", content: "W = 1/2 * C * V^2", formula: "W = 0.5 * 100u * 20^2" },
                    { desc: "Resultado", content: "...", formula: "W = 20 mJ" }
                ],
                answer: "W = 20 mJ"
            }
        ]
    },

    init() {
        document.getElementById('btn-home').onclick = () => this.showDashboard();
        document.getElementById('btn-reset').onclick = () => this.resetExercise();
        document.getElementById('btn-next-step').onclick = () => this.revealNextStep();
        document.getElementById('btn-final-answer').onclick = () => this.showFinalAnswer();
        this.updateProgress();
    },

    showDashboard() {
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('exercise-player').style.display = 'none';
        this.updateProgress();
    },

    startTopic(topicId) {
        this.currentTopic = topicId;
        this.showExerciseSelection();
    },

    showExerciseSelection() {
        const dashboard = document.getElementById('dashboard');
        dashboard.innerHTML = `
            <h1 style="margin-bottom: 2rem; font-size: 2.5rem; text-align: center;">Selecciona un ejercicio</h1>
            <div class="dashboard-grid">
                ${this.data[this.currentTopic].map((ex, index) => `
                    <div class="topic-card" onclick="app.loadExerciseByIndex(${index})">
                        <div class="topic-title">${ex.title}</div>
                        <p>${ex.problem.substring(0, 60)}...</p>
                        <button class="btn">Practicar</button>
                    </div>
                `).join('')}
            </div>
            <div style="text-align: center; margin-top: 2rem;">
                <button class="btn btn-secondary" onclick="location.reload()">Volver a Temas</button>
            </div>
        `;
    },

    loadExerciseByIndex(index) {
        this.currentExerciseIndex = index;
        this.currentStep = 0;
        
        const exercise = this.data[this.currentTopic][this.currentExerciseIndex];
        document.getElementById('exercise-title').innerText = exercise.title;
        document.getElementById('exercise-meta').innerText = `Ejercicio ${index + 1} de ${this.data[this.currentTopic].length}`;
        document.getElementById('problem-text').innerText = exercise.problem;
        document.getElementById('circuit-container').innerHTML = `<img src="${exercise.image}" alt="Circuito" style="max-height: 300px;">`;
        
        document.getElementById('steps-list').innerHTML = '';
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('exercise-player').style.display = 'block';
        document.getElementById('btn-next-step').style.display = 'inline-block';
        document.getElementById('btn-final-answer').style.display = 'none';
    },

    revealNextStep() {
        const exercise = this.data[this.currentTopic][this.currentExerciseIndex];
        if (this.currentStep < exercise.steps.length) {
            const stepData = exercise.steps[this.currentStep];
            const stepsList = document.getElementById('steps-list');
            
            const card = document.createElement('div');
            card.className = 'step-card';
            card.innerHTML = `
                <span class="step-number">Paso ${this.currentStep + 1}</span>
                <h4>${stepData.desc}</h4>
                <p>${stepData.content.replace(/\n/g, '<br>')}</p>
                <div class="formula">${stepData.formula}</div>
            `;
            
            stepsList.appendChild(card);
            setTimeout(() => card.classList.add('visible'), 10);
            this.currentStep++;
            card.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
        
        if (this.currentStep === exercise.steps.length) {
            document.getElementById('btn-next-step').style.display = 'none';
            document.getElementById('btn-final-answer').style.display = 'inline-block';
        }
    },

    showFinalAnswer() {
        const exercise = this.data[this.currentTopic][this.currentExerciseIndex];
        const stepsList = document.getElementById('steps-list');
        const card = document.createElement('div');
        card.className = 'step-card visible';
        card.style.borderColor = 'var(--secondary-color)';
        card.innerHTML = `
            <span class="step-number" style="color: var(--secondary-color)">Resultado Final</span>
            <div class="formula" style="font-size: 1.5rem; color: white; text-align: center;">
                ${exercise.answer}
            </div>
        `;
        stepsList.appendChild(card);
        card.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('btn-final-answer').style.display = 'none';
        this.saveProgress(this.currentTopic, this.currentExerciseIndex);
    },

    resetExercise() {
        this.loadExerciseByIndex(this.currentExerciseIndex);
    },

    saveProgress(topic, index) {
        let progress = JSON.parse(localStorage.getItem('circuit-progress-v2') || '{}');
        if (!progress[topic]) progress[topic] = [];
        if (!progress[topic].includes(index)) progress[topic].push(index);
        localStorage.setItem('circuit-progress-v2', JSON.stringify(progress));
    },

    updateProgress() {
        let progress = JSON.parse(localStorage.getItem('circuit-progress-v2') || '{}');
        const topics = ['mallas', 'nodos', 'thevenin', 'inductors', 'capacitors'];
        topics.forEach(t => {
            const bar = document.getElementById(`progress-${t}`);
            if (bar) {
                const count = (progress[t] || []).length;
                const total = 3; // Fixed total
                bar.style.width = (count / total * 100) + '%';
            }
        });
    }
};

window.onload = () => app.init();
