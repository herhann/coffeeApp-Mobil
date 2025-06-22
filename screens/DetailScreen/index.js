import { ScrollView, StyleSheet, Text, Image, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { fetchCoffeeById, fetchCoffees, fethchLikedCoffees, addLikedCoffee} from '../../api'

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);

  const [likedItem, setLikedItem] = useState(false)

  const [likedItems, setLikedItems] = useState([]);
  
  const fetchLikedItems = async () => {
    try {
      const data = await fethchLikedCoffees();
      const isLiked = data.some(item => item.kahve_id === id);
      setLikedItem(isLiked);
      console.log("Liked items fetched:", likedItem);
      
    }
  catch (error) {
      console.error("Error fetching liked items:", error);
    }         
  };

  const toggleLikeItem = async (itemId) => {
    try {
      await addLikedCoffee(itemId);
      setLikedItem(!likedItem);
      console.log(`Item with id ${itemId} liked status toggled.`);
    }
    catch (error) {
      console.error("Error toggling liked item:", error);
    }
  };
  

  const toggleLike = (id) => {
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter(i => i !== itemId));
    } else {
      setLikedItems([...likedItems, itemId]);
    }
  };
  const toggleLikedItem = async (itemId) => {
    try {
      await addLikedCoffee(itemId);
      toggleLike(itemId);
      console.log(`Item with id ${itemId} liked status toggled.`);
    } catch (error) {
      console.error("Error toggling liked item:", error);
    }
  };
  useEffect(() => {
    fetchLikedItems();
  }, []);
 

  const otherSuggestions = async () => {
    try {
      const data = await fetchCoffees();
      const shuffled = data.sort(() => 0.5 - Math.random());
      const suggestions = shuffled.slice(0, 4);
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching coffees:", error);
    }
  };


  const fetchCoffeeDetails = async (id) => {
    console.log("Fetching coffee details for ID:", id);
    try {
      const coffeeDetails = await fetchCoffeeById(id);
      setName(coffeeDetails.name);
      setImage(coffeeDetails.image_path);
      setDescription(coffeeDetails.description);
    } catch (error) {
      console.error("Error fetching coffee details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCoffeeDetails(id);
      otherSuggestions();
    } else {
      console.error("No ID provided in route params");
    }
  }, [id]);


  return (
    <View className="bg-[#140801] h-full">

      <SafeAreaView className=" ">
        <ScrollView className=" bg-white h-full mt-12 rounded-t-xl p-3"
        >
          <View className="w-full h-2  items-center justify-center">
            <View className="w-1/3 h-1 bg-gray-200 rounded-full"></View>
          </View>
          <View className="flex-row items-center justify-between mt-3 px-3">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IonIcons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-black text-lg font-semibold">Kahve Detay</Text>
            <TouchableOpacity
            onPress={() => toggleLikeItem(id)}>
              <IonIcons name={likedItem ? 'heart' : 'heart-outline'} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="w-full justify-center items-center h-64 mt-6">
            <Image source={image ? { uri: `http://localhost:3000${image}` } : require('../../assets/ytMusicFoto.png')}
              className="w-[95%] h-64 rounded-lg"
            />
          </View>
          <Text className="text-black text-xl font-semibold px-3 mt-4">{name}</Text>
          <Text className="text-gray-500 text-base px-3 mt-1">{description}</Text>

          <Text className="text-black text-lg font-semibold px-3 mt-6 mb-3">Diğer Önerilerimiz</Text>
          <FlatList
            data={suggestions}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity 
              onPress={() => navigation.push('Detail', { id: item.id })}
              className="w-32 h-44 bg-gray-100 rounded-lg m-2">
                <Image source={{ uri: `http://localhost:3000${item.image_path}` }} className="w-full h-24 rounded-t-lg" />
                <Text className="text-black text-base font-semibold px-2 mt-1">{item.name}</Text>
                <View className="w-full bottom-0 absolute h-7 bg-[#8b837e] rounded-b-lg items-center justify-center">
                  <Text className="text-white text-sm font-semibold">
                    İncele
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
          <View className="w-full h-20 " />
        </ScrollView>
      </SafeAreaView>
    </View>

  )
}

export default DetailsScreen

const styles = StyleSheet.create({})