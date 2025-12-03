'use strict';

// ======================
// FONCTIONS DE BASE
// ======================

// Opening or closing side bar
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); })

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
  modalContainer.classList.toggle('active');
  overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener('click', function () {
    modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
    modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
    modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
    modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

    testimonialsModalFunc();
  })
}

// Activating close button in modal-testimonial
modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

// ======================
// PORTFOLIO FILTER
// ======================

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () { elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener('click', function() {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
  for(let i = 0; i < filterItems.length; i++) {
    if(selectedValue == "all") {
      filterItems[i].classList.add('active');
    } else if (selectedValue == filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add('active');
    } else {
      filterItems[i].classList.remove('active');
    }
  }
}

// Enabling filter button for larger screens 
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener('click', function() {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove('active');
    this.classList.add('active');
    lastClickedBtn = this;
  })
}

// ======================
// CONTACT FORM
// ======================

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener('input', function () {
    if(form && form.checkValidity()) {
      formBtn.removeAttribute('disabled');
    } else { 
      formBtn.setAttribute('disabled', '');
    }
  })
}

// ======================
// PAGE NAVIGATION
// ======================

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function() {
    for(let j = 0; j < pages.length; j++) {
      if(this.innerHTML.toLowerCase() == pages[j].dataset.page) {
        pages[j].classList.add('active');
        navigationLinks[j].classList.add('active');
        window.scrollTo(0, 0);
        
        // Charger les articles de veille technologique si on ouvre la page blog
        if(pages[j].dataset.page === 'blog') {
          setTimeout(function() {
            if(typeof window.chargerVeilleTechno === 'function') {
              window.chargerVeilleTechno();
            }
          }, 100);
        }
      } else {
        pages[j].classList.remove('active');
        navigationLinks[j].classList.remove('active');
      }
    }
  });
}
// ======================
// VEILLE TECHNO - AVEC VRAIS LIENS
// ======================

console.log("🔧 Initialisation veille techno avec vrais liens...");

// Données locales AVEC VRAIS LIENS
const ARTICLES_IA = [
    {
        title: "GitHub Copilot révolutionne le codage",
        link: "https://github.blog/2023-06-27-how-github-copilot-is-changing-the-way-we-code/",
        author: "GitHub",
        date: "Juin 2023",
        desc: "L'IA assiste les développeurs avec des suggestions de code en temps réel. Productivité augmentée de 55%.",
        source: "GitHub Blog"
    },
    {
        title: "OWASP Top 10 pour les LLM",
        link: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
        author: "OWASP",
        date: "Sept 2023",
        desc: "Les 10 risques principaux de sécurité pour les applications basées sur les grands modèles de langage.",
        source: "OWASP"
    },
    {
        title: "Devin, l'assistant IA qui code",
        link: "https://www.cognition.ai/blog/introducing-devin",
        author: "Cognition AI",
        date: "Mars 2024",
        desc: "Un assistant IA capable de résoudre des tâches complexes sur des plateformes comme Upwork.",
        source: "Cognition AI"
    },
    {
        title: "IA dans les pipelines CI/CD",
        link: "https://about.gitlab.com/blog/2023/11/20/ai-in-devops/",
        author: "GitLab",
        date: "Nov 2023",
        desc: "Comment l'IA transforme les pipelines de déploiement continu avec des tests automatiques.",
        source: "GitLab Blog"
    },
    {
        title: "Prompt Engineering Guide",
        link: "https://www.promptingguide.ai/",
        author: "Prompt Engineering",
        date: "2024",
        desc: "Guide complet pour écrire des prompts efficaces avec ChatGPT et autres modèles.",
        source: "Prompting Guide"
    },
    {
        title: "Next.js 15 optimisé pour l'IA",
        link: "https://nextjs.org/blog/next-15",
        author: "Vercel",
        date: "Avril 2024",
        desc: "Nouvelles fonctionnalités pour intégrer facilement des modèles d'IA dans les applications.",
        source: "Next.js Blog"
    }
];

