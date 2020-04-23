import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

const Stack = createStackNavigator();

const NewStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

function NewStackScreen() {
  const navigation = useNavigation();

  return (
    <NewStack.Navigator
      screenOptions={{
        resetOnBlur: true,
        headerTransparent: true,
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <NewStack.Screen
        name="Selecione o prestador"
        component={SelectProvider}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Agendamentos')}
            >
              <Icon name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <NewStack.Screen
        name="Selecione o Horario"
        component={SelectDateTime}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Icon name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <NewStack.Screen
        name="Confirmar o Agendamento"
        component={Confirm}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Icon name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
    </NewStack.Navigator>
  );
}

function MainTabScreen() {
  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case 'Agendamentos':
              return <Icon name="event" size={20} color={color} />;
            case 'Meu Perfil':
              return <Icon name="person" size={20} color={color} />;
            default:
              return <Icon name="add-circle-outline" size={20} color={color} />;
          }

          /**
           * if (route.name === 'Agendamentos') {
            iconName = 'event';
          } else if (route.name === 'Meu Perfil') {
            iconName = 'person';
          } else {
            iconName = 'add-circle-outline';
          }

          return <Icon name={iconName} size={20} color={color} />;
           */
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(255,255,255, 0.6)',
        style: {
          backgroundColor: '#8d41a8',
        },
      }}
    >
      <MainTabs.Screen
        name="Agendamentos"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <MainTabs.Screen
        name="Agendar"
        component={NewStackScreen}
        options={{ headerShown: false, tabBarVisible: false }}
      />
      <MainTabs.Screen
        name="Meu Perfil"
        component={Profile}
        options={{ headerShown: false }}
      />
    </MainTabs.Navigator>
  );
}

export default function Routes() {
  const signedIn = useSelector((state) => state.auth.signed);

  return (
    <>
      {signedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainTabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Agendar" component={NewStackScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}
