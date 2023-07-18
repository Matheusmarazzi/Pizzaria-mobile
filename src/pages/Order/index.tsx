import React,{useEffect, useState} from 'react';
import {
    View,
    Text, 
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import {Feather,  FontAwesome} from '@expo/vector-icons';
import { ModalPicker } from '../../components/ModalPicker';
import { ListItem } from '../../components/ListItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

import { api } from '../../services/api';

type routeDetailParams = {
    Order:{
        number: string|number;
        order_id: string;
    }
}
type OrderRouteProps = RouteProp<routeDetailParams, 'Order'>

export type categoryProps ={
    id:string;
    name:string;

}
type productsProps = {
    id:string;
    name:string;
}
type ItensProps ={
    id:string;
    product_id:string;
    name:string;
    amount: string|number;

}


export default function Order(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const route = useRoute<OrderRouteProps>()

    const [category, setCategory] = useState<categoryProps[]|[]>([]);
    const [categorySelected, setCategorySelected] = useState<categoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);


    const [amount, setAmount] = useState('1');


    const [products, setProducts] = useState<productsProps[]|[]>([]);
    const [productSelected,setProductSelected] = useState<productsProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = useState(false);
    const [itens, setItens] = useState<ItensProps[]>([]);


    useEffect(()=>{
        async function loadInfo(){
            const response = await api.get('/category')
            setCategory(response.data)
            setCategorySelected(response.data[0])
        }
        loadInfo();
    }, [])

    useEffect(()=>{
        async function loadProducts() {
            const response = await api.get('/category/product',{
                params:{
                    category_id:categorySelected?.id
                }
                
            })
            setProducts(response.data);
            setProductSelected(response.data[0]);
        }
        loadProducts()

    }, [categorySelected])


    async function handleCloseOrder(){
        try{
            await api.delete('/order',{
                params:{
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack()
        }catch(err){
            console.log(err)
        }

    }
    function handleChangeCategory(item:categoryProps){
        setCategorySelected(item);
    }
    function handleChangeProduct(item:productsProps){
        setProductSelected(item);
    }
    async function handleAddItem(){
        const response = await api.post('/order/add',{
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount),
        })
        let data = {
            id:response.data.id,
            product_id:productSelected?.id as string,
            name:productSelected?.name as string,
            amount:amount,
        }
        setItens(oldArray => [...oldArray, data]);
    }
    async function handleDeleteItem(item_id:string){
        await api.delete('/order/remove',{
            params:{
                item_id:item_id
            }
        })
        let removeItem = itens.filter(item=>{
            return (item.id !== item_id);
        })
        setItens(removeItem);
    }
    function handleFinish(){
        navigation.navigate(
            'FinishOrder',{
             number:route.params.number,
             Order_id:route.params.order_id
            })
    }



    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                {itens.length === 0 &&(
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather style={{marginLeft:10}} name='trash-2' size={28} color="red"/>
                    </TouchableOpacity>
                )}
            </View>
            {category.length !== 0 && ( 
                <TouchableOpacity style={styles.input} onPress={()=>setModalCategoryVisible(true)}>
                    <Text style={{color:"#FFF"}} >{categorySelected?.name}</Text>
                </TouchableOpacity>
            )}

            {products.length !== 0&&(
                <TouchableOpacity style={styles.input} onPress={()=>setModalProductVisible(true)}>
                    <Text style={{color:"#FFF"}} >{productSelected?.name}</Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade:</Text>
                <TextInput
                 style={[styles.input, {width:"60%", textAlign:"center"}]} 
                 placeholderTextColor="#F0F0F0"
                 keyboardType='numeric'
                 value={amount}
                 onChangeText={setAmount}
                />
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
                    <FontAwesome  name='plus' size={20} color="#F0F0F0"/>
                </TouchableOpacity>
                    
                <TouchableOpacity 
                style={[styles.button, {opacity: itens.length ===0? 0.4 :1 } ]}
                onPress={handleFinish}
                disabled={itens.length ===0}
                >
                    <Text style={styles.buttonText}> Avançar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
            showsHorizontalScrollIndicator={false}
            style={{flex:1, marginTop:24}}
            data={itens}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=><ListItem data={item} deleteItem={handleDeleteItem}/>}
            />

            <Modal
            transparent={true}
            visible={modalCategoryVisible}
            animationType='fade'


            >
                <ModalPicker
                handleCloseModal={()=>setModalCategoryVisible(false)}
                options={category}
                selectedItem={handleChangeCategory}
                />
            </Modal>
            <Modal
            transparent={true}
            visible={modalProductVisible}
            animationType='fade'


            >
                <ModalPicker
                handleCloseModal={()=>setModalProductVisible(false)}
                options={products}
                selectedItem={handleChangeProduct}
                />
            </Modal>

        </View>

        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#1d1d2e",
        paddingVertical:"5%",
        paddingEnd:"4%",
        paddingStart:"4%"
    },
    header:{
        flexDirection:'row',
        marginBottom:12,
        alignItems:"center",
        marginTop:24

    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        color:"#fff",

    },
    input:{
        backgroundColor:'#101026',
        borderRadius:4,
        width:"100%",
        height:40,
        marginBottom:12,
        justifyContent:'center',
        paddingVertical:8,
        color:'#FFF',
        fontSize:20

    },
    qtdContainer:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between'
    },
    qtdText:{
        fontSize:20,
        fontWeight:'bold',
        color:"#FFF",

    },
    actions:{
        flexDirection:'row',
        width:"100%",
        justifyContent:'space-between',


    },
    buttonAdd:{
        backgroundColor:"#3fd1ff",
        borderRadius:4,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        width:'20%'
    },
    buttonText:{
        color:'#101026',
        fontWeight:'bold',
        
    },
    button:{
        backgroundColor:"#3fffa3",
        borderRadius:4,
        height:40,
        width:"75%",
        alignItems:'center',
        justifyContent:'center',
        
        

    }

})