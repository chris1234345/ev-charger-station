import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import PlaceItem from './PlaceItem';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';

export default function PlaceListView({placeList}) {
  const flatListRef = useRef(null);
  const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext);

  useEffect(() => {
    selectedMarker&&scrollToIndex(selectedMarker);
  }, [selectedMarker])

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({index, animated: true});
  }

  const getItemLayout = (_, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width*index,
    index
  });

  return (
    <View>
      <FlatList style={{margin: 0, padding: 0}}
      data={placeList}
      horizontal={true}
      pagingEnabled
      ref={flatListRef}
      getItemLayout={getItemLayout}
      showsHorizontalScrollIndcator={false}
      renderItem={({item, index}) => (
        <View key={index}>
          <PlaceItem  place={item}/>
        </View>
      )}
      />

      
    </View>
  )
}