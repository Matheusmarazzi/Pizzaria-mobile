import React , {useState, useContext} from "react";
import { Text, TouchableOpacity, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 

import { StackParamsList } from "../../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard(){

    const {signOut} = useContext(AuthContext)
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [number, setNumber] = useState('');
   



    async function openOrder(){
        if(number === ''){
            return
        }

        const response = await api.post('/order',{
            table:Number(number)
        })
        


        // fazer requisição e redirecionar
        navigation.navigate("Order", {
            number:number,
            order_id: response.data.id
        })
        setNumber('');

    }
    

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={signOut}>
                <AntDesign style={styles.loggout} name="logout" size={24} color="red" />
            </TouchableOpacity>
            <Text style={styles.title}>Novo Pedido</Text>
            


            <TextInput
                style={styles.input}
                placeholder="Numero da Mesa"
                placeholderTextColor="#F0f0f0"
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
            />
            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#1d1d2e",
        alignItems:'center',
        justifyContent:"center",
        paddingVertical:15,

    },
    title:{
        fontSize:30,
        fontWeight:"bold",
        color:'#FFF',
        marginBottom:24
    },
    input:{
        width:'90%',
        height:60,
        backgroundColor:"#101026",
        borderRadius:8,
        paddingHorizontal:8,
        textAlign:"center",
        fontSize:22,
        color:"#fff"
    },
    button:{
        width:"90%",
        height:40,
        backgroundColor:'#3fffa3',
        alignItems:'center',
        justifyContent:"center",
        borderRadius:4,
        marginVertical:18,

        
    },
    buttonText:{
        fontSize:18,
        color:'#101026',
        fontWeight:'bold'
    },
    loggout:{
        marginLeft:"80%"
    }



})