// THEME TOGGLE

const toggle = document.getElementById("themeToggle")
const body = document.body
const particles = document.getElementById("particles-js")

toggle.onclick = () => {

body.classList.toggle("light")

particles.style.display = body.classList.contains("light") ? "none" : "block"

}



// HERO 3D

const container = document.getElementById("three-container")

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,1,0.1,1000)

const renderer = new THREE.WebGLRenderer({alpha:true})

renderer.setSize(300,300)

container.appendChild(renderer.domElement)

const geometry = new THREE.TorusKnotGeometry(1,0.3,100,16)

const material = new THREE.MeshNormalMaterial()

const knot = new THREE.Mesh(geometry,material)

scene.add(knot)

camera.position.z = 4


function animate(){

requestAnimationFrame(animate)

knot.rotation.x += 0.01
knot.rotation.y += 0.01

renderer.render(scene,camera)

}

animate()



// SKILLS SPHERE

const skillsContainer = document.getElementById("skills-3d")

const skillsScene = new THREE.Scene()

const skillsCamera = new THREE.PerspectiveCamera(
75,
window.innerWidth/400,
0.1,
1000
)

const skillsRenderer = new THREE.WebGLRenderer({alpha:true})

skillsRenderer.setSize(
skillsContainer.clientWidth,
skillsContainer.clientHeight
)
skillsContainer.appendChild(skillsRenderer.domElement)

const sphereGeometry = new THREE.SphereGeometry(0.9,32,32)

const sphereMaterial = new THREE.MeshStandardMaterial({
color:0x4f9cff,
wireframe:true,
emissive:0x1a3cff,
emissiveIntensity:0.7
})

const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)

skillsScene.add(sphere)

const light = new THREE.PointLight(0xffffff,1)

light.position.set(5,5,5)

skillsScene.add(light)

skillsCamera.position.z = 3


function animateSkills(){

requestAnimationFrame(animateSkills)

sphere.rotation.y += 0.003

skillsRenderer.render(skillsScene,skillsCamera)

}

animateSkills()



// PARTICLES

particlesJS("particles-js",{

particles:{

number:{value:40},
size:{value:3},
move:{speed:1},
line_linked:{enable:true,opacity:0.2}

}

})



// CONTACT FORM

const form = document.getElementById("contact-form")
const status = document.getElementById("form-status")

form.addEventListener("submit", async (e)=>{

e.preventDefault()

const data = new FormData(form)

const response = await fetch("https://formspree.io/f/mnjgpjzv",{

method:"POST",
body:data,
headers:{'Accept':'application/json'}

})

if(response.ok){

status.innerHTML="Message sent!"
form.reset()

}else{

status.innerHTML="Error sending message"

}

})



// LOADER

window.addEventListener("load",()=>{

const loader=document.getElementById("loader")

setTimeout(()=>{

loader.style.display="none"

},2000)

})
// FIREBASE CONFIG

const firebaseConfig = {
  apiKey: "AIzaSyA5GXKProO2Y-43qEG1HZbSz9LuN8_Ed98",
  authDomain: "vm-portfolio-474d9.firebaseapp.com",
  projectId: "vm-portfolio-474d9",
  storageBucket: "vm-portfolio-474d9.firebasestorage.app",
  messagingSenderId: "279286543003",
  appId: "1:279286543003:web:cf90d4c79753d502888c3e"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


// ELEMENTS

const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginSubmit = document.getElementById("loginSubmit");
const googleBtn = document.getElementById("googleLogin");

const registerLink = document.getElementById("openRegister");
const authTitle = document.getElementById("authTitle");
const authStatus = document.getElementById("authStatus");
const switchText = document.getElementById("switchText");

const profileMenu = document.getElementById("profileMenu");
const profileIcon = document.getElementById("profileIcon");
const dropdown = document.getElementById("dropdown");
const logoutBtn = document.getElementById("logoutBtn");


// OPEN / CLOSE MODAL

loginBtn.onclick = () => {
  modal.style.display = "flex";
};

closeAuth.onclick = () => {
  modal.style.display = "none";
};


// REGISTER MODE SWITCH

let isRegisterMode = false;

registerLink.onclick = () => {

  isRegisterMode = !isRegisterMode;

  if (isRegisterMode) {

    authTitle.innerText = "Register";
    loginSubmit.innerText = "Create Account";

    switchText.innerHTML =
      'Already have an account? <span id="openRegister" style="color:#4f9cff;cursor:pointer">Login</span>';

  } else {

    authTitle.innerText = "Login";
    loginSubmit.innerText = "Login";

    switchText.innerHTML =
      'Don\'t have an account? <span id="openRegister" style="color:#4f9cff;cursor:pointer">Register</span>';

  }

};


// EMAIL LOGIN / REGISTER

loginSubmit.onclick = async () => {

  const email = emailInput.value;
  const password = passwordInput.value;

  try {

    if (isRegisterMode) {

      await auth.createUserWithEmailAndPassword(email, password);

      authStatus.innerText = "Account created. Please login.";

      isRegisterMode = false;
      authTitle.innerText = "Login";
      loginSubmit.innerText = "Login";

    } else {

      await auth.signInWithEmailAndPassword(email, password);

      modal.style.display = "none";

    }

  } catch (err) {

    authStatus.innerText = err.message;

  }

};


// GOOGLE LOGIN

googleBtn.onclick = async () => {

  const provider = new firebase.auth.GoogleAuthProvider();

  try {

    await auth.signInWithPopup(provider);
    modal.style.display = "none";

  } catch (err) {

    authStatus.innerText = err.message;

  }

};


// AUTH STATE

auth.onAuthStateChanged(user => {

  if (user) {

    loginBtn.style.display = "none";
    profileMenu.style.display = "block";

    profileIcon.src =
      user.photoURL || "https://i.pravatar.cc/100";

  } else {

    loginBtn.style.display = "block";
    profileMenu.style.display = "none";

  }

});


// PROFILE DROPDOWN

profileIcon.onclick = () => {

  dropdown.style.display =
    dropdown.style.display === "flex" ? "none" : "flex";

};


// LOGOUT

logoutBtn.onclick = () => {
  auth.signOut();
};