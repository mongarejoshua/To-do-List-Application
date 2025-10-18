// -------- Simple front-end "database" using localStorage --------
const DB_KEY = 'sms_demo_db_v1';


function makeId(prefix = 'id') {
    return prefix + '_' + Math.random().toString(36).slice(2, 9)
}


function getDB() {
    const data = localStorage.getItem(DB_KEY);
    if (!data) return { students: [], teachers: [], classes: [], attendance: [] }
    try { return JSON.parse(data) } catch (e) { return { students: [], teachers: [], classes: [], attendance: [] } }
}
function saveDB(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)); renderAll(); }


// Demo sample data
const demo = (() => ({
    students: [{ id: makeId('s'), name: 'Aisha Kamau', gender: 'Female', classId: null, roll: 'S001' }, { id: makeId('s'), name: 'John Mwangi', gender: 'Male', classId: null, roll: 'S002' }],
    teachers: [{ id: makeId('t'), name: 'Mr. Otieno', subject: 'Mathematics', phone: '0700111222' }, { id: makeId('t'), name: 'Ms. Wanjiru', subject: 'English', phone: '0700222333' }],
    classes: [], attendance: []
}))();


// Initialization
document.addEventListener('DOMContentLoaded', () => {
    const settingsSwitch = document.getElementById('demoDataSwitch');
    if (!localStorage.getItem(DB_KEY)) {
        // default: no data
    }
    settingsSwitch.addEventListener('change', (e) => {
        if (e.target.checked) { localStorage.removeItem(DB_KEY); saveDB(Object.assign(getDB(), demo)); }
    })


    document.getElementById('studentForm').addEventListener('submit', onStudentSave);
    document.getElementById('teacherForm').addEventListener('submit', onTeacherSave);
    document.getElementById('classForm').addEventListener('submit', onClassSave);


    document.getElementById('exportBtn').addEventListener('click', onExport);
    document.getElementById('clearBtn').addEventListener('click', () => { if (confirm('Clear all data?')) { localStorage.removeItem(DB_KEY); renderAll(); } });


    document.getElementById('loadAttendanceBtn').addEventListener('click', loadAttendance);
    document.getElementById('markAttendanceBtn').addEventListener('click', () => { alert('Click Load, then mark attendance for students in that class.'); });


    // Preload demo data for convenience (if DB empty)
    if (!localStorage.getItem(DB_KEY)) {
        saveDB(Object.assign(getDB(), demo));
    } else {
        renderAll();
    }


    // activate tab links behaviour (keeps active class)
    document.querySelectorAll('#mainNav .nav-link').forEach(a => { a.addEventListener('shown.bs.tab', () => { document.querySelectorAll('#mainNav .nav-link').forEach(x => x.classList.remove('active')); a.classList.add('active'); }) });
})


// ---------- CRUD Handlers ----------
function onStudentSave(e) {
    e.preventDefault();
    const id = document.getElementById('studentId').value;
}