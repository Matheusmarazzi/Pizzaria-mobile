import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {Feather} from "@expo/vector-icons";


interface ItemProps{
   data:{
    id:string;
    product_id:string;
    name:string;
    amount: string|number;
   }
   deleteItem: (item_id:string)=>void;


}
export function ListItem({data, deleteItem}:ItemProps){
    function handleDeleteItem() {
        deleteItem(data.id) 
    }
    return(
        <View style={styles.container}>
            <Text style={styles.item}>{data.amount} - {data.name}</Text>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name="trash-2" size={28} color="#FF3F4b" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#101026",
        borderRadius:4,
        flex:1,
        alignItems:"center",
        justifyContent:'space-between',
        flexDirection:'row',
        marginBottom:12,
        paddingVertical:12,
        paddingHorizontal:12,
        borderWidth:0.3,
        borderColor:'#8f8f8f'
        
    },
    item:{
        color:"#FFF"
    }
})