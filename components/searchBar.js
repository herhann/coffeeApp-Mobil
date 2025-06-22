import { StyleSheet, Text, Image, TextInput, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { fetchCoffees } from '../api'

const searchItem = async (query) => {
    try {
        const coffees = await fetchCoffees();
        if (!query) {
            return coffees;
        }
        return coffees.filter(coffee => coffee.name.toLowerCase().includes(query.toLowerCase()));
    } catch (error) {
        console.error("Error searching for coffees:", error);
        return [];
    }
}

const SearchBar = () => {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 

    const handleSearch = async (text) => {
        setSearchQuery(text);
        const searchResults = await searchItem(text);
        setResults(searchResults);
    };

    return (
        <>
            <View className="flex-row mt-6 w-full px-5 items-center justify-around">
                <View className="flex-row items-center bg-white rounded-lg py-4 w-[100%] px-3">
                    <View className="items-center justify-center mr-3">
                        <Feather
                            name="search"
                            size={20}
                            color="#A0AEC0"
                        />
                    </View>
                    <TextInput
                        placeholder="Arama yapın..."
                        className="text-gray-500 w-full"
                        placeholderTextColor="#A0AEC0"
                        style={{ fontSize: 13, color: '#A0AEC0' }}
                        value={searchQuery}
                        onChangeText={handleSearch}
                        
                    />
                </View>
                
                
                {/* <View className="bg-[#99de91] w-12 h-12 items-center justify-center rounded-lg ml-4">
                    <Feather
                        name="search"
                        size={20}
                        color="white"
                    />
                </View> */}
            </View>
            
            {searchQuery.length > 0 && results.length > 0 && (
            <View className="px-5 rounded-lg mt-2">
                <View className="w-full  bg-white rounded-lg">
                    <FlatList
                        data={results}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                className="bg-white p-3 mb-2 flex-row rounded-b-lg items-center  shadow-sm border border-gray-100"
                                onPress={() => {
                                   navigation.push('Detail', { id: item.id }) 
                                }}
                            >
                                <Image
                                    source={{ uri: `http://localhost:3000${item.image_path}` }} // Resim kaynağı
                                    className="w-12 h-12  mb-2"
                                    style={{ resizeMode: 'cover' }}
                                />
                                <Text className="text-gray-800 ml-4 font-medium text-base">
                                    {item.name}
                                </Text>
                               
                                
                            </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                        maxHeight={300} 
                    />
                </View>
                </View>
            )}
            
            {searchQuery.length > 0 && results.length === 0 && (
                <View className="w-full px-5 mt-4">
                    <View className="bg-gray-100 p-4 rounded-lg items-center">
                        <Feather name="search" size={24} color="#9CA3AF" />
                        <Text className="text-gray-500 mt-2 text-center">
                            "{searchQuery}" için sonuç bulunamadı
                        </Text>
                    </View>
                </View>
            )}
        </>
    )
}

export default SearchBar

const styles = StyleSheet.create({})