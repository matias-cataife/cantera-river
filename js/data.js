// ===== RIVER PLATE YOUTH ACADEMY — DATA LAYER =====

// ===== RADAR AXES BY POSITION GROUP =====
const RADAR_AXES = {
  GK:  ["Reflejos", "Posicionamiento", "Juego aéreo", "Distribución", "1 vs 1", "Comunicación"],
  DEF: ["Marcaje", "Juego aéreo", "Anticipo", "Salida", "Velocidad", "Liderazgo"],
  MID: ["Pase", "Visión", "Recuperación", "Conducción", "Llegada", "Resistencia"],
  ATK: ["Definición", "Velocidad", "Regate", "Movimiento", "Juego aéreo", "Presión"]
};

// ===== AGE GROUP BENCHMARKS (physical) =====
const BENCHMARKS = {
  "Sub-17": { speed: 27.0, distance: 8.5, sprints: 18 },
  "Sub-18": { speed: 28.0, distance: 9.0, sprints: 20 },
  "Sub-19": { speed: 29.0, distance: 9.5, sprints: 22 },
  "Sub-20": { speed: 29.5, distance: 9.8, sprints: 24 },
  "Sub-21": { speed: 30.5, distance: 10.0, sprints: 25 },
  "Sub-23": { speed: 31.0, distance: 10.5, sprints: 27 }
};

// ===== REPRESENTATIVES =====
const REPRESENTATIVES = [
  { id: "rep1", name: "Carlos Mendes", agency: "Mendes Sports Group", phone: "+54 11 5555-0101", email: "carlos.mendes@msgroup.com" },
  { id: "rep2", name: "Fernando Hidalgo", agency: "Hidalgo & Asociados", phone: "+54 11 5555-0202", email: "f.hidalgo@hidalgoasoc.com" },
  { id: "rep3", name: "Rodrigo Gutiérrez", agency: "RG Representaciones", phone: "+54 11 5555-0303", email: "rgutierrez@rgrep.com" },
  { id: "rep4", name: "Martín Bianchi", agency: "Sur Football Agency", phone: "+54 11 5555-0404", email: "mbianchi@surfootball.com" },
  { id: "rep5", name: "Pablo Verón", agency: "Verón Management", phone: "+54 11 5555-0505", email: "pablo@veronmgmt.com" },
  { id: "rep6", name: "Luciano Peralta", agency: "LP Sports", phone: "+54 11 5555-0606", email: "lperalta@lpsports.com" },
  { id: "rep7", name: "Diego Acuña", agency: "Acuña Football", phone: "+54 11 5555-0707", email: "dacuna@acunafutbol.com" },
  { id: "rep8", name: "Nicolás Rossi", agency: "Rossi & Partners", phone: "+54 11 5555-0808", email: "nrossi@rossipartners.com" }
];

