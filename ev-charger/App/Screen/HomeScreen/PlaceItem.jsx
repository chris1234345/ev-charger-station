import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import GlobALApi from '../../Utils/GlobALApi';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function PlaceItem({place}) {
    const PLACE_PHOTO_BASE_URL = 'https://places.googleapis.com/v1/';
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
      <View style={{padding: 12, borderRadius: 6, backgroundColor: 'forestgreen', paddingHorizontal: 14}}>
        <FontAwesome size={25} color='white' name="location-arrow"/>
      </View>
      </View>
      </View>
      </LinearGradient>
    </View>
  )
}