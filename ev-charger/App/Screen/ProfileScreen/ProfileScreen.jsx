import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
  const {signOut, isSignedIn} = useAuth()
  const {user} = useUser();
  const [firstName, setFirstName] = useState('user?.firstName');
  const[lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if(!user) return;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  },[user])

  const onSaveUser = async() => {
    try {
      if(!firstName || !lastName) return;
      await user?.update({
        firstName,
        lastName
      });
    } catch(error){
      console.error(error);
    } finally {
      setEdit(false);
    }
  }

  const onCaptureImage = async () => {

  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

{user && (
  <View style={styles.card}>
    <TouchableOpacity onPress={onCaptureImage}>
      <Image source={{uri: user?.imageUrl}} style={styles.avatar}/>

      </TouchableOpacity>
    <View style={{flexDirection: 'row', gap: 6,}}>
      {edit ? (
        <View style={styles.editRow}>
          <TextInput placeholder='First Name' value={firstName || ''} onChangeText={setFirstName} style={{
            borderRadius: 8,borderColor: 'gray', borderWidth: 1, padding:8, width: 70, textAlign: 'center'
          }} />
          <TextInput placeholder='Last Name' value={lastName || ''} onChangeText={setLastName} style={{
            borderRadius: 8,borderColor: 'gray', borderWidth: 1, padding:8, width: 70, textAlign: 'center'
          }} />
        <TouchableOpacity onPress={onSaveUser}>
            <Ionicons name="checkmark-outline" size={24} color="black" />
             </TouchableOpacity>
             </View>
      ) : (
        <View style={styles.editRow}>
          <Text style={{fontSize: 22}}>{firstName} {lastName}</Text>
          <TouchableOpacity onPress={() => setEdit(true)}>
            <Ionicons name="create-outline" size={24} color="black" />
             </TouchableOpacity>
        </View>
      )}
    </View>
      <Text>{email}</Text>
      <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
    </View>
)}

      <Button title='Log out' onPress={() => signOut()}/>
      {!isSignedIn && (
        <Link href={"/ev-charger/App/Screen/LoginScreen/LoginScreen"} asChild>
        <Text>Login</Text>
        </Link>
      )}
    </View>
  )
}

const styles = StyleSheet.create({

headerContainer: {
  flexDirection: 'row',
  padding: 24,
  justifyContent: 'space-between',
  alignItems: 'center',
},
header : {
  fontFamily: 'Outfit',
  fontSize: 24,
  fontWeight: 'bold',
},
card: {
  backgroundColor: 'white',
  padding: 24,
  borderRadius: 8,
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  gap: 8,
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  margin: 24,
  alignItems: 'center',
},
avatar: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: 'gray',
},
editRow: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12
}

})