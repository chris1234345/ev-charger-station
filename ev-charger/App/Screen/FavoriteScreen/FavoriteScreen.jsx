import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Utils/Colors'
import { getFirestore } from 'firebase/firestore'
import { app } from '../../Utils/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import PlaceItem from '../HomeScreen/PlaceItem';

export default function FavoriteScreen() {
  const db = getFirestore(app);
  const {user}=useUser(); 
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    user&&getFav();
  },[user])
  const getFav=async() => {
    setLoading(true);
    setFavList([]);

    const q = query(collection(db, "ev-fav-place"), where("email", "==", user?.primaryEmailAddress?.emailAddress));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setFavList(favList=>[...favList, doc.data()]);
      setLoading(false);
    });
  }
  return (
    <View style={{marginBottom: 100}}>
      <Text style={{padding: 10, fontFamily: 'Outfit-medium', fontSize: 30}}>My Favorite Place</Text>
     {!favList?  <View style={{height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      
     <ActivityIndicator size={'large'}  color={Colors.PRIMARY}/>
      <Text style={{fontFamily: 'Outfit', marginTop: 5}}>Loading</Text>
      </View>:null}
      <FlatList
      onRefresh={()=>getFav()} 
      refreshing={loading}
      data={favList}
      renderItem={({index,item}) => (
        <PlaceItem 
        place={item.place} isFav={true} markedFav={() =>getFav()}
        />
      )}
      />
      <View style={{marginBottom: 200}}>

      </View>
    </View>
  )
}