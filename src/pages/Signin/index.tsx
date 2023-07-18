import React,{useContext, useState} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator 
 } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';



export default function SignIn(){
    const {signIn, loadingAuth} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function handleLogin(){
        if(email === '' || password === ''){
            alert("preencha os campos")
            return
        }
        await signIn({email, password});
    }

    return(
        <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../../assets/logo.png')}
            
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Digite seu email'
                    placeholderTextColor='#FFF'
                    value={email}
                    onChangeText={setEmail}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder='Digite sua senha'
                    placeholderTextColor='#FFF'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}


                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color='#FFF'/>
                    ):(
                        <Text style={styles.textButton}>Acessar</Text>
                    )}
                    
                </TouchableOpacity>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1d1d2e'

    },
    logo:{
        marginBottom:18,
        width:'100%',
        height:100,
        
        

    },
    inputContainer:{
        width:'95%',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:32,
        paddingHorizontal:14

    },
    input:{
        width:'95%',
        height:40,
        backgroundColor:'#101026',
        marginBottom:12,
        borderRadius:4,
        paddingHorizontal:10,
        color:"white",
        
    },
    button:{
        width:'95%',
        height:40,
        backgroundColor:"#3FFFa3",
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center'

    },
    textButton:{
        fontSize:17,
        fontWeight:'bold',
        color:'#101026',
    }
})