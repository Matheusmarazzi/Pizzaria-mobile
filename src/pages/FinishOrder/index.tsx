import  React  from "react";
import {View, Text , StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type RouteDetailParams={
    FinishOrder:{
        number:number|string;
        Order_id:string;
    }
}
type FinishOrderRouteProps = RouteProp<RouteDetailParams, 'FinishOrder'>
 

export function FinishOrder(){

    const route = useRoute<FinishOrderRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    async function handleFinish(){
        try{
            await api.put('/order/send',{
                order_id: route.params?.Order_id

            })
            navigation.popToTop();
        }catch(err){
            console.log(err);
            console.log(route.params.Order_id);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.title}>Mesa {route.params?.number}</Text>
            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finaliza Pedido</Text>
                <FontAwesome name="cart-plus" size={30} color="#1d1d2e" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#1d1d2e",
        paddingVertical:"5%",
        paddingHorizontal:"4%",
        alignItems:'center',
        justifyContent:"center",

    },
    alert:{
        fontSize:20,
        color:"#FFF",
        marginBottom:12,
        fontWeight:"bold"

    },
    button:{
        backgroundColor:'#3fffa3',
        flexDirection:'row',
        width:'65%',
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,



    },
    textButton:{
        fontSize:18,
        marginRight: 8,
        fontWeight:'bold',
        color:"#1d1d2e"
    },
    title:{
        fontSize:30,
        fontWeight:"bold",
        color:"#FFF",
        marginBottom:12
    }

}) 