'use strict';

// ======================
// FONCTIONS DE BASE
// ======================

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });

// ======================
// TESTIMONIALS MODAL
// ======================

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener('click', function () {
    if (modalImg) { modalImg.src = this.querySelector('[data-testimonials-avatar]').src; modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt; }
    if (modalTitle) modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
    if (modalText) modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;
    testimonialsModalFunc();
  });
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', testimonialsModalFunc);
if (overlay) overlay.addEventListener('click', testimonialsModalFunc);

// ======================
// PORTFOLIO FILTER
// ======================

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

if (select) select.addEventListener('click', function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener('click', function() {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add('active');
    } else if (selectedValue === filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add('active');
    } else {
      filterItems[i].classList.remove('active');
    }
  }
}

let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener('click', function() {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    if (lastClickedBtn) lastClickedBtn.classList.remove('active');
    this.classList.add('active');
    lastClickedBtn = this;
  });
}

// ======================
// CONTACT FORM
// ======================

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener('input', function () {
    if (form && form.checkValidity()) {
      if (formBtn) formBtn.removeAttribute('disabled');
    } else {
      if (formBtn) formBtn.setAttribute('disabled', '');
    }
  });
}

// ======================
// PAGE NAVIGATION
// ======================

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function() {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add('active');
        navigationLinks[j].classList.add('active');
        window.scrollTo(0, 0);
        if (pages[j].dataset.page === 'blog') setTimeout(chargerVeilleTechno, 100);
        if (pages[j].dataset.page === 'portfolio') setTimeout(injecterBadgesCompetences, 50);
      } else {
        pages[j].classList.remove('active');
        navigationLinks[j].classList.remove('active');
      }
    }
  });
}

// =============================================
// PROJETS <-> COMPÉTENCES E4
// Source : Tableau de synthèse BTS SIO 2026 — Ahaddou Heymad
// =============================================

const COMP_LABELS = {
  C1: "Gérer le patrimoine informatique",
  C2: "Répondre aux incidents",
  C3: "Développer la présence en ligne",
  C4: "Travailler en mode projet",
  C5: "Mettre à disposition un service",
  C6: "Développement professionnel",
};

const COMP_COLORS = {
  C1: "#4fc3f7",
  C2: "#ef9a9a",
  C3: "#a5d6a7",
  C4: "#ffb300",
  C5: "#ce93d8",
  C6: "#80cbc4",
};

const PROJET_COMPETENCES = {
  "Projet Python": {
    periode: "06/01 → 09/01/2025",
    techs: ["Python", "MariaDB", "SQL", "Linux", "Sécurité"],
    desc: "Automatisation du traitement de logs web. BDD logs_web, droits MariaDB, archivage automatisé et chiffré.",
    competences: {
      C1: "Recensement ressources numériques, habilitations MariaDB (utilog/gestionlog), sauvegardes automatisées",
      C2: "Scripts Python pour automatiser le traitement des logs (logproxy.py)",
      C3: null,
      C4: "Respect du cahier des charges, structuration des logs et statistiques",
      C5: null,
      C6: null,
    }
  },
  "Projet thali java": {
    periode: "31/03 → 04/04/2025",
    techs: ["Java", "MySQL", "Design Pattern DAO", "CRUD", "JAR"],
    desc: "Application de gestion THALI en Java. Standards Java (paquetages, DAO), droits MySQL, déploiement .jar.",
    competences: {
      C1: "Référentiels Java, habilitations via utilisateur MySQL thali_util",
      C2: "Correction de bugs CRUD lors des tests, contrôle de saisie formulaires",
      C3: null,
      C4: "Analyse du cahier des charges (besoins THALI)",
      C5: "Génération du .jar, documentation utilisateur, tutoriels administration",
      C6: null,
    }
  },
  "Projet Intranet": {
    periode: "14/01 → 11/03/2025",
    techs: ["PHP", "MariaDB", "Apache", "GitLab", "HTML/CSS", "JavaScript"],
    desc: "Intranet d'entreprise : tickets, gestion des rôles admin/utilisateur, sauvegardes GitLab, déploiement.",
    competences: {
      C1: "Inventaire ressources, standards PHP/MariaDB/Apache, gestion des rôles, sauvegardes GitLab",
      C2: "Module de tickets pour besoins utilisateurs, traitement des demandes applicatives",
      C3: null,
      C4: "GitLab pour planification, évaluation des délais (maquettage → développement)",
      C5: "Tests fonctionnalités (authentification, dashboard), accompagnement utilisateurs",
      C6: "Acquisition compétences PHP, JS, gestion de projet",
    }
  },
  "Stage chez Delia": {
    periode: "12/05 → 20/06/2025",
    techs: ["JavaScript", "Docker", "Vitest", "Cypress", "CI/CD"],
    desc: "Stage dev web chez Delia — projet Give-me-five. Tests d'intégration, déploiement recette, accompagnement RH.",
    competences: {
      C1: null,
      C2: null,
      C3: null,
      C4: "Analyse des objectifs Give-me-five, évaluation indicateurs (tests, code reviews, déploiement)",
      C5: "Tests d'intégration et d'acceptation Vitest/Cypress, déploiement recette, accompagnement RH",
      C6: "Autoformation JavaScript/Docker, veille informationnelle, identité professionnelle",
    }
  },
  "Site Web Restaurant": {
    periode: "15/09 → 24/10/2025",
    techs: ["PHP", "MySQL", "HTML/CSS", "Scrum", "Tickets"],
    desc: "Site restaurant en PHP avec méthodologie Scrum. Tickets d'amélioration, Daily scrum, attribution des tâches.",
    competences: {
      C1: "Exploitation des référentiels et standards avec itérations",
      C2: "Collecte et suivi des demandes via tickets d'amélioration",
      C3: null,
      C4: "Analyse des objectifs via tickets, Daily scrum, planification et attribution",
      C5: null,
      C6: null,
    }
  },
  "Stage chez Dakilab": {
    periode: "05/01 → 12/02/2026",
    techs: ["Web", "Scrum", "Daily scrum", "Gestion projet"],
    desc: "Stage dev web chez Dakilab. Continuité de service, valorisation image en ligne, organisation via tickets.",
    competences: {
      C1: "Vérification des conditions de continuité du service informatique",
      C2: null,
      C3: "Valorisation de l'image de l'organisation sur les médias numériques",
      C4: "Analyse des objectifs via tickets, Daily scrum",
      C5: null,
      C6: "Gestion identité professionnelle, intégration équipe",
    }
  },
};

