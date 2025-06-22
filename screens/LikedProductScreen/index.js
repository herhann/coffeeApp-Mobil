import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Index = () => {
  return (
    <SafeAreaView className="bg-[#140801] h-full">
      <ScrollView className="bg-white flex-1 h-full  mt-4 rounded-t-xl p-3"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full h-2  pt-4 pb-2 items-center justify-center">
          <View className="w-1/3 h-1 bg-gray-200 rounded-full"></View>
        </View>
      <Text className="text-black text-xl font-semibold text-start mx-3 mt-4">Beğenilen Ürünler</Text>
        <View className="w-full border-y-[1px] mt-6 border-gray-200 py-0.5">
          <Text className="text-black text-lg font-semibold px-3">Türk Kahvesi</Text>
        </View>
        <View className="w-full border-b-[1px] border-gray-200 py-0.5">
          <Text className="text-black text-lg font-semibold px-3">Türk Kahvesi</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index
