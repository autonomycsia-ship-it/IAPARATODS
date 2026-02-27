import React, { useState } from 'react';
import { 
  Rocket, Brain, Users, Lightbulb, Heart, Target, 
  ChevronRight, ArrowRight, ShieldCheck, Zap, 
  BarChart, Map, BookOpen, Laptop, Briefcase 
} from 'lucide-react';

// --- BASE DE DATOS MOCK: Módulos Sinergia IA y Oferta EAFIT ---
const modulosSinergia = {
  entender: { id: 'entender', titulo: 'Entender: Co-inteligencia', desc: 'Bases teóricas e historia para alfabetizar equipos y vencer el miedo a la disrupción.', icon: <Brain className="w-6 h-6 text-purple-400" /> },
  explorar: { id: 'explorar', titulo: 'Explorar: Co-worker', desc: 'Análisis de procesos actuales, optimización de tiempo y mapeo de oportunidades.', icon: <Map className="w-6 h-6 text-blue-400" /> },
  hacer: { id: 'hacer', titulo: 'Hacer: Diálogos Digitales', desc: 'Creación de contenido, ideación conjunta y uso de modelos generativos multimodales.', icon: <Lightbulb className="w-6 h-6 text-yellow-400" /> },
  transformar: { id: 'transformar', titulo: 'Transformar: Asistentes', desc: 'Eficiencia operativa, integración de datos y despliegue de agentes low-code.', icon: <Zap className="w-6 h-6 text-orange-400" /> },
  apropiar: { id: 'apropiar', titulo: 'Apropiar: Aprender Haciendo', desc: 'Innovación aplicada, creación de prototipos reales y medición de ROI.', icon: <Target className="w-6 h-6 text-green-400" /> },
};

const ofertaEafit = [
  { id: 'data', titulo: 'Bootcamp Ciencia de Datos', nivel: 'Acelerado', desc: 'Para equipos técnicos buscando automatización profunda.' },
  { id: 'proyectos', titulo: 'Esp. Gerencia de Proyectos', nivel: 'Posgrado', desc: 'Para líderes gestionando el cambio tecnológico.' },
  { id: 'programe', titulo: 'Programa E - Innovación', nivel: 'Iniciativa', desc: 'Incubación de ideas corporativas impulsadas por IA.' }
];

// --- PREGUNTAS DEL DIAGNÓSTICO (Hero's Journey) ---
const preguntas = [
  {
    id: 1,
    contexto: "Tus equipos pierden más de 10 horas semanales consolidando reportes y cruzando datos en Excel.",
    pregunta: "¿Cuál es tu estrategia inmediata?",
    opciones: [
      { texto: "Contratar analistas junior para que absorban la carga operativa.", impacto: { cognitiva: 10, social: 0, creativa: 0, emocional: 0 }, dolor: null },
      { texto: "Integrar agentes low-code para automatizar el cruce de datos y capacitar al equipo.", impacto: { cognitiva: 30, social: 10, creativa: 20, emocional: 0 }, dolor: 'transformar' }
    ]
  },
  {
    id: 2,
    contexto: "Se rumorea en los pasillos: 'La Inteligencia Artificial va a reemplazar nuestros puestos'. Hay resistencia al cambio.",
    pregunta: "¿Cómo manejas esta fricción cultural?",
    opciones: [
      { texto: "Lanzar un comunicado oficial diciendo que el uso de IA es obligatorio por eficiencia.", impacto: { cognitiva: 0, social: -10, creativa: 0, emocional: 10 }, dolor: null },
      { texto: "Crear un espacio seguro de alfabetización para entender qué es la IA y cómo ser co-inteligentes.", impacto: { cognitiva: 10, social: 30, creativa: 10, emocional: 40 }, dolor: 'entender' }
    ]
  },
  {
    id: 3,
    contexto: "Marketing necesita lanzar 5 campañas la próxima semana, pero el equipo sufre de bloqueo creativo y falta de ideas.",
    pregunta: "¿Qué herramienta les proporcionas?",
    opciones: [
      { texto: "Fomentar el uso de modelos multimodales para idear, hacer brainstorming y redactar borradores.", impacto: { cognitiva: 10, social: 20, creativa: 40, emocional: 10 }, dolor: 'hacer' },
      { texto: "Pedirles que revisen y reciclen campañas exitosas del año pasado.", impacto: { cognitiva: 10, social: 0, creativa: 0, emocional: 0 }, dolor: null }
    ]
  },
  {
    id: 4,
    contexto: "Cada departamento trabaja en silos. Ventas no sabe lo que hace Operaciones y la comunicación es un caos.",
    pregunta: "¿Cómo intervienes?",
    opciones: [
      { texto: "Implementar reuniones diarias de 2 horas para alinear a todos los equipos.", impacto: { cognitiva: 0, social: 20, creativa: 0, emocional: 0 }, dolor: null },
      { texto: "Mapear los flujos de comunicación y usar IA como 'Co-worker' para unificar procesos.", impacto: { cognitiva: 20, social: 30, creativa: 20, emocional: 10 }, dolor: 'explorar' }
    ]
  },
  {
    id: 5,
    contexto: "Quieres invertir en formación tecnológica, pero la Junta Directiva exige ver un Retorno de Inversión (ROI) medible.",
    pregunta: "¿Cuál es tu propuesta de valor?",
    opciones: [
      { texto: "Comprar licencias de software genéricas para todos y medir horas de uso.", impacto: { cognitiva: 10, social: 0, creativa: 0, emocional: 0 }, dolor: null },
      { texto: "Diseñar un proyecto ABP donde los equipos creen un prototipo real que ahorre costos a la empresa.", impacto: { cognitiva: 20, social: 20, creativa: 30, emocional: 20 }, dolor: 'apropiar' }
    ]
  }
];

