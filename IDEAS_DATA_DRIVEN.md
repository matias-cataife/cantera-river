# Ideas Data-Driven para Cantera CARP

Investigación de casos validados en academias europeas y ligas mayores para evolucionar la herramienta con features de data analytics y data science.

---

## 1. Tracking de Maduración Biológica (Bio-banding)

**Qué es:** Agrupar jugadores por maduración biológica en vez de edad cronológica. Un pibe de 14 que mide 1.80 no es comparable con uno de 14 que mide 1.55.

**Quién lo usa:**
- Premier League (programa oficial EPPP) — pioneros en bio-banding tournaments
- Ajax, Benfica, Bayern — integrado en evaluaciones

**Métricas clave:**
- Peak Height Velocity (PHV): ventana de máximo crecimiento (~13.5 años en varones)
- Maturity offset: qué tan lejos está del PHV
- Altura, peso, envergadura, largo de piernas — evolución mensual
- % de altura adulta predicha (método Khamis-Roche)

**Qué podemos hacer:**
- Agregar módulo de **tracking antropométrico** mensual (altura, peso, envergadura)
- Calcular PHV estimado con fórmula de Mirwald (validada académicamente)
- Mostrar **maturity timeline** por jugador: pre-PHV / PHV / post-PHV
- Flag automático cuando un jugador entra en ventana PHV (alto riesgo de lesión)
- En el módulo de comparación, mostrar **maturation-adjusted ratings** para no castigar a maduradores tardíos
- Bio-banding visual: colorear jugadores por estado madurativo en las vistas de división

**Impacto:** Evita descartar talentos tardíos (ej: Modric, Iniesta eran chicos para su edad). 7 estudios confirman que la ventana PHV tiene riesgo significativamente mayor de lesiones por sobreuso.

---

## 2. Modelo de Predicción de Lesiones

**Qué es:** Usar datos históricos para predecir riesgo de lesión antes de que ocurra.

**Quién lo usa:**
- Chelsea FC Academy — 20,913 data points de GPS en 53 jugadores, paper publicado en MDPI Sports
- Premier League — estudio de 3 años: picos de ACWR >2.0 correlacionan con 5-7x más riesgo de lesión
- Clubs con Catapult/KINEXON — monitoreo en tiempo real

**Métricas clave:**
- ACWR (Acute-to-Chronic Workload Ratio): carga últimos 7 días / carga últimos 28 días
- Distancia total, sprints, aceleraciones por sesión
- Horas de sueño, RPE (percepción de esfuerzo) — dato manual
- Historial de lesiones previas (el mejor predictor es lesión anterior)
- Estado madurativo (ventana PHV = mayor riesgo)

**Qué podemos hacer:**
- Dashboard de **carga de entrenamiento** con ACWR por jugador
- Semáforo de riesgo: verde (<1.3), amarillo (1.3-1.5), rojo (>1.5)
- Input semanal simple: distancia recorrida, sprints, RPE (1-10), horas de sueño
- Modelo básico: regresión logística con variables (ACWR, historial lesiones, estado madurativo, RPE)
- Alertas automáticas cuando un jugador cruza umbral de riesgo
- Heatmap temporal: visualizar carga vs lesiones en timeline de 12 meses

**Nivel avanzado:** Con suficientes datos (6+ meses), entrenar XGBoost para injury forecasting. Paper de PMC 2023 valida este approach en youth soccer.

---

## 3. Modelo de Proyección de Potencial (Talent ID)

**Qué es:** Predecir el techo de un jugador basándose en su curva de desarrollo comparada con jugadores históricos similares.

**Quién lo usa:**
- Ajax — ML con 200+ indicadores de performance
- Analytics FC TransferLab Emerge (lanzado Feb 2025) — cubre 33 ligas juveniles, 15,000 jugadores, algoritmo GDA basado en cadenas de Markov
- SciSports — ratings de calidad y potencial para 250K+ jugadores
- AiSCOUT — computer vision sobre 75 ejercicios grabados con celular

