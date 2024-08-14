
// dark mode - light mode
document.addEventListener('DOMContentLoaded', () => {
    const $html = document.querySelector('html');
    const $checkbox = document.querySelector('#switch');
    const $logo = document.querySelector('.logo .imglogo'); 

    function updateLogo() {
        if ($html.classList.contains('dark-mode')) {
            console.log('Modo escuro ativado');
            $logo.src = '../img/pactto-logo.svg'; 
        } else {
            console.log('Modo claro ativado');
            $logo.src = '../img/pactto black yellow-Photoroom.png'; 
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        $html.classList.add('dark-mode');
        $checkbox.checked = true;
    }

    updateLogo();

    $checkbox.addEventListener('change', () => {
        $html.classList.toggle('dark-mode');
        const currentTheme = $html.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        updateLogo();
    });
});




//menu toggle

const menuToggle = document.querySelector('.menuToggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.onclick = function() {
    menuToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
}

let menuList = document.querySelectorAll('.menulist li');
function activeLink(){
    menuList.forEach ((item) =>
    item.classList.remove('active'));
    this.classList.add('active')
}

menuList.forEach((item) =>
item.addEventListener('click', activeLink));




// do / done -- homepage

document.addEventListener('DOMContentLoaded', () => {
    const toggleLinks = document.querySelectorAll('.toggle-link');

    toggleLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 

            const href = link.getAttribute('href'); 
            const statusLink = link.closest('.dos').querySelector('.do');

            if (statusLink && statusLink.textContent.trim() === 'To do') {
                statusLink.textContent = 'Done';
                statusLink.classList.remove('do');
                statusLink.classList.add('done');
            }

            
            window.open(href, '_blank');
        });
    });
});

//upload

const form = document.querySelector("form"),
      fileInput = document.querySelector(".file-input"),
      progressArea = document.querySelector(".progress-area"),
      uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({target}) => {
  let file = target.files[0];
  if (file) {
    let fileName = file.name;
    if (fileName.length >= 12) {
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(file, fileName); // Pass the file object and name
  }
}

function uploadFile(file, name) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/upload.php");

  xhr.upload.addEventListener("progress", ({loaded, total}) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize = fileTotal < 1024 ? `${fileTotal} KB` : `${(loaded / (1024 * 1024)).toFixed(2)} MB`;
    
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    
    if (loaded === total) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });

  xhr.addEventListener("error", (e) => {
    console.error("Upload failed:", e);
  });

  let data = new FormData();
  data.append('file', file); // Append file to FormData

  xhr.send(data);
}
