import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, updateProfile } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkPNfMfiDX4cBNEJ2ziOk8xXNmKddxcQk",
    authDomain: "seminario-site.firebaseapp.com",
    projectId: "seminario-site",
    storageBucket: "seminario-site.firebasestorage.app",
    messagingSenderId: "508924477713",
    appId: "1:508924477713:web:99bc6f568e6d26a4494cb0"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const authUid = getAuth()
const db = getFirestore(app)

function gerarCodigoAlfanumerico(tamanho) {
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var codigo = '';
    for (var i = 0; i < tamanho; i++) {
        var randomIndex = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[randomIndex];
    } return codigo;
}

function twoLogin() {
    var element1 = document.getElementById("two");
    element1.classList.remove("action");
    var element2 = document.getElementById("four");
    element2.classList.add("action");
}

function threeCadastro() {
    var element1 = document.getElementById("three");
    element1.classList.remove("action");
    var element2 = document.getElementById("four");
    element2.classList.add("action");
}

//Cria um card de sala
function fourcriarSala(nome, codigo, conteudo) {
    var novaDiv = document.createElement("div");
    novaDiv.className = "four-card";
    novaDiv.setAttribute("onclick", "fourentrarCard()");
    var titulo = document.createElement("h3");
    titulo.id = "four-name-card";
    titulo.textContent = nome;
    var paragrafo = document.createElement("p");
    paragrafo.textContent = codigo;
    novaDiv.appendChild(titulo);
    novaDiv.appendChild(paragrafo);
    var container = document.getElementById("four-cards-position");
    container.appendChild(novaDiv);
    novaDiv.addEventListener('click', (e) => {
        document.getElementById('five-name').innerHTML = nome
        document.getElementById('five-descricao').innerHTML = conteudo
        document.getElementById('five-code').innerHTML = codigo
    })
}

//Salva dados no banco (dados do usuário)
async function salvarDadosUser(uid, user, email) {
    try {
        const userRef = doc(db, 'users', uid)
        await setDoc(userRef, {
            username: user,
            email: email
        }).then((result) => {
            console.log(result)
        })
        alert('Dados cadastrados com sucesso!')
    } catch (error) {
        alert(error.message)
    }
}

//Salva dados no banco (dados das salas)
async function salvarDadosSalas(uid, nome, conteudo, criterios, codigo) {
    try {
        await setDoc(doc(db, 'users', uid, 'salas', codigo), {
            nome: nome,
            conteudo: conteudo,
            criterios: criterios,
            codigo: codigo
        }).then((result) => {
            fourcriarSala(nome, codigo, conteudo)
            console.log(result)
        })
        alert('Dados cadastrados com sucesso!')
    } catch (error) {
        alert(error.message)
    }
}

//Pega os dados das salas criadas e exibe na tela inicial, quando o usuário loga ou cadastra
async function getDadosSalas(uid) {
    try {
        const docRef = collection(db, 'users', uid, 'salas')
        const docSnap = await getDocs(docRef)
        docSnap.forEach(doc => {
            fourcriarSala(doc.data().nome, doc.data().codigo, doc.data().conteudo)
            console.log(doc.data())
        });
    } catch (error) {
        alert(error.message)
    }
}


//Pega dados do banco para exibir na home
async function getDados(uid, email) {
    try {
        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log(docSnap.data().username)
            var usernamePerfil = document.getElementById('usernamePerfil')
            var emailPerfil = document.getElementById('emailPerfil')
            emailPerfil.innerText = email
            usernamePerfil.innerText = docSnap.data().username
            document.getElementById('usernameFive').innerText = docSnap.data().username
            document.getElementById('emailFive').innerText = email
        } else {
            console.log('No data!')
        }
    } catch (error) {
        console.log(error)
    }
}

//Cadastro
const buttonCadastro = document.getElementById('buttonCadastro')
buttonCadastro.addEventListener('click', (e) => {
    e.preventDefault()
    const FormData = {
        email: document.getElementById('emailCadastro').value,
        username: document.getElementById('usernameCadastro').value,
        senha: document.getElementById('passwordCadastro').value
    };

    if (document.getElementById('emailCadastro').value != null || document.getElementById('usernameCadastro').value != null || document.getElementById('passwordCadastro').value != null) {
        createUserWithEmailAndPassword(auth, FormData.email, FormData.senha).
            then(data => {
                const uid = data.user.uid;
                const email = data.user.email;
                salvarDadosUser(uid, FormData.username, FormData.email)
                getDados(uid, email)
                //getDadosSalas(uid)
                threeCadastro()
                alert('Conta criada com sucesso!')
            }).catch(error => {
                if (error.code == 'auth/email-already-in-use') {
                    alert('Esse email já está em uso por outro usuário!')
                } else {
                    alert(error.message);
                }
            });
    } else {
        alert('Preencha todos os campos corretamente!');
    }
})

//Login
const buttonLogin = document.getElementById('buttonLogin')
buttonLogin.addEventListener('click', (e) => {
    e.preventDefault()
    const formData = {
        email: document.getElementById('emailLogin').value,
        password: document.getElementById('passwordLogin').value
    }

    if (formData.email != null || formData.password != null) {
        signInWithEmailAndPassword(auth, formData.email, formData.password).then((data) => {
            const uid = data.user.uid
            getDados(uid, formData.email)
            getDadosSalas(uid)
            twoLogin()
        }).catch((error) => {
            alert(error.message)
        })
    }
})

const buttonCriarSala = document.getElementById('criarSala')
buttonCriarSala.addEventListener('click', (e) => {
    e.preventDefault()
    const uid = authUid.currentUser.uid
    const nome = document.getElementById('name-class').value
    const conteudo = document.getElementById('Conteudo-seminario').value
    const criterios = document.getElementById('criterios-seminario').value
    const codigo = gerarCodigoAlfanumerico(8)
    salvarDadosSalas(uid, nome, conteudo, criterios, codigo)

})