import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getPerfilInfo = () => {
    switch (user?.perfil) {
      case 'conservador':
        return {
          emoji: '🛡️',
          description: 'Perfil focado em segurança e baixo risco',
          color: '#34C759'
        };
      case 'moderado':
        return {
          emoji: '⚖️',
          description: 'Perfil equilibrado entre risco e retorno',
          color: '#FF9500'
        };
      case 'agressivo':
        return {
          emoji: '🚀',
          description: 'Perfil focado em alta rentabilidade',
          color: '#FF3B30'
        };
      default:
        return {
          emoji: '👤',
          description: 'Faça seu diagnóstico de perfil',
          color: '#007AFF'
        };
    }
  };

  const perfilInfo = getPerfilInfo();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {getGreeting()}, {user?.name}! 👋
          </Text>
          <Text style={styles.subtitle}>
            Pronto para investir hoje?
          </Text>
        </View>

        <Card
          style={[styles.perfilCard, { borderLeftColor: perfilInfo.color }]}
        >
          <View style={styles.perfilContent}>
            <Text style={styles.perfilEmoji}>{perfilInfo.emoji}</Text>
            <View style={styles.perfilText}>
              <Text style={styles.perfilTitle}>
                Perfil {user?.perfil || 'Não definido'}
              </Text>
              <Text style={styles.perfilDescription}>
                {perfilInfo.description}
              </Text>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Acesso Rápido</Text>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigateToScreen('Carteiras')}
          >
            <Text style={styles.actionIcon}>💼</Text>
            <Text style={styles.actionTitle}>Carteiras</Text>
            <Text style={styles.actionSubtitle}>
              Veja carteiras recomendadas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigateToScreen('Simulador')}
          >
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionTitle}>Simulador</Text>
            <Text style={styles.actionSubtitle}>
              Simule sua carteira
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigateToScreen('Educação')}
          >
            <Text style={styles.actionIcon}>📚</Text>
            <Text style={styles.actionTitle}>Educação</Text>
            <Text style={styles.actionSubtitle}>
              FAQ e conteúdo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigateToScreen('Perfil')}
          >
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={styles.actionTitle}>Perfil</Text>
            <Text style={styles.actionSubtitle}>
              Configurações
            </Text>
          </TouchableOpacity>
        </View>

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Dica do Dia</Text>
          <Text style={styles.infoText}>
            Diversifique seus investimentos para reduzir riscos. Uma carteira 
            balanceada pode incluir renda fixa, ações e fundos imobiliários.
          </Text>
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>📈 Mercado Hoje</Text>
          <Text style={styles.infoText}>
            Ibovespa: +1,23% | Dólar: R$ 5,45 | CDI: 11,75% a.a.
          </Text>
          <Text style={styles.infoSubtext}>
            *Dados fictícios para demonstração
          </Text>
        </Card>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  perfilCard: {
    borderLeftWidth: 4,
    marginBottom: 24,
  },
  perfilContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  perfilEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  perfilText: {
    flex: 1,
  },
  perfilTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  perfilDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  infoCard: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 20,
  },
  infoSubtext: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    fontStyle: 'italic',
  },
});
