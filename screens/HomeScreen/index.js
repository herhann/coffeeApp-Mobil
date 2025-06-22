import { FlatList, StyleSheet, Platform, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchScreen from '../../components/searchBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { fetchCoffees, addLikedCoffee, fethchLikedCoffees } from '../../api'


const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [likedItems, setLikedItems] = useState([]);
  const navigation = useNavigation();

  const API_BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";
  console.log(API_BASE_URL);

  const fetchLikedItems = async () => {
    try {
      const data = await fethchLikedCoffees();
      setLikedItems(data.map(item => item.kahve_id));
    } catch (error) {
      console.error("Error fetching liked items:", error);
    }
  }

  const toggleLike = (itemId) => {
    if (likedItems.includes(itemId)) {
      setLikedItems(likedItems.filter(i => i !== itemId));
    } else {
      setLikedItems([...likedItems, itemId]);
    }
  }

  const toggleLikedItem = async (itemId) => {
    try {
      await addLikedCoffee(itemId);
      toggleLike(itemId);
      console.log(`Item with id ${itemId} liked status toggled.`);
    } catch (error) {
      console.error("Error toggling liked item:", error);
    }
  }


  const [coffees, setCoffees] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchCoffees();
      setCoffees(data);
      console.log("Fetched coffees:", data);
    } catch (error) {
      console.error("Error fetching coffees:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchLikedItems();
  }, []);

  const uniqueCategories = ["Tümü", ...new Set(coffees.map(item => item.type))];
  const filteredCoffees = coffees.filter(item =>
    selectedCategory === "Tümü" || item.type === selectedCategory
  );

  const CategoryHeader = () => (
    <View
      className="bg-white py-3 border-b border-gray-200 rounded-3xl" style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        zIndex: 1000,
      }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={uniqueCategories}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(item)}
            className={`px-4 py-2 mx-1 rounded-full ${selectedCategory === item ? 'bg-[#140801]/90' : 'bg-gray-100'
              }`}>
            <Text className={`${selectedCategory === item ? 'text-white font-semibold' : 'text-black'}`}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
      />
    </View>
  );

  return (
    <View className="flex-1 bg-[#140801]">
      <SafeAreaView className="">
        <Text className="text-white px-5 mt-12 text-lg">Konum</Text>
        <View className="flex-row ">
          <Text className="text-white px-5  text-base">Beşiktaş, İstanbul</Text>
          {/* buraya ikon gelicek */}
        </View>
        <SearchScreen />
      </SafeAreaView>

      <View className="flex-1 bg-white rounded-t-3xl mt-6">
        <FlatList
          data={filteredCoffees}
          className="p-1"
          stickyHeaderIndices={[0]}
          numColumns={2}
          renderItem={({ item }) => (
            <View className=" h-56 w-[48%] bg-[#e4e0e0] rounded-lg ">
              <Image
                source={{ uri: `${API_BASE_URL}${item.image_path}` }}
                className="w-full h-32 rounded-t-lg mb-2"
              />
              <View className="px-2">
                <Text className="text-gray-500 text-sm">{item.type}</Text>
                <Text className="text-black font-semibold text-base">{item.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Detail', { id: item.id })
                }
                className="bg-[#140801] items-center justify-center mt-1 h-10 rounded-b-xl">
                <Text className="text-white text-sm">Detayları Gör</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleLikedItem(item.id)}
                className="absolute top-2 right-2 bg-white rounded-full  h-8 w-8 justify-center items-center">
                <Ionicons
                  name={likedItems.includes(item.id) ? "heart" : "heart-outline"}
                  size={20}
                  color={likedItems.includes(item.id) == item.id ? "red" : '#140801'} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={CategoryHeader}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 10 }}

          contentContainerStyle={{ paddingBottom: 20, items: 'center', justifyContent: 'center' }}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})