**Qué podemos hacer:**
- **Curva de desarrollo esperada** por posición: rating promedio por edad para cada posición
- Comparar la curva real de cada jugador vs la curva esperada
- Clasificar jugadores: "ahead of curve" / "on track" / "behind curve"
- **Player similarity model**: encontrar jugadores históricos del club con perfil similar al actual
- Score de **promocionabilidad**: probabilidad de subir de división basada en velocidad de mejora, no solo rating actual
- Radar de potencial vs actual: mostrar dónde debería estar en 12 meses según su tendencia

**Nivel avanzado:**
- Clustering (K-means) para agrupar perfiles de jugadores y detectar arquetipos
- Modelo supervisado: usar datos de jugadores que llegaron a Primera como target positivo

---

## 4. Métricas Avanzadas de Rendimiento

**Qué es:** Ir más allá de goles y asistencias con métricas que capturan contribución real al juego.

**Quién lo usa:**
- StatsBomb — 3,400+ eventos por partido, 190+ competiciones
- Opta/Stats Perform — proveedor oficial de Premier League, La Liga
- SciSports — 150+ eventos por partido con playlists automáticas por posición

**Métricas para agregar por posición:**

### Arqueros
- Save % por zona (dividir arco en 6 sectores)
- Distribución: % pases largos exitosos, % saques con pie exitosos
- Sweeper actions: salidas fuera del área por partido

### Defensores
- Duelos ganados % (aéreos y terrestres)
- Pases progresivos: pases que avanzan >10m hacia el arco rival
- Intercepciones por 90 minutos
- Carries progresivos: conducciones >10m hacia adelante

### Mediocampistas
- Pases al tercio final por 90 min
- Pases entre líneas completados
- Ball recoveries en campo rival
- Distancia recorrida con posesión vs sin posesión

### Delanteros
- xG (Expected Goals): probabilidad de gol por remate según posición, ángulo, tipo de asistencia
- xG vs goles reales (overperforming = insostenible, underperforming = mala suerte)
- Presiones exitosas en campo rival
- Toques en el área por 90 min

**Qué podemos hacer:**
- Agregar pestaña de **métricas avanzadas** en perfil de jugador
- Permitir input manual post-partido de eventos clave (o importar CSV)
- Percentil por edad y posición dentro de la cantera
- Evolución temporal de cada métrica avanzada (sparkline charts)

---

## 5. Evaluación Cognitiva y Táctica

**Qué es:** Medir la inteligencia futbolística: velocidad de decisión, lectura del juego, visión periférica.

**Quién lo usa:**
- Borussia Dortmund — entrenamiento cognitivo desde los 11 años, datos recopilados 2-3x por año durante 6-7 años
- Bayern Munich skills.lab — mide reconocimiento cognitivo de situaciones tácticas
- Benfica 360S — combina entrenamiento técnico con evaluación psicológica

**Dimensiones evaluables:**
- Velocidad de decisión (tiempo de reacción en situaciones tácticas)
- Scanning frequency (cuántas veces mira por encima del hombro)
- Lectura de juego: decisión correcta en situaciones de video ocluido
- Liderazgo en cancha (cualitativo, evaluación del DT)
- Resiliencia mental (respuesta después de errores)

**Qué podemos hacer:**
- Módulo de **evaluación psicológica/cognitiva** con escala 1-5 en cada dimensión
- Evaluación trimestral por el cuerpo técnico
- Radar cognitivo separado del radar técnico
- Flag de jugadores con alto técnico pero bajo cognitivo (necesitan desarrollo táctico)
- Flag de jugadores con alto cognitivo pero bajo físico (proteger, pueden ser late bloomers)
- Tracking de evolución cognitiva en el tiempo

**Base académica:** Estudios en SpringerPlus validan que jugadores >11-12 años son aptos para evaluación cognitiva/táctica formal. La Generic Football Intelligence (GFI) tiene correlación significativa con nivel competitivo alcanzado.