// ===== PLAYERS =====
// Reserva: real squad from Promiedos (March 2026)
// 4ta-8va: generated players for lower categories
const PLAYERS = [
  // === RESERVA (source: promiedos.com.ar) ===
  {
    id: 1, name: "Jeremías Martinet", position: "GK", positionFull: "Arquero",
    age: 20, dob: "2005-08-30", nationality: "Argentina", division: "Reserva", number: 1,
    contractUntil: "2028-12-31", rating: 72, ratingHistory: [65, 67, 68, 70, 71, 72],
    representative: "rep1",
    radar: { "Reflejos": 74, "Posicionamiento": 70, "Juego aéreo": 68, "Distribución": 66, "1 vs 1": 72, "Comunicación": 68 },
    physical: { speed: 24.0, distance: 5.0, sprints: 7 },
    academic: { schoolYear: "Egresado", subjectsPassed: 12, subjectsPending: 0, attendance: 100, status: "green" },
    notes: [
      { date: "2026-02-15", author: "DT Reserva", text: "Titular indiscutido. Seguridad bajo los tres palos." },
      { date: "2026-01-20", author: "Prep. Físico", text: "Mejoró tiempos de reacción lateral." }
    ],
    injury: null
  },
  {
    id: 2, name: "Dylan Martínez", position: "GK", positionFull: "Arquero",
    age: 17, dob: "2008-04-30", nationality: "Argentina", division: "Reserva", number: 25,
    contractUntil: "2028-12-31", rating: 64, ratingHistory: [57, 59, 60, 62, 63, 64],
    representative: "rep2",
    radar: { "Reflejos": 66, "Posicionamiento": 62, "Juego aéreo": 58, "Distribución": 64, "1 vs 1": 62, "Comunicación": 56 },
    physical: { speed: 23.5, distance: 4.6, sprints: 5 },
    academic: { schoolYear: "4to año", subjectsPassed: 9, subjectsPending: 1, attendance: 90, status: "green" },
    notes: [{ date: "2026-03-01", author: "DT Reserva", text: "Suplente con proyección. Clase 2008." }],
    injury: null
  },
  {
    id: 3, name: "Brian Gutiérrez", position: "CB", positionFull: "Defensor Central",
    age: 19, dob: "2007-01-21", nationality: "Argentina", division: "Reserva", number: 6,
    contractUntil: "2028-12-31", rating: 71, ratingHistory: [64, 66, 67, 69, 70, 71],
    representative: "rep3",
    radar: { "Marcaje": 74, "Juego aéreo": 72, "Anticipo": 70, "Salida": 66, "Velocidad": 68, "Liderazgo": 68 },
    physical: { speed: 28.8, distance: 9.2, sprints: 17 },
    academic: { schoolYear: "5to año", subjectsPassed: 8, subjectsPending: 2, attendance: 82, status: "yellow" },
    notes: [{ date: "2026-02-20", author: "DT Reserva", text: "Sólido en la marca. Referente defensivo." }],
    injury: null
  },
  {
    id: 4, name: "Juan Miretti", position: "CB", positionFull: "Defensor Central",
    age: 19, dob: "2007-02-06", nationality: "Argentina", division: "Reserva", number: 17,
    contractUntil: "2027-12-31", rating: 70, ratingHistory: [64, 65, 67, 68, 69, 70],
    representative: "rep4",
    radar: { "Marcaje": 72, "Juego aéreo": 74, "Anticipo": 68, "Salida": 66, "Velocidad": 70, "Liderazgo": 65 },
    physical: { speed: 28.5, distance: 9.0, sprints: 16 },
    academic: { schoolYear: "5to año", subjectsPassed: 7, subjectsPending: 3, attendance: 78, status: "yellow" },
    notes: [{ date: "2026-02-25", author: "DT Reserva", text: "Buena lectura del juego. Debe ganar confianza con la pelota." }],
    injury: null
  },
  {
    id: 5, name: "Marcos Iglesias", position: "LB", positionFull: "Lateral Izquierdo",
    age: 19, dob: "2006-06-27", nationality: "Argentina", division: "Reserva", number: 13,
    contractUntil: "2027-12-31", rating: 69, ratingHistory: [63, 64, 66, 67, 68, 69],
    representative: "rep5",
    radar: { "Marcaje": 68, "Juego aéreo": 60, "Anticipo": 66, "Salida": 72, "Velocidad": 74, "Liderazgo": 58 },
    physical: { speed: 30.0, distance: 10.4, sprints: 25 },
    academic: { schoolYear: "Egresado", subjectsPassed: 12, subjectsPending: 0, attendance: 100, status: "green" },
    notes: [{ date: "2026-03-02", author: "DT Reserva", text: "Buena proyección ofensiva. Consistente." }],
    injury: null
  },
  {
    id: 6, name: "Lucas Flores", position: "LB", positionFull: "Lateral Izquierdo",
    age: 19, dob: "2007-03-06", nationality: "Argentina", division: "Reserva", number: 13,
    contractUntil: "2027-12-31", rating: 68, ratingHistory: [62, 63, 65, 66, 67, 68],
    representative: "rep6",
    radar: { "Marcaje": 66, "Juego aéreo": 58, "Anticipo": 64, "Salida": 72, "Velocidad": 76, "Liderazgo": 56 },
    physical: { speed: 30.2, distance: 10.5, sprints: 26 },
    academic: { schoolYear: "5to año", subjectsPassed: 8, subjectsPending: 2, attendance: 84, status: "yellow" },
    notes: [{ date: "2026-02-18", author: "DT Reserva", text: "Alternativa por izquierda. Rápido." }],
    injury: null
  },
  {
    id: 7, name: "Matías Unyicio", position: "RB", positionFull: "Lateral Derecho",
    age: 19, dob: "2007-01-17", nationality: "Argentina", division: "Reserva", number: 14,
    contractUntil: "2027-12-31", rating: 70, ratingHistory: [64, 65, 67, 68, 69, 70],
    representative: "rep7",
    radar: { "Marcaje": 72, "Juego aéreo": 62, "Anticipo": 68, "Salida": 72, "Velocidad": 74, "Liderazgo": 60 },
    physical: { speed: 29.8, distance: 10.2, sprints: 24 },
    academic: { schoolYear: "5to año", subjectsPassed: 9, subjectsPending: 1, attendance: 90, status: "green" },
    notes: [{ date: "2026-02-18", author: "DT Reserva", text: "Consistente. Titular por derecha." }],
    injury: null
  },
  {
    id: 8, name: "Agustín Wierna", position: "AM", positionFull: "Mediapunta",
    age: 21, dob: "2005-01-15", nationality: "Argentina", division: "Reserva", number: 4,
    contractUntil: "2027-06-30", rating: 73, ratingHistory: [67, 69, 70, 71, 72, 73],
    representative: "rep8",
    radar: { "Pase": 74, "Visión": 76, "Recuperación": 62, "Conducción": 72, "Llegada": 74, "Resistencia": 68 },
    physical: { speed: 29.0, distance: 9.8, sprints: 21 },
    academic: { schoolYear: "Egresado", subjectsPassed: 12, subjectsPending: 0, attendance: 100, status: "green" },
    notes: [{ date: "2026-03-01", author: "DT Reserva", text: "Experiencia y visión de juego. Enganche nato." }],
    injury: null
  },
  {
    id: 9, name: "Uriel Funes", position: "CM", positionFull: "Mediocampista Central",
    age: 20, dob: "2005-12-14", nationality: "Argentina", division: "Reserva", number: 5,
    contractUntil: "2028-06-30", rating: 72, ratingHistory: [66, 68, 69, 70, 71, 72],
    representative: "rep1",
    radar: { "Pase": 72, "Visión": 70, "Recuperación": 76, "Conducción": 68, "Llegada": 66, "Resistencia": 74 },
    physical: { speed: 28.8, distance: 10.4, sprints: 23 },
    academic: { schoolYear: "Egresado", subjectsPassed: 12, subjectsPending: 0, attendance: 100, status: "green" },
    notes: [{ date: "2026-02-28", author: "DT Reserva", text: "1.72m pero compensa con intensidad. Box to box." }],
    injury: null
  },
  {
    id: 10, name: "Fernando Juárez", position: "CM", positionFull: "Mediocampista Central",
    age: 21, dob: "2005-02-15", nationality: "Argentina", division: "Reserva", number: 11,
    contractUntil: "2027-12-31", rating: 71, ratingHistory: [65, 67, 68, 69, 70, 71],
    representative: "rep2",
    radar: { "Pase": 72, "Visión": 68, "Recuperación": 70, "Conducción": 74, "Llegada": 68, "Resistencia": 72 },
    physical: { speed: 29.2, distance: 10.0, sprints: 22 },
    academic: { schoolYear: "Egresado", subjectsPassed: 12, subjectsPending: 0, attendance: 100, status: "green" },
    notes: [{ date: "2026-02-12", author: "DT Reserva", text: "1.79m. Buen despliegue. Aporta en ambas fases." }],
    injury: null
  },
  {
    id: 11, name: "Elián Giménez", position: "CM", positionFull: "Mediocampista Central",
    age: 21, dob: "2004-03-23", nationality: "Argentina", division: "Reserva", number: 8,
    contractUntil: "2027-06-30", rating: 74, ratingHistory: [68, 70, 71, 72, 73, 74],
    representative: "rep3",
    radar: { "Pase": 76, "Visión": 74, "Recuperación": 72, "Conducción": 74, "Llegada": 70, "Resistencia": 72 },
    physical: { speed: 29.0, distance: 10.2, sprints: 22 },
    academic: { schoolYear: "Egresado", subjectsPassed: 12, subjectsPending: 0, attendance: 100, status: "green" },
    notes: [
      { date: "2026-03-05", author: "DT Reserva", text: "1.80m. El más completo del mediocampo. Referente." },
      { date: "2026-02-20", author: "Coordinador", text: "Seguir de cerca para posible citación a primera." }
    ],
    injury: null
  },
  {
    id: 12, name: "Santiago Espíndola", position: "CM", positionFull: "Mediocampista Central",
    age: 17, dob: "2008-03-17", nationality: "Argentina", division: "Reserva", number: 20,
    contractUntil: "2028-12-31", rating: 74, ratingHistory: [66, 68, 70, 71, 73, 74],
    representative: "rep4",
    radar: { "Pase": 76, "Visión": 72, "Recuperación": 78, "Conducción": 70, "Llegada": 64, "Resistencia": 76 },
    physical: { speed: 28.5, distance: 10.1, sprints: 22 },
    academic: { schoolYear: "4to año", subjectsPassed: 10, subjectsPending: 0, attendance: 94, status: "green" },
    notes: [
      { date: "2026-03-08", author: "Coordinador", text: "1.70m. Una de las mayores promesas del club. Clase 2008." },
      { date: "2026-02-25", author: "DT Reserva", text: "Recuperación impresionante para su edad. Juega como veterano." }
    ],
    injury: null
  },
  {
    id: 13, name: "Agustín De La Cuesta", position: "DM", positionFull: "Mediocampista Defensivo",
    age: 20, dob: "2006-01-04", nationality: "Argentina", division: "Reserva", number: 20,
    contractUntil: "2028-12-31", rating: 71, ratingHistory: [66, 67, 68, 69, 70, 71],
    representative: "rep5",
    radar: { "Pase": 70, "Visión": 68, "Recuperación": 76, "Conducción": 66, "Llegada": 62, "Resistencia": 74 },
    physical: { speed: 28.5, distance: 10.3, sprints: 23 },
    academic: { schoolYear: "Egresado", subjectsPassed: 12, subjectsPending: 0, attendance: 100, status: "green" },
    notes: [{ date: "2026-02-12", author: "DT Reserva", text: "Estable. Aporta experiencia y orden al mediocampo." }],
    injury: null
  },
  {
    id: 14, name: "Lucas Silva", position: "CM", positionFull: "Mediocampista Central",
    age: 19, dob: "2007-02-26", nationality: "Argentina", division: "Reserva", number: 16,
    contractUntil: "2027-12-31", rating: 68, ratingHistory: [62, 63, 65, 66, 67, 68],
    representative: "rep6",
    radar: { "Pase": 70, "Visión": 66, "Recuperación": 70, "Conducción": 68, "Llegada": 62, "Resistencia": 70 },
    physical: { speed: 28.2, distance: 9.6, sprints: 20 },
    academic: { schoolYear: "5to año", subjectsPassed: 7, subjectsPending: 3, attendance: 79, status: "yellow" },
    notes: [{ date: "2026-01-28", author: "DT Reserva", text: "Trabajador. Necesita más protagonismo con la pelota." }],
    injury: null
  },
  {
    id: 15, name: "Ignacio Zaballa", position: "CM", positionFull: "Mediocampista Central",
    age: 19, dob: "2006-04-25", nationality: "Argentina", division: "Reserva", number: 23,
    contractUntil: "2028-12-31", rating: 69, ratingHistory: [63, 64, 66, 67, 68, 69],
    representative: "rep7",
    radar: { "Pase": 70, "Visión": 68, "Recuperación": 72, "Conducción": 68, "Llegada": 64, "Resistencia": 72 },
    physical: { speed: 28.4, distance: 9.8, sprints: 21 },
    academic: { schoolYear: "Egresado", subjectsPassed: 12, subjectsPending: 0, attendance: 100, status: "green" },
    notes: [{ date: "2026-01-30", author: "DT Reserva", text: "Polivalente. Puede jugar de 5 o de 8." }],
    injury: null
  },
  {
    id: 16, name: "Maximiliano Soria", position: "AM", positionFull: "Mediapunta",
    age: 18, dob: "2007-05-12", nationality: "Argentina", division: "Reserva", number: 14,
    contractUntil: "2028-06-30", rating: 69, ratingHistory: [61, 63, 65, 66, 68, 69],
    representative: "rep8",
    radar: { "Pase": 68, "Visión": 72, "Recuperación": 58, "Conducción": 74, "Llegada": 70, "Resistencia": 64 },
    physical: { speed: 29.0, distance: 9.4, sprints: 20 },
    academic: { schoolYear: "5to año", subjectsPassed: 7, subjectsPending: 3, attendance: 76, status: "yellow" },
    notes: [{ date: "2026-02-10", author: "DT Reserva", text: "Talentoso pero irregular. Falta continuidad." }],
    injury: null
  },
  {
    id: 17, name: "Tobías Bacar", position: "AM", positionFull: "Mediapunta",
    age: 18, dob: "2007-09-05", nationality: "Argentina", division: "Reserva", number: 22,
    contractUntil: "2028-12-31", rating: 67, ratingHistory: [59, 61, 63, 64, 66, 67],
    representative: "rep1",
    radar: { "Pase": 66, "Visión": 70, "Recuperación": 56, "Conducción": 72, "Llegada": 68, "Resistencia": 62 },
    physical: { speed: 28.8, distance: 9.2, sprints: 19 },
    academic: { schoolYear: "5to año", subjectsPassed: 8, subjectsPending: 2, attendance: 85, status: "yellow" },
    notes: [{ date: "2026-02-22", author: "DT Reserva", text: "1.70m. Creativo. Buen último pase." }],
    injury: null
  },
  {
    id: 18, name: "Thiago Salvatierra", position: "RW", positionFull: "Extremo Derecho",
    age: 17, dob: "2008-05-05", nationality: "Argentina", division: "Reserva", number: 15,
    contractUntil: "2028-12-31", rating: 68, ratingHistory: [60, 62, 64, 65, 67, 68],
    representative: "rep2",
    radar: { "Definición": 66, "Velocidad": 76, "Regate": 72, "Movimiento": 68, "Juego aéreo": 52, "Presión": 66 },
    physical: { speed: 30.5, distance: 9.8, sprints: 25 },
    academic: { schoolYear: "4to año", subjectsPassed: 9, subjectsPending: 1, attendance: 88, status: "green" },
    notes: [{ date: "2026-03-02", author: "Coordinador", text: "Clase 2008. Rápido por derecha. Promesa." }],
    injury: null
  },
  {
    id: 19, name: "Valentín Lucero", position: "LW", positionFull: "Extremo Izquierdo",
    age: 19, dob: "2006-04-01", nationality: "Argentina", division: "Reserva", number: 21,
    contractUntil: "2027-12-31", rating: 68, ratingHistory: [62, 63, 65, 66, 67, 68],
    representative: "rep3",
    radar: { "Definición": 64, "Velocidad": 76, "Regate": 72, "Movimiento": 68, "Juego aéreo": 56, "Presión": 66 },
    physical: { speed: 30.8, distance: 10.0, sprints: 26 },
    academic: { schoolYear: "Egresado", subjectsPassed: 12, subjectsPending: 0, attendance: 100, status: "green" },
    notes: [{ date: "2026-02-08", author: "DT Reserva", text: "1.73m. Rápido y desequilibrante por izquierda." }],
    injury: null
  },
  {
    id: 20, name: "Oswaldo Valencia", position: "CF", positionFull: "Delantero Centro",
    age: 23, dob: "2003-03-13", nationality: "Colombia", division: "Reserva", number: 9,
    contractUntil: "2026-12-31", rating: 74, ratingHistory: [70, 71, 72, 73, 73, 74],
    representative: "rep4",
    radar: { "Definición": 78, "Velocidad": 70, "Regate": 64, "Movimiento": 74, "Juego aéreo": 72, "Presión": 70 },
    physical: { speed: 29.0, distance: 9.2, sprints: 20 },
    academic: { schoolYear: "Egresado", subjectsPassed: 12, subjectsPending: 0, attendance: 100, status: "green" },
    notes: [{ date: "2026-03-10", author: "DT Reserva", text: "1.64m. Goleador. Contrato vence a fin de año, definir situación." }],
    injury: null
  },
  {
    id: 21, name: "Jonathan Spiff", position: "CF", positionFull: "Delantero Centro",
    age: 19, dob: "2007-02-23", nationality: "Argentina", division: "Reserva", number: 10,
    contractUntil: "2028-12-31", rating: 72, ratingHistory: [65, 67, 68, 70, 71, 72],
    representative: "rep5",
    radar: { "Definición": 74, "Velocidad": 72, "Regate": 68, "Movimiento": 70, "Juego aéreo": 76, "Presión": 70 },
    physical: { speed: 30.0, distance: 9.5, sprints: 23 },
    academic: { schoolYear: "5to año", subjectsPassed: 6, subjectsPending: 4, attendance: 70, status: "red" },
    notes: [
      { date: "2026-03-04", author: "DT Reserva", text: "1.87m. Potencia física y juego aéreo. Goleador." },
      { date: "2026-01-25", author: "Coordinador Académico", text: "Requiere plan de apoyo escolar. Riesgo de abandono." }
    ],
    injury: null
  },
  {
    id: 22, name: "Lautaro Pereyra", position: "CF", positionFull: "Delantero Centro",
    age: 17, dob: "2008-03-23", nationality: "Argentina", division: "Reserva", number: 22,
    contractUntil: "2028-12-31", rating: 70, ratingHistory: [62, 64, 66, 67, 69, 70],
    representative: "rep6",
    radar: { "Definición": 72, "Velocidad": 70, "Regate": 66, "Movimiento": 68, "Juego aéreo": 68, "Presión": 72 },
    physical: { speed: 28.5, distance: 9.2, sprints: 20 },
    academic: { schoolYear: "4to año", subjectsPassed: 9, subjectsPending: 1, attendance: 88, status: "green" },
    notes: [{ date: "2026-02-20", author: "DT Reserva", text: "1.76m. Crecimiento constante. Clase 2008 con gol." }],
    injury: null
  },
  {
    id: 23, name: "Felipe Esquivel", position: "RW", positionFull: "Extremo Derecho",
    age: 17, dob: "2008-05-12", nationality: "Argentina", division: "Reserva", number: 23,
    contractUntil: "2028-12-31", rating: 69, ratingHistory: [61, 63, 65, 66, 68, 69],
    representative: "rep7",
    radar: { "Definición": 66, "Velocidad": 76, "Regate": 74, "Movimiento": 70, "Juego aéreo": 50, "Presión": 68 },
    physical: { speed: 30.8, distance: 9.8, sprints: 25 },
    academic: { schoolYear: "4to año", subjectsPassed: 10, subjectsPending: 0, attendance: 92, status: "green" },
    notes: [{ date: "2026-03-02", author: "Coordinador", text: "1.63m. Clase 2008 con gran potencial. Desequilibrio por velocidad." }],
    injury: null
  },
  {
    id: 24, name: "Juan Villordo", position: "CF", positionFull: "Delantero Centro",
    age: 18, dob: "2008-03-07", nationality: "Argentina", division: "Reserva", number: 25,
    contractUntil: "2028-12-31", rating: 69, ratingHistory: [61, 63, 65, 66, 68, 69],
    representative: "rep8",
    radar: { "Definición": 72, "Velocidad": 68, "Regate": 62, "Movimiento": 68, "Juego aéreo": 72, "Presión": 74 },
    physical: { speed: 29.0, distance: 9.2, sprints: 21 },
    academic: { schoolYear: "5to año", subjectsPassed: 8, subjectsPending: 2, attendance: 86, status: "yellow" },
    notes: [{ date: "2026-02-18", author: "DT Reserva", text: "1.80m. Buen olfato goleador. En crecimiento." }],
    injury: null
  },
  {
    id: 25, name: "Alan Torres", position: "CF", positionFull: "Delantero Centro",
    age: 21, dob: "2005-01-01", nationality: "Argentina", division: "Reserva", number: 24,
    contractUntil: "2027-06-30", rating: 70, ratingHistory: [65, 66, 68, 69, 69, 70],
    representative: "rep1",
    radar: { "Definición": 72, "Velocidad": 70, "Regate": 64, "Movimiento": 72, "Juego aéreo": 70, "Presión": 68 },
    physical: { speed: 29.5, distance: 9.4, sprints: 21 },
    academic: { schoolYear: "Egresado", subjectsPassed: 12, subjectsPending: 0, attendance: 100, status: "green" },
    notes: [{ date: "2026-03-04", author: "DT Reserva", text: "Experiencia arriba. Buena referencia de área." }],
    injury: null
  },

  // === 4TA DIVISIÓN ===
  {
    id: 26, name: "Ramiro Buratti", position: "GK", positionFull: "Arquero",
    age: 17, dob: "2008-09-14", nationality: "Argentina", division: "4ta", number: 1,
    contractUntil: "2028-12-31", rating: 65, ratingHistory: [58, 60, 61, 63, 64, 65],
    representative: "rep2",
    radar: { "Reflejos": 68, "Posicionamiento": 62, "Juego aéreo": 60, "Distribución": 64, "1 vs 1": 66, "Comunicación": 58 },
    physical: { speed: 23.5, distance: 4.8, sprints: 6 },
    academic: { schoolYear: "4to año", subjectsPassed: 9, subjectsPending: 1, attendance: 90, status: "green" },
    notes: [{ date: "2026-02-15", author: "DT 4ta", text: "Seguro bajo los tres palos. Buen manejo de los tiempos." }],
    injury: null
  },
  {
    id: 27, name: "Yutiel Susano", position: "RB", positionFull: "Lateral Derecho",
    age: 18, dob: "2007-11-20", nationality: "Argentina", division: "4ta", number: 4,
    contractUntil: "2028-06-30", rating: 66, ratingHistory: [59, 61, 62, 63, 65, 66],
    representative: "rep3",
    radar: { "Marcaje": 66, "Juego aéreo": 58, "Anticipo": 64, "Salida": 70, "Velocidad": 72, "Liderazgo": 56 },
    physical: { speed: 29.5, distance: 9.8, sprints: 22 },
    academic: { schoolYear: "5to año", subjectsPassed: 8, subjectsPending: 2, attendance: 84, status: "yellow" },
    notes: [{ date: "2026-02-20", author: "DT 4ta", text: "Ofensivo. Proyección al ataque." }],
    injury: null
  },
  {
    id: 28, name: "Cirilo Pereyra", position: "LB", positionFull: "Lateral Izquierdo",
    age: 17, dob: "2008-06-03", nationality: "Argentina", division: "4ta", number: 3,
    contractUntil: "2028-12-31", rating: 64, ratingHistory: [56, 58, 60, 61, 63, 64],
    representative: "rep4",
    radar: { "Marcaje": 64, "Juego aéreo": 56, "Anticipo": 62, "Salida": 68, "Velocidad": 70, "Liderazgo": 54 },
    physical: { speed: 29.0, distance: 9.4, sprints: 20 },
    academic: { schoolYear: "4to año", subjectsPassed: 10, subjectsPending: 0, attendance: 94, status: "green" },
    notes: [{ date: "2026-01-18", author: "DT 4ta", text: "Zurdo natural. Buen centro." }],
    injury: null
  },
  {
    id: 29, name: "Enzo Aguirre", position: "CB", positionFull: "Defensor Central",
    age: 17, dob: "2008-08-05", nationality: "Argentina", division: "4ta", number: 5,
    contractUntil: "2028-12-31", rating: 64, ratingHistory: [57, 59, 60, 62, 63, 64],
    representative: "rep5",
    radar: { "Marcaje": 68, "Juego aéreo": 66, "Anticipo": 62, "Salida": 60, "Velocidad": 64, "Liderazgo": 58 },
    physical: { speed: 28.0, distance: 8.6, sprints: 15 },
    academic: { schoolYear: "4to año", subjectsPassed: 8, subjectsPending: 2, attendance: 82, status: "yellow" },
    notes: [{ date: "2026-02-14", author: "DT 4ta", text: "Capitán de la categoría. Líder." }],
    injury: null
  },
  {
    id: 30, name: "Juan Sayago", position: "AM", positionFull: "Mediapunta",
    age: 18, dob: "2007-12-15", nationality: "Argentina", division: "4ta", number: 10,
    contractUntil: "2028-06-30", rating: 68, ratingHistory: [60, 62, 64, 65, 67, 68],
    representative: "rep6",
    radar: { "Definición": 70, "Velocidad": 66, "Regate": 74, "Movimiento": 72, "Juego aéreo": 54, "Presión": 62 },
    physical: { speed: 28.5, distance: 9.2, sprints: 19 },
    academic: { schoolYear: "5to año", subjectsPassed: 7, subjectsPending: 3, attendance: 78, status: "yellow" },
    notes: [{ date: "2026-03-01", author: "DT 4ta", text: "Enganche clásico. Visión de juego." }],
    injury: null
  },
  {
    id: 31, name: "Gonzalo Pereyra", position: "RW", positionFull: "Extremo Derecho",
    age: 17, dob: "2008-07-22", nationality: "Argentina", division: "4ta", number: 7,
    contractUntil: "2028-12-31", rating: 64, ratingHistory: [56, 58, 60, 61, 63, 64],
    representative: "rep7",
    radar: { "Definición": 62, "Velocidad": 72, "Regate": 68, "Movimiento": 64, "Juego aéreo": 50, "Presión": 66 },
    physical: { speed: 30.0, distance: 9.5, sprints: 23 },
    academic: { schoolYear: "4to año", subjectsPassed: 9, subjectsPending: 1, attendance: 91, status: "green" },
    notes: [{ date: "2026-02-25", author: "DT 4ta", text: "Muy rápido. Necesita mejorar el último pase." }],
    injury: null
  },
  {
    id: 32, name: "Matías Barcia", position: "GK", positionFull: "Arquero",
    age: 17, dob: "2008-05-10", nationality: "Argentina", division: "4ta", number: 12,
    contractUntil: "2028-12-31", rating: 62, ratingHistory: [54, 56, 58, 59, 61, 62],
    representative: "rep8",
    radar: { "Reflejos": 64, "Posicionamiento": 60, "Juego aéreo": 58, "Distribución": 66, "1 vs 1": 62, "Comunicación": 56 },
    physical: { speed: 23.0, distance: 4.6, sprints: 5 },
    academic: { schoolYear: "4to año", subjectsPassed: 10, subjectsPending: 0, attendance: 96, status: "green" },
    notes: [{ date: "2026-01-22", author: "DT 4ta", text: "Buena distribución. Alternativa de Buratti." }],
    injury: null
  },
  {
    id: 33, name: "Jonas Luna", position: "CM", positionFull: "Mediocampista Central",
    age: 17, dob: "2008-10-18", nationality: "Argentina", division: "4ta", number: 8,
    contractUntil: "2028-12-31", rating: 66, ratingHistory: [58, 60, 62, 63, 65, 66],
    representative: "rep1",
    radar: { "Pase": 70, "Visión": 68, "Recuperación": 64, "Conducción": 66, "Llegada": 62, "Resistencia": 66 },
    physical: { speed: 27.5, distance: 9.0, sprints: 18 },
    academic: { schoolYear: "4to año", subjectsPassed: 9, subjectsPending: 1, attendance: 89, status: "green" },
    notes: [{ date: "2026-02-28", author: "DT 4ta", text: "Buen pie. Pase largo preciso." }],
    injury: null
  },
  {
    id: 34, name: "Facundo Acevedo", position: "CF", positionFull: "Delantero Centro",
    age: 17, dob: "2008-04-25", nationality: "Argentina", division: "4ta", number: 9,
    contractUntil: "2028-12-31", rating: 67, ratingHistory: [59, 61, 63, 64, 66, 67],
    representative: "rep2",
    radar: { "Definición": 72, "Velocidad": 68, "Regate": 60, "Movimiento": 66, "Juego aéreo": 64, "Presión": 70 },
    physical: { speed: 28.8, distance: 9.0, sprints: 19 },
    academic: { schoolYear: "4to año", subjectsPassed: 7, subjectsPending: 3, attendance: 75, status: "red" },
    notes: [{ date: "2026-03-05", author: "DT 4ta", text: "Goleador de la categoría. 9 goles en 12 partidos." }],
    injury: null
  },

  // === 5TA DIVISIÓN ===
  {
    id: 35, name: "Valentín Moreno", position: "GK", positionFull: "Arquero",
    age: 16, dob: "2009-08-12", nationality: "Argentina", division: "5ta", number: 1,
    contractUntil: "2029-06-30", rating: 60, ratingHistory: [52, 54, 56, 57, 59, 60],
    representative: "rep3",
    radar: { "Reflejos": 62, "Posicionamiento": 58, "Juego aéreo": 54, "Distribución": 60, "1 vs 1": 58, "Comunicación": 52 },
    physical: { speed: 22.5, distance: 4.4, sprints: 5 },
    academic: { schoolYear: "3er año", subjectsPassed: 10, subjectsPending: 0, attendance: 95, status: "green" },
    notes: [{ date: "2026-02-10", author: "DT 5ta", text: "Muy joven pero ya muestra personalidad." }],
    injury: null
  },
  {
    id: 36, name: "Facundo Romero", position: "CB", positionFull: "Defensor Central",
    age: 16, dob: "2009-05-30", nationality: "Argentina", division: "5ta", number: 4,
    contractUntil: "2029-06-30", rating: 61, ratingHistory: [53, 55, 57, 58, 60, 61],
    representative: "rep4",
    radar: { "Marcaje": 64, "Juego aéreo": 62, "Anticipo": 58, "Salida": 56, "Velocidad": 60, "Liderazgo": 54 },
    physical: { speed: 27.0, distance: 8.2, sprints: 14 },
    academic: { schoolYear: "3er año", subjectsPassed: 9, subjectsPending: 1, attendance: 88, status: "green" },
    notes: [{ date: "2026-01-20", author: "DT 5ta", text: "Buen biotipo. 1.85m a los 16 años." }],
    injury: null
  },
  {
    id: 37, name: "Luca Benítez", position: "CM", positionFull: "Mediocampista Central",
    age: 16, dob: "2009-11-08", nationality: "Argentina", division: "5ta", number: 8,
    contractUntil: "2029-06-30", rating: 63, ratingHistory: [55, 57, 59, 60, 62, 63],
    representative: "rep5",
    radar: { "Pase": 66, "Visión": 64, "Recuperación": 60, "Conducción": 68, "Llegada": 58, "Resistencia": 62 },
    physical: { speed: 27.2, distance: 8.8, sprints: 16 },
    academic: { schoolYear: "3er año", subjectsPassed: 8, subjectsPending: 2, attendance: 82, status: "yellow" },
    notes: [{ date: "2026-02-22", author: "DT 5ta", text: "Técnicamente muy bueno para su edad." }],
    injury: null
  },
  {
    id: 38, name: "Santino López", position: "LW", positionFull: "Extremo Izquierdo",
    age: 16, dob: "2009-03-18", nationality: "Argentina", division: "5ta", number: 11,
    contractUntil: "2029-06-30", rating: 62, ratingHistory: [54, 56, 58, 59, 61, 62],
    representative: "rep6",
    radar: { "Definición": 58, "Velocidad": 70, "Regate": 66, "Movimiento": 62, "Juego aéreo": 48, "Presión": 60 },
    physical: { speed: 29.5, distance: 9.0, sprints: 21 },
    academic: { schoolYear: "3er año", subjectsPassed: 10, subjectsPending: 0, attendance: 93, status: "green" },
    notes: [{ date: "2026-01-30", author: "DT 5ta", text: "El más rápido de la categoría." }],
    injury: null
  },
  {
    id: 39, name: "Bautista Herrera", position: "CF", positionFull: "Delantero Centro",
    age: 16, dob: "2009-07-05", nationality: "Argentina", division: "5ta", number: 9,
    contractUntil: "2029-06-30", rating: 64, ratingHistory: [56, 58, 60, 61, 63, 64],
    representative: "rep7",
    radar: { "Definición": 68, "Velocidad": 66, "Regate": 58, "Movimiento": 64, "Juego aéreo": 62, "Presión": 66 },
    physical: { speed: 28.2, distance: 8.6, sprints: 17 },
    academic: { schoolYear: "3er año", subjectsPassed: 7, subjectsPending: 3, attendance: 74, status: "red" },
    notes: [{ date: "2026-02-18", author: "DT 5ta", text: "Gran instinto goleador. Preocupa lo académico." }],
    injury: null
  },
  {
    id: 40, name: "Nicolás Figueroa", position: "DM", positionFull: "Mediocampista Defensivo",
    age: 16, dob: "2009-01-22", nationality: "Argentina", division: "5ta", number: 5,
    contractUntil: "2029-06-30", rating: 61, ratingHistory: [53, 55, 57, 58, 60, 61],
    representative: "rep8",
    radar: { "Pase": 62, "Visión": 58, "Recuperación": 66, "Conducción": 60, "Llegada": 54, "Resistencia": 64 },
    physical: { speed: 27.0, distance: 8.5, sprints: 16 },
    academic: { schoolYear: "3er año", subjectsPassed: 9, subjectsPending: 1, attendance: 87, status: "green" },
    notes: [{ date: "2026-02-05", author: "DT 5ta", text: "Posicional. Lee bien el juego." }],
    injury: null
  },
  {
    id: 41, name: "Felipe Álvarez", position: "RB", positionFull: "Lateral Derecho",
    age: 16, dob: "2009-09-28", nationality: "Argentina", division: "5ta", number: 2,
    contractUntil: "2029-06-30", rating: 60, ratingHistory: [52, 54, 56, 57, 59, 60],
    representative: "rep1",
    radar: { "Marcaje": 62, "Juego aéreo": 54, "Anticipo": 58, "Salida": 64, "Velocidad": 66, "Liderazgo": 50 },
    physical: { speed: 28.5, distance: 8.8, sprints: 18 },
    academic: { schoolYear: "3er año", subjectsPassed: 8, subjectsPending: 2, attendance: 80, status: "yellow" },
    notes: [{ date: "2026-02-12", author: "DT 5ta", text: "Agresivo en la marca. Proyección." }],
    injury: { type: "Esguince de tobillo", since: "2026-03-10", expectedReturn: "2026-03-28" }
  }
];

