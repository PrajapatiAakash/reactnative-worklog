import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './../screens/HomeScreen';
import DetailsScreen from './../screens/DetailsScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Welcome To WorkLog System',
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
