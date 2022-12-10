import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState} from "react";

export default function App() {
    const [gender, setGender] = useState('man');
    const [age, setAge] = useState(30);
    const [priceMin, setPriceMin] = useState(25);
    const [priceMax, setPriceMax] = useState(100);
    const [hobbies, setHobbies] = useState('');
    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState('');

  return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
