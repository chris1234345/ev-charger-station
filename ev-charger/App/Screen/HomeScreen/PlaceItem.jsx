import { View, Text, Image, Dimensions, Pressable, ToastAndroid, Linking } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import GlobALApi from '../../Utils/GlobALApi';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getFirestore, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { app } from '../../Utils/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function PlaceItem({place, isFav, markedFav}) {
    const PLACE_PHOTO_BASE_URL = 'https://places.googleapis.com/v1/';
    const {user} = useUser()

    const db = getFirestore(app);

    const onsSetFav = async(place) => {
      await setDoc(doc(db, "ev-fav-place", (place.id).toString()), {
        place: place,
         email: user?.primaryEmailAddress?.emailAddress,
      }
    );
    markedFav();
      ToastAndroid.show('Fav Added!', ToastAndroid.TOP);
    }

    const onRemoveFav =async(placeId) => {
      await deleteDoc(doc(db, "ev-fav-place", (placeId).toString()));
      ToastAndroid.show('Fav Remove', ToastAndroid.TOP);
      markedFav();
    }
    const onDirectionClick = () => {
      const url = Platform.select({
        ios:"maps:"+place.location.latitude+","+place.location.longitude+"?q="+place?.formattedAddress,
        android:"geo:"+place.location.latitude+","+place.location.longitude+"?q="+place?.formattedAddress,
      });
      Linking.openURL(url);
    }
  return (
    <View style={{
        width: Dimensions.get('screen').width - 10,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
    }}>
        
    <LinearGradient 
    colors={['transparent', '#ffffff', '#ffffff']}
    >
     {!isFav? <Pressable style={{position: 'absolute', right: 0, margin: 5, }}
      onPress={() => onsSetFav(place)}
      >
     <Ionicons name="heart-outline" size={24} color="white" />
      </Pressable>:

      <Pressable style={{position: 'absolute', right: 0, margin: 5, }}
      onPress={() => onRemoveFav(place.id)}
      >
     
     <Ionicons name="heart-sharp" size={24} color="red" />
     </Pressable>}

      <Image source={
        place?.photos?
        {uri:PLACE_PHOTO_BASE_URL+place?.photos[0].name+
        "/media?key="+ GlobALApi.API_KEY + "&maxHeightPx=800&maxWidthPx=800"}
        :require('../../../assets/assets/ev-charging.png')} style={{width: '100%', borderRadius: 10, height: 130, zIndex: -1}}/>
        
      <View style={{padding: 15}}>
        <Text style={{
           fontSize: 23,
           fontFamily: 'Outfit-medium'
        }}>{place.displayName.text}</Text>
        <Text style={{
            color: Colors.GRAY,  
        }}>{place?.formattedAddress}</Text>
      <View style={{
        marginTop: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Text style={{
            fontFamily: 'Outfit',
            color: Colors.GRAY,
        }}>Connectors</Text>
        <Text style={{
            fontFamily: 'Outfit-medium',
            fontSize: 17,
            marginTop: 2
        }}>{place?.evChargeOptions?.connectorCount} Points </Text>
      <Pressable onPress={()=> onDirectionClick()} style={{padding: 12, borderRadius: 6, backgroundColor: 'forestgreen', paddingHorizontal: 14}}>
        <FontAwesome size={25} color='white' name="location-arrow"/>
      </Pressable>
      </View>
      </View>
      </LinearGradient>
    </View>
  )
}