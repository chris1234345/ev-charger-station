import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';

export default function Markers({place, index}) {
  
    const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext);
  
    return (
    <View>
      <Marker 
        coordinate={{
          latitude: place.location?.latitude,
          longitude: place.location?.longitude,
        }}
        onPress={() => setSelectedMarker(index)}
        >
          <Image source={require('../../../assets/assets/ev-marker.png')}  style={{width: 60, height: 60}}/>
      </Marker> 
    </View>
  )
}