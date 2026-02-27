// ===== APP STATE (loaded from localStorage) =====
let appState = {
    students: [],
    exams: [],
    questions: [],
    results: [],
    currentStudent: null,
    currentExam: null,
    examTimer: null,
    examTimeRemaining: 0
};

const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };

// ===== LOAD / SAVE =====
function loadDataFromStorage() {
    try {
        const s = localStorage.getItem('examSystem_students');
        const e = localStorage.getItem('examSystem_exams');
        const q = localStorage.getItem('examSystem_questions');
        const r = localStorage.getItem('examSystem_results');
        if (s) appState.students  = JSON.parse(s);
        if (e) appState.exams     = JSON.parse(e);
        if (q) appState.questions = JSON.parse(q);
        if (r) appState.results   = JSON.parse(r);

        // restore current student session
        const cs = sessionStorage.getItem('currentStudent');
        if (cs) appState.currentStudent = JSON.parse(cs);
        const ce = sessionStorage.getItem('currentExam');
        if (ce) appState.currentExam = JSON.parse(ce);
    } catch (err) { console.error('Load error:', err); }
}

function saveDataToStorage() {
    try {
        localStorage.setItem('examSystem_students',  JSON.stringify(appState.students));
        localStorage.setItem('examSystem_exams',     JSON.stringify(appState.exams));
        localStorage.setItem('examSystem_questions', JSON.stringify(appState.questions));
        localStorage.setItem('examSystem_results',   JSON.stringify(appState.results));
    } catch (err) { console.error('Save error:', err); }
}

function saveSession() {
    if (appState.currentStudent)
        sessionStorage.setItem('currentStudent', JSON.stringify(appState.currentStudent));
    else
        sessionStorage.removeItem('currentStudent');

    if (appState.currentExam)
        sessionStorage.setItem('currentExam', JSON.stringify(appState.currentExam));
    else
        sessionStorage.removeItem('currentExam');
}

// ===== SAMPLE DATA =====
function initializeSampleData() {
    if (appState.students.length === 0) {
        appState.students = [
            { rollNo: '001', name: 'TAGADKAR MAYUR SANJAY',   email: 'mayurtagadkar9@gmail.com',    contact: '8468809438', password: 'mayur123'  },
            { rollNo: '002', name: 'DAHATONDE ANIKET SANJAY', email: 'dahatondeaniket40@gmail.com', contact: '8788060984', password: 'aniket123' }
        ];
    }
    if (appState.exams.length === 0) {
        appState.exams = [
            { id: 'EX001', name: 'Database Management Systems - Mid Term', subject: 'DBMS', duration: 30, totalMarks: 10 },
            { id: 'EX002', name: 'Java Programming - Final Exam',          subject: 'Java', duration: 45, totalMarks: 15 }
        ];
    }
    if (appState.questions.length === 0) {
        appState.questions = [
            { id:'Q001', examId:'EX001', question:'What does SQL stand for?', optionA:'Structured Query Language', optionB:'Simple Question Language', optionC:'Standard Query Language', optionD:'Sequential Query Language', correctAnswer:'A', marks:1 },
            { id:'Q002', examId:'EX001', question:'Which of the following is NOT a type of database model?', optionA:'Hierarchical', optionB:'Network', optionC:'Relational', optionD:'Sequential', correctAnswer:'D', marks:1 },
            { id:'Q003', examId:'EX001', question:'Which SQL command is used to retrieve data from a database?', optionA:'GET', optionB:'SELECT', optionC:'RETRIEVE', optionD:'FETCH', correctAnswer:'B', marks:1 },
            { id:'Q004', examId:'EX002', question:'Which keyword is used to create a class in Java?', optionA:'class', optionB:'Class', optionC:'new', optionD:'create', correctAnswer:'A', marks:1 },
            { id:'Q005', examId:'EX002', question:'What is the default value of a boolean variable in Java?', optionA:'true', optionB:'false', optionC:'0', optionD:'null', correctAnswer:'B', marks:1 }
        ];
    }
    saveDataToStorage();
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'success') {
    const area = document.getElementById('notificationArea');
    if (!area) return;
    const div = document.createElement('div');
    div.className = `notification notification-${type}`;
    div.textContent = message;
    area.appendChild(div);
    setTimeout(() => div.remove(), 4000);
}

// ===== MODALS =====
function openModal(id)  { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// ===== NAVBAR HAMBURGER =====
function initHamburger() {
    const hamburger = document.getElementById('gnavHamburger');
    const mobileMenu = document.getElementById('gnavMobile');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        }
    });
}

function closeNav() {
    const hamburger = document.getElementById('gnavHamburger');
    const mobileMenu = document.getElementById('gnavMobile');
    if (hamburger) hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
}

// ===== GLOBAL INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromStorage();
    initializeSampleData();
    initHamburger();
});
