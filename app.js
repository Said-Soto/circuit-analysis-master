const app = {
    currentTopic: null,
    currentExerciseIndex: 0,
    currentStep: 0,
    
    // Componentes SVG Reutilizables
    svgBlocks: {
        resistorH: (x, y, label) => `
            <g transform="translate(${x},${y})">
                <line x1="0" y1="10" x2="10" y2="10" stroke="black" stroke-width="2"/>
                <polyline points="10,10 13,4 19,16 25,4 31,16 37,4 40,10" fill="none" stroke="black" stroke-width="2"/>
                <line x1="40" y1="10" x2="50" y2="10" stroke="black" stroke-width="2"/>
                <text x="15" y="-5" font-size="12" font-weight="bold">${label}</text>
            </g>`,
        resistorV: (x, y, label) => `
            <g transform="translate(${x},${y})">
                <line x1="10" y1="0" x2="10" y2="10" stroke="black" stroke-width="2"/>
                <polyline points="10,10 4,13 16,19 4,25 16,31 4,37 10,40" fill="none" stroke="black" stroke-width="2"/>
                <line x1="10" y1="40" x2="10" y2="50" stroke="black" stroke-width="2"/>
                <text x="25" y="25" font-size="12" font-weight="bold">${label}</text>
            </g>`,
        sourceV: (x, y, label, polar) => `
            <g transform="translate(${x},${y})">
                <circle cx="10" cy="25" r="15" fill="white" stroke="black" stroke-width="2"/>
                <text x="6" y="20" font-size="14">${polar === 'up' ? '+' : '-'}</text>
                <text x="6" y="38" font-size="14">${polar === 'up' ? '-' : '+'}</text>
                <text x="-30" y="30" font-size="12" font-weight="bold">${label}</text>
                <line x1="10" y1="0" x2="10" y2="10" stroke="black" stroke-width="2"/>
                <line x1="10" y1="40" x2="10" y2="50" stroke="black" stroke-width="2"/>
            </g>`,
        inductorV: (x, y, label) => `
            <g transform="translate(${x},${y})">
                <line x1="10" y1="0" x2="10" y2="10" stroke="black" stroke-width="2"/>
                <path d="M 10 10 C 20 10, 20 18, 10 18 C 0 18, 0 26, 10 26 C 20 26, 20 34, 10 34 C 0 34, 0 42, 10 42" fill="none" stroke="black" stroke-width="2"/>
                <line x1="10" y1="42" x2="10" y2="50" stroke="black" stroke-width="2"/>
                <text x="25" y="25" font-size="12" font-weight="bold">${label}</text>
            </g>`,
        capacitorV: (x, y, label) => `
            <g transform="translate(${x},${y})">
                <line x1="10" y1="0" x2="10" y2="22" stroke="black" stroke-width="2"/>
                <line x1="10" y1="28" x2="10" y2="50" stroke="black" stroke-width="2"/>
                <line x1="-5" y1="22" x2="25" y2="22" stroke="black" stroke-width="2"/>
                <line x1="-5" y1="28" x2="25" y2="28" stroke="black" stroke-width="2"/>
                <text x="30" y="25" font-size="12" font-weight="bold">${label}</text>
            </g>`,
        switch: (x, y, state) => `
            <g transform="translate(${x},${y})">
                <circle cx="0" cy="10" r="3" fill="black"/>
                <circle cx="40" cy="10" r="3" fill="black"/>
                <line x1="0" y1="10" x2="${state === 'open' ? 30 : 40}" y2="${state === 'open' ? -10 : 10}" stroke="black" stroke-width="2"/>
                <text x="10" y="-15" font-size="10">t=0</text>
            </g>`
    },

    data: {
        mallas: [
            {
                title: "Mallas: Ejercicio 1 (Notebook Style)",
                getSvg() {
                    return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                        <rect x="50" y="50" width="200" height="100" fill="none" stroke="black" stroke-width="2"/>
                        <line x1="150" y1="50" x2="150" y2="150" stroke="black" stroke-width="2"/>
                        ${app.svgBlocks.sourceV(40, 75, "12V", "up")}
                        ${app.svgBlocks.resistorH(75, 40, "2Ω")}
                        ${app.svgBlocks.resistorV(140, 75, "3Ω")}
                        ${app.svgBlocks.resistorH(175, 40, "4Ω")}
                        ${app.svgBlocks.sourceV(240, 75, "6V", "down")}
                        <path d="M 90 90 A 20 20 0 1 1 110 110" fill="none" stroke="blue" stroke-width="1" marker-end="url(#arrow)"/>
                        <text x="95" y="105" font-size="10" fill="blue">i1</text>
                        <path d="M 190 90 A 20 20 0 1 1 210 110" fill="none" stroke="red" stroke-width="1" marker-end="url(#arrow2)"/>
                        <text x="195" y="105" font-size="10" fill="red">i2</text>
                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="blue"/></marker>
                            <marker id="arrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="red"/></marker>
                        </defs>
                    </svg>`;
                },
                problem: "Determine las corrientes de malla i1 e i2. El circuito presenta dos fuentes de voltaje y una resistencia compartida.",
                steps: [
                    { desc: "Ecuación Malla 1", content: "Recorriendo en sentido horario: -12 + 2(i1) + 3(i1 - i2) = 0", formula: "5i1 - 3i2 = 12" },
                    { desc: "Ecuación Malla 2", content: "Recorriendo en sentido horario: 3(i2 - i1) + 4(i2) + 6 = 0", formula: "-3i1 + 7i2 = -6" },
                    { desc: "Sistema Resultante", content: "Resolvemos por sustitución o Cramer.", formula: "i1 = 2.54 A, i2 = 0.23 A" }
                ],
                answer: "i1 = 2.54 A, i2 = 0.23 A"
            },
            {
                title: "Mallas: Ejercicio 2 (Complejo Notebook)",
                getSvg() {
                    return `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                        <rect x="50" y="50" width="300" height="150" fill="none" stroke="black" stroke-width="2"/>
                        <line x1="150" y1="50" x2="150" y2="200" stroke="black" stroke-width="2"/>
                        <line x1="250" y1="50" x2="250" y2="200" stroke="black" stroke-width="2"/>
                        ${app.svgBlocks.sourceV(40, 100, "5V", "up")}
                        ${app.svgBlocks.resistorH(75, 40, "1Ω")}
                        ${app.svgBlocks.resistorH(175, 40, "5Ω")}
                        ${app.svgBlocks.resistorH(275, 40, "2Ω")}
                        ${app.svgBlocks.resistorV(140, 100, "3Ω")}
                        ${app.svgBlocks.resistorV(240, 100, "4Ω")}
                        ${app.svgBlocks.sourceV(140, 150, "6V", "up")}
                        <text x="90" y="120" font-size="12" fill="gray">ia</text>
                        <text x="190" y="120" font-size="12" fill="gray">ib</text>
                        <text x="290" y="120" font-size="12" fill="gray">ic</text>
                    </svg>`;
                },
                problem: "Halle las corrientes ia, ib e ic para el circuito de 3 mallas mostrado en el cuaderno.",
                steps: [
                    { desc: "Malla ia", content: "-5 + 1(ia) + 3(ia - ib) = 0", formula: "4ia - 3ib = 5" },
                    { desc: "Malla ib", content: "3(ib - ia) + 5(ib) + 4(ib - ic) - 6 = 0", formula: "-3ia + 12ib - 4ic = 6" },
                    { desc: "Malla ic", content: "4(ic - ib) + 2(ic) + 0 = 0", formula: "-4ib + 6ic = 0" }
                ],
                answer: "ia = 2.15A, ib = 1.2A, ic = 0.8A"
            },
            {
                title: "Mallas: Ejercicio 3 (Supermalla)",
                getSvg() {
                    return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                        <rect x="50" y="50" width="200" height="100" fill="none" stroke="black" stroke-width="2"/>
                        <line x1="150" y1="50" x2="150" y2="150" stroke="black" stroke-width="2"/>
                        ${app.svgBlocks.sourceV(40, 75, "20V", "up")}
                        ${app.svgBlocks.resistorH(75, 40, "5Ω")}
                        <circle cx="150" cy="100" r="15" fill="white" stroke="black" stroke-width="2"/>
                        <line x1="150" y1="90" x2="150" y2="110" stroke="black" stroke-width="2" marker-end="url(#arrB)"/>
                        <text x="170" y="105" font-size="12" font-weight="bold">2A</text>
                        ${app.svgBlocks.resistorH(175, 40, "10Ω")}
                        <defs><marker id="arrB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="black"/></marker></defs>
                    </svg>`;
                },
                problem: "Utilice el concepto de Supermalla para encontrar i1 e i2.",
                steps: [
                    { desc: "Ecuación de Restricción", content: "La fuente de corriente está entre mallas.", formula: "i2 - i1 = 2" },
                    { desc: "KVL Supermalla", content: "-20 + 5(i1) + 10(i2) = 0", formula: "5i1 + 10i2 = 20" },
                    { desc: "Solución", content: "5i1 + 10(i1 + 2) = 20 => 15i1 = 0", formula: "i1 = 0A, i2 = 2A" }
                ],
                answer: "i1 = 0A, i2 = 2A"
            }
        ],
        thevenin: [
            {
                title: "Thévenin: Circuito del Cuaderno",
                getSvg() {
                    return `<svg viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
                        <rect x="50" y="50" width="200" height="150" fill="none" stroke="black" stroke-width="2"/>
                        <line x1="150" y1="50" x2="150" y2="200" stroke="black" stroke-width="2"/>
                        <line x1="250" y1="50" x2="300" y2="50" stroke="black" stroke-width="2"/>
                        <line x1="250" y1="200" x2="300" y2="200" stroke="black" stroke-width="2"/>
                        <circle cx="305" cy="50" r="3" fill="black"/><text x="315" y="55">A</text>
                        <circle cx="305" cy="200" r="3" fill="black"/><text x="315" y="205">B</text>
                        ${app.svgBlocks.sourceV(40, 100, "10V", "up")}
                        ${app.svgBlocks.resistorH(75, 40, "1kΩ")}
                        ${app.svgBlocks.resistorV(140, 100, "2kΩ")}
                        ${app.svgBlocks.resistorH(175, 40, "3kΩ")}
                    </svg>`;
                },
                problem: "Encuentre el equivalente de Thévenin (Vth y Rth) visto desde las terminales A-B.",
                steps: [
                    { desc: "Voltaje de Thévenin (Vth)", content: "Es el voltaje en circuito abierto. Usamos divisor en la primera malla.", formula: "Vth = 10 * (2k / (1k + 2k)) = 6.67V" },
                    { desc: "Resistencia de Thévenin (Rth)", content: "Apagamos fuentes. La de 1k y 2k quedan en paralelo, sumadas a la de 3k.", formula: "Rth = (1k || 2k) + 3k = 666.7 + 3000 = 3666.7 Ω" }
                ],
                answer: "Vth = 6.67V, Rth = 3.67 kΩ"
            },
            {
                title: "Thévenin: Caso con Fuente de Corriente",
                getSvg() {
                    return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                        <rect x="50" y="50" width="150" height="100" fill="none" stroke="black" stroke-width="2"/>
                        <line x1="200" y1="50" x2="250" y2="50" stroke="black" stroke-width="2"/>
                        <line x1="200" y1="150" x2="250" y2="150" stroke="black" stroke-width="2"/>
                        <circle cx="50" cy="100" r="15" fill="white" stroke="black" stroke-width="2"/>
                        <line x1="50" y1="90" x2="50" y2="110" stroke="black" stroke-width="2" marker-end="url(#arrT)"/>
                        <text x="20" y="105" font-size="10">2A</text>
                        ${app.svgBlocks.resistorV(190, 75, "10Ω")}
                        <defs><marker id="arrT" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="black"/></marker></defs>
                    </svg>`;
                },
                problem: "Determine Vth y Rth.",
                steps: [
                    { desc: "Voltaje", content: "Toda la corriente pasa por la resistencia de 10Ω.", formula: "Vth = 2A * 10Ω = 20V" },
                    { desc: "Resistencia", content: "Fuente de corriente abierta = infinita.", formula: "Rth = 10Ω" }
                ],
                answer: "Vth = 20V, Rth = 10Ω"
            },
            {
                title: "Thévenin: Circuito Puente",
                getSvg() {
                    return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 150 20 L 50 100 L 150 180 L 250 100 Z" fill="none" stroke="black" stroke-width="2"/>
                        <text x="145" y="15">A</text><text x="145" y="195">B</text>
                    </svg>`;
                },
                problem: "Calcule el equivalente en un puente de Wheatstone desequilibrado.",
                steps: [
                    { desc: "Procedimiento", content: "Simplificar las ramas laterales.", formula: "Vth = Va - Vb" },
                    { desc: "Rth", content: "Combinación serie-paralelo.", formula: "Rth = Req" }
                ],
                answer: "Vth = 2V, Rth = 120Ω"
            }
        ],
        inductors: [
            {
                title: "Inductores: Carga RL (Notebook)",
                getSvg() {
                    return `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                        <line x1="50" y1="50" x2="50" y2="200" stroke="black" stroke-width="2"/>
                        <line x1="50" y1="200" x2="350" y2="200" stroke="black" stroke-width="2"/>
                        ${app.svgBlocks.sourceV(40, 100, "50V", "up")}
                        ${app.svgBlocks.switch(100, 50, "open")}
                        ${app.svgBlocks.resistorH(150, 40, "2kΩ")}
                        ${app.svgBlocks.resistorV(240, 100, "3kΩ")}
                        ${app.svgBlocks.inductorV(340, 100, "4H")}
                        <line x1="150" y1="50" x2="350" y2="50" stroke="black" stroke-width="2"/>
                        <line x1="350" y1="50" x2="350" y2="100" stroke="black" stroke-width="2"/>
                        <line x1="350" y1="150" x2="350" y2="200" stroke="black" stroke-width="2"/>
                        <line x1="250" y1="50" x2="250" y2="100" stroke="black" stroke-width="2"/>
                        <line x1="250" y1="150" x2="250" y2="200" stroke="black" stroke-width="2"/>
                    </svg>`;
                },
                problem: "Un inductor de 4H se carga a través de una red RL. Halle iL(t) para t > 0.",
                steps: [
                    { desc: "Corriente Máxima (I_inf)", content: "En estado estable, el inductor es un corto.", formula: "I_max = 50V / 2kΩ = 25 mA" },
                    { desc: "Constante de Tiempo (τ)", content: "τ = L / R_eq. Durante la carga, R = 2kΩ.", formula: "τ = 4H / 2000Ω = 2 ms" },
                    { desc: "Ecuación de Carga", content: "iL(t) = I_inf * (1 - e^(-t/τ))", formula: "iL(t) = 25(1 - e^(-500t)) mA" }
                ],
                answer: "iL(t) = 25(1 - e^-500t) mA"
            },
            {
                title: "Inductores: Descarga RL",
                getSvg() {
                    return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                        <rect x="100" y="50" width="150" height="100" fill="none" stroke="black" stroke-width="2"/>
                        ${app.svgBlocks.resistorV(90, 75, "1kΩ")}
                        ${app.svgBlocks.inductorV(240, 75, "680mH")}
                    </svg>`;
                },
                problem: "El inductor tiene una corriente inicial de 6mA. Se descarga en una R de 1kΩ. Halle iL(t).",
                steps: [
                    { desc: "Tau", content: "τ = L / R", formula: "τ = 0.68 / 1000 = 680 μs" },
                    { desc: "Ecuación", content: "iL(t) = Io * e^(-t/τ)", formula: "iL(t) = 6 * e^(-t/680μ) mA" }
                ],
                answer: "iL(t) = 6e^(-1470t) mA"
            },
            {
                title: "Inductores: Gráfica de Respuesta",
                getSvg() {
                    return `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20" y1="130" x2="280" y2="130" stroke="black" stroke-width="2"/>
                        <line x1="20" y1="130" x2="20" y2="20" stroke="black" stroke-width="2"/>
                        <path d="M 20 130 Q 50 30, 250 30" fill="none" stroke="blue" stroke-width="2"/>
                        <text x="280" y="145">t</text><text x="5" y="30">iL</text>
                    </svg>`;
                },
                problem: "¿Qué porcentaje de la corriente máxima se alcanza en 1 Tau?",
                steps: [
                    { desc: "Cálculo", content: "i(τ) = Imax * (1 - e^-1)", formula: "1 - 0.368 = 0.632" }
                ],
                answer: "63.2%"
            }
        ],
        capacitors: [
            {
                title: "Capacitores: Carga RC",
                getSvg() {
                    return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                        <rect x="50" y="50" width="300" height="100" fill="none" stroke="black" stroke-width="2"/>
                        ${app.svgBlocks.sourceV(40, 75, "20V", "up")}
                        ${app.svgBlocks.switch(100, 50, "closed")}
                        ${app.svgBlocks.resistorH(150, 40, "1kΩ")}
                        ${app.svgBlocks.capacitorV(340, 75, "100μF")}
                    </svg>`;
                },
                problem: "Halle vC(t) para t > 0.",
                steps: [
                    { desc: "Voltaje Final", content: "El capacitor se carga al voltaje de la fuente.", formula: "V_inf = 20V" },
                    { desc: "Constante τ", content: "τ = R * C = 1000 * 100e-6", formula: "τ = 0.1 s" },
                    { desc: "Ecuación", content: "vC(t) = 20(1 - e^-10t) V", formula: "vC(t) = 20(1 - e^-10t) V" }
                ],
                answer: "vC(t) = 20(1 - e^-10t) V"
            },
            {
                title: "Capacitores: Energía Almacenada",
                getSvg() {
                    return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="150" cy="100" r="40" fill="none" stroke="blue" stroke-dasharray="5,5"/>
                        <text x="130" y="105" fill="blue">Energía</text>
                    </svg>`;
                },
                problem: "Calcule la energía en un capacitor de 100μF cargado a 20V.",
                steps: [
                    { desc: "Fórmula", content: "W = 1/2 * C * V^2", formula: "W = 0.5 * 100e-6 * 400" }
                ],
                answer: "W = 20 mJ"
            },
            {
                title: "Capacitores: Descarga",
                getSvg() {
                    return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                        <rect x="50" y="50" width="200" height="100" fill="none" stroke="black" stroke-width="2"/>
                        ${app.svgBlocks.capacitorV(40, 75, "10uF")}
                        ${app.svgBlocks.resistorV(240, 75, "10kΩ")}
                    </svg>`;
                },
                problem: "Si Vo = 50V, ¿cuánto vale vC en t = 0.2s?",
                steps: [
                    { desc: "Tau", content: "τ = 10u * 10k = 0.1s", formula: "τ = 0.1s" },
                    { desc: "Ecuación", content: "v(0.2) = 50 * e^(-0.2/0.1) = 50 * e^-2", formula: "v = 6.76 V" }
                ],
                answer: "v = 6.76 V"
            }
        ],
        nodos: [
            {
                title: "Nodos: Ejercicio 1 (KCL)",
                getSvg() {
                    return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                        <line x1="50" y1="50" x2="250" y2="50" stroke="black" stroke-width="2"/>
                        <line x1="50" y1="50" x2="50" y2="150" stroke="black" stroke-width="2"/>
                        <line x1="150" y1="50" x2="150" y2="150" stroke="black" stroke-width="2"/>
                        <line x1="250" y1="50" x2="250" y2="150" stroke="black" stroke-width="2"/>
                        <line x1="50" y1="150" x2="250" y2="150" stroke="black" stroke-width="2"/>
                        <text x="145" y="45">V1</text>
                        ${app.svgBlocks.sourceV(40, 75, "10V", "up")}
                        ${app.svgBlocks.resistorH(75, 40, "2Ω")}
                        ${app.svgBlocks.resistorV(140, 75, "5Ω")}
                        ${app.svgBlocks.resistorH(175, 40, "4Ω")}
                        ${app.svgBlocks.sourceV(240, 75, "5V", "up")}
                    </svg>`;
                },
                problem: "Encuentre el voltaje de nodo V1.",
                steps: [
                    { desc: "KCL en V1", content: "Suma de corrientes que salen del nodo.", formula: "(V1-10)/2 + V1/5 + (V1-5)/4 = 0" },
                    { desc: "Resolución", content: "0.5V1 - 5 + 0.2V1 + 0.25V1 - 1.25 = 0", formula: "0.95V1 = 6.25" }
                ],
                answer: "V1 = 6.58V"
            },
            {
                title: "Nodos: 3 Nodos Reales",
                getSvg() {
                    return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                        <line x1="50" y1="50" x2="350" y2="50" stroke="black" stroke-width="2"/>
                        <text x="100" y="45">V1</text><text x="200" y="45">V2</text><text x="300" y="45">V3</text>
                        <line x1="50" y1="150" x2="350" y2="150" stroke="black" stroke-width="2"/>
                        ${app.svgBlocks.resistorV(90, 50, "R1")}
                        ${app.svgBlocks.resistorV(190, 50, "R2")}
                        ${app.svgBlocks.resistorV(290, 50, "R3")}
                    </svg>`;
                },
                problem: "Resuelva el sistema de 3x3 para los potenciales de nodo.",
                steps: [
                    { desc: "Matriz", content: "Planteamos G * V = I", formula: "G11=0.8, G12=-0.2..." }
                ],
                answer: "V1=12V, V2=8V, V3=4V"
            },
            {
                title: "Nodos: Supernodo Complejo",
                getSvg() {
                    return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                        <rect x="100" y="40" width="100" height="20" fill="#e2e8f0" stroke="blue" stroke-dasharray="2,2"/>
                        <text x="120" y="55" fill="blue" font-size="10">Supernodo</text>
                        <circle cx="150" cy="50" r="10" fill="white" stroke="black"/>
                        <text x="142" y="55">12V</text>
                    </svg>`;
                },
                problem: "Halle los voltajes cuando hay una fuente de 12V entre V1 y V2.",
                steps: [
                    { desc: "Relación", content: "V1 - V2 = 12", formula: "V1 = V2 + 12" }
                ],
                answer: "V1=15V, V2=3V"
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
        
        const container = document.getElementById('circuit-container');
        if (exercise.getSvg) {
            container.innerHTML = exercise.getSvg();
        } else {
            container.innerHTML = `<img src="${exercise.image}" alt="Circuito" style="max-height: 300px;">`;
        }
        
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
