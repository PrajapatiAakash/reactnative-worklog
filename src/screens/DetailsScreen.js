import { ScrollView, Text, View } from 'react-native';
import tw from 'twrnc';

const DetailsScreen = () => {
    return (
      <ScrollView contentContainerStyle={tw`flex-1`}>
        <View style={tw`flex-1 items-center justify-center p-4`}>
          <Text style={tw`text-2xl font-bold mb-4`}>Details Screen</Text>
          {/* Add more content here */}
        </View>
      </ScrollView>
    );
};

export default DetailsScreen;