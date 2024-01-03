import { ref,computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', ()=>{

    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const router = useRouter()

    const errorMsg = ref('')
    const errorCodes = {
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/invalid-credential': 'Credenciales inválidas',
        'auth/wrong-password': 'Password incorrecto',
      };

    onMounted(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                authUser.value = user
            }
        })
    })

    const login = ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                const user = userCredential.user
                authUser.value = user
                router.push({name:'admin-propiedades'})
            })
            .catch(error => {
                console.log(error)
                errorMsg.value = errorCodes[error.code]
            })

    }

    const logout = () => {
        signOut(auth).then(()=>{
            authUser.value = null
            router.push({name:'login'})
        }).catch(error => {
            console.log(error)
        })
    }

    const hasError = computed(()=>{
        return errorMsg.value
    })

    const isAuth = computed(()=>{
        return authUser.value
    })


    return {
        login,
        logout,
        hasError,
        errorMsg,
        isAuth
    }
})