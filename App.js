import { StatusBar } from 'expo-status-bar';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {useState} from "react";

const API_URL = "https://rookas-chat-gpt.vercel.app/api";

export default function App() {
    const [gender, setGender] = useState('man');
    const [age, setAge] = useState(30);
    const [priceMin, setPriceMin] = useState(25);
    const [priceMax, setPriceMax] = useState(100);
    const [hobbies, setHobbies] = useState('');
    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState('');

    const onSubmit = async () => {
        if (loading) return;
        setLoading(true);
        setResult('');

        try {
            const response = await fetch(`${API_URL}/generate-gifts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies })
            });

            const data = await response.json();
            setResult(data.result);
        } catch (e) {
            Alert.alert("Couldn't generate ideas", e.message);
        } finally {
            setLoading(false);
        }
    }

    const onTryAgain = () => {
        onSubmit();
    }

    if(loading) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
                <Text className="font-semibold mt-5 text-lg">Gift Ideas are on the way 🎁</Text>
            </View>
        );
    }

    if(result) {
        return (
            <SafeAreaView className="text-center px-10 pt-24">
                <Text className="text-center pt-3 text-lg font-semibold">
                    Here are some great Christmas gift ideas 🎁 💡
                </Text>
                <Text className="text-gray-800 tracking-wide px-5">{result}</Text>
                <TouchableOpacity onPress={onTryAgain} activeOpacity={0.7} className="bg-teal-800 rounded-md mx-5 mt-10">
                    <Text className="text-white text-center py-3 rounded-md font-bold">Generate</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

  return (
      <View className="flex-1 pt-16 px-5 bg-white space-y-7">
          <Text className="text-center text-xl font-semibold">Christmas Gift Generator 🎁</Text>

          <>
              <Text className="text-lg font-semibold text-left mt-5">For who is the gift?</Text>
              <View className="flex-row">
                  <Text onPress={() => setGender("man")} className={`${gender === 'man' ? "bg-teal-800 text-white font-semibold" : "bg-gray-200 text-gray-800 font-semibold"} mr-1 flex-1 text-center py-3`}>Man</Text>
                  <Text onPress={() => setGender("woman")} className={`${gender === 'woman' ? "bg-teal-800 text-white font-semibold" : "bg-gray-200 text-gray-800 font-semibold"} ml-1 flex-1 text-center py-3`}>Woman</Text>
              </View>
          </>

          <>
              <Text className="text-lg font-semibold text-left mt-5">Age</Text>
              <TextInput
                  placeholder="Age"
                  keyboardType="numeric"
                  className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 pb-5"
                  value={age.toString()}
                  onChangeText={(s) => setAge(Number.parseInt(s || '0'))}
              />
          </>

          <>
              <Text className="text-lg font-semibold text-left mt-5">Price from ($)</Text>
              <TextInput
                  className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 pb-5"
                  placeholder="Price from"
                  keyboardType="numeric"
                  style={styles.input}
                  value={priceMin.toString()}
                  onChangeText={(s) => setPriceMin(Number.parseInt(s || '0'))}
              />
          </>

          <>
              <Text className="text-lg font-semibold text-left mt-5">Price to ($)</Text>
              <TextInput
                  className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 pb-5"
                  placeholder="Price to"
                  keyboardType="numeric"
                  style={styles.input}
                  value={priceMax.toString()}
                  onChangeText={(s) => setPriceMax(Number.parseInt(s || '0'))}
              />
          </>

          <>
              <Text className="text-lg font-semibold text-left mt-5">Hobbies</Text>
              <TextInput
                  className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 pb-5"
                  placeholder="Hobbies"
                  style={styles.input}
                  value={hobbies}
                  onChangeText={setHobbies}
              />
          </>

          <TouchableOpacity onPress={onSubmit} activeOpacity={0.7} className="bg-teal-800 rounded-md">
                <Text className="text-white text-center py-3 rounded-md font-bold">Generate</Text>
          </TouchableOpacity>
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
