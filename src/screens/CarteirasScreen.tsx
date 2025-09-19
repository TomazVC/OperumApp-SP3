import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { Card, Button } from '../components';
import { mockCarteiras } from '../data/mockData';
import { Carteira, Ativo } from '../types';

export const CarteirasScreen: React.FC = () => {
  const { user } = useAuth();
  const [selectedCarteira, setSelectedCarteira] = useState<Carteira | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openCarteiraDetails = (carteira: Carteira) => {
    setSelectedCarteira(carteira);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCarteira(null);
  };

  const getPerfilColor = (perfil: string) => {
    switch (perfil) {
      case 'conservador':
        return '#34C759';
      case 'moderado':
        return '#FF9500';
      case 'agressivo':
        return '#FF3B30';
      default:
        return '#007AFF';
    }
  };

  const getPerfilIcon = (perfil: string) => {
    switch (perfil) {
      case 'conservador':
        return '🛡️';
      case 'moderado':
        return '⚖️';
      case 'agressivo':
        return '🚀';
      default:
        return '💼';
    }
  };

  const isRecommendedForUser = (carteira: Carteira) => {
    return user?.perfil === carteira.perfil;
  };

  const renderAtivoItem = (ativo: Ativo) => (
    <View key={ativo.id} style={styles.ativoItem}>
      <View style={styles.ativoHeader}>
        <Text style={styles.ativoNome}>{ativo.nome}</Text>
        <Text style={styles.ativoPercentual}>{ativo.percentual}%</Text>
      </View>
      <Text style={styles.ativoTipo}>{ativo.tipo}</Text>
      <Text style={styles.ativoDescricao}>{ativo.descricao}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Carteiras Recomendadas</Text>
          <Text style={styles.subtitle}>
            Escolha a carteira ideal para seu perfil
          </Text>
        </View>

        {mockCarteiras.map((carteira) => (
          <Card
            key={carteira.id}
            style={[
              styles.carteiraCard,
              isRecommendedForUser(carteira) && styles.recommendedCard
            ]}
            onPress={() => openCarteiraDetails(carteira)}
          >
            <View style={styles.carteiraHeader}>
              <View style={styles.carteiraInfo}>
                <Text style={styles.carteiraIcon}>
                  {getPerfilIcon(carteira.perfil)}
                </Text>
                <View style={styles.carteiraTitleContainer}>
                  <Text style={styles.carteiraNome}>{carteira.nome}</Text>
                  {isRecommendedForUser(carteira) && (
                    <Text style={styles.recommendedLabel}>✨ Recomendada</Text>
                  )}
                </View>
              </View>
              <View
                style={[
                  styles.perfilBadge,
                  { backgroundColor: getPerfilColor(carteira.perfil) }
                ]}
              >
                <Text style={styles.perfilBadgeText}>
                  {carteira.perfil.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={styles.carteiraDescricao}>{carteira.descricao}</Text>

            <View style={styles.rentabilidadeContainer}>
              <Text style={styles.rentabilidadeLabel}>Rentabilidade Estimada:</Text>
              <Text style={styles.rentabilidadeValue}>
                {carteira.rentabilidadeAnual.toFixed(1)}% a.a.
              </Text>
            </View>

            <View style={styles.ativosPreview}>
              <Text style={styles.ativosLabel}>
                {carteira.ativos.length} ativos diversificados
              </Text>
              <Text style={styles.viewDetails}>Toque para ver detalhes →</Text>
            </View>
          </Card>
        ))}

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Como escolher?</Text>
          <Text style={styles.infoText}>
            • <Text style={styles.bold}>Conservador:</Text> Prioriza segurança{'\n'}
            • <Text style={styles.bold}>Moderado:</Text> Equilibra risco e retorno{'\n'}
            • <Text style={styles.bold}>Agressivo:</Text> Busca máxima rentabilidade
          </Text>
        </Card>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedCarteira?.nome}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.modalDescription}>
                {selectedCarteira?.descricao}
              </Text>

              <View style={styles.modalRentabilidade}>
                <Text style={styles.modalRentabilidadeLabel}>
                  Rentabilidade Estimada
                </Text>
                <Text style={styles.modalRentabilidadeValue}>
                  {selectedCarteira?.rentabilidadeAnual.toFixed(1)}% ao ano
                </Text>
              </View>

              <Text style={styles.ativosTitle}>Composição da Carteira</Text>
              
              {selectedCarteira?.ativos.map(renderAtivoItem)}
            </ScrollView>

            <Button
              title="Fechar"
              onPress={closeModal}
              variant="outline"
              style={styles.modalCloseButton}
            />
          </View>
        </View>
      </Modal>
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
  carteiraCard: {
    marginBottom: 16,
  },
  recommendedCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  carteiraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  carteiraInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  carteiraIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  carteiraTitleContainer: {
    flex: 1,
  },
  carteiraNome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  recommendedLabel: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
    marginTop: 2,
  },
  perfilBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  perfilBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  carteiraDescricao: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 16,
    lineHeight: 20,
  },
  rentabilidadeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rentabilidadeLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  rentabilidadeValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34C759',
  },
  ativosPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ativosLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  viewDetails: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  infoCard: {
    marginTop: 8,
    marginBottom: 32,
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
  bold: {
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  modalScrollView: {
    flex: 1,
  },
  modalDescription: {
    fontSize: 16,
    color: '#3C3C43',
    lineHeight: 22,
    marginBottom: 20,
  },
  modalRentabilidade: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  modalRentabilidadeLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  modalRentabilidadeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34C759',
  },
  ativosTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  ativoItem: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  ativoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ativoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
  },
  ativoPercentual: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  ativoTipo: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  ativoDescricao: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 18,
  },
  modalCloseButton: {
    marginTop: 20,
  },
});