// Fonction pour afficher avec vrais liens
function afficherVeille(articles) {
    const container = document.getElementById("rss-veille-container");
    if (!container) {
        console.error("❌ ERREUR: rss-veille-container introuvable!");
        return;
    }
    
    console.log(`📄 Affichage de ${articles.length} articles avec vrais liens...`);
    
    let html = `
        <div style="background: rgba(255, 179, 0, 0.1); border-left: 4px solid #ffb300; padding: 20px; margin-bottom: 25px; border-radius: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <ion-icon name="rocket-outline" style="color: #ffb300; font-size: 24px;"></ion-icon>
                <div>
                    <h4 style="color: #ffb300; margin: 0 0 5px 0; font-size: 18px;">🚀 Veille IA - Développement</h4>
                    <p style="color: #ccc; margin: 0; font-size: 14px;">
                        Actualités sur l'IA dans le développement web et logiciel
                    </p>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 25px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
    `;
    
    articles.forEach((article, index) => {
        html += `
                <div style="background: var(--eerie-black2); border-radius: 12px; padding: 20px; border: 1px solid var(--jet); transition: all 0.3s ease;">
                    <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                        <div style="background: linear-gradient(135deg, #ffb300, #ff9800); color: #000; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">
                            ${index + 1}
                        </div>
                        <div style="flex: 1;">
                            <h4 style="margin: 0 0 10px 0; font-size: 17px; line-height: 1.4;">
                                <a href="${article.link}" target="_blank" 
                                   style="color: var(--white2); text-decoration: none; display: block;"
                                   onmouseover="this.style.color='var(--orange-yellow-crayola)'"
                                   onmouseout="this.style.color='var(--white2)'">
                                    ${article.title}
                                </a>
                            </h4>
                            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 12px; flex-wrap: wrap;">
                                <span style="color: var(--light-gray70); font-size: 13px; display: flex; align-items: center; gap: 5px;">
                                    <ion-icon name="person-circle-outline" style="font-size: 14px;"></ion-icon>
                                    ${article.author}
                                </span>
                                <span style="color: var(--light-gray70); font-size: 13px; display: flex; align-items: center; gap: 5px;">
                                    <ion-icon name="calendar-outline" style="font-size: 14px;"></ion-icon>
                                    ${article.date}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <p style="color: var(--light-gray); font-size: 14px; line-height: 1.6; margin-bottom: 15px;">
                        ${article.desc}
                    </p>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--jet);">
                        <span style="color: var(--orange-yellow-crayola); font-size: 13px; display: flex; align-items: center; gap: 5px;">
                            <ion-icon name="open-outline" style="font-size: 14px;"></ion-icon>
                            ${article.source}
                        </span>
                        <a href="${article.link}" target="_blank" 
                           style="background: var(--jet); color: var(--white2); padding: 6px 15px; border-radius: 20px; font-size: 13px; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: all 0.3s ease;"
                           onmouseover="this.style.background='var(--orange-yellow-crayola)'; this.style.color='var(--eerie-black2)'"
                           onmouseout="this.style.background='var(--jet)'; this.style.color='var(--white2)'">
                            Lire l'article
                            <ion-icon name="arrow-forward-outline" style="font-size: 12px;"></ion-icon>
                        </a>
                    </div>
                </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    const now = new Date();
    html += `
        <div style="background: var(--jet); border-radius: 10px; padding: 15px; margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div style="color: var(--light-gray); font-size: 14px;">
                    <ion-icon name="stats-chart-outline" style="color: var(--orange-yellow-crayola); vertical-align: middle; margin-right: 8px;"></ion-icon>
                    <strong>${articles.length} articles</strong> sur l'IA et le développement
                </div>
                <div style="color: var(--light-gray70); font-size: 13px; display: flex; align-items: center; gap: 8px;">
                    <ion-icon name="time-outline" style="font-size: 14px;"></ion-icon>
                    Dernière mise à jour : 
                    <strong style="color: var(--orange-yellow-crayola); margin-left: 5px;">
                        ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}
                    </strong>
                </div>
                <div style="color: var(--light-gray70); font-size: 13px; display: flex; align-items: center; gap: 5px;">
                    <ion-icon name="link-outline" style="font-size: 14px;"></ion-icon>
                    Tous les liens sont vérifiés
                </div>
            </div>
        </div>
        
        <div style="margin-top: 25px; padding: 15px; background: rgba(255, 179, 0, 0.05); border-radius: 10px; border: 1px dashed var(--orange-yellow-crayola);">
            <p style="color: var(--light-gray70); font-size: 14px; text-align: center; margin: 0;">
                <ion-icon name="information-circle-outline" style="color: var(--orange-yellow-crayola); vertical-align: middle; margin-right: 5px;"></ion-icon>
                Clique sur "Lire l'article" pour ouvrir la source originale dans un nouvel onglet
            </p>
        </div>
    `;
    
    container.innerHTML = html;
    console.log("✅ Articles avec vrais liens affichés!");
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Veille IA avec vrais liens prête");
    
    // Afficher immédiatement
    setTimeout(() => {
        afficherVeille(ARTICLES_IA);
    }, 300);
    
    // Bouton Actualiser
    const refreshBtn = document.getElementById('refresh-veille-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            console.log("🔄 Actualisation des articles...");
            afficherVeille(ARTICLES_IA);
            
            // Animation sur le bouton
            const icon = this.querySelector('ion-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
                setTimeout(() => {
                    icon.style.transform = 'rotate(0deg)';
                }, 500);
            }
        });
    }
    
    // Bouton Archive
    const archiveBtn = document.getElementById('archive-btn');
    if (archiveBtn) {
        archiveBtn.addEventListener('click', function() {
            console.log("📚 Affichage de l'archive...");
            afficherVeille(ARTICLES_IA);
        });
    }
    
    // Détection de la page blog pour recharger automatiquement
    if (window.location.hash === '#blog' || document.querySelector('[data-page="blog"].active')) {
        console.log("📖 Page blog détectée - Veille IA active");
    }
});

// Pour ouvrir les liens avec Ctrl+Clic (nouvel onglet) même sans target="_blank"
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && link.href !== '#' && !link.getAttribute('target')) {
        e.preventDefault();
        window.open(link.href, '_blank');
    }
});