// ===== DIVISIONS =====
const DIVISIONS = [
  {
    id: "Reserva", name: "Reserva", shortName: "RES", coach: "Marcelo Escudero",
    ageRange: "17-23", competition: "Torneo Proyección LPF",
    record: { w: 5, d: 0, l: 0 },
    topScorer: { name: "Jonathan Spiff", goals: 4 },
    nextMatch: { opponent: "Atlético Tucumán", date: "2026-03-19", home: true, competition: "Torneo Proyección" },
    lastResults: [
      { opponent: "Godoy Cruz", result: "W", score: "1-0", date: "2026-03-04" },
      { opponent: "Gimnasia Mendoza", result: "W", score: "5-1", date: "2026-02-18" },
      { opponent: "Barracas Central", result: "W", score: "1-0", date: "2026-02-11" },
      { opponent: "Talleres", result: "W", score: "2-0", date: "2026-02-05" },
      { opponent: "Boca Juniors", result: "W", score: "2-0", date: "2025-11-27" }
    ]
  },
  {
    id: "4ta", name: "Cuarta División", shortName: "4TA", coach: "Adrián Busto",
    ageRange: "17-18", competition: "Liga Juvenil AFA",
    record: { w: 6, d: 4, l: 3 },
    topScorer: { name: "Facundo Acevedo", goals: 9 },
    nextMatch: { opponent: "Racing", date: "2026-03-18", home: false, competition: "Liga Juvenil" },
    lastResults: [
      { opponent: "Boca Juniors", result: "L", score: "1-2", date: "2026-03-06" },
      { opponent: "Huracán", result: "W", score: "3-1", date: "2026-02-28" },
      { opponent: "Lanús", result: "W", score: "2-0", date: "2026-02-21" },
      { opponent: "Argentinos", result: "D", score: "0-0", date: "2026-02-14" },
      { opponent: "Defensa y Justicia", result: "W", score: "4-2", date: "2026-02-07" }
    ]
  },
  {
    id: "5ta", name: "Quinta División", shortName: "5TA", coach: "Daniel Villalba",
    ageRange: "15-16", competition: "Liga Juvenil AFA",
    record: { w: 7, d: 2, l: 4 },
    topScorer: { name: "Bautista Herrera", goals: 8 },
    nextMatch: { opponent: "Independiente", date: "2026-03-19", home: true, competition: "Liga Juvenil" },
    lastResults: [
      { opponent: "San Lorenzo", result: "W", score: "2-0", date: "2026-03-07" },
      { opponent: "Tigre", result: "L", score: "1-3", date: "2026-02-28" },
      { opponent: "Platense", result: "W", score: "3-1", date: "2026-02-21" },
      { opponent: "Banfield", result: "W", score: "2-1", date: "2026-02-14" },
      { opponent: "Newell's", result: "D", score: "2-2", date: "2026-02-07" }
    ]
  },
  {
    id: "6ta", name: "Sexta División", shortName: "6TA", coach: "Roberto Monzón",
    ageRange: "14-15", competition: "Liga Juvenil AFA",
    record: { w: 9, d: 1, l: 3 },
    topScorer: { name: "Agustín Medina", goals: 11 },
    nextMatch: { opponent: "Vélez", date: "2026-03-21", home: false, competition: "Liga Juvenil" },
    lastResults: [
      { opponent: "Racing", result: "W", score: "4-0", date: "2026-03-08" },
      { opponent: "Gimnasia", result: "W", score: "2-1", date: "2026-03-01" },
      { opponent: "Colón", result: "W", score: "3-0", date: "2026-02-22" },
      { opponent: "Godoy Cruz", result: "L", score: "0-1", date: "2026-02-15" },
      { opponent: "Rosario Central", result: "W", score: "5-2", date: "2026-02-08" }
    ]
  },
  {
    id: "7ma", name: "Séptima División", shortName: "7MA", coach: "Gustavo Paredes",
    ageRange: "13-14", competition: "Liga Juvenil AFA",
    record: { w: 5, d: 5, l: 3 },
    topScorer: { name: "Luciano Díaz", goals: 6 },
    nextMatch: { opponent: "San Lorenzo", date: "2026-03-22", home: true, competition: "Liga Juvenil" },
    lastResults: [
      { opponent: "Lanús", result: "D", score: "1-1", date: "2026-03-07" },
      { opponent: "Boca Juniors", result: "L", score: "0-3", date: "2026-02-28" },
      { opponent: "Argentinos", result: "W", score: "2-0", date: "2026-02-21" },
      { opponent: "Huracán", result: "D", score: "0-0", date: "2026-02-14" },
      { opponent: "Talleres", result: "W", score: "1-0", date: "2026-02-07" }
    ]
  },
  {
    id: "8va", name: "Octava División", shortName: "8VA", coach: "Fabián Garello",
    ageRange: "12-13", competition: "Liga Juvenil AFA",
    record: { w: 10, d: 2, l: 1 },
    topScorer: { name: "Thiago Ramírez", goals: 14 },
    nextMatch: { opponent: "Boca Juniors", date: "2026-03-23", home: false, competition: "Liga Juvenil" },
    lastResults: [
      { opponent: "Independiente", result: "W", score: "3-0", date: "2026-03-06" },
      { opponent: "Vélez", result: "W", score: "2-1", date: "2026-02-27" },
      { opponent: "Racing", result: "W", score: "4-0", date: "2026-02-20" },
      { opponent: "Defensa y Justicia", result: "D", score: "1-1", date: "2026-02-13" },
      { opponent: "Estudiantes", result: "W", score: "6-0", date: "2026-02-06" }
    ]
  }
];