---

## 6. Four Corner Model (EPPP)

**Qué es:** Framework holístico del fútbol inglés que evalúa jugadores en 4 dimensiones: Técnico/Táctico, Físico, Psicológico, Social.

**Quién lo usa:**
- Todas las academias de Premier League (obligatorio en categorías 1-4)
- Adoptado/adaptado por federaciones en Europa
- Validado académicamente, auditado independientemente

**Qué podemos hacer:**
- Implementar el modelo como **framework unificador** de toda la evaluación
- Cada jugador tiene un score en cada esquina:
  - **Técnico/Táctico**: ratings actuales + métricas avanzadas
  - **Físico**: velocidad, distancia, sprints + estado madurativo
  - **Psicológico**: evaluación cognitiva + resiliencia + liderazgo
  - **Social**: rendimiento académico + relación con pares + adaptación
- Vista de **diamante** (4 ejes) como alternativa/complemento al radar hexagonal actual
- Benchmarks por edad y posición para cada esquina
- El módulo académico actual se integra naturalmente en la esquina "Social"

---

## 7. Sistema de Scouting con Scoring

**Qué es:** Evaluar jugadores externos (rivales, pruebas) con métricas estandarizadas para decisiones de incorporación.

**Quién lo usa:**
- Red Bull Salzburg — matrices de rating propietarias, monitoreo 12-24 meses antes de fichar
- Ajax — scoring en 40 criterios dentro del framework TIPS
- AiSCOUT — 70+ parámetros evaluados por AI desde video de celular

**Qué podemos hacer:**
- Módulo de **scouting** para jugadores externos
- Ficha de prospecto: datos básicos + evaluación en el Four Corner Model
- Watchlist con seguimiento temporal (mínimo 3 observaciones para decidir)
- Score de compatibilidad: qué tan bien encaja el prospecto en las posiciones que necesitamos reforzar
- Comparación directa prospecto vs jugadores actuales de la posición
- Pipeline de scouting: Detectado → En observación → Evaluado → Recomendado → Descartado

---

## 8. Análisis de Video Simplificado

**Qué es:** Vincular datos con momentos de video para contexto visual.

**Quién lo usa:**
- Hudl Sportscode — plataforma líder, integra video + stats
- Metrica Sports — tracking AI desde cámara única (inversión de Barça)
- Pixellot — grabación automatizada sin camarógrafo

**Qué podemos hacer (versión accesible):**
- Campo de **link a video** en cada nota de jugador (YouTube, Drive, Vimeo)
- Tags de momento: vincular timestamp de video con evento (gol, error, jugada destacada)
- Galería de clips por jugador: mejores jugadas, áreas de mejora
- Integración con YouTube timestamps: `?t=XXs` para ir directo al momento
- Eventualmente: importar highlights de partidos y vincular con stats del partido

---

## 9. Dashboard de Inteligencia para Decisiones

**Qué es:** Visualizaciones ejecutivas que ayuden a tomar decisiones de promoción, préstamo, renovación, incorporación.

**Quién lo usa:**
- Manchester City / CFG — hub central de datos para decisiones en todos sus clubes
- Premier League EPPP — Performance Clock documentado por coach y jugador

**Qué podemos hacer:**
- **Promotion readiness score**: combinación ponderada de rating, tendencia, físico, mental, académico
- **Risk matrix**: jugadores en riesgo (contrato venciendo + bajo rendimiento + problemas académicos)
- **Depth chart**: mapa de profundidad por posición a través de todas las divisiones
- **Age distribution**: pirámide de edades por posición (detectar huecos generacionales)
- **Retention analytics**: tasa histórica de retención por división y posición
- **Exportable monthly report**: PDF automático para directivos con KPIs clave
- **Alerts feed**: todas las alertas en un solo lugar (lesión, contrato, académico, bajo rendimiento, promoción lista)

---

## 10. Import/Export de Datos y APIs