export default function App() {
  const [fase, setFase] = useState('onboarding'); // onboarding, diagnostic, results
  const [preguntaActual, setPreguntaActual] = useState(0);
  
  // Estado del usuario/empresa
  const [inteligencias, setInteligencias] = useState({ cognitiva: 0, social: 0, creativa: 0, emocional: 0 });
  const [doloresDetectados, setDoloresDetectados] = useState(new Set());

  // Iniciar diagnóstico
  const empezarDiagnostico = () => setFase('diagnostic');

  // Manejar respuesta
  const responder = (opcion) => {
    // Actualizar inteligencias
    setInteligencias(prev => ({
      cognitiva: Math.min(100, prev.cognitiva + opcion.impacto.cognitiva),
      social: Math.min(100, prev.social + opcion.impacto.social),
      creativa: Math.min(100, prev.creativa + opcion.impacto.creativa),
      emocional: Math.min(100, prev.emocional + opcion.impacto.emocional)
    }));

    // Registrar dolor/necesidad si existe
    if (opcion.dolor) {
      setDoloresDetectados(prev => {
        const nuevoSet = new Set(prev);
        nuevoSet.add(opcion.dolor);
        return nuevoSet;
      });
    }

    // Siguiente pregunta o resultados
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(prev => prev + 1);
    } else {
      setFase('results');
    }
  };

  const reiniciar = () => {
    setFase('onboarding');
    setPreguntaActual(0);
    setInteligencias({ cognitiva: 0, social: 0, creativa: 0, emocional: 0 });
    setDoloresDetectados(new Set());
  };

  // --- RENDERIZADORES DE FASES ---

  const renderOnboarding = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in">
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30">
        <Rocket className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6">
        Sinergia IA: Misión Corporativa
      </h1>
      <p className="text-xl text-slate-300 max-w-2xl mb-4">
        "Primero me emociono, luego entiendo, me uno con otros y finalmente creo."
      </p>
      <p className="text-md text-slate-400 max-w-xl mb-12">
        Descubre el plan de formación exacto que tu equipo necesita. Navega por escenarios reales de tu empresa, evalúa tus inteligencias corporativas y desbloquea tu ruta hacia la transformación digital con Nodo EAFIT.
      </p>
      <button 
        onClick={empezarDiagnostico}
        className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/25 flex items-center gap-3"
      >
        Comenzar Diagnóstico <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  const renderDiagnostic = () => {
    const q = preguntas[preguntaActual];
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
        {/* Progreso */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-indigo-400 font-semibold tracking-wider text-sm">
            MISIÓN {preguntaActual + 1} DE {preguntas.length}
          </span>
          <div className="flex gap-2">
            {preguntas.map((_, i) => (
              <div key={i} className={`h-2 w-8 rounded-full transition-all ${i <= preguntaActual ? 'bg-indigo-500' : 'bg-slate-700'}`} />
            ))}
          </div>
        </div>

        {/* Tarjeta de Escenario */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
            {q.contexto}
          </h2>
          <p className="text-lg text-indigo-300 mb-8 font-medium">
            {q.pregunta}
          </p>

          <div className="space-y-4">
            {q.opciones.map((opcion, idx) => (
              <button
                key={idx}
                onClick={() => responder(opcion)}
                className="w-full text-left p-6 rounded-xl border border-slate-600 hover:border-indigo-400 bg-slate-800 hover:bg-slate-700/80 transition-all duration-200 group flex items-start gap-4"
              >
                <div className="mt-1 w-6 h-6 rounded-full border-2 border-slate-500 group-hover:border-indigo-400 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-indigo-400 transition-colors" />
                </div>
                <span className="text-slate-200 text-lg group-hover:text-white">
                  {opcion.texto}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRadarBar = (label, value, icon, colorClass) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="flex items-center gap-2 text-slate-200 font-medium">
          {icon} {label}
        </span>
        <span className="text-slate-400 font-bold">{value}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full ${colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  const renderResults = () => {
    // Si no detectó dolores específicos (eligió todas las malas), dar un plan base
    const doloresArray = Array.from(doloresDetectados);
    const modulosRecomendados = doloresArray.length > 0 
      ? doloresArray.map(d => modulosSinergia[d]) 
      : [modulosSinergia.entender, modulosSinergia.explorar];

    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4">
            Misión Completada: Tu Plan de Transformación
          </h2>
          <p className="text-xl text-slate-300">
            Hemos analizado tus decisiones. Este es el perfil de tu equipo y la ruta formativa recomendada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna 1: Radar de Inteligencias */}
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="text-indigo-400" /> Radar de Inteligencias
            </h3>
            <div className="space-y-6">
              {renderRadarBar('Inteligencia Cognitiva', inteligencias.cognitiva, <Brain className="w-5 h-5 text-blue-400"/>, 'bg-blue-500')}
              {renderRadarBar('Inteligencia Social', inteligencias.social, <Users className="w-5 h-5 text-green-400"/>, 'bg-green-500')}
              {renderRadarBar('Inteligencia Creativa', inteligencias.creativa, <Lightbulb className="w-5 h-5 text-yellow-400"/>, 'bg-yellow-500')}
              {renderRadarBar('Inteligencia Emocional', inteligencias.emocional, <Heart className="w-5 h-5 text-red-400"/>, 'bg-red-500')}
            </div>
            <div className="mt-8 p-4 bg-indigo-900/30 rounded-xl border border-indigo-500/30">
              <p className="text-sm text-indigo-200">
                <ShieldCheck className="w-4 h-4 inline mr-1" />
                Tu equipo muestra fuertes indicios en áreas {
                  Object.keys(inteligencias).reduce((a, b) => inteligencias[a] > inteligencias[b] ? a : b)
                }s. Usaremos esto como ancla para el aprendizaje ABP.
              </p>
            </div>
          </div>

          {/* Columna 2: Módulos Sinergia Recomendados */}
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <BookOpen className="text-purple-400" /> Ruta Modular Recomendada: Sinergia IA
            </h3>
            <p className="text-slate-400 mb-6">Basado en tus dolores corporativos, hemos priorizado estos módulos:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modulosRecomendados.map((mod, i) => (
                <div key={i} className="bg-slate-700/50 p-5 rounded-2xl border border-slate-600 hover:border-purple-400 transition-colors flex gap-4">
                  <div className="mt-1 flex-shrink-0 bg-slate-800 p-2 rounded-lg">
                    {mod.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{mod.titulo}</h4>
                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Columna 3: Upselling Oferta EAFIT Integrada */}
            <div className="mt-10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-t border-slate-700 pt-8">
                <Briefcase className="text-emerald-400" /> Proyección Avanzada (EAFIT Continua)
              </h3>
              <div className="flex flex-col gap-3">
                {ofertaEafit.map((oferta, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{oferta.nivel}</span>
                      <h4 className="text-white font-semibold">{oferta.titulo}</h4>
                      <p className="text-slate-400 text-sm">{oferta.desc}</p>
                    </div>
                    <ChevronRight className="text-slate-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 flex justify-end gap-4">
              <button 
                onClick={reiniciar}
                className="px-6 py-3 rounded-full text-slate-300 hover:text-white font-medium transition-colors"
              >
                Rehacer Diagnóstico
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-full shadow-lg shadow-purple-500/30 transition-transform transform hover:scale-105 flex items-center gap-2">
                Inscribir a mi Equipo <Laptop className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Navbar Simple */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">N</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              NODO <span className="text-slate-400 font-normal">| EAFIT</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Catálogo B2B</span>
            <span className="hover:text-white cursor-pointer transition-colors">Metodología ABP</span>
            <span className="text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">Sinergia IA</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 pt-10 pb-20">
          {fase === 'onboarding' && renderOnboarding()}
          {fase === 'diagnostic' && renderDiagnostic()}
          {fase === 'results' && renderResults()}
        </div>
      </main>
    </div>
  );
}
