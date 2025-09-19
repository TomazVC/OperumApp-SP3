import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';
import { sessionStorage } from '../storage/session';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  logout: async () => {},
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      console.log('Carregando usuário armazenado...');
      const storedUser = await sessionStorage.getUser();
      console.log('Usuário carregado:', storedUser ? `${storedUser.name} (${storedUser.email})` : 'nenhum');
      setUser(storedUser);
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Validação simples conforme especificado
      if (!email.includes('@') || password.length < 4) {
        return false;
      }

      // Determinar perfil baseado no email (mock)
      let perfil: 'conservador' | 'moderado' | 'agressivo' = 'moderado';
      if (email.includes('conservador')) {
        perfil = 'conservador';
      } else if (email.includes('agressivo')) {
        perfil = 'agressivo';
      }

      // Criar usuário mock
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 11),
        name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'Usuário',
        email,
        perfil,
      };

      await sessionStorage.saveUser(mockUser);
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('🚪 Iniciando logout...');
      
      // Limpa o estado local imediatamente
      setUser(null);
      console.log('✅ Estado local limpo');
      
      // Remove diretamente do AsyncStorage usando múltiplos métodos
      try {
        await sessionStorage.removeUser();
        console.log('✅ SessionStorage limpo via helper');
      } catch (err) {
        console.warn('⚠️ Falha no sessionStorage helper, tentando AsyncStorage direto');
      }
      
      // Backup: limpa diretamente via AsyncStorage
      try {
        await AsyncStorage.removeItem('@session:user');
        console.log('✅ AsyncStorage limpo diretamente');
      } catch (err) {
        console.warn('⚠️ Falha no AsyncStorage direto');
      }
      
      // Verifica se realmente foi removido
      const check = await AsyncStorage.getItem('@session:user');
      console.log('🔍 Verificação pós-limpeza:', check === null ? 'LIMPO' : 'AINDA EXISTE');
      
      // Força múltiplas atualizações do estado
      setUser(null);
      setTimeout(() => setUser(null), 50);
      setTimeout(() => setUser(null), 100);
      setTimeout(() => setUser(null), 200);
      
      console.log('🎉 Logout realizado com sucesso');
    } catch (error) {
      console.error('❌ Error during logout:', error);
      // Mesmo com erro, garante que o estado local seja limpo
      setUser(null);
      throw error;
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: user !== null,
  };
};