**Qué es:** Conectar la herramienta con fuentes de datos externas para enriquecer la información.

**Plataformas potenciales:**
- Wyscout / StatsBomb — stats de partidos oficiales
- Catapult / Playermaker — datos de GPS y wearables
- Planillas existentes del club (Excel/Google Sheets)

**Qué podemos hacer:**
- **Import CSV/Excel** para carga masiva de datos de partidos
- **Google Sheets sync** bidireccional (el club probablemente ya usa planillas)
- **API REST** para que otras herramientas del club puedan consumir datos
- **Export formatos**: PDF (ya existe), CSV, JSON
- **Webhook de alertas** a Slack/WhatsApp del cuerpo técnico

---

## Datos a Recolectar: Diccionario Completo

Todo el sistema data-driven depende de la calidad y consistencia de los datos que se recolecten. Esta sección detalla **exactamente** qué datos se necesitan, con qué frecuencia, quién es responsable, y qué features habilita cada dato.

### A. Datos Antropométricos y de Maduración

| Dato | Tipo | Unidad | Frecuencia | Quién carga | Features que habilita |
|------|------|--------|------------|-------------|----------------------|
| Altura de pie | numérico | cm (0.1) | Mensual | Médico/Kinesiólogo | Bio-banding, PHV, proyección |
| Altura sentado | numérico | cm (0.1) | Mensual | Médico/Kinesiólogo | Cálculo PHV (fórmula Mirwald) |
| Peso | numérico | kg (0.1) | Mensual | Médico/Kinesiólogo | Bio-banding, IMC, nutrición |
| Envergadura | numérico | cm (0.1) | Trimestral | Médico/Kinesiólogo | Proporcionalidad corporal |
| Largo de piernas | numérico | cm (0.1) | Trimestral | Médico/Kinesiólogo | PHV, riesgo lesión por crecimiento |
| Fecha de nacimiento | fecha | DD/MM/AAAA | Una vez | Admin | Edad cronológica, relative age effect |
| Altura del padre | numérico | cm | Una vez | Admin (encuesta) | Predicción altura adulta (Khamis-Roche) |
| Altura de la madre | numérico | cm | Una vez | Admin (encuesta) | Predicción altura adulta (Khamis-Roche) |

**Dato derivado (calculado automáticamente):**
- PHV estimado (fórmula Mirwald: usa edad, altura, peso, altura sentado, largo de piernas)
- Maturity offset: años desde/hasta el PHV
- % de altura adulta predicha
- Estado madurativo: Pre-PHV / PHV / Post-PHV
- IMC y tendencia

### B. Datos de Carga Física (Entrenamiento y Partidos)

| Dato | Tipo | Unidad | Frecuencia | Quién carga | Features que habilita |
|------|------|--------|------------|-------------|----------------------|
| Distancia total | numérico | metros | Por sesión/partido | Preparador físico | ACWR, carga, evolución física |
| Distancia alta intensidad | numérico | metros (>19 km/h) | Por sesión/partido | Preparador físico | Carga específica, riesgo lesión |
| Cantidad de sprints | numérico | count | Por sesión/partido | Preparador físico | ACWR, perfil físico |
| Velocidad máxima | numérico | km/h | Por sesión/partido | Preparador físico | Evolución física, benchmarks |
| Aceleraciones | numérico | count (>3 m/s²) | Por sesión/partido | Preparador físico | Carga neuromuscular |
| Desaceleraciones | numérico | count (<-3 m/s²) | Por sesión/partido | Preparador físico | Carga neuromuscular, riesgo lesión |
| Duración de sesión | numérico | minutos | Por sesión/partido | Preparador físico | Carga relativa |
| Tipo de sesión | enum | entrenamiento / partido / gym / recuperación | Por sesión | Preparador físico | Contexto de carga |
| RPE (percepción de esfuerzo) | numérico | 1-10 (Borg modificado) | Por sesión/partido | Jugador (auto-reporte) | Carga interna, bienestar |
| Horas de sueño | numérico | horas (0.5) | Diario | Jugador (auto-reporte) | Recuperación, riesgo lesión |
| Calidad de sueño | enum | buena / regular / mala | Diario | Jugador (auto-reporte) | Bienestar, fatiga |
| Dolor/molestia muscular | enum | ninguna / leve / moderada / severa | Diario | Jugador (auto-reporte) | Alerta temprana lesión |
| Zona de dolor | texto/enum | grupo muscular | Cuando aplica | Jugador (auto-reporte) | Mapeo de riesgo |

