import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { Card, Button } from '../components';
import { sessionStorage } from '../storage/session';

export const PerfilScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair da aplicação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: performLogout,
        },
      ]
    );
  };

  const performLogout = async () => {
    setIsLoggingOut(true);
    try {
      console.log('Tentando fazer logout...');
      await logout();
      console.log('Logout concluído, redirecionando...');
      
      // Confirmação visual de que o logout foi executado
      Alert.alert(
        'Logout Realizado',
        'Você foi desconectado com sucesso.',
        [{ text: 'OK' }]
      );
      
    } catch (error) {
      console.error('Erro no logout:', error);
      Alert.alert(
        'Erro',
        'Não foi possível fazer logout. Tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getPerfilInfo = () => {
    switch (user?.perfil) {
      case 'conservador':
        return {
          emoji: '🛡️',
          name: 'Conservador',
          description: 'Foca em segurança e preservação do capital',
          characteristics: [
            'Baixa tolerância ao risco',
            'Prioriza liquidez e segurança',
            'Investimentos em renda fixa',
            'Protegido pelo FGC quando possível'
          ],
          color: '#34C759'
        };
      case 'moderado':
        return {
          emoji: '⚖️',
          name: 'Moderado',
          description: 'Equilibra segurança com oportunidades de crescimento',
          characteristics: [
            'Tolerância moderada ao risco',
            'Diversificação entre renda fixa e variável',
            'Busca rentabilidade acima da inflação',
            'Aceita pequenas variações no curto prazo'
          ],
          color: '#FF9500'
        };
      case 'agressivo':
        return {
          emoji: '🚀',
          name: 'Agressivo',
          description: 'Busca máxima rentabilidade com maior exposição ao risco',
          characteristics: [
            'Alta tolerância ao risco',
            'Foco em crescimento de capital',
            'Investe principalmente em renda variável',
            'Aceita volatilidade em troca de retornos superiores'
          ],
          color: '#FF3B30'
        };
      default:
        return {
          emoji: '❓',
          name: 'Não definido',
          description: 'Faça o diagnóstico para descobrir seu perfil',
          characteristics: [],
          color: '#8E8E93'
        };
    }
  };

  const perfilInfo = getPerfilInfo();

  const showFeatureNotAvailable = (feature: string) => {
    Alert.alert(
      'Funcionalidade em Desenvolvimento',
      `A funcionalidade "${feature}" será implementada em versões futuras do app.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Meu Perfil</Text>
          <Text style={styles.subtitle}>
            Gerencie suas informações e configurações
          </Text>
        </View>

        <Card style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || '?'}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={styles.userId}>ID: {user?.id}</Text>
            </View>
          </View>
        </Card>

         <Card style={{...styles.perfilCard, borderLeftColor: perfilInfo.color}}>
          <View style={styles.perfilHeader}>
            <Text style={styles.perfilEmoji}>{perfilInfo.emoji}</Text>
            <View style={styles.perfilInfo}>
              <Text style={styles.perfilName}>Perfil {perfilInfo.name}</Text>
              <Text style={styles.perfilDescription}>
                {perfilInfo.description}
              </Text>
            </View>
          </View>

          {perfilInfo.characteristics.length > 0 && (
            <View style={styles.characteristicsContainer}>
              <Text style={styles.characteristicsTitle}>Características:</Text>
              {perfilInfo.characteristics.map((characteristic, index) => (
                <Text key={index} style={styles.characteristicItem}>
                  • {characteristic}
                </Text>
              ))}
            </View>
          )}
        </Card>

        <Card style={styles.menuCard}>
          <Text style={styles.menuTitle}>Configurações</Text>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => showFeatureNotAvailable('Editar Perfil')}
          >
            <Text style={styles.menuIcon}>✏️</Text>
            <Text style={styles.menuLabel}>Editar Perfil</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => showFeatureNotAvailable('Refazer Diagnóstico')}
          >
            <Text style={styles.menuIcon}>🔄</Text>
            <Text style={styles.menuLabel}>Refazer Diagnóstico</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => showFeatureNotAvailable('Notificações')}
          >
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={styles.menuLabel}>Notificações</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => showFeatureNotAvailable('Privacidade')}
          >
            <Text style={styles.menuIcon}>🔒</Text>
            <Text style={styles.menuLabel}>Privacidade e Segurança</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => showFeatureNotAvailable('Suporte')}
          >
            <Text style={styles.menuIcon}>💬</Text>
            <Text style={styles.menuLabel}>Suporte</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>ℹ️ Sobre o App</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Versão:</Text>
            <Text style={styles.infoValue}>1.0.0 (CP3)</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Desenvolvido por:</Text>
            <Text style={styles.infoValue}>Grupo FIAP</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tecnologia:</Text>
            <Text style={styles.infoValue}>React Native + Expo</Text>
          </View>
        </Card>

        <Button
          title="Sair da Conta"
          onPress={async () => {
            try {
              console.log('Limpando storage completo...');
              await sessionStorage.clearAll();
              console.log('Storage limpo, fazendo logout...');
              await logout();
              Alert.alert('Sucesso', 'Storage limpo completamente!');
            } catch (error) {
              console.error('Erro:', error);
              Alert.alert('Erro', 'Falha ao limpar storage');
            }
          }}
          variant="outline"
          loading={isLoggingOut}
          style={{...styles.logoutButton, borderColor: '#FF3B30'}}
          textStyle={{ color: '#FF3B30' }}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            CP3 - Mobile Development and IoT
          </Text>
          <Text style={styles.footerSubtext}>
            Operum - Assessor Virtual de Investimentos
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  userCard: {
    marginBottom: 16,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  userId: {
    fontSize: 12,
    color: '#C7C7CC',
  },
  perfilCard: {
    borderLeftWidth: 4,
    marginBottom: 16,
  },
  perfilHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  perfilEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  perfilInfo: {
    flex: 1,
  },
  perfilName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  perfilDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 18,
  },
  characteristicsContainer: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
  },
  characteristicsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  characteristicItem: {
    fontSize: 13,
    color: '#3C3C43',
    lineHeight: 18,
    marginBottom: 2,
  },
  menuCard: {
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
  },
  menuLabel: {
    fontSize: 16,
    color: '#1C1C1E',
    flex: 1,
  },
  menuArrow: {
    fontSize: 20,
    color: '#C7C7CC',
  },
  infoCard: {
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  logoutButton: {
    marginBottom: 32,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#C7C7CC',
    marginTop: 4,
  },
});
