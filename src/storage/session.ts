import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const SESSION_KEY = '@session:user';

export const sessionStorage = {
  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user session:', error);
      throw error;
    }
  },

  async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(SESSION_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user session:', error);
      return null;
    }
  },

  async removeUser(): Promise<void> {
    try {
      console.log('Removendo usuário do AsyncStorage...');
      await AsyncStorage.removeItem(SESSION_KEY);
      console.log('Usuário removido do AsyncStorage com sucesso');
    } catch (error) {
      console.error('Error removing user session:', error);
      throw error;
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};
