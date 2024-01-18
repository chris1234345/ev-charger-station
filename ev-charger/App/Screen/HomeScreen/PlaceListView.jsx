import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import PlaceItem from './PlaceItem';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../Utils/FirebaseConfig';

export default function PlaceListView({placeList}) {
  const flatListRef = useRef(null);
  const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext);
  const {user}=useUser();
  const [favList, setFavList] = React.useState([]); 

  useEffect(() => {
    // selectedMarker&&scrollToIndex(selectedMarker);
  }, [selectedMarker])

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({index, animated: true});
  }

  const getItemLayout = (_, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width*index,
    index
  });

  // get data from firestore

  const db = getFirestore(app);
  useEffect(() => {
    user&&getFav();
  },[user])

  const getFav=async() => {
    setFavList([]);

    const q = query(collection(db, "ev-fav-place"), where("email", "==", user?.primaryEmailAddress?.emailAddress));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setFavList(favList=>[...favList, doc.data()]);
    });
  }

  const isFav = (place) => {
    const result = favList.find(item=>item.place.id==place.id);
    console.log(result);
    return result?true:false;
  }

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
          <PlaceItem  place={item} isFav={isFav(item)} markedFav={() => getFav()}/>
        </View>
      )}
      />

      
    </View>
  )
}