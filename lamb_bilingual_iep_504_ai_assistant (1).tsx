import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, FileText, Upload, Copy, Download, Languages, 
  Presentation, Table, Plus, Search, Trash2, CheckCircle2, 
  AlertCircle, Eye, RefreshCw, BookOpen, Layers, Compass, 
  Share2, Save, Printer, ArrowRight, UserCheck, ShieldCheck, 
  HelpCircle, ChevronRight, Check, X, FileSpreadsheet, Edit3, 
  Paperclip, ExternalLink, Calendar, BarChart3, Clock, User
} from 'lucide-react';

const INITIAL_STUDENTS = [
  {
    id: 'lamb-001',
    name: 'Mateo Hernández-Reyes',
    grade: 'Lower Elementary (Grade 2)',
    planType: 'IEP',
    dob: '2018-04-12',
    primaryLanguage: 'Spanish (Home) / English & Spanish (Dual Immersion)',
    disabilityCategory: 'Specific Learning Disability (Phonemic Decoding)',
    caseManager: 'Maestra Elena Soto',
    generalTeacher: 'Guide Carlos Morales',
    montessoriCycle: 'Taller I (Lower Elementary 6-9)',
    lastMeeting: '2026-03-10',
    annualReviewDate: '2027-03-09',
    summaryEn: 'Mateo is an inquisitive, empathetic learner who demonstrates high mathematical reasoning with concrete Montessori bead chains and Stamp Game. Struggles with dual-language decoding in both English and Spanish, exhibiting letter reversals and phonetic fatigue during independent Great Lessons follow-up work.',
    summaryEs: 'Mateo es un estudiante curioso y empático que demuestra un alto razonamiento matemático con las cadenas de perlas Montessori y el juego de estampillas. Presenta dificultades con la decodificación bilingüe en inglés y español, manifestando inversiones y fatiga fonética durante el trabajo independiente de las Grandes Lecciones.',
    documents: [
      { name: 'Mateo_Bilingual_PsychEval_2025.pdf', size: '245 KB', type: 'application/pdf', uploadDate: '2026-02-14' },
      { name: 'TRC_Spanish_Reading_Assessment_Screenshot.png', size: '180 KB', type: 'image/png', uploadDate: '2026-03-01' }
    ],
    accommodations: [
      'Dual-language graphic organizers with pictorial cues (Organigramas bilingües con apoyos visuales)',
      'Sensorial phonics materials: Sandpaper letters (Letras de lija) & Moveable Alphabet (Alfabeto móvil)',
      'Frequent movement breaks to the Peace Corner / Walking on the Line for regulation',
      'Extended time (1.5x) for bilingual literacy assessments in English and Spanish'
    ],
    goals: [
      {
        id: 'g-1',
        area: 'Bilingual Literacy & Phonemic Awareness',
        goalEn: 'Given phonetic reading cards and the Moveable Alphabet in both languages, Mateo will decode 2-syllable Spanish words and English CVCe words with 80% accuracy across 4 consecutive trials.',
        goalEs: 'Utilizando tarjetas de lectura fonética y el Alfabeto Móvil en ambos idiomas, Mateo decodificará palabras de dos sílabas en español y palabras CVCe en inglés con un 80% de precisión en 4 sesiones consecutivas.',
        baseline: '52% in Spanish decoding, 44% in English phonics',
        targetDate: '2027-02-15',
        montessoriTool: 'Sandpaper Letters & Large Moveable Alphabet'
      },
      {
        id: 'g-2',
        area: 'Executive Function & Work Cycle Completion',
        goalEn: 'Mateo will initiate his three-hour Montessori work cycle checklist and complete at least 2 self-chosen learning tasks with no more than 1 visual prompt across 5 consecutive days.',
        goalEs: 'Mateo iniciará su lista de tareas del ciclo de trabajo Montessori de tres horas y completará al menos 2 actividades de aprendizaje autónomo con un máximo de 1 recordatorio visual durante 5 días.',
        baseline: 'Requires 3-4 verbal prompts per 30 minutes',
        targetDate: '2027-01-20',
        montessoriTool: 'Visual Daily Work Journal (Diario Visual de Trabajo)'
      }
    ],
    trackingData: [
      { date: '2026-09-15', trial: 'Trial 1 - Spanish Decod.', score: 58, notes: 'Benefited from finger tracing sandpaper letters' },
      { date: '2026-09-22', trial: 'Trial 2 - English CVCe', score: 62, notes: 'Used Moveable Alphabet beads effectively' },
      { date: '2026-09-29', trial: 'Trial 3 - Dual Reading', score: 70, notes: 'High engagement during paired partner reading' },
      { date: '2026-10-06', trial: 'Trial 4 - Self-Directed Work', score: 75, notes: 'Completed Math Stamp game independently' }
    ]
  },
  {
    id: 'lamb-002',
    name: 'Sofia Alarcón Cruz',
    grade: 'Children’s House (Kindergarten)',
    planType: '504',
    dob: '2020-09-18',
    primaryLanguage: 'English & Spanish (Simultaneous Bilingual)',
    disabilityCategory: 'ADHD (Inattentive Type) & Sensory Modulation',
    caseManager: 'Guide Mariana Vega',
    generalTeacher: 'Guide Mariana Vega',
    montessoriCycle: 'Casa dei Bambini (Primary 3-6)',
    lastMeeting: '2026-04-14',
    annualReviewDate: '2027-04-12',
    summaryEn: 'Sofia is an imaginative and socially warm student in Casa. She shows sensory seeking behaviors during group circles and transitions between Montessori practical life shelves. She thrives when utilizing heavy-work activities (carrying the rug, washing the table) before tabletop lessons.',
    summaryEs: 'Sofía es una estudiante imaginativa y muy sociable en Casa dei Bambini. Manifiesta conductas de búsqueda sensorial durante los círculos grupales y transiciones en las repisas de vida práctica. Prospera cuando realiza actividades de trabajo pesado (enrollar alfombra, lavar mesas) antes de lecciones de mesa.',
    documents: [
      { name: 'Pediatric_Sensory_Evaluation.pdf', size: '310 KB', type: 'application/pdf', uploadDate: '2026-04-10' }
    ],
    accommodations: [
      'Access to wobble stool and floor work rugs with defined boundaries',
      'Heavy-work practical life tasks (carrying water pitchers, scrubbing cloths) prior to focused lessons',
      'Visual timer for three-period Montessori lessons',
      'Bilingual directions delivered 1-on-1 with eye contact and physical touch on shoulder'
    ],
    goals: [
      {
        id: 'g-3',
        area: 'Sensory Regulation & Circle Time',
        goalEn: 'Sofia will remain regulated and seated on her Montessori rug during 15-minute bilingual community circles using a sensory cushion with zero disruptions for 4 out of 5 consecutive days.',
        goalEs: 'Sofía se mantendrá autorregulada y sentada en su alfombra individual durante los círculos comunitarios bilingües de 15 minutos usando un cojín sensorial sin interrupciones 4 de cada 5 días.',
        baseline: '5-7 minutes sustained attention before leaving rug',
        targetDate: '2027-03-30',
        montessoriTool: 'Peace Flower / Sensory Textured Floor Mat'
      }
    ],
    trackingData: [
      { date: '2026-09-12', trial: 'Circle Time Day 1', score: 60, notes: 'Used tactile breathing pebble' },
      { date: '2026-09-19', trial: 'Circle Time Day 2', score: 65, notes: 'Carried rugs before gathering' },
      { date: '2026-09-26', trial: 'Circle Time Day 3', score: 80, notes: 'Zero wandering from rug' }
    ]
  }
];

export default function App() {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('lamb_students_data_v4');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return INITIAL_STUDENTS;
  });

  const [selectedStudentId, setSelectedStudentId] = useState(() => {
    return students[0]?.id || 'lamb-001';
  });

  const [activeTab, setActiveTab] = useState('intake');
  const [currentLang, setCurrentLang] = useState('dual');
  const [toastMessage, setToastMessage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Intake direct inputs
  const [intakeStudentName, setIntakeStudentName] = useState('');
  const [intakePlanType, setIntakePlanType] = useState('IEP');
  const [intakeGrade, setIntakeGrade] = useState('Lower Elementary (Grade 2)');
  const [pastedNotes, setPastedNotes] = useState('');
  const [intakeMode, setIntakeMode] = useState('new'); // 'new' or 'update_current'

  // Student Edit / Add Modal States
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [isEditingExistingStudent, setIsEditingExistingStudent] = useState(false);
  const [studentFormData, setStudentFormData] = useState({
    id: '',
    name: '',
    grade: 'Lower Elementary (Grade 2)',
    planType: 'IEP',
    dob: '2019-01-01',
    primaryLanguage: 'Spanish (Home) / English & Spanish (Dual Immersion)',
    disabilityCategory: 'Specific Learning Disability (Phonemic Decoding)',
    caseManager: 'Maestra Elena Soto',
    generalTeacher: 'Guide Carlos Morales',
    montessoriCycle: 'Taller I (Lower Elementary 6-9)',
    annualReviewDate: '2027-04-15',
    documents: []
  });
  const [modalPendingFiles, setModalPendingFiles] = useState([]);
  const [formValidationError, setFormValidationError] = useState('');

  // Direct In-Place Summary Editing
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [editableSummaryEn, setEditableSummaryEn] = useState('');
  const [editableSummaryEs, setEditableSummaryEs] = useState('');

  // Add Goal Modal
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [newGoalArea, setNewGoalArea] = useState('Bilingual Literacy & Phonics');
  const [newGoalEn, setNewGoalEn] = useState('');
  const [newGoalEs, setNewGoalEs] = useState('');
  const [newGoalBaseline, setNewGoalBaseline] = useState('');
  const [newGoalTool, setNewGoalTool] = useState('Moveable Alphabet & Sandpaper Letters');
  const [newGoalTargetDate, setNewGoalTargetDate] = useState('2027-04-15');

  // New progress data point
  const [newDataScore, setNewDataScore] = useState(70);
  const [newDataTrial, setNewDataTrial] = useState('');
  const [newDataNotes, setNewDataNotes] = useState('');

  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0] || INITIAL_STUDENTS[0];

  useEffect(() => {
    try {
      const lightweight = students.map(s => ({
        ...s,
        documents: (s.documents || []).map(d => ({
          name: d.name,
          size: d.size,
          type: d.type,
          uploadDate: d.uploadDate
        }))
      }));
      localStorage.setItem('lamb_students_data_v4', JSON.stringify(lightweight));
    } catch (e) {
      console.warn('Storage save warning:', e);
    }
  }, [students]);

  useEffect(() => {
    if (activeStudent) {
      setEditableSummaryEn(activeStudent.summaryEn || '');
      setEditableSummaryEs(activeStudent.summaryEs || '');
      setIsEditingSummary(false);
    }
  }, [selectedStudentId, activeStudent]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const openAddStudentModal = () => {
    setIsEditingExistingStudent(false);
    setFormValidationError('');
    setModalPendingFiles([]);
    setStudentFormData({
      id: `lamb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: '',
      grade: 'Lower Elementary (Grade 2)',
      planType: 'IEP',
      dob: '2019-03-15',
      primaryLanguage: 'Spanish (Home) / English & Spanish (Dual Immersion)',
      disabilityCategory: 'Specific Learning Disability (Phonemic Decoding)',
      caseManager: 'Maestra Elena Soto',
      generalTeacher: 'Guide Carlos Morales',
      montessoriCycle: 'Taller I (Lower Elementary 6-9)',
      annualReviewDate: '2027-04-15',
      documents: []
    });
    setShowStudentModal(true);
  };

  const openEditStudentModal = (student) => {
    setIsEditingExistingStudent(true);
    setFormValidationError('');
    setModalPendingFiles([]);
    setStudentFormData({
      ...student,
      documents: student.documents || []
    });
    setShowStudentModal(true);
  };

  const handleModalFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newUploaded = files.map(file => ({
      id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type || 'application/octet-stream',
      uploadDate: new Date().toISOString().split('T')[0]
    }));

    setModalPendingFiles(prev => [...prev, ...newUploaded]);
    showToast(`Attached ${files.length} document(s) to student profile`);
  };

  const saveStudentForm = () => {
    if (!studentFormData.name.trim()) {
      setFormValidationError('Please enter the student full name before saving.');
      return;
    }
    setFormValidationError('');

    const updatedDocuments = [
      ...(studentFormData.documents || []),
      ...modalPendingFiles
    ];

    if (isEditingExistingStudent) {
      setStudents(prev => prev.map(s => {
        if (s.id === studentFormData.id) {
          return {
            ...s,
            ...studentFormData,
            documents: updatedDocuments
          };
        }
        return s;
      }));
      showToast(`Updated profile for ${studentFormData.name}`);
    } else {
      const newStudentId = studentFormData.id || `lamb-${Date.now()}`;
      const newStudent = {
        ...studentFormData,
        id: newStudentId,
        documents: updatedDocuments,
        summaryEn: `${studentFormData.name} demonstrates genuine engagement with hands-on Montessori materials in ${studentFormData.grade}. Exhibits high curiosity and visual-spatial reasoning, with individualized dual-language scaffolds needed for reading automaticity and independent work cycle execution.`,
        summaryEs: `${studentFormData.name} demuestra un genuino entusiasmo por los materiales manipulativos Montessori en ${studentFormData.grade}. Manifiesta un alto razonamiento visual-espacial, requiriendo apoyos bilingües individualizados para la automaticidad lectora y el ritmo del ciclo de trabajo independiente.`,
        accommodations: [
          'Dual-language visual schedules and graphic organizers (Organizadores gráficos bilingües)',
          'Concrete Montessori manipulative apparatus prior to abstract paper-and-pencil tasks',
          'Designated peace corner quiet breaks during self-regulation moments',
          '1.5x extended time on bilingual progress assessments'
        ],
        goals: [
          {
            id: `g-${Date.now()}`,
            area: 'Montessori Self-Direction & Bilingual Reading',
            goalEn: `By April 2027, given bilingual phonetic word cards and Montessori moveable materials, ${studentFormData.name} will independently complete a 3-step task sequence across 4 consecutive days.`,
            goalEs: `Para abril de 2027, con tarjetas fonéticas bilingües y materiales Montessori, ${studentFormData.name} completará autónomamente una secuencia de trabajo de 3 pasos durante 4 días consecutivos.`,
            baseline: 'Requires 2-3 guide prompts per 15 minutes',
            targetDate: '2027-04-15',
            montessoriTool: 'Moveable Alphabet & Visual Work Plan'
          }
        ],
        trackingData: [
          { date: new Date().toISOString().split('T')[0], trial: 'Initial Intake Baseline', score: 55, notes: 'Initial intake documents attached' }
        ]
      };

      setStudents(prev => [newStudent, ...prev]);
      setSelectedStudentId(newStudent.id);
      showToast(`Added ${newStudent.name} with ${updatedDocuments.length} document(s)!`);
    }

    setShowStudentModal(false);
  };

  const handleIntakeFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newDocEntries = files.map(file => ({
      id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type || 'application/pdf',
      uploadDate: new Date().toISOString().split('T')[0]
    }));

    if (intakeMode === 'new' && intakeStudentName.trim() && intakeStudentName.trim() !== activeStudent.name) {
      const newStudentId = `lamb-${Date.now()}`;
      const createdStudent = {
        id: newStudentId,
        name: intakeStudentName.trim(),
        grade: intakeGrade,
        planType: intakePlanType,
        dob: '2019-01-01',
        primaryLanguage: 'Spanish (Home) / English & Spanish (Dual Immersion)',
        disabilityCategory: 'Identified for Bilingual Support',
        caseManager: 'Assigned Montessori Guide',
        generalTeacher: 'Guide',
        montessoriCycle: intakeGrade.includes('Casa') ? 'Casa dei Bambini (Primary 3-6)' : 'Taller I (Lower Elementary 6-9)',
        annualReviewDate: '2027-04-15',
        documents: newDocEntries,
        summaryEn: `${intakeStudentName.trim()} is enrolled in ${intakeGrade}. Initial intake files and assessments have been uploaded to establish baseline dual-language and Montessori needs.`,
        summaryEs: `${intakeStudentName.trim()} está inscrito/a en ${intakeGrade}. Se han adjuntado los archivos iniciales para establecer el perfil bilingüe y Montessori.`,
        accommodations: [
          'Visual bilingual schedules',
          'Use of concrete Montessori apparatus (Moveable Alphabet, Math beads)',
          'Quiet corner self-regulation breaks'
        ],
        goals: [
          {
            id: `g-${Date.now()}`,
            area: 'Bilingual Literacy & Work Cycle',
            goalEn: `Given structured Montessori materials, ${intakeStudentName.trim()} will complete targeted literacy lessons with 80% accuracy.`,
            goalEs: `Con materiales Montessori, ${intakeStudentName.trim()} completará las lecciones fonéticas con 80% de precisión.`,
            baseline: 'Intake baseline in progress',
            targetDate: '2027-04-15',
            montessoriTool: 'Sandpaper Letters & Moveable Alphabet'
          }
        ],
        trackingData: [
          { date: new Date().toISOString().split('T')[0], trial: 'Intake Upload Baseline', score: 50, notes: `${files.length} document(s) uploaded` }
        ]
      };

      setStudents(prev => [createdStudent, ...prev]);
      setSelectedStudentId(newStudentId);
      showToast(`Created new student ${createdStudent.name} and attached ${files.length} file(s)!`);
      return;
    }

    setStudents(prev => prev.map(s => {
      if (s.id === activeStudent.id) {
        return {
          ...s,
          documents: [...(s.documents || []), ...newDocEntries]
        };
      }
      return s;
    }));

    showToast(`Attached ${files.length} file(s) to ${activeStudent.name}`);
  };

  const runAISynthesis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const targetName = intakeStudentName.trim() || activeStudent.name;

      const generatedSummaryEn = `${targetName} is an active participant in the ${intakeGrade} dual-language Montessori environment. Clinical observations and uploaded documentation confirm sustained engagement during concrete sensorial work (e.g. bead cabinets, sandpaper letters), alongside emerging phonetic decoding in Spanish and English. The student benefits significantly from structured 3-period lesson sequences, visual organizers, and clear work cycle boundaries.`;
      
      const generatedSummaryEs = `${targetName} participa activamente en el entorno bilingüe Montessori de ${intakeGrade}. Las observaciones clínicas y la documentación cargada confirman una atención sostenida durante el trabajo sensorial manipulativo (gabinete de perlas, letras de lija), junto con una decodificación fonética emergente en español e inglés. El estudiante se beneficia sustancialmente de lecciones de tres períodos y organizadores visuales.`;

      if (intakeMode === 'new' && intakeStudentName.trim()) {
        const newStudentId = `lamb-${Date.now()}`;
        const newStudent = {
          id: newStudentId,
          name: targetName,
          grade: intakeGrade,
          planType: intakePlanType,
          dob: '2019-03-15',
          primaryLanguage: 'Spanish (Home) / English & Spanish (Dual Immersion)',
          disabilityCategory: 'Specific Learning Disability / Speech & Language',
          caseManager: 'Maestra Elena Soto',
          generalTeacher: 'Guide Carlos Morales',
          montessoriCycle: intakeGrade.includes('Casa') ? 'Casa dei Bambini (Primary 3-6)' : 'Taller I (Lower Elementary 6-9)',
          annualReviewDate: '2027-04-15',
          documents: [],
          summaryEn: generatedSummaryEn,
          summaryEs: generatedSummaryEs,
          accommodations: [
            'Dual-language graphic organizers with pictorial cues (Organigramas bilingües)',
            'Sensorial phonics materials: Sandpaper letters & Moveable Alphabet',
            'Frequent movement breaks to the Peace Corner / Walking on the Line',
            'Extended time (1.5x) for bilingual literacy assessments'
          ],
          goals: [
            {
              id: `g-${Date.now()}`,
              area: 'Bilingual Literacy & Phonemic Awareness',
              goalEn: `Given phonetic reading cards and the Moveable Alphabet, ${targetName} will decode 2-syllable Spanish words and English CVC words with 80% accuracy across 4 consecutive trials.`,
              goalEs: `Utilizando tarjetas de lectura fonética y el Alfabeto Móvil, ${targetName} decodificará palabras de dos sílabas en español y CVC en inglés con un 80% de precisión en 4 sesiones consecutivas.`,
              baseline: '50% baseline accuracy',
              targetDate: '2027-04-15',
              montessoriTool: 'Sandpaper Letters & Large Moveable Alphabet'
            }
          ],
          trackingData: [
            { date: new Date().toISOString().split('T')[0], trial: 'Trial 1 - Baseline Intake', score: 55, notes: pastedNotes ? pastedNotes.slice(0, 60) + '...' : 'Intake observation' }
          ]
        };

        setStudents(prev => [newStudent, ...prev]);
        setSelectedStudentId(newStudent.id);
        setActiveTab('summary');
        showToast(`Created new student ${newStudent.name} with synthesized bilingual IEP!`);
      } else {
        setStudents(prev => prev.map(s => {
          if (s.id === activeStudent.id) {
            return {
              ...s,
              name: targetName,
              grade: intakeGrade,
              planType: intakePlanType,
              summaryEn: generatedSummaryEn,
              summaryEs: generatedSummaryEs
            };
          }
          return s;
        }));

        setActiveTab('summary');
        showToast(`Updated bilingual summary for ${targetName}!`);
      }
    }, 1500);
  };

  const handleSaveEditedSummary = () => {
    setStudents(prev => prev.map(s => {
      if (s.id === activeStudent.id) {
        return {
          ...s,
          summaryEn: editableSummaryEn,
          summaryEs: editableSummaryEs
        };
      }
      return s;
    }));
    setIsEditingSummary(false);
    showToast('Saved updated bilingual PLAAFP summaries!');
  };

  const handleAddGoal = () => {
    if (!newGoalEn.trim() || !newGoalEs.trim()) {
      showToast('Please provide both English and Spanish goal descriptions.');
      return;
    }

    const newGoalObj = {
      id: `g-${Date.now()}`,
      area: newGoalArea,
      goalEn: newGoalEn,
      goalEs: newGoalEs,
      baseline: newGoalBaseline || 'Baseline documented in clinical notes',
      targetDate: newGoalTargetDate,
      montessoriTool: newGoalTool
    };

    setStudents(prev => prev.map(s => {
      if (s.id === activeStudent.id) {
        return {
          ...s,
          goals: [...(s.goals || []), newGoalObj]
        };
      }
      return s;
    }));

    setShowAddGoalModal(false);
    setNewGoalEn('');
    setNewGoalEs('');
    setNewGoalBaseline('');
    showToast('Added new bilingual Montessori goal!');
  };

  const handleAddProgressPoint = () => {
    if (!newDataTrial.trim()) {
      showToast('Please specify the trial description or assessment name.');
      return;
    }

    const point = {
      date: new Date().toISOString().split('T')[0],
      trial: newDataTrial,
      score: Number(newDataScore),
      notes: newDataNotes || 'Classroom observation during work cycle'
    };

    setStudents(prev => prev.map(s => {
      if (s.id === activeStudent.id) {
        return {
          ...s,
          trackingData: [...(s.trackingData || []), point]
        };
      }
      return s;
    }));

    setNewDataTrial('');
    setNewDataNotes('');
    showToast('Recorded new assessment data trial!');
  };

  const copyFormattedForGoogleDocs = () => {
    const formatted = `
LATIN AMERICAN MONTESSORI BILINGUAL (LAMB) PUBLIC CHARTER SCHOOL
SPECIAL EDUCATION & STUDENT SUPPORT SERVICES
IEP / 504 BILINGUAL ACADEMIC REPORT

STUDENT: ${activeStudent.name}
GRADE / CYCLE: ${activeStudent.grade} | ${activeStudent.montessoriCycle}
PLAN TYPE: ${activeStudent.planType} | ANNUAL REVIEW: ${activeStudent.annualReviewDate}
CASE MANAGER / GUIDE: ${activeStudent.caseManager}
LANGUAGE BACKGROUND: ${activeStudent.primaryLanguage}

==================================================
PRESENT LEVELS OF ACADEMIC ACHIEVEMENT & FUNCTIONAL PERFORMANCE (PLAAFP)
==================================================
[ENGLISH]
${activeStudent.summaryEn}

[ESPAÑOL / PARA FAMILIAS]
${activeStudent.summaryEs}

==================================================
ACCOMMODATIONS & MONTESSORI ENVIRONMENT SUPPORTS
==================================================
${(activeStudent.accommodations || []).map((acc, i) => `${i + 1}. ${acc}`).join('\n')}

==================================================
ANNUAL MEASURABLE BILINGUAL GOALS
==================================================
${(activeStudent.goals || []).map((g, i) => `
GOAL ${i + 1}: ${g.area}
Target Date: ${g.targetDate} | Montessori Tool: ${g.montessoriTool}
Baseline: ${g.baseline}
EN: ${g.goalEn}
ES: ${g.goalEs}
`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(formatted);
    showToast('Copied comprehensive IEP/504 report formatted for Google Docs!');
  };

  const exportGoogleSheetsCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Student Name,Plan Type,Grade,Trial Date,Trial Name,Score Percentage,Montessori Notes\n';
    
    (activeStudent.trackingData || []).forEach(row => {
      const escapedNotes = `"${(row.notes || '').replace(/"/g, '""')}"`;
      csvContent += `"${activeStudent.name}","${activeStudent.planType}","${activeStudent.grade}","${row.date}","${row.trial}",${row.score},${escapedNotes}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${activeStudent.name.replace(/\s+/g, '_')}_IEP_Progress_Data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded Google Sheets / Excel CSV progress file!');
  };

  const exportDocHTML = () => {
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>${activeStudent.name} - IEP Summary</title><meta charset='utf-8'></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
        <h1 style="color: #065f46;">Latin American Montessori Bilingual (LAMB) PCS</h1>
        <h2 style="color: #0f766e;">Individualized Education Plan / 504 Summary</h2>
        <p><strong>Student:</strong> ${activeStudent.name} | <strong>Plan:</strong> ${activeStudent.planType} | <strong>Cycle:</strong> ${activeStudent.montessoriCycle}</p>
        <p><strong>Primary Language:</strong> ${activeStudent.primaryLanguage}</p>
        <hr style="border-top: 1px solid #cbd5e1; margin: 20px 0;" />
        <h3>English PLAAFP</h3>
        <p>${activeStudent.summaryEn}</p>
        <h3>Resumen en Español (Para Familias)</h3>
        <p>${activeStudent.summaryEs}</p>
        <h3>Accommodations & Montessori Scaffolds</h3>
        <ul>
          ${(activeStudent.accommodations || []).map(a => `<li>${a}</li>`).join('')}
        </ul>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeStudent.name.replace(/\s+/g, '_')}_LAMB_IEP_Summary.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded editable Word / Google Docs file (.doc)!');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 text-xs border border-emerald-500/50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-white text-lg shadow-md">
              L
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-bold tracking-tight">LAMB Bilingual IEP & 504 AI Assistant</h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Montessori Prepared
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Latin American Montessori Bilingual Public Charter School &bull; Washington, D.C.
              </p>
            </div>
          </div>

          {/* Quick Controls: Student Switcher, Add Student, & Language */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={openAddStudentModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs shadow-md transition ring-2 ring-amber-400/30"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Add Student</span>
            </button>

            <div className="flex items-center bg-slate-800 rounded-xl px-3 py-1.5 border border-slate-700 text-xs">
              <span className="text-slate-400 mr-2">Estudiante:</span>
              <select 
                value={selectedStudentId} 
                onChange={(e) => {
                  if (e.target.value === '__add_new__') {
                    openAddStudentModal();
                  } else {
                    setSelectedStudentId(e.target.value);
                  }
                }}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                    {s.name} ({s.planType} - {s.grade.split(' ')[0]})
                  </option>
                ))}
                <option value="__add_new__" className="bg-slate-900 text-amber-300 font-bold">
                  + Add Another Student...
                </option>
              </select>
            </div>

            <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700 text-xs">
              <button
                onClick={() => setCurrentLang('dual')}
                className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 ${currentLang === 'dual' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
              >
                <Languages className="w-3.5 h-3.5" /> Dual
              </button>
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-2 py-1 rounded-lg transition-all font-medium ${currentLang === 'en' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => setCurrentLang('es')}
                className={`px-2 py-1 rounded-lg transition-all font-medium ${currentLang === 'es' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
              >
                ES
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Print view"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="max-w-7xl mx-auto px-4 flex space-x-1 overflow-x-auto text-xs font-semibold pt-1 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('intake')}
            className={`py-2.5 px-4 rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'intake'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>1. Intake & Upload Records</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`py-2.5 px-4 rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'summary'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>2. Bilingual PLAAFP & Accommodations</span>
          </button>

          <button
            onClick={() => setActiveTab('goals')}
            className={`py-2.5 px-4 rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'goals'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3. Montessori Bilingual Goals</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className={`py-2.5 px-4 rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'tracking'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>4. Progress Monitoring Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('google')}
            className={`py-2.5 px-4 rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'google'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>5. Google Suite & Export</span>
          </button>

          <button
            onClick={() => setActiveTab('caseload')}
            className={`py-2.5 px-4 rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'caseload'
                ? 'border-emerald-400 text-emerald-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>6. Caseload Roster ({students.length})</span>
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-1">
        {/* Active Student Card */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg border border-emerald-200">
              {activeStudent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-slate-900">{activeStudent.name}</h2>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  activeStudent.planType === 'IEP' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}>
                  {activeStudent.planType} Plan
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                  {activeStudent.montessoriCycle}
                </span>
                <button
                  onClick={() => openEditStudentModal(activeStudent)}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 border border-slate-300 transition"
                  title="Edit Student Information & Documents"
                >
                  <Edit3 className="w-3 h-3 text-emerald-600" />
                  <span>Edit Profile</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Guide: <span className="font-semibold text-slate-700">{activeStudent.caseManager}</span> &bull; Language: <span className="font-semibold text-slate-700">{activeStudent.primaryLanguage}</span> &bull; Annual Review: <span className="font-semibold text-slate-700">{activeStudent.annualReviewDate}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl font-medium border border-emerald-200 flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-emerald-600" />
              {(activeStudent.documents || []).length} Attached Records
            </span>
          </div>
        </div>

        {}
        {activeTab === 'intake' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Upload Files & Screenshots Box */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-emerald-600" />
                    <span>Upload Documents, Screenshots & Records</span>
                  </h3>
                  <button
                    onClick={openAddStudentModal}
                    className="text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1 rounded-lg font-bold flex items-center gap-1 shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Student
                  </button>
                </div>
                
                {/* Target Student Mode Selector */}
                <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Currently Attaching To:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-300">
                      {activeStudent.name}
                    </span>
                    <button
                      onClick={openAddStudentModal}
                      className="text-xs text-blue-600 hover:underline font-semibold"
                    >
                      Attach to someone else?
                    </button>
                  </div>
                </div>

                {/* Dropzone container */}
                <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 transition rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer text-center group">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 group-hover:scale-110 transition flex items-center justify-center text-emerald-600 mb-3 shadow-inner">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    Click to browse files or drag & drop screenshots
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Accepts PNG, JPG, PDF, TXT & Doc scans (auto-attached to student record)
                  </span>
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleIntakeFileUpload} 
                    className="hidden" 
                    accept="image/*,.pdf,.txt,.doc,.docx"
                  />
                </label>

                {/* Attached files list for Active Student */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-emerald-600" />
                      Attached Files for {activeStudent.name} ({(activeStudent.documents || []).length})
                    </h4>
                    <span className="text-[11px] text-slate-400">Stored on student profile</span>
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                    {(activeStudent.documents || []).length === 0 ? (
                      <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl text-center">
                        No files uploaded yet for this student. Drop an evaluation or screenshot above.
                      </p>
                    ) : (
                      (activeStudent.documents || []).map((file, idx) => (
                        <div key={file.id || idx} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                          <div className="flex items-center space-x-2 truncate">
                            <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                            <div className="truncate">
                              <p className="font-semibold text-slate-800 truncate">{file.name}</p>
                              <span className="text-[10px] text-slate-400">{file.size || 'Attached file'} &bull; {file.uploadDate || 'Uploaded'}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              setStudents(prev => prev.map(s => {
                                if (s.id === activeStudent.id) {
                                  return {
                                    ...s,
                                    documents: (s.documents || []).filter((_, i) => i !== idx)
                                  };
                                }
                                return s;
                              }));
                              showToast(`Removed file from ${activeStudent.name}`);
                            }}
                            className="p-1 text-slate-400 hover:text-red-500 transition"
                            title="Remove file"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4" /> FERPA Compliant Mode
                </span>
                <span>Protected Student Data</span>
              </div>
            </div>

            {/* Teacher Direct Observation & Quick Intake Box */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <span>Montessori Guide Direct Observation Intake</span>
                  </h3>
                  
                  {/* Action Mode Toggle */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs border border-slate-200">
                    <button
                      onClick={() => {
                        setIntakeMode('new');
                        setIntakeStudentName('');
                      }}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                        intakeMode === 'new' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      + Create as New Student
                    </button>
                    <button
                      onClick={() => {
                        setIntakeMode('update_current');
                        setIntakeStudentName(activeStudent.name);
                      }}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                        intakeMode === 'update_current' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Update Current
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {intakeMode === 'new' ? 'New Student Full Name *' : 'Student Name to Update'}
                    </label>
                    <input 
                      type="text" 
                      placeholder={intakeMode === 'new' ? "e.g. Lucia Gomez" : activeStudent.name}
                      value={intakeStudentName}
                      onChange={(e) => setIntakeStudentName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Support Plan Type</label>
                    <select
                      value={intakePlanType}
                      onChange={(e) => setIntakePlanType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="IEP">IEP (Individualized Education Program)</option>
                      <option value="504">504 Accommodation Plan</option>
                      <option value="RTI / MTSS">Tier 2/3 MTSS Intervention</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3 text-xs">
                  <label className="block font-semibold text-slate-700 mb-1">Grade / Montessori Cycle</label>
                  <select
                    value={intakeGrade}
                    onChange={(e) => setIntakeGrade(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Children’s House (Kindergarten)">Casa dei Bambini (Primary 3-6 / Kinder)</option>
                    <option value="Lower Elementary (Grade 2)">Taller I / Lower Elementary (Grades 1-3)</option>
                    <option value="Upper Elementary (Grade 4)">Taller II / Upper Elementary (Grades 4-5)</option>
                    <option value="Middle School (Grade 7)">Comunidad / Middle School (Grades 6-8)</option>
                  </select>
                </div>

                <div className="mb-4 text-xs">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Paste Anecdotal Records, Work Cycle Notes, or Assessment Findings
                  </label>
                  <textarea 
                    rows={6}
                    value={pastedNotes}
                    onChange={(e) => setPastedNotes(e.target.value)}
                    placeholder="E.g., Student demonstrated high precision during three-period lessons with the golden beads. However, during English guided reading, they showed decoding hesitation with short vowels. Spanish phonetic awareness is progressing with syllables (ma, me, mi). Notes indicate a need for sensory cushions during circle time..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Generate Button */}
              <button
                disabled={isAnalyzing}
                onClick={runAISynthesis}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Montessori & Bilingual Plan with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{intakeMode === 'new' ? 'Create New Student & Generate Summary' : `Update Summary for ${activeStudent.name}`}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    <span>Present Levels of Academic & Functional Performance (PLAAFP)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Bilingual evaluation for {activeStudent.name}. Click "Edit Summaries" to customize or fine-tune phrasing.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {isEditingSummary ? (
                    <button
                      onClick={handleSaveEditedSummary}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Changes
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditingSummary(true)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-emerald-600" /> Edit Summaries
                    </button>
                  )}
                  <button
                    onClick={copyFormattedForGoogleDocs}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Summary
                  </button>
                  <button
                    onClick={exportDocHTML}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Download .Doc
                  </button>
                </div>
              </div>

              {/* Bilingual Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(currentLang === 'dual' || currentLang === 'en') && (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> English Summary & PLAAFP
                      </span>
                      <span className="text-[11px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">Official IEP Record</span>
                    </div>

                    {isEditingSummary ? (
                      <textarea
                        rows={8}
                        value={editableSummaryEn}
                        onChange={(e) => setEditableSummaryEn(e.target.value)}
                        className="w-full bg-white border border-emerald-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed font-sans"
                      />
                    ) : (
                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                        {activeStudent.summaryEn}
                      </p>
                    )}
                  </div>
                )}

                {(currentLang === 'dual' || currentLang === 'es') && (
                  <div className="bg-amber-50/40 rounded-2xl p-5 border border-amber-200/80">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Resumen en Español (Para Familias)
                      </span>
                      <span className="text-[11px] text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded border border-amber-300">Comunicación Familiar</span>
                    </div>

                    {isEditingSummary ? (
                      <textarea
                        rows={8}
                        value={editableSummaryEs}
                        onChange={(e) => setEditableSummaryEs(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed font-sans"
                      />
                    ) : (
                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                        {activeStudent.summaryEs}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Accommodations & Montessori Scaffolding */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Special Education Accommodations & Montessori Classroom Scaffolding</span>
                </h4>
                <button
                  onClick={() => {
                    const newAcc = prompt('Enter new accommodation (English or Spanish):');
                    if (newAcc && newAcc.trim()) {
                      setStudents(prev => prev.map(s => {
                        if (s.id === activeStudent.id) {
                          return {
                            ...s,
                            accommodations: [...(s.accommodations || []), newAcc.trim()]
                          };
                        }
                        return s;
                      }));
                      showToast('Accommodation added!');
                    }
                  }}
                  className="px-2.5 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Accommodation
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(activeStudent.accommodations || []).map((acc, index) => (
                  <div key={index} className="flex items-start justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs group">
                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {index + 1}
                      </span>
                      <p className="text-slate-700 leading-relaxed">{acc}</p>
                    </div>
                    <button
                      onClick={() => {
                        setStudents(prev => prev.map(s => {
                          if (s.id === activeStudent.id) {
                            return {
                              ...s,
                              accommodations: (s.accommodations || []).filter((_, i) => i !== index)
                            };
                          }
                          return s;
                        }));
                      }}
                      className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1"
                      title="Remove accommodation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-600" />
                  <span>SMART Bilingual IEP Goals with Montessori Apparatus Integration</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Goals aligned with the Prepared Environment, concrete sensory-motor lessons, and dual-language benchmarks.
                </p>
              </div>
              <button
                onClick={() => setShowAddGoalModal(true)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow"
              >
                <Plus className="w-4 h-4" /> Add SMART Goal
              </button>
            </div>

            <div className="space-y-4">
              {(activeStudent.goals || []).map((goal, idx) => (
                <div key={goal.id || idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{goal.area}</h4>
                    </div>
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="bg-amber-100 text-amber-900 font-medium px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Target: {goal.targetDate}
                      </span>
                      <button
                        onClick={() => {
                          setStudents(prev => prev.map(s => {
                            if (s.id === activeStudent.id) {
                              return {
                                ...s,
                                goals: (s.goals || []).filter((_, i) => i !== idx)
                              };
                            }
                            return s;
                          }));
                          showToast('Removed goal');
                        }}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Delete Goal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="font-bold text-slate-800 mb-1 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span> English Goal:
                      </p>
                      <p className="text-slate-700 leading-relaxed">{goal.goalEn}</p>
                    </div>
                    <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80">
                      <p className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-600"></span> Meta en Español:
                      </p>
                      <p className="text-slate-700 leading-relaxed">{goal.goalEs}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-700">Baseline Performance: </span>
                      <span>{goal.baseline}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Layers className="w-4 h-4 text-emerald-600" />
                      <span>Montessori Tool: {goal.montessoriTool}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'tracking' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                    <span>IEP Progress Monitoring & Work Cycle Trials</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Quantitative performance tracking across trials for {activeStudent.name}.
                  </p>
                </div>
                <button
                  onClick={exportGoogleSheetsCSV}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" /> Export Data to Sheets
                </button>
              </div>

              {/* Visual Progress Bar Chart */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3">
                  <span>Student Mastery Progression (%)</span>
                  <span className="text-emerald-700">IEP Mastery Target: 80%</span>
                </div>
                <div className="space-y-3">
                  {(activeStudent.trackingData || []).map((t, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span className="font-semibold">{t.trial} ({t.date})</span>
                        <span className="font-bold text-slate-900">{t.score}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            t.score >= 80 ? 'bg-emerald-500' : t.score >= 65 ? 'bg-teal-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(t.score, 100)}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 italic pl-1">{t.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Progress Point Form */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Record New Assessment Trial
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Trial / Task Description</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Spanish Syllable Decode Trial 5" 
                      value={newDataTrial}
                      onChange={(e) => setNewDataTrial(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Score (% Accuracy: 0-100)</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="100" 
                      value={newDataScore}
                      onChange={(e) => setNewDataScore(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Montessori Observations</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Used sandpaper letters without prompts" 
                      value={newDataNotes}
                      onChange={(e) => setNewDataNotes(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleAddProgressPoint}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow"
                  >
                    <Plus className="w-3.5 h-3.5" /> Record Progress Point
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'google' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-emerald-600" />
                    <span>Google Workspace & IEP Meeting Reporting Integration</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Seamless export formats for Google Docs, Google Sheets, Google Slides, and parent-teacher conferences.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Google Docs Card */}
                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Google Docs & Word</h4>
                    <p className="text-xs text-slate-600 mb-4">
                      Export bilingual PLAAFP summaries, accommodations, and goals directly into Google Docs or formatted Word documents.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={copyFormattedForGoogleDocs}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Clean Text for Docs
                    </button>
                    <button
                      onClick={exportDocHTML}
                      className="w-full py-2 bg-white hover:bg-slate-50 text-blue-700 border border-blue-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download .Doc File
                    </button>
                  </div>
                </div>

                {/* Google Sheets Card */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Google Sheets (CSV)</h4>
                    <p className="text-xs text-slate-600 mb-4">
                      Download time-series assessment trials and progress monitoring data points for automatic graphing in Google Sheets.
                    </p>
                  </div>
                  <button
                    onClick={exportGoogleSheetsCSV}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Sheets CSV
                  </button>
                </div>

                {/* Google Slides Card */}
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
                      <Presentation className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Google Slides Deck</h4>
                    <p className="text-xs text-slate-600 mb-4">
                      Generates a 5-slide bilingual presentation outline ready for annual IEP reviews, eligibility, and parent conferences.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const slideOutline = `
SLIDE 1: Title Slide
- Annual IEP/504 Review: ${activeStudent.name}
- Latin American Montessori Bilingual (LAMB) PCS
- Guide: ${activeStudent.caseManager} | Date: ${activeStudent.annualReviewDate}

SLIDE 2: Montessori Strengths & Environmental Independence
- Cycle: ${activeStudent.montessoriCycle}
- Strengths: High hands-on engagement with sensorial materials.
- Dual-Language Context: ${activeStudent.primaryLanguage}

SLIDE 3: Present Levels (PLAAFP)
- English: ${activeStudent.summaryEn.slice(0, 180)}...
- Español: ${activeStudent.summaryEs.slice(0, 180)}...

SLIDE 4: Accommodations & Scaffolded Prepared Environment
${(activeStudent.accommodations || []).map((a, i) => `- ${a}`).join('\n')}

SLIDE 5: Measurable Bilingual Goals & Progress
${(activeStudent.goals || []).map((g, i) => `- Goal ${i + 1} (${g.area}): Baseline ${g.baseline} -> Target ${g.targetDate}`).join('\n')}
                      `.trim();

                      navigator.clipboard.writeText(slideOutline);
                      showToast('Copied 5-slide Google Slides presentation outline!');
                    }}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Slides Outline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'caseload' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-slate-700" />
                  <span>LAMB Special Education & 504 Active Caseload</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage student profiles, edit details, upload existing documents, and review compliance deadlines.
                </p>
              </div>

              <button
                onClick={openAddStudentModal}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Student with Documents
              </button>
            </div>

            {/* Roster Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map((st) => (
                <div 
                  key={st.id}
                  onClick={() => setSelectedStudentId(st.id)}
                  className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                    st.id === selectedStudentId 
                      ? 'border-emerald-500 bg-emerald-50/30 shadow-md ring-2 ring-emerald-500/20' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-slate-900 text-base">{st.name}</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditStudentModal(st);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-emerald-700 transition"
                          title="Edit student"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        st.planType === 'IEP' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {st.planType}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1 mb-3">
                      <p><strong>Cycle:</strong> {st.montessoriCycle}</p>
                      <p><strong>Disability:</strong> {st.disabilityCategory}</p>
                      <p><strong>Guide:</strong> {st.caseManager}</p>
                      <p><strong>Review:</strong> {st.annualReviewDate}</p>
                      <p className="text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>{(st.documents || []).length} Attached File(s)</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      {st.id === selectedStudentId ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Active Student
                        </>
                      ) : (
                        <span>Click to select</span>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (students.length <= 1) {
                            showToast('You must maintain at least one student in caseload.');
                            return;
                          }
                          setStudents(prev => prev.filter(s => s.id !== st.id));
                          if (selectedStudentId === st.id) {
                            const remaining = students.filter(s => s.id !== st.id);
                            setSelectedStudentId(remaining[0].id);
                          }
                          showToast(`Removed ${st.name} from caseload`);
                        }}
                        className="text-slate-400 hover:text-red-500 p-1 transition"
                        title="Remove student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudentId(st.id);
                          setActiveTab('summary');
                        }}
                        className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
                      >
                        <span>View PLAAFP</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isEditingExistingStudent ? `Edit Student: ${studentFormData.name}` : 'Add New Student to LAMB Caseload'}
                </h3>
                <p className="text-xs text-slate-500">
                  Enter student information and attach existing files (evaluations, previous IEPs, TRC screenshots).
                </p>
              </div>
              <button onClick={() => setShowStudentModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formValidationError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{formValidationError}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Student Name *</label>
                  <input 
                    type="text" 
                    value={studentFormData.name} 
                    onChange={(e) => {
                      setStudentFormData({ ...studentFormData, name: e.target.value });
                      if (formValidationError) setFormValidationError('');
                    }}
                    placeholder="e.g. Camila Salazar Mendoza"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Support Plan Type</label>
                  <select 
                    value={studentFormData.planType} 
                    onChange={(e) => setStudentFormData({ ...studentFormData, planType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="IEP">IEP (Individualized Education Program)</option>
                    <option value="504">504 Accommodation Plan</option>
                    <option value="MTSS Tier 3">Tier 3 Intensive Intervention</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Montessori Cycle</label>
                  <select 
                    value={studentFormData.montessoriCycle} 
                    onChange={(e) => setStudentFormData({ ...studentFormData, montessoriCycle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Casa dei Bambini (Primary 3-6)">Casa dei Bambini (Primary 3-6)</option>
                    <option value="Taller I (Lower Elementary 6-9)">Taller I (Lower Elementary 6-9)</option>
                    <option value="Taller II (Upper Elementary 9-12)">Taller II (Upper Elementary 9-12)</option>
                    <option value="Comunidad (Middle School 12-14)">Comunidad (Middle School 12-14)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade Level</label>
                  <input 
                    type="text" 
                    value={studentFormData.grade} 
                    onChange={(e) => setStudentFormData({ ...studentFormData, grade: e.target.value })}
                    placeholder="e.g. Lower Elementary (Grade 2)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dual-Language Background</label>
                  <input 
                    type="text" 
                    value={studentFormData.primaryLanguage} 
                    onChange={(e) => setStudentFormData({ ...studentFormData, primaryLanguage: e.target.value })}
                    placeholder="e.g. Spanish (Home) / English & Spanish (Immersion)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Disability / Eligibility Category</label>
                  <input 
                    type="text" 
                    value={studentFormData.disabilityCategory} 
                    onChange={(e) => setStudentFormData({ ...studentFormData, disabilityCategory: e.target.value })}
                    placeholder="e.g. Specific Learning Disability / OHI"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Case Manager / Guide</label>
                  <input 
                    type="text" 
                    value={studentFormData.caseManager} 
                    onChange={(e) => setStudentFormData({ ...studentFormData, caseManager: e.target.value })}
                    placeholder="e.g. Maestra Soto"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Next Annual Review Date</label>
                  <input 
                    type="date" 
                    value={studentFormData.annualReviewDate} 
                    onChange={(e) => setStudentFormData({ ...studentFormData, annualReviewDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Attach Existing Files Dropzone within Modal */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Paperclip className="w-4 h-4 text-emerald-600" />
                    Attach Existing Files, Screenshots or Records
                  </span>
                  <span className="text-[10px] text-slate-400">PDF, PNG, JPG, DOC</span>
                </div>

                <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50/60 transition rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer text-center group">
                  <Upload className="w-6 h-6 text-emerald-600 mb-1 group-hover:scale-110 transition" />
                  <span className="text-xs font-semibold text-slate-700">
                    Click to browse files or drop existing student records
                  </span>
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleModalFileUpload} 
                    className="hidden" 
                    accept="image/*,.pdf,.txt,.doc,.docx"
                  />
                </label>

                {/* List of files pending or already attached */}
                {((studentFormData.documents || []).length > 0 || modalPendingFiles.length > 0) && (
                  <div className="mt-3 max-h-36 overflow-y-auto space-y-1.5">
                    {[...(studentFormData.documents || []), ...modalPendingFiles].map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200 text-[11px]">
                        <div className="flex items-center space-x-2 truncate">
                          <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-medium text-slate-800 truncate">{file.name}</span>
                          <span className="text-slate-400 text-[10px]">({file.size})</span>
                        </div>
                        <span className="text-emerald-700 font-semibold text-[10px]">Ready</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2 border-t border-slate-100 pt-4">
              <button
                onClick={() => setShowStudentModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveStudentForm}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isEditingExistingStudent ? 'Save Profile Changes' : 'Create Student & Attach Files'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add SMART Bilingual Goal</h3>
                <p className="text-xs text-slate-500">Pair goal with Montessori apparatus and measurable baseline.</p>
              </div>
              <button onClick={() => setShowAddGoalModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Goal Domain / Focus Area</label>
                <input 
                  type="text" 
                  value={newGoalArea} 
                  onChange={(e) => setNewGoalArea(e.target.value)}
                  placeholder="e.g. Bilingual Literacy, Math Operations, Sensory Regulation"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">English SMART Goal Description</label>
                <textarea 
                  rows={3}
                  value={newGoalEn} 
                  onChange={(e) => setNewGoalEn(e.target.value)}
                  placeholder="Given phonetic reading cards and moveable alphabet, the student will..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Spanish SMART Goal Description (Meta en Español)</label>
                <textarea 
                  rows={3}
                  value={newGoalEs} 
                  onChange={(e) => setNewGoalEs(e.target.value)}
                  placeholder="Utilizando las letras de lija y tarjetas bilingües, el estudiante logrará..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Montessori Apparatus</label>
                  <input 
                    type="text" 
                    value={newGoalTool} 
                    onChange={(e) => setNewGoalTool(e.target.value)}
                    placeholder="e.g. Moveable Alphabet, Golden Beads"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Baseline Accuracy</label>
                  <input 
                    type="text" 
                    value={newGoalBaseline} 
                    onChange={(e) => setNewGoalBaseline(e.target.value)}
                    placeholder="e.g. 45% in English, 50% in Spanish"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end space-x-2 border-t border-slate-100 pt-3">
              <button
                onClick={() => setShowAddGoalModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Save Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
        <p className="font-medium text-slate-600">
          Latin American Montessori Bilingual (LAMB) Public Charter School &bull; Special Education & Student Support Services
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Dual-Language (English/Spanish) &bull; Montessori Prepared Environment &bull; Google Workspace Compatible
        </p>
      </footer>
    </div>
  );
}