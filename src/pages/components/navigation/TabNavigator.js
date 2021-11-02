import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReservaStackNavigator,FichaStackNavigator,PacienteStackNavigator } from './StackNavigator';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../res/colors';

export default function TabNavigator() {
   const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{ 
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.grey5,
          }}>
          <Tab.Screen 
            name="ReservaTab" 
            component={ReservaStackNavigator} 
            options={{
              tabBarLabel: 'Reserva',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen 
            name="FichaTab" 
            component={FichaStackNavigator} 
            options={{
              tabBarLabel: 'Ficha',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="medical" color={color} size={size} />
              ),
            }}
            />
          <Tab.Screen 
            name="PacienteTab" 
            component={PacienteStackNavigator} 
            options={{
              tabBarLabel: 'Paciente',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="md-people" color={color} size={size} />
              ),
            }}
            />
        </Tab.Navigator>
    );
  }