**Dato derivado:**
- ACWR = carga aguda (7 días) / carga crónica (28 días)
- Carga semanal acumulada (rolling 7 días)
- Monotonía de entrenamiento (media / desvío estándar semanal)
- Strain = carga semanal × monotonía
- Semáforo de riesgo: verde / amarillo / rojo

**Fuente de datos:** Manual (planilla post-entrenamiento) o automático si hay GPS (Catapult, Playermaker, etc.)

### C. Datos de Rendimiento en Partido (Eventos)

| Dato | Tipo | Unidad | Frecuencia | Quién carga | Features que habilita |
|------|------|--------|------------|-------------|----------------------|
| Minutos jugados | numérico | min | Por partido | Analista / DT | Métricas por 90 min |
| Goles | numérico | count | Por partido | Analista / DT | Rendimiento ofensivo |
| Asistencias | numérico | count | Por partido | Analista / DT | Rendimiento ofensivo |
| Remates (total) | numérico | count | Por partido | Analista | xG, eficiencia |
| Remates al arco | numérico | count | Por partido | Analista | Precisión de tiro |
| Zona de remate | enum | dentro área / fuera área / penal | Por remate | Analista | Cálculo xG simplificado |
| Pases completados | numérico | count | Por partido | Analista | Precisión, posesión |
| Pases totales | numérico | count | Por partido | Analista | % de pases, volumen |
| Pases progresivos | numérico | count (avance >10m) | Por partido | Analista | Contribución territorial |
| Pases al tercio final | numérico | count | Por partido | Analista | Creatividad, amenaza |
| Centros | numérico | count | Por partido | Analista | Producción ofensiva lateral |
| Centros completados | numérico | count | Por partido | Analista | Efectividad |
| Duelos aéreos ganados/total | numérico | ganados/total | Por partido | Analista | Juego aéreo |
| Duelos terrestres ganados/total | numérico | ganados/total | Por partido | Analista | 1v1, intensidad |
| Intercepciones | numérico | count | Por partido | Analista | Lectura defensiva |
| Recuperaciones | numérico | count | Por partido | Analista | Trabajo defensivo |
| Recuperaciones campo rival | numérico | count | Por partido | Analista | Presión, pressing |
| Tackles | numérico | count | Por partido | Analista | Intensidad defensiva |
| Faltas cometidas | numérico | count | Por partido | Analista | Disciplina |
| Faltas recibidas | numérico | count | Por partido | Analista | Capacidad de generar faltas |
| Tarjetas (amarilla/roja) | enum | - / amarilla / roja | Por partido | Analista / DT | Disciplina |
| Toques en área rival | numérico | count | Por partido | Analista | Presencia ofensiva |
| Pérdidas de balón | numérico | count | Por partido | Analista | Toma de decisiones |
| Atajadas (GK) | numérico | count | Por partido | Analista | Rendimiento GK |
| Goles recibidos (GK) | numérico | count | Por partido | Analista | Rendimiento GK |
| Salidas (GK) | numérico | count | Por partido | Analista | Sweeper-keeper |

**Dato derivado:**
- xG simplificado (lookup table por zona de remate: dentro área ~0.12, fuera área ~0.04, penal ~0.76)
- % de pases completados
- % de duelos ganados
- Métricas por 90 minutos (normalización por minutos jugados)
- PPDA del equipo (pases rivales / acciones defensivas)
- Save % por partido (GK)