// ===== HELPERS =====
function getPositionGroup(pos) {
  if (pos === "GK") return "GK";
  if (["CB", "LB", "RB"].includes(pos)) return "DEF";
  if (["DM", "CM", "RM", "AM"].includes(pos)) return "MID";
  return "ATK";
}

function getAgeGroup(age) {
  if (age <= 17) return "Sub-17";
  if (age <= 18) return "Sub-18";
  if (age <= 19) return "Sub-19";
  if (age <= 20) return "Sub-20";
  if (age <= 21) return "Sub-21";
  return "Sub-23";
}

function getPlayersByDivision(divId) {
  return PLAYERS.filter(p => p.division === divId);
}

function getPlayersByRep(repId) {
  return PLAYERS.filter(p => p.representative === repId);
}

function getRepById(repId) {
  return REPRESENTATIVES.find(r => r.id === repId);
}

function getDivisionById(divId) {
  return DIVISIONS.find(d => d.id === divId);
}

function contractMonthsRemaining(dateStr) {
  const now = new Date(2026, 2, 14); // March 14, 2026
  const end = new Date(dateStr);
  const months = (end.getFullYear() - now.getFullYear()) * 12 + (end.getMonth() - now.getMonth());
  return Math.max(0, months);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function getStatusLabel(status) {
  if (status === "green") return "Al día";
  if (status === "yellow") return "Materias pendientes";
  return "En riesgo";
}

function getAllPositions() {
  return [...new Set(PLAYERS.map(p => p.position))].sort();
}

function getAllDivisionIds() {
  return DIVISIONS.map(d => d.id);
}