function badgesTechs(techs) {
  return techs.map(t => `<span style="
    display:inline-block;background:rgba(255,179,0,0.12);color:var(--orange-yellow-crayola);
    border:1px solid rgba(255,179,0,0.3);border-radius:20px;font-size:11px;
    padding:2px 8px;margin:2px 2px 0 0;font-family:var(--ff-poppins);">${t}</span>`).join('');
}

function badgesComps(comps) {
  return Object.entries(comps)
    .filter(([, v]) => v)
    .map(([key]) => `<span title="${comps[key]}" style="
      display:inline-block;background:${COMP_COLORS[key]}22;color:${COMP_COLORS[key]};
      border:1px solid ${COMP_COLORS[key]}55;border-radius:20px;font-size:10px;
      padding:2px 9px;margin:2px 2px 0 0;font-family:var(--ff-poppins);cursor:help;">
      ${key} · ${COMP_LABELS[key]}</span>`).join('');
}

function injecterBadgesCompetences() {
  document.querySelectorAll('.project-item').forEach(item => {
    if (item.querySelector('.comp-badges')) return;
    const titleEl = item.querySelector('.project-title');
    if (!titleEl) return;
    const titre = titleEl.textContent.trim();
    const data = PROJET_COMPETENCES[titre];
    if (!data) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'comp-badges';
    wrapper.style.cssText = 'padding:0 12px 14px;margin-top:-6px;';
    const titreEscaped = titre.replace(/'/g, "\\'");
    wrapper.innerHTML = `
      <p style="font-size:11px;color:var(--light-gray70);margin:0 0 5px;line-height:1.5;">${data.desc}</p>
      <p style="font-size:10px;color:var(--vegas-gold);margin:0 0 5px;">📅 ${data.periode}</p>
      <div style="margin-bottom:5px;">${badgesTechs(data.techs)}</div>
      <div style="margin-bottom:10px;">${badgesComps(data.competences)}</div>
      <button onclick="event.stopPropagation();ouvrirModalProjet('${titreEscaped}')" style="
        display:inline-flex;align-items:center;gap:6px;
        background:var(--jet);color:var(--light-gray);
        border:1px solid var(--border-gradient-onyx);
        border-radius:20px;font-size:12px;padding:5px 14px;
        cursor:pointer;font-family:var(--ff-poppins);
        transition:all .2s;width:100%;justify-content:center;margin-top:2px;
      "
      onmouseover="this.style.background='var(--orange-yellow-crayola)';this.style.color='var(--eerie-black1)';this.style.borderColor='var(--orange-yellow-crayola)'"
      onmouseout="this.style.background='var(--jet)';this.style.color='var(--light-gray)';this.style.borderColor='var(--border-gradient-onyx)'">
        <ion-icon name="expand-outline" style="font-size:13px;"></ion-icon>
        Voir le détail
      </button>
    `;
    item.appendChild(wrapper);
  });
}

const compObserver = new MutationObserver(mutations => {
  mutations.forEach(m => {
    if (m.target.classList.contains('portfolio') && m.target.classList.contains('active')) {
      setTimeout(injecterBadgesCompetences, 50);
    }
  });
});

// =============================================
// MODAL DÉTAIL PROJET
// =============================================

// PDF par projet — chemins réels depuis l'arborescence du projet
const PROJET_PDF = {
  "Projet Python":        "./retours_experience/retex_projet_python (1).pdf",
  "Projet thali java":    "./retours_experience/retex_projet_java_thali.pdf",
  "Projet Intranet":      "./retours_experience/retex_projet_corpany.pdf",
  "Stage chez Delia":     "./retours_experience/Ahaddou_Heymad_1SLAM_2025_Stage_1_Rapport.pdf",
  "Site Web Restaurant":  "./retours_experience/Projet_PhpsiteResto.zip",
  "Stage chez Dakilab":   "./retours_experience/_Ahaddou_Heymad_2SLAM_2026_Stage_2_Rapport (2).pdf",
};

// Description longue par projet
const PROJET_DETAILS = {

  // ─────────────────────────────────────────
  // PROJET PYTHON
  // Preuves : PDF Projet Janvier (p.5-11) + screens
  // ─────────────────────────────────────────
  "Projet Python": `
    <p>Automatisation complète du traitement de logs web sur un serveur Linux Rocky (VM vSphere). Le projet couvre 9 étapes allant de la génération de pseudonymes Python jusqu\'à la rédaction d\'un mode opératoire.</p>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🔒 C1 — Preuves : Gestion du patrimoine informatique
      </p>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;margin-bottom:10px;border-left:3px solid #4fc3f7;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 6px;">📸 Création BDD <code>logs_web</code> + utilisateurs MariaDB avec droits distincts</p>
        <div style="background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;overflow-x:auto;">
          create user \'utilog\'@\'localhost\';<br>
          grant SELECT ON *.* to \'utilog\'@\'localhost\';<br>
          <span style="color:#56d364;">-- utilog : lecture seule ✓</span><br><br>
          create user \'gestionlog\'@\'localhost\';<br>
          grant INSERT, DELETE, UPDATE, SELECT ON *.* to \'gestionlog\'@\'localhost\';<br>
          <span style="color:#56d364;">-- gestionlog : accès complet ✓</span>
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Projet Janvier — Étape 2, p.7 du rapport</p>
      </div>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #4fc3f7;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 6px;">📸 Schéma BDD — Tables <code>employes</code> et <code>journaux_acces</code></p>
        <div style="background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;overflow-x:auto;">
          <span style="color:#f0883e;">logs_web.employes</span> → id_employes, nom, prenom, email, adresse_ip, date_creation, date_modif<br>
          <span style="color:#f0883e;">logs_web.journaux_acces</span> → id_acces, adresse_ip_employe (FK), horordatage, url_consultee, methode_http, code_reponse
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Projet Janvier — Étape 2, p.9 du rapport</p>
      </div>
    </div>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🐛 C2 — Preuves : Automatisation et traitement des incidents
      </p>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;margin-bottom:10px;border-left:3px solid #ef9a9a;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 6px;">📸 Script <code>logproxy.py</code> — Lecture et traitement automatique des logs</p>
        <div style="background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;overflow-x:auto;">
          <span style="color:#ff7b72;">def</span> <span style="color:#d2a8ff;">readData</span>(file):<br>
          &nbsp;&nbsp;data_list = []<br>
          &nbsp;&nbsp;<span style="color:#ff7b72;">with</span> open(file, <span style="color:#a5d6ff;">"r"</span>) <span style="color:#ff7b72;">as</span> f:<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ff7b72;">for</span> line <span style="color:#ff7b72;">in</span> f:<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data_list.append(line.strip().split(<span style="color:#a5d6ff;">";"</span>))<br>
          &nbsp;&nbsp;<span style="color:#ff7b72;">return</span> data_list<br>
          <span style="color:#56d364;">-- Résultat : fichiers CSV générés dans csv_dossier/ ✓</span>
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Projet Janvier — Étape 6, p.19-20 du rapport</p>
      </div>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #ef9a9a;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 6px;">📸 Analyse des URL les plus consultées par IP — résultat terminal</p>
        <div style="background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#56d364;line-height:1.7;overflow-x:auto;">
          L\'URL la plus visitée par 192.168.2.2 est https://www.netflix.com — 97 fois<br>
          L\'URL la plus visitée par 192.168.2.3 est https://nxdomain-test.site — 98 fois<br>
          L\'URL la plus visitée par 192.168.2.1 est https://nxdomain-test.site — 103 fois<br>
          L\'URL la plus visitée par 192.168.2.100 est https://www.spotify.com — 101 fois
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Projet Janvier — Étape 5, p.18 du rapport</p>
      </div>
    </div>
  `,

  // ─────────────────────────────────────────
  // PROJET THALI JAVA
  // Preuves : screen droits MySQL + interface appli
  // ─────────────────────────────────────────
  "Projet thali java": `
    <p>Développement d\'une application de gestion en <strong>Java</strong> pour le projet THALI (gestion de mini-excursions). Respect des standards Java (paquetages, design pattern DAO), déploiement en <code>.jar</code>.</p>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🔒 C1 — Preuves : Schéma BDD + Architecture DAO
      </p>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #4fc3f7;margin-bottom:10px;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 10px;">📸 Schéma BDD — Tables <code>thali.etape</code> et <code>thali.excursion</code> avec relation</p>
        <img
          src="./img/thali-php_admin.png"
          alt="Schéma BDD THALI — tables etape et excursion avec relation CodeExcursion"
          style="width:100%;max-width:560px;border-radius:8px;border:1px solid var(--jet);display:block;"
          onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"
        />
        <div style="display:none;background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;">
          thali.etape → Id, CodeExcursion (FK), NumEtape, Description, DureePrevue<br>
          thali.excursion → Code (PK), Libelle, NbPlaces, Tarif
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Clé étrangère <code>CodeExcursion</code> → intégrité référentielle assurée. Utilisateur <code>thali_util</code> avec droits limités à cette BDD.</p>
      </div>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #4fc3f7;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 10px;">📸 Arborescence projet Java — paquetages et design pattern DAO</p>
        <img
          src="./img/thali-arborescence.png"
          alt="Arborescence projet Java THALI — paquetages DAO, GUI, lanceur, modele.metier"
          style="width:100%;max-width:300px;border-radius:8px;border:1px solid var(--jet);display:block;"
          onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"
        />
        <div style="display:none;background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;">
          gui/ → JFrameLesExcursions.java<br>
          lanceur/ → LanceurThaliMini.java<br>
          modele.dao/ → ConnexionBDD.java, DaoEtape.java, DaoMiniExcursion.java<br>
          modele.metier/ · sql/ · test.dao/ · test.metier/
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Architecture DAO respectée — séparation GUI / métier / accès BDD</p>
      </div>
    </div>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🐛 C2 — Preuves : Interface CRUD fonctionnelle
      </p>
      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #ef9a9a;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 10px;">📸 Module THALI-MINI — Gestion des mini-excursions</p>
        <img
          src="./img/thali-interface.png"
          alt="Interface THALI-MINI — gestion excursions avec étapes, durée totale et boutons CRUD"
          style="width:100%;max-width:680px;border-radius:8px;border:1px solid var(--jet);display:block;margin-bottom:12px;"
          onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"
        />
        <div style="display:none;"></div>
        <ul style="color:var(--light-gray);font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
          <li>Sélection d\'excursion via liste déroulante (E01 — Excursion dans l\'île — 8 pl.)</li>
          <li>Tableau des étapes : numéro, description, durée — calcul automatique <strong>03h05mn</strong></li>
          <li>Opérations CRUD complètes : Réservation, Modifier, Ajouter Ex, Ajouter Étape, Supprimer</li>
          <li>Déploiement compilé via NetBeans → génération du <code>.jar</code></li>
        </ul>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Preuve : interface fonctionnelle avec opérations CRUD complètes et contrôle de saisie</p>
      </div>
    </div>
  `,

  // ─────────────────────────────────────────
  // PROJET INTRANET
  // ─────────────────────────────────────────
  "Projet Intranet": `
    <p>Réalisation d'un intranet d'entreprise <strong>CORPANY</strong> en <strong>PHP / MariaDB / Apache</strong>, géré via GitLab. Gestion des rôles, messagerie, notifications, module d'actualités et déploiement complet.</p>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🔒 C1 — Preuves : Architecture MVC + Modélisation BDD
      </p>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #4fc3f7;margin-bottom:10px;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 10px;">📸 Page d'accueil de l'intranet CORPANY — interface déployée</p>
        <img
          src="./img/page_accueil_intra.png"
          alt="Page d'accueil intranet CORPANY — navigation, Mon coin RH, Congé/Arrêt Maladie, Formations"
          style="width:100%;max-width:680px;border-radius:8px;border:1px solid var(--jet);display:block;"
          onerror="this.style.display='none';this.nextElementSibling.style.display='block'"
        />
        <div style="display:none;background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;">
          Intranet CORPANY — Page d'accueil<br>
          Nav : Page d'accueil · Mes documents · Entreprise · Contact · Outils · Administration<br>
          Modules : Mon coin RH · Congé/Arrêt Maladie · Formations disponibles
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Interface déployée et fonctionnelle — navigation complète avec gestion des rôles (admin / utilisateur)</p>
      </div>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #4fc3f7;margin-bottom:10px;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 10px;">📸 Diagramme UML — Modélisation BDD (Groupe, Utilisateur, Actualité)</p>
        <img
          src="./img/schema_intranet.png"
          alt="Diagramme UML intranet — tables Groupe, Utilisateur, Actualité avec relations"
          style="width:100%;max-width:560px;border-radius:8px;border:1px solid var(--jet);display:block;"
          onerror="this.style.display='none';this.nextElementSibling.style.display='block'"
        />
        <div style="display:none;background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;">
          Groupe (1) ──── (0..*) Utilisateur<br>
          Groupe (1) ──── (1..*) Actualité<br>
          Groupe → id_groupe, nom_groupe, role<br>
          Utilisateur → id_user, mdp, identifiant, date_creation<br>
          Actualité → id_actualite, titre_actualite, actualite (longtext)
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Modélisation UML — séparation des rôles par groupe, gestion des actualités et des utilisateurs</p>
      </div>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #4fc3f7;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 8px;">📁 Arborescence projet PHP — Architecture MVC</p>
        <div style="background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;">
          PhpProjectIntranet/<br>
          &nbsp;&nbsp;├── <span style="color:#f0883e;">controleur/</span> ← logique métier<br>
          &nbsp;&nbsp;├── <span style="color:#f0883e;">modele/</span> &nbsp;&nbsp;&nbsp;← accès BDD (DAO)<br>
          &nbsp;&nbsp;├── <span style="color:#f0883e;">vue/</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← templates HTML<br>
          &nbsp;&nbsp;├── css/, images/, includes/<br>
          &nbsp;&nbsp;├── sql/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← scripts SQL versionnés<br>
          &nbsp;&nbsp;└── index.php, getRacine.php, .gitignore
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Sauvegarde et versioning via GitLab — gestion des membres et droits d'accès</p>
      </div>
    </div>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🐛 C2 — Preuves : Module de tickets et gestion des incidents
      </p>
      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #ef9a9a;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 8px;">📋 Tickets GitLab — suivi des demandes par itération</p>
        <ul style="color:var(--light-gray);font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
          <li>Module de tickets intégré dans l'intranet pour collecter les besoins utilisateurs</li>
          <li>Tickets labellisés par complexité et priorité, suivis par itération</li>
          <li>Traitement des incidents applicatifs (bugs authentification, dashboard)</li>
          <li>Accompagnement des utilisateurs lors du déploiement</li>
        </ul>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">GitLab non accessible actuellement — suivi documenté dans le retex PDF</p>
      </div>
    </div>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🚀 C5 — Preuves : Tests et mise à disposition
      </p>
      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #ce93d8;">
        <ul style="color:var(--light-gray);font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
          <li>Tests des fonctionnalités : authentification, tableau de bord, messagerie, notifications</li>
          <li>Déploiement sur serveur Apache — accès via navigateur</li>
          <li>Documentation utilisateur et accompagnement à la prise en main</li>
        </ul>
      </div>
    </div>
  `,

  // ─────────────────────────────────────────
  // STAGE DELIA
  // ─────────────────────────────────────────
  "Stage chez Delia": `
    <p>Stage de développement web chez <strong>Delia Technologies</strong> (ESN nantaise, 60 collaborateurs) du 12/05 au 20/06/2025. Intégré à l'équipe dev sur l'application <strong>Give-me-five</strong> — outil RH de gestion des propositions contractuelles. Tuteur : Gilles Huet.</p>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🚀 C5 — Preuves : Développement et mise à disposition du service
      </p>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #ce93d8;margin-bottom:10px;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 10px;">📸 Interface Give-me-five — Nouveaux statuts ajoutés (Recrutée / Abandonnée)</p>
        <img
          src="./img/interface_delia.png"
          alt="Interface Give-me-five — tableau candidats avec statuts Recrutée, Abandonnée, Acceptée et menu déroulant"
          style="width:100%;max-width:680px;border-radius:8px;border:1px solid var(--jet);display:block;margin-bottom:12px;"
          onerror="this.style.display='none';this.nextElementSibling.style.display='block'"
        />
        <div style="display:none;"></div>
        <ul style="color:var(--light-gray);font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
          <li>Ajout du statut <strong>Recrutée</strong> — différenciation missions temporaires / contrats spécifiques</li>
          <li>Ajout du statut <strong>Abandonnée</strong> — propositions annulées ou obsolètes</li>
          <li>Modification de la BDD PostgreSQL pour intégrer les nouveaux statuts</li>
          <li>Mise à jour du fichier <code>fr.json</code> pour la traduction des labels</li>
        </ul>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Rapport de stage p.9 — Missions réalisées</p>
      </div>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #ce93d8;margin-bottom:10px;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 8px;">📸 Résultats des tests Vitest — 9 fichiers, 20 tests passés ✅</p>
        <div style="background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#56d364;line-height:1.7;">
          Test Files &nbsp;<span style="color:#56d364;font-weight:bold;">9 passed (9)</span><br>
          Tests &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#56d364;font-weight:bold;">20 passed (20)</span><br>
          Start at &nbsp;&nbsp;&nbsp;16:29:14<br>
          Duration &nbsp;&nbsp;&nbsp;13.38s (transform 6.29s, setup 53.89s, collect 7.85s)<br>
          <span style="color:#79c0ff;">PASS</span> Waiting for file changes...
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Rapport de stage p.15 — Tests effectués sur 9 composants</p>
      </div>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #ce93d8;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 8px;">📸 Processus de déploiement — pipeline de validation</p>
        <div style="background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.9;">
          <span style="color:#f0883e;">1.</span> Développement sur branche dédiée<br>
          <span style="color:#f0883e;">2.</span> Push sur Git<br>
          <span style="color:#f0883e;">3.</span> Merge Request — relecture par un pair expérimenté<br>
          <span style="color:#f0883e;">4.</span> Merge — intégration dans la branche principale<br>
          <span style="color:#56d364;">5.</span> <strong style="color:#56d364;">Déploiement en recette ✓</strong>
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Rapport de stage p.15 — Livrables produits</p>
      </div>
    </div>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🧪 C4 — Preuves : Travail en mode projet agile
      </p>
      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #ffb300;">
        <ul style="color:var(--light-gray);font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
          <li>Analyse des objectifs du projet Give-me-five avant développement</li>
          <li>Point quotidien en fin de journée pour présenter les avancées</li>
          <li>Code review obligatoire via Merge Request avant intégration</li>
          <li>Communication via <strong>Slack</strong> — canaux techniques dédiés</li>
          <li>Stack : <strong>Node.js</strong>, <strong>Nuxt.js</strong>, <strong>TypeScript</strong>, <strong>PostgreSQL</strong>, <strong>Docker</strong></li>
        </ul>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Rapport de stage p.16 — Méthodologies et pratiques professionnelles</p>
      </div>
    </div>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        📈 C6 — Preuves : Développement professionnel
      </p>
      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #80cbc4;">
        <ul style="color:var(--light-gray);font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
          <li>Autoformation JavaScript, TypeScript, Node.js, Nuxt.js, Docker en autonomie</li>
          <li>Veille via documentation officielle, StackOverflow, YouTube, OpenClassroom</li>
          <li>Intégration dans une équipe professionnelle — télétravail le mercredi</li>
          <li>Développement de l'autonomie et de la résolution de problèmes complexes</li>
        </ul>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Rapport de stage p.17-18 — Bilan et compétences acquises</p>
      </div>
    </div>
  `,

  // ─────────────────────────────────────────
  // SITE WEB RESTAURANT
  // ─────────────────────────────────────────
  "Site Web Restaurant": `
    <p>Développement d\'un site web restaurant en <strong>PHP / MySQL</strong> en méthode Scrum. Architecture MVC, gestion via tickets GitLab, Daily Scrum et attribution des tâches par itération.</p>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🔒 C1 — Preuves : Architecture MVC + Modélisation BDD
      </p>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #4fc3f7;margin-bottom:10px;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 10px;">📸 Arborescence projet PHP — Architecture MVC (NetBeans)</p>
        <img
          src="./img/structure_resto.png"
          alt="Arborescence projet PHP Site Resto — controleur, modele, vue, sql, tests"
          style="width:100%;max-width:300px;border-radius:8px;border:1px solid var(--jet);display:block;"
          onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"
        />
        <div style="display:none;background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;">
          PhpProjectSiteRestoInitial/<br>
          ├── controleur/ &nbsp;├── modele/ &nbsp;├── vue/<br>
          ├── css/ &nbsp;├── sql/ &nbsp;├── tests/<br>
          └── index.php, getRacine.php, .gitignore, README.md
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Architecture MVC stricte — séparation contrôleur / modèle / vue avec scripts SQL versionnés</p>
      </div>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #4fc3f7;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 10px;">📸 Schéma BDD complet — 8 tables avec relations (phpMyAdmin)</p>
        <img
          src="./img/bdd_resto.png"
          alt="Schéma BDD resto2 — tables resto, utilisateur, reservation, critiquer, aimer, horaire, photo, type_cuisine"
          style="width:100%;max-width:680px;border-radius:8px;border:1px solid var(--jet);display:block;"
          onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"
        />
        <div style="display:none;background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;">
          resto → idR, nomR, adresse, GPS, description<br>
          utilisateur → idU, mail, mdp, pseudo, role (Utilisateur/Admin/Modérateur)<br>
          reservation → id, nom_prenom, mail, telephone, date_heure, nb_personnes<br>
          critiquer → idR + idU (note, commentaire)<br>
          aimer, horaire, photo, type_cuisine, resto_type_cuisine
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">8 tables liées — gestion des rôles (Utilisateur / Admin / Modérateur), réservations, avis, horaires</p>
      </div>
    </div>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🐛 C2 — Preuves : Gestion des tickets d\'amélioration GitLab
      </p>
      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #ef9a9a;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 10px;">📸 Board GitLab — Tableau des tickets (Hozura / P1_G6_SiteResto2025)</p>
        <img
          src="./img/tab_ticket_resto.png"
          alt="Board GitLab Site Resto — tickets par itération Ouvert / En cours / Closed"
          style="width:100%;max-width:680px;border-radius:8px;border:1px solid var(--jet);display:block;margin-bottom:12px;"
          onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"
        />
        <div style="display:none;"></div>
        <ul style="color:var(--light-gray);font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
          <li>Itération 3 — #16 : Afficher les catégories <span style="color:#ef9a9a;">(complexe)</span> → <span style="color:#56d364;">Closed ✓</span></li>
          <li>Itération 3 — #15 : Création des requêtes préparées <span style="color:#ffb300;">(complexité normale)</span> → <span style="color:#56d364;">Closed ✓</span></li>
          <li>Itération 3 — #14 : Ajout d\'une table de catégories <span style="color:#a5d6a7;">(peu complexe)</span> → <span style="color:#56d364;">Closed ✓</span></li>
          <li>Itération 2 — #13 : Recherche multiple non fonctionnelle → <span style="color:#56d364;">Closed ✓</span></li>
        </ul>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Tous les tickets fermés — 0 ouvert, 0 en cours en fin de sprint</p>
      </div>
    </div>
  `,

  // ─────────────────────────────────────────
  // STAGE DAKILAB
  // ─────────────────────────────────────────
  "Stage chez Dakilab": `
    <p>Stage Dev FullStack chez <strong>Dakilab</strong> (studio de création numérique, Nantes) du 05/01 au 12/02/2026. Projet : plateforme web <strong>"L'islam dans l'histoire"</strong>, commanditée par la Mosquée de Nantes. Stack : Angular · NestJS · MongoDB · AdminJS. Tuteur : Abdellatif El Maknati.</p>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🌐 C3 — Preuves : Présence numérique et valorisation de l'image
      </p>
      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #a5d6a7;margin-bottom:10px;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 10px;">📸 Interface "L'islam dans l'histoire" — plateforme pédagogique en ligne</p>
        <img
          src="./img/interface_dakilab.png"
          alt="Interface L'islam dans l'histoire — navigation Accueil, Episodes, Quiz, Outils, A propos, Contact"
          style="width:100%;max-width:680px;border-radius:8px;border:1px solid var(--jet);display:block;margin-bottom:12px;"
          onerror="this.style.display='none';this.nextElementSibling.style.display='block'"
        />
        <div style="display:none;"></div>
        <ul style="color:var(--light-gray);font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
          <li>Plateforme web SPA (Single Page App) destinée au grand public, étudiants et chercheurs</li>
          <li>Navigation : Accueil · Episodes · Quiz · Outils · A propos · Contact</li>
          <li>Respect du cadre juridique : protection des données (RGPD), sécurisation Captcha</li>
          <li>Valorisation de l'image de l'organisation via un design professionnel et un contenu éditorial structuré</li>
        </ul>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Rapport de stage p.5-6 — Contexte du stage</p>
      </div>

      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #a5d6a7;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 8px;">🔒 Sécurisation Captcha — protection des formulaires contre le spam</p>
        <div style="background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;overflow-x:auto;">
          <span style="color:#ff7b72;">private async</span> <span style="color:#d2a8ff;">verifyCaptcha</span>(token: string): Promise&lt;boolean&gt; {<br>
          &nbsp;&nbsp;<span style="color:#8b949e;">// Validation côté backend via Google reCAPTCHA ou Cloudflare Turnstile</span><br>
          &nbsp;&nbsp;const provider = process.env.CAPTCHA_PROVIDER || <span style="color:#a5d6ff;">'google'</span>;<br>
          &nbsp;&nbsp;<span style="color:#8b949e;">// Token validé avant persistance en base — fail closed en cas d'erreur</span><br>
          &nbsp;&nbsp;<span style="color:#ff7b72;">return</span> !!resp?.data?.success;<br>
          }
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Rapport de stage p.9-10 — Protection contre le spam</p>
      </div>
    </div>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🔒 C1 — Preuves : Gestion du patrimoine informatique
      </p>
      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #4fc3f7;">
        <p style="font-size:12px;color:var(--light-gray70);margin:0 0 8px;">Variables d'environnement — sécurisation des accès AdminJS</p>
        <div style="background:#0d1117;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:#79c0ff;line-height:1.7;overflow-x:auto;">
          <span style="color:#8b949e;">// Identifiants extraits du code source → fichier .env non versionné</span><br>
          const adminPassword = configService.get&lt;string&gt;(<span style="color:#a5d6ff;">'ADMIN_PASSWORD'</span>);<br>
          const adminLogin = configService.get&lt;string&gt;(<span style="color:#a5d6ff;">'ADMIN_LOGIN'</span>);<br>
          <span style="color:#8b949e;">// Mot de passe jamais "en clair" dans le dépôt Bitbucket ✓</span>
        </div>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Rapport de stage p.8-9 — Gestion des variables d'environnement</p>
      </div>
    </div>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        🧪 C4 — Preuves : Travail en mode projet agile (Kanban / Trello)
      </p>
      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #ffb300;">
        <ul style="color:var(--light-gray);font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
          <li><strong>Morning Call</strong> quotidien — définition des objectifs, priorisation Trello, levée des blocages</li>
          <li><strong>Evening Check</strong> quotidien — revue des avancées, validation des fonctionnalités</li>
          <li>Suivi Kanban sur <strong>Trello</strong> : À faire → En cours → En revue → Terminé</li>
          <li>Pull Requests sur <strong>Bitbucket</strong> — code review systématique par Abdellatif El Maknati</li>
          <li>Une dizaine de PR validées et mergées sur la durée du stage</li>
        </ul>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Rapport de stage p.7-8 — Organisation et méthodologie de travail</p>
        <p style="font-size:11px;color:var(--light-gray70);margin:4px 0 0;">Trello non accessible actuellement — suivi documenté dans le rapport de stage</p>
      </div>
    </div>

    <div style="margin:16px 0;">
      <p style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--orange-yellow-crayola);margin:0 0 10px;font-weight:600;">
        📈 C6 — Preuves : Développement professionnel
      </p>
      <div style="background:var(--eerie-black2);border-radius:10px;padding:14px;border-left:3px solid #80cbc4;">
        <ul style="color:var(--light-gray);font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
          <li>Autoformation Angular, NestJS, TypeScript, MongoDB, Leaflet en distanciel</li>
          <li>Veille technologique : comparaison Google Maps / Mapbox / Leaflet → préconisation Leaflet (open source, léger)</li>
          <li>Prototypage Leaflet isolé (HTML/JS) avant intégration Angular — méthode de validation technique</li>
          <li>Identité professionnelle : intégration dans une agence web, travail en autonomie totale</li>
        </ul>
        <p style="font-size:11px;color:var(--light-gray70);margin:8px 0 0;">Source : Rapport de stage p.16-17 — Compétences acquises et bilan</p>
      </div>
    </div>
  `,
};

function creerModalProjet() {
  if (document.getElementById('projet-modal-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'projet-modal-overlay';
  overlay.style.cssText = `
    display:none; position:fixed; inset:0; background:rgba(0,0,0,0.75);
    z-index:9999; overflow-y:auto; padding:20px;
    backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
    animation: fadeInOverlay .2s ease;
  `;

  overlay.innerHTML = `
    <style>
      @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
      @keyframes slideUpModal  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
      #projet-modal { animation: slideUpModal .25s ease; }
      .comp-detail-card { transition: transform .2s, box-shadow .2s; }
      .comp-detail-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
    </style>
    <div id="projet-modal" style="
      background:var(--eerie-black1); border-radius:20px; max-width:780px;
      margin:0 auto; overflow:hidden; border:1px solid var(--jet);
      box-shadow:0 25px 60px rgba(0,0,0,0.5);
    ">
      <!-- HEADER -->
      <div id="pm-header" style="
        background:linear-gradient(135deg,var(--eerie-black2),var(--jet));
        padding:28px 28px 20px; position:relative;
        border-bottom:1px solid var(--jet);
      ">
        <button id="pm-close" style="
          position:absolute; top:16px; right:16px;
          background:var(--eerie-black1); border:1px solid var(--jet);
          border-radius:50%; width:34px; height:34px;
          color:var(--light-gray); font-size:18px; cursor:pointer;
          display:flex; align-items:center; justify-content:center; line-height:1;
          transition:all .2s;
        " onmouseover="this.style.background='var(--orange-yellow-crayola)';this.style.color='var(--eerie-black1)'"
           onmouseout="this.style.background='var(--eerie-black1)';this.style.color='var(--light-gray)'">
          ×
        </button>
        <p id="pm-periode" style="font-size:12px;color:var(--vegas-gold);margin:0 0 8px;letter-spacing:.05em;"></p>
        <h2 id="pm-titre" style="font-size:22px;color:var(--white2);margin:0 0 12px;font-family:var(--ff-poppins);font-weight:600;"></h2>
        <div id="pm-techs" style="display:flex;flex-wrap:wrap;gap:6px;"></div>
      </div>

      <!-- BODY -->
      <div style="padding:24px 28px; display:flex; flex-direction:column; gap:24px;">

        <!-- PRÉSENTATION -->
        <section>
          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:var(--orange-yellow-crayola);margin:0 0 12px;display:flex;align-items:center;gap:8px;">
            <ion-icon name="document-text-outline"></ion-icon> Présentation
          </h3>
          <div id="pm-desc" style="color:var(--light-gray);font-size:14px;line-height:1.8;"></div>
        </section>

        <!-- COMPÉTENCES E4 -->
        <section>
          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:var(--orange-yellow-crayola);margin:0 0 14px;display:flex;align-items:center;gap:8px;">
            <ion-icon name="school-outline"></ion-icon> Compétences E4 mobilisées
          </h3>
          <div id="pm-comps" style="display:flex;flex-direction:column;gap:10px;"></div>
        </section>

        <!-- PDF -->
        <section id="pm-pdf-section">
          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:var(--orange-yellow-crayola);margin:0 0 12px;display:flex;align-items:center;gap:8px;">
            <ion-icon name="attach-outline"></ion-icon> Document de présentation
          </h3>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <a id="pm-pdf-link" href="#" target="_blank" rel="noopener noreferrer" style="
              display:inline-flex;align-items:center;gap:8px;
              background:var(--jet);color:var(--white2);
              padding:10px 18px;border-radius:12px;font-size:14px;
              text-decoration:none;border:1px solid var(--border-gradient-onyx);
              transition:all .2s;font-family:var(--ff-poppins);
            " onmouseover="this.style.background='var(--orange-yellow-crayola)';this.style.color='var(--eerie-black1)';this.style.borderColor='var(--orange-yellow-crayola)'"
               onmouseout="this.style.background='var(--jet)';this.style.color='var(--white2)';this.style.borderColor='var(--border-gradient-onyx)'">
              <ion-icon name="document-outline" style="font-size:18px;"></ion-icon>
              Voir le PDF
            </a>
            <a id="pm-pdf-dl" href="#" download style="
              display:inline-flex;align-items:center;gap:8px;
              background:transparent;color:var(--light-gray);
              padding:10px 18px;border-radius:12px;font-size:14px;
              text-decoration:none;border:1px solid var(--jet);
              transition:all .2s;font-family:var(--ff-poppins);
            " onmouseover="this.style.borderColor='var(--light-gray)';this.style.color='var(--white2)'"
               onmouseout="this.style.borderColor='var(--jet)';this.style.color='var(--light-gray)'">
              <ion-icon name="download-outline" style="font-size:18px;"></ion-icon>
              Télécharger
            </a>
          </div>
          <p id="pm-pdf-note" style="font-size:12px;color:var(--light-gray70);margin:10px 0 0;display:none;">
            ⚠️ Aucun PDF configuré pour ce projet. Ajoute le chemin dans <code>PROJET_PDF</code>.
          </p>
        </section>

      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('pm-close').addEventListener('click', fermerModalProjet);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) fermerModalProjet();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') fermerModalProjet();
  });
}

function ouvrirModalProjet(titre) {
  const data = PROJET_COMPETENCES[titre];
  if (!data) return;

  creerModalProjet();

  // Header
  document.getElementById('pm-titre').textContent = titre;
  document.getElementById('pm-periode').textContent = '📅 ' + data.periode;

  // Techs
  const techsEl = document.getElementById('pm-techs');
  techsEl.innerHTML = data.techs.map(t => `
    <span style="background:rgba(255,179,0,0.15);color:var(--orange-yellow-crayola);
      border:1px solid rgba(255,179,0,0.3);border-radius:20px;font-size:12px;
      padding:3px 10px;font-family:var(--ff-poppins);">${t}</span>
  `).join('');

  // Description longue
  document.getElementById('pm-desc').innerHTML =
    PROJET_DETAILS[titre] || `<p>${data.desc}</p>`;

  // Compétences E4
  const compsEl = document.getElementById('pm-comps');
  const compsActives = Object.entries(data.competences).filter(([, v]) => v);
  compsEl.innerHTML = compsActives.length
    ? compsActives.map(([key, val]) => `
        <div class="comp-detail-card" style="
          background:var(--eerie-black2);border-radius:12px;
          border-left:3px solid ${COMP_COLORS[key]};
          padding:12px 16px; display:flex; gap:12px; align-items:flex-start;
        ">
          <span style="
            background:${COMP_COLORS[key]}22;color:${COMP_COLORS[key]};
            border:1px solid ${COMP_COLORS[key]}55;border-radius:8px;
            font-size:12px;font-weight:700;padding:4px 8px;
            font-family:var(--ff-poppins);white-space:nowrap;flex-shrink:0;
          ">${key}</span>
          <div>
            <p style="color:var(--white2);font-size:13px;font-weight:500;margin:0 0 3px;font-family:var(--ff-poppins);">
              ${COMP_LABELS[key]}
            </p>
            <p style="color:var(--light-gray70);font-size:13px;margin:0;line-height:1.6;">${val}</p>
          </div>
        </div>
      `).join('')
    : `<p style="color:var(--light-gray70);font-size:14px;">Aucune compétence E4 renseignée.</p>`;

  // PDF
  const pdfPath = PROJET_PDF[titre];
  const pdfNote = document.getElementById('pm-pdf-note');
  const pdfLink = document.getElementById('pm-pdf-link');
  const pdfDl   = document.getElementById('pm-pdf-dl');

  if (pdfPath) {
    pdfLink.href = pdfPath;
    pdfDl.href   = pdfPath;
    pdfNote.style.display = 'none';
    pdfLink.style.opacity = '1'; pdfLink.style.pointerEvents = 'auto';
    pdfDl.style.opacity   = '1'; pdfDl.style.pointerEvents   = 'auto';
  } else {
    pdfLink.href = '#'; pdfDl.href = '#';
    pdfNote.style.display = 'block';
    pdfLink.style.opacity = '0.4'; pdfLink.style.pointerEvents = 'none';
    pdfDl.style.opacity   = '0.4'; pdfDl.style.pointerEvents   = 'none';
  }

  // Afficher
  const overlay = document.getElementById('projet-modal-overlay');
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function fermerModalProjet() {
  const overlay = document.getElementById('projet-modal-overlay');
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
}

window.ouvrirModalProjet = ouvrirModalProjet;

// ======================
// VEILLE TECHNO — FLUX RSS LIVE
// ======================

const RSS_PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';

const RSS_FEEDS = [
  { url: 'https://feeds.feedburner.com/TechCrunch/artificial-intelligence', nom: 'TechCrunch AI', couleur: '#00D4FF' },
  { url: 'https://www.lemonde.fr/intelligence-artificielle/rss_full.xml', nom: 'Le Monde IA', couleur: '#ffb300' },
  { url: 'https://hnrss.org/frontpage', nom: 'Hacker News', couleur: '#ff6600' },
];

let articlesMemorise = [];
let feedActif = 'tous';

async function fetchRSSFeed(feed) {
  try {
    const res = await fetch(RSS_PROXY + encodeURIComponent(feed.url));
    const data = await res.json();
    if (data.status !== 'ok') return [];
    return (data.items || []).slice(0, 6).map(item => ({
      titre: item.title || 'Sans titre',
      lien: item.link || '#',
      desc: item.description ? item.description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 160) : '',
      date: item.pubDate || '',
      feedNom: feed.nom,
      feedCouleur: feed.couleur,
    }));
  } catch(e) { return []; }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  const diff = (Date.now() - d) / 1000;
  if (diff < 3600) return Math.round(diff / 60) + ' min';
  if (diff < 86400) return Math.round(diff / 3600) + ' h';
  if (diff < 86400 * 7) return Math.round(diff / 86400) + ' j';
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function renderVeille(articles) {
  const container = document.getElementById('rss-veille-container');
  if (!container) return;

  if (!articles.length) {
    container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--light-gray70);">
      <ion-icon name="wifi-outline" style="font-size:48px;color:var(--orange-yellow-crayola);"></ion-icon>
      <p style="margin-top:15px;">Aucun article. Cliquez sur Actualiser.</p></div>`;
    return;
  }

  const filtres = ['tous', ...new Set(articles.map(a => a.feedNom))];
  const affichage = feedActif === 'tous' ? articles : articles.filter(a => a.feedNom === feedActif);

  let html = `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
    ${filtres.map(f => `<button onclick="window._setFeedActif('${f}')" style="
      background:${feedActif === f ? 'var(--orange-yellow-crayola)' : 'var(--jet)'};
      color:${feedActif === f ? 'var(--eerie-black1)' : 'var(--light-gray)'};
      border:none;border-radius:20px;padding:5px 14px;font-size:13px;
      cursor:pointer;font-family:var(--ff-poppins);">${f === 'tous' ? '🌐 Tous' : f}</button>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">`;

  affichage.forEach(a => {
    html += `<div style="background:var(--eerie-black2);border-radius:14px;border:1px solid var(--jet);
      padding:18px;transition:all .3s;display:flex;flex-direction:column;justify-content:space-between;"
      onmouseover="this.style.borderColor='var(--orange-yellow-crayola)';this.style.transform='translateY(-3px)'"
      onmouseout="this.style.borderColor='var(--jet)';this.style.transform='translateY(0)'">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
          <span style="background:${a.feedCouleur}22;color:${a.feedCouleur};border:1px solid ${a.feedCouleur}44;
            border-radius:20px;font-size:11px;padding:2px 10px;">${a.feedNom}</span>
          <span style="color:var(--light-gray70);font-size:12px;">${formatDate(a.date)}</span>
        </div>
        <h4 style="color:var(--white2);font-size:14px;line-height:1.5;margin-bottom:10px;font-family:var(--ff-poppins);">${a.titre}</h4>
        ${a.desc ? `<p style="color:var(--light-gray70);font-size:13px;line-height:1.6;margin-bottom:12px;">${a.desc}…</p>` : ''}
      </div>
      <a href="${a.lien}" target="_blank" rel="noopener noreferrer" style="
        display:inline-flex;align-items:center;gap:6px;background:var(--jet);color:var(--white2);
        padding:7px 14px;border-radius:20px;font-size:13px;text-decoration:none;align-self:flex-start;
        transition:all .2s;font-family:var(--ff-poppins);"
        onmouseover="this.style.background='var(--orange-yellow-crayola)';this.style.color='var(--eerie-black1)'"
        onmouseout="this.style.background='var(--jet)';this.style.color='var(--white2)'">
        Lire l'article <ion-icon name="arrow-forward-outline" style="font-size:12px;"></ion-icon>
      </a>
    </div>`;
  });

  html += `</div>
    <div style="margin-top:20px;padding:12px 16px;background:var(--jet);border-radius:10px;
      display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
      <span style="color:var(--light-gray);font-size:13px;">
        <ion-icon name="stats-chart-outline" style="color:var(--orange-yellow-crayola);vertical-align:middle;margin-right:6px;"></ion-icon>
        <strong>${affichage.length}</strong> articles sur <strong>${articles.length}</strong>
      </span>
      <span style="color:var(--light-gray70);font-size:12px;display:flex;align-items:center;gap:5px;">
        <ion-icon name="time-outline" style="font-size:13px;"></ion-icon>
        Mis à jour : <strong style="color:var(--orange-yellow-crayola);margin-left:4px;">
          ${new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</strong>
      </span>
    </div>`;

  container.innerHTML = html;
}

window._setFeedActif = function(nom) { feedActif = nom; renderVeille(articlesMemorise); };

async function chargerVeilleTechno() {
  const container = document.getElementById('rss-veille-container');
  if (!container) return;
  container.innerHTML = `<div style="text-align:center;padding:50px 20px;color:var(--light-gray70);">
    <ion-icon name="sync-outline" style="font-size:40px;color:var(--orange-yellow-crayola);animation:spin 1s linear infinite;"></ion-icon>
    <p style="margin-top:15px;font-size:14px;">Chargement des flux RSS…</p></div>
    <style>@keyframes spin{to{transform:rotate(360deg);}}</style>`;

  const results = await Promise.all(RSS_FEEDS.map(fetchRSSFeed));
  articlesMemorise = results.flat().sort((a, b) => new Date(b.date) - new Date(a.date));
  feedActif = 'tous';
  renderVeille(articlesMemorise);
}

window.chargerVeilleTechno = chargerVeilleTechno;

// ======================
// INIT
// ======================

document.addEventListener('DOMContentLoaded', function() {
  injecterBadgesCompetences();

  document.querySelectorAll('[data-page]').forEach(p => {
    compObserver.observe(p, { attributes: true, attributeFilter: ['class'] });
  });

  const refreshBtn = document.getElementById('refresh-veille-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', function() {
      const icon = this.querySelector('ion-icon');
      if (icon) { icon.style.animation = 'spin 0.8s linear infinite'; setTimeout(() => { icon.style.animation = ''; }, 1500); }
      chargerVeilleTechno();
    });
  }

  const archiveBtn = document.getElementById('archive-btn');
  if (archiveBtn) {
    archiveBtn.addEventListener('click', function() {
      articlesMemorise.length ? renderVeille(articlesMemorise) : chargerVeilleTechno();
    });
  }

  if (document.querySelector('[data-page="blog"].active')) {
    setTimeout(chargerVeilleTechno, 200);
  }
});

// Liens externes → nouvel onglet
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (link && link.href && link.href !== '#' && !link.getAttribute('target') && link.href.startsWith('http')) {
    e.preventDefault();
    window.open(link.href, '_blank');
  }
});