**Recolección realista:** No hace falta rastrear TODO en cada partido. Empezar con 8-10 métricas core y expandir. Nivel mínimo viable: minutos, goles, asistencias, pases completados/totales, duelos ganados/total, recuperaciones.

### D. Datos de Evaluación Cognitiva/Psicológica

| Dato | Tipo | Escala | Frecuencia | Quién evalúa | Features que habilita |
|------|------|--------|------------|--------------|----------------------|
| Velocidad de decisión | numérico | 1-5 | Trimestral | DT / Psicólogo | Radar cognitivo, Four Corner |
| Lectura de juego | numérico | 1-5 | Trimestral | DT | Radar cognitivo, Talent ID |
| Visión periférica / Scanning | numérico | 1-5 | Trimestral | DT | Radar cognitivo |
| Liderazgo en cancha | numérico | 1-5 | Trimestral | DT | Four Corner (psicológico) |
| Comunicación | numérico | 1-5 | Trimestral | DT | Four Corner (social) |
| Resiliencia mental | numérico | 1-5 | Trimestral | DT / Psicólogo | Riesgo, potencial |
| Actitud en entrenamiento | numérico | 1-5 | Mensual | DT | Comportamiento, alerta |
| Coachability | numérico | 1-5 | Trimestral | DT | Potencial de mejora |
| Presión competitiva | numérico | 1-5 | Trimestral | Psicólogo | Readiness para subir |
| Relación con compañeros | numérico | 1-5 | Trimestral | DT / Psicólogo | Four Corner (social) |
| Notas cualitativas | texto libre | - | Cuando sea relevante | DT / Psicólogo | Contexto |

**Dato derivado:**
- Score cognitivo promedio
- Score psicológico promedio
- Score social promedio
- Evolución trimestral en cada dimensión
- Gaps: diferencia entre score técnico y cognitivo

### E. Datos Médicos y de Lesiones

| Dato | Tipo | Detalle | Frecuencia | Quién carga | Features que habilita |
|------|------|---------|------------|-------------|----------------------|
| Tipo de lesión | enum | muscular / ligamentaria / ósea / contusión / otra | Por evento | Médico/Kinesiólogo | Historial, patrones |
| Zona de lesión | enum | muslo / rodilla / tobillo / ingle / espalda / etc. | Por evento | Médico/Kinesiólogo | Mapeo corporal |
| Mecanismo | enum | contacto / sin contacto / sobreuso | Por evento | Médico/Kinesiólogo | Análisis de causas |
| Severidad | enum | leve (1-3 días) / moderada (4-28 días) / severa (>28 días) | Por evento | Médico/Kinesiólogo | Burden de lesiones |
| Fecha de lesión | fecha | DD/MM/AAAA | Por evento | Médico/Kinesiólogo | Timeline, ACWR correlación |
| Fecha de retorno | fecha | DD/MM/AAAA | Por evento | Médico/Kinesiólogo | Días perdidos |
| Contexto | enum | entrenamiento / partido / otro | Por evento | Médico/Kinesiólogo | Análisis de riesgo |
| Recurrencia | boolean | sí / no | Por evento | Médico/Kinesiólogo | Patrón de recaídas |
| Tests físicos post-lesión | numérico | % vs baseline | Al retorno | Kinesiólogo | Readiness para volver |

**Dato derivado:**
- Días perdidos por lesión (acumulado por temporada)
- Injury burden: días perdidos / 1000 horas de exposición
- Tasa de recurrencia por zona
- Correlación ACWR vs fecha de lesión (si hay datos de carga)
- Ventana de riesgo post-retorno (primeras 4 semanas)

### F. Datos Académicos (ya existentes, expandir)

