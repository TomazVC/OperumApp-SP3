import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../hooks/useAuth';
import {
  LoginScreen,
  HomeScreen,
  CarteirasScreen,
  SimuladorScreen,
  EducacaoScreen,
  PerfilScreen,
} from '../screens';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabIcon: React.FC<{ icon: string; focused: boolean }> = ({ icon, focused }) => (
  <Text style={[styles.tabIcon, { opacity: focused ? 1 : 0.6 }]}>
    {icon}
  </Text>
);

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Carteiras"
        component={CarteirasScreen}
        options={{
          tabBarLabel: 'Carteiras',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="💼" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Simulador"
        component={SimuladorScreen}
        options={{
          tabBarLabel: 'Simulador',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📊" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Educação"
        component={EducacaoScreen}
        options={{
          tabBarLabel: 'Educação',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📚" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="⚙️" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const LoadingScreen: React.FC = () => (
  <SafeAreaView style={styles.loadingContainer}>
    <View style={styles.loadingContent}>
      <Text style={styles.loadingLogo}>💼 Operum</Text>
      <ActivityIndicator size="large" color="#007AFF" style={styles.loadingIndicator} />
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  </SafeAreaView>
);

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  console.log('AppNavigator - Estado:', { isAuthenticated, isLoading, user: user?.name });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="App" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    height: 90,
    paddingBottom: 24,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabIcon: {
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
  },
  loadingIndicator: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});
