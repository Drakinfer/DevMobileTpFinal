import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '../context/sessionContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { session } = useSession();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      {session ? (
          <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
      ) : (
        <>
          <Tabs.Screen
            name="login"
            options={{
              title: 'Connexion',
              tabBarIcon: ({ color }) => <Ionicons name="log-in-outline" size={28} color={color} />,
            }}
          />
          <Tabs.Screen
            name="register"
            options={{
              title: 'Inscription',
              tabBarIcon: ({ color }) => <Ionicons name="person-add-outline" size={28} color={color} />,
            }}
          />
        </>
      )}
    </Tabs>
  );
}