| Dato | Tipo | Detalle | Frecuencia | Quién carga | Features que habilita |
|------|------|---------|------------|-------------|----------------------|
| Año escolar | enum | 1ro-6to secundario | Anual | Admin | Seguimiento |
| Materias aprobadas | numérico | count | Trimestral | Admin | Rendimiento académico |
| Materias pendientes | numérico | count | Trimestral | Admin | Riesgo académico |
| Asistencia escolar % | numérico | % | Mensual | Admin | Compromiso, riesgo |
| Promedio de notas | numérico | 1-10 | Trimestral | Admin | Rendimiento |
| Riesgo académico | enum | bajo / medio / alto | Mensual | Admin | Alertas |
| **NUEVO: Horas de estudio semanales** | numérico | horas | Semanal | Jugador | Balance carga total |
| **NUEVO: Apoyo escolar activo** | boolean | sí / no | Mensual | Admin | Intervención |
| **NUEVO: Adaptación social** | enum | buena / regular / mala | Trimestral | Psicólogo | Four Corner (social) |

### G. Datos de Scouting (jugadores externos)

| Dato | Tipo | Detalle | Frecuencia | Quién carga | Features que habilita |
|------|------|---------|------------|-------------|----------------------|
| Nombre completo | texto | - | Al detectar | Scout | Identificación |
| Fecha de nacimiento | fecha | DD/MM/AAAA | Al detectar | Scout | Edad, bio-banding |
| Club actual | texto | - | Al detectar | Scout | Contexto |
| División/Liga | texto | - | Al detectar | Scout | Nivel competitivo |
| Posición principal | enum | GK/DEF/MID/ATK + específica | Al detectar | Scout | Filtrado |
| Posición secundaria | enum | - | Al detectar | Scout | Versatilidad |
| Evaluación técnica | numérico | 1-10 | Por observación | Scout | Score general |
| Evaluación física | numérico | 1-10 | Por observación | Scout | Score general |
| Evaluación táctica | numérico | 1-10 | Por observación | Scout | Score general |
| Evaluación mental | numérico | 1-10 | Por observación | Scout | Score general |
| Altura estimada | numérico | cm | Por observación | Scout | Perfil físico |
| Perfil de pierna | enum | derecha / zurda / ambidiestro | Al detectar | Scout | Perfil técnico |
| Video link | URL | YouTube/Drive | Por observación | Scout | Evidencia visual |
| Notas | texto libre | - | Por observación | Scout | Contexto |
| Estado pipeline | enum | detectado / observando / evaluado / recomendado / descartado | Ongoing | Scout | Workflow |
| Fecha de observación | fecha | DD/MM/AAAA | Por observación | Scout | Historial |
| Prioridad | enum | alta / media / baja | Ongoing | Coordinador | Foco |

---

### Resumen: Volumen de Datos por Frecuencia

| Frecuencia | Datos | Responsable principal | Tiempo estimado de carga |
|------------|-------|-----------------------|--------------------------|
| **Diario** | Sueño, dolor, RPE post-sesión | Jugador (auto-reporte en app) | 1 min por jugador |
| **Por sesión/partido** | Carga física (GPS o manual), eventos de partido | Preparador físico / Analista | 5-15 min por partido |
| **Semanal** | Resumen de carga, horas de estudio | Preparador físico / Jugador | 5 min |
| **Mensual** | Antropometría (altura, peso), asistencia escolar, actitud | Médico / Admin / DT | 10 min por jugador |
| **Trimestral** | Evaluación cognitiva/psicológica, notas académicas, Four Corner completo | DT / Psicólogo / Admin | 15 min por jugador |
| **Por evento** | Lesiones, scouting observations | Médico / Scout | 5 min por evento |
| **Una vez** | Datos fijos (DOB, altura padres, pierna hábil) | Admin | 3 min por jugador |

### Implementación Progresiva Recomendada

**Fase 1 — Datos mínimos viables (mes 1-2):**
- Antropometría mensual (altura, peso, altura sentado) → habilita bio-banding
- Eventos básicos de partido (goles, asistencias, minutos, pases, duelos) → habilita métricas por 90 min
- Lesiones con tipo, zona, severidad, fechas → habilita historial médico serio

