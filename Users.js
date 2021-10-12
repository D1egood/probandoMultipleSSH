import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';

const url='https://jsonplaceholder.typicode.com/users';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function Users(props) {

  const [user, setUser]=useState([]);

  const getName=async() =>{
    const response=await fetch(url);
    const users= await response.json();
    let Aux=[];
    users.map((item) => {
      let aux={
        id:item.id,
        title: item.name
      };
      Aux.push(aux);
    });
    setUser(Aux);
  };

  useEffect(()=>{
    getName();
  },[]);

  console.log('users', user);
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
  <View style={styles.container}><TouchableOpacity style={{
      alignContent:'center',
      backgroundColor: '#418998',
      padding: 28,
      marginHorizontal: 16,
      borderRadius: 20,
      }}onPress={() => {props.setUserState(false)}}><Text style={styles.title}>Regresar</Text></TouchableOpacity>
    {user.map(item => 
      <View style={styles.container}><TouchableOpacity style={styles.item}><Text style={styles.title}>{item.title}</Text></TouchableOpacity></View>)}
    
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    alignContent:'center',
    padding: 20,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#418998',
    padding: 30,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    textAlign:'center',
    fontSize: 20,
  },
});