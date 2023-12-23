import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthProvider, useAuth } from './app/context/AuthContext'
import { Button, StyleSheet, Text, View } from 'react-native'
import Home from './app/screens/Home'
import Login from './app/screens/Login'
import Register from './app/screens/Register'
import Verification from './app/screens/Verification'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  )
}

export const Layout = () => {
  const { authState, onLogout } = useAuth()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { authState?.authenticated
          ? <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />
            }}>
          </Stack.Screen>
          : 
          <>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Register" component={Register}></Stack.Screen>
            <Stack.Screen name="Verification" component={Verification}></Stack.Screen>
          </>
          }
      </Stack.Navigator>
    </NavigationContainer>
  )
}