**Fase 2 — Carga y bienestar (mes 3-4):**
- RPE + sueño diario (auto-reporte del jugador) → habilita ACWR simplificado
- Carga física por sesión (aunque sea manual: distancia, sprints) → habilita modelo de lesiones básico
- Evaluación cognitiva trimestral (5 dimensiones, 1-5) → habilita Four Corner

**Fase 3 — Analytics avanzado (mes 5+):**
- Eventos de partido completos (pases progresivos, presiones, xG) → habilita métricas avanzadas
- Datos de scouting estandarizados → habilita pipeline de scouting
- Con 6+ meses de datos acumulados → habilita modelos predictivos (lesiones, potencial)

---

## Priorización Sugerida

| Prioridad | Feature | Complejidad | Impacto |
|-----------|---------|-------------|---------|
| 🥇 1 | Bio-banding / Tracking de maduración | Media | Muy Alto |
| 🥇 2 | Four Corner Model (framework unificador) | Media | Muy Alto |
| 🥇 3 | Métricas avanzadas por posición | Media | Alto |
| 🥈 4 | Dashboard de inteligencia para decisiones | Media | Alto |
| 🥈 5 | Evaluación cognitiva/táctica | Baja | Alto |
| 🥈 6 | Predicción de lesiones (ACWR) | Alta | Alto |
| 🥉 7 | Modelo de proyección de potencial | Alta | Medio |
| 🥉 8 | Sistema de scouting | Media | Medio |
| 🥉 9 | Análisis de video simplificado | Baja | Medio |
| 🥉 10 | Import/Export y APIs | Media | Medio |

---

## Fuentes y Referencias

### Papers Académicos
- "Player Tracking Data Analytics: Chelsea FC Academy Case Study" — MDPI Sports, 2018
- "Machine Learning for Understanding and Predicting Injuries in Football" — Sports Medicine Open, 2022
- "Predicting Injury and Illness with ML in Elite Youth Soccer" — PMC, 2023
- "Review of Tactical Evaluation Tools for Youth Players" — SpringerPlus, 2015
- "Data Analytics in Football: Survey of Operational Frameworks" — Science and Medicine in Football, 2024
- ACWR y riesgo de lesión en Premier League — British Journal of Sports Medicine (estudio de 3 años)
- Bio-banding en entrenamiento juvenil — PLOS ONE, 2025

### Casos de Clubs
- **Ajax**: Framework TIPS, ML con 200+ indicadores — ajaxdaily.com
- **Bayern Munich**: skills.lab Arena con 250 jugadores juveniles — fcbayern.com, skills-lab.com
- **Man City/CFG**: Hub central de datos multi-club — the-footballanalyst.com
- **Benfica**: 360S Lab + "Formar a Benfica" + planes individuales — Deloitte case study
- **Red Bull Salzburg**: Matrices de scouting propietarias, pipeline multi-club — the-footballanalyst.com
- **Dortmund**: Footbonaut + entrenamiento cognitivo desde edad 11 — bundesliga.com, skysports.com
- **Barcelona**: Innovation Hub + inversión en Metrica Sports — barcainnovationhub.fcbarcelona.com

### Plataformas y Empresas
- **StatsBomb/Hudl**: statsbomb.com — 3,400+ eventos/partido
- **Analytics FC TransferLab Emerge**: analyticsfc.co.uk — 33 ligas juveniles, ML-based
- **AiSCOUT (ai.io)**: CNN reportaje — 45,000 atletas juveniles MLS
- **Catapult**: catapult.com — 3,200+ equipos elite
- **KINEXON**: kinexon-sports.com — primer torneo juvenil con tracking (RB Leipzig 2025)
- **Playermaker**: playermaker.com — sensores en botines desde 8 años
- **SciSports**: scisports.com — ratings de 250K+ jugadores
- **Metrica Sports**: metricasports.com — tracking AI desde cámara única
- **Training Ground Guru**: trainingground.guru — portal de la industria, conferencias
