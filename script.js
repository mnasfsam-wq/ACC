// نظام قاعدة البيانات الوهمي (JSON)
let db = JSON.parse(localStorage.getItem('d09_db')) || {
    users: {
        "d09_L7": { password: "d09_L7", points: 999999, role: "admin" }
    },
    ads: []
};

let currentUser = null;

function authAction() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    if (!u || !p) return alert("عمر الخانات!");

    if (db.users[u]) {
        // تسجيل دخول
        if (db.users[u].password === p) {
            currentUser = u;
            loadPanel();
        } else {
            alert("باسورد غلط!");
        }
    } else {
        // إنشاء حساب جديد
        db.users[u] = { password: p, points: 0, role: "user" };
        saveDB();
        alert("تم إنشاء الحساب! دخل دابا.");
    }
}

function loadPanel() {
    document.getElementById('login-section').classList.add('hidden');
    const user = db.users[currentUser];
    
    if (user.role === "admin") {
        document.getElementById('admin-panel').classList.remove('hidden');
    } else {
        document.getElementById('user-panel').classList.remove('hidden');
    }
    updateUI();
}

function updateUI() {
    document.getElementById('user-name-display').innerText = currentUser;
    document.getElementById('points-display').innerText = db.users[currentUser].points;
}

function generateAccount() {
    const cost = 10;
    if (db.users[currentUser].points >= cost) {
        db.users[currentUser].points -= cost;
        saveDB();
        updateUI();
        // توليد بيانات وهمية
        const randomAcc = "GUEST_" + Math.random().toString(36).substring(7).toUpperCase();
        const randomPass = Math.random().toString(36).substring(8);
        document.getElementById('result-area').innerText = `يوزر: ${randomAcc}\nباسورد: ${randomPass}`;
    } else {
        alert("ماعندكش النقاط! شري من الأدمن D09_L7");
    }
}

// وظائف الأدمن
function adminAddPoints() {
    const target = document.getElementById('target-user').value;
    const pts = parseInt(document.getElementById('add-pts-val').value);
    if (db.users[target]) {
        db.users[target].points += pts;
        saveDB();
        alert(`تمت إضافة ${pts} لـ ${target}`);
    } else {
        alert("المستخدم ما كاينش!");
    }
}

function saveDB() {
    localStorage.setItem('d09_db', JSON.stringify(db));
}

function logout() { location.reload(); }
