import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '../components';
import { simulatePortfolio } from '../data/mockData';
import { SimulacaoResult } from '../types';

export const SimuladorScreen: React.FC = () => {
  const [allocations, setAllocations] = useState({
    rendaFixa: 40,
    acoes: 30,
    fundos: 20,
    cripto: 10,
  });
  const [result, setResult] = useState<SimulacaoResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const updateAllocation = (asset: keyof typeof allocations, value: number) => {
    setAllocations(prev => ({
      ...prev,
      [asset]: Math.max(0, Math.min(100, value))
    }));
    setResult(null); // Clear result when allocation changes
  };

  const getTotalAllocation = () => {
    return Object.values(allocations).reduce((sum, value) => sum + value, 0);
  };

  const runSimulation = async () => {
    const total = getTotalAllocation();
    
    if (total !== 100) {
      Alert.alert(
        'Erro na Simulação',
        `A soma das alocações deve ser 100%. Atual: ${total}%`,
        [{ text: 'OK' }]
      );
      return;
    }

    setIsSimulating(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const simulationResult = simulatePortfolio(allocations);
      setResult(simulationResult);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Ocorreu um erro na simulação. Tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSimulating(false);
    }
  };

  const resetAllocations = () => {
    setAllocations({
      rendaFixa: 40,
      acoes: 30,
      fundos: 20,
      cripto: 10,
    });
    setResult(null);
  };

  const getRiscoColor = (risco: string) => {
    switch (risco) {
      case 'baixo':
        return '#34C759';
      case 'medio':
        return '#FF9500';
      case 'alto':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getRiscoIcon = (risco: string) => {
    switch (risco) {
      case 'baixo':
        return '🛡️';
      case 'medio':
        return '⚖️';
      case 'alto':
        return '⚠️';
      default:
        return '❓';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const renderSlider = (
    label: string,
    emoji: string,
    asset: keyof typeof allocations,
    color: string
  ) => (
    <View key={asset} style={styles.sliderContainer}>
      <View style={styles.sliderHeader}>
        <Text style={styles.sliderLabel}>
          {emoji} {label}
        </Text>
        <Text style={[styles.sliderValue, { color }]}>
          {allocations[asset]}%
        </Text>
      </View>
      
      <View style={styles.sliderControls}>
        <Button
          title="-"
          onPress={() => updateAllocation(asset, allocations[asset] - 5)}
          variant="outline"
          size="small"
          style={styles.sliderButton}
        />
        
        <View style={styles.sliderBar}>
          <View
            style={[
              styles.sliderFill,
              { 
                width: `${allocations[asset]}%`,
                backgroundColor: color 
              }
            ]}
          />
        </View>
        
        <Button
          title="+"
          onPress={() => updateAllocation(asset, allocations[asset] + 5)}
          variant="outline"
          size="small"
          style={styles.sliderButton}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Simulador de Carteira</Text>
          <Text style={styles.subtitle}>
            Ajuste as alocações e veja a projeção de rentabilidade
          </Text>
        </View>

        <Card style={styles.allocationCard}>
          <Text style={styles.cardTitle}>Alocação de Ativos</Text>
          
          {renderSlider('Renda Fixa', '🏦', 'rendaFixa', '#34C759')}
          {renderSlider('Ações', '📈', 'acoes', '#007AFF')}
          {renderSlider('Fundos', '📊', 'fundos', '#FF9500')}
          {renderSlider('Criptomoedas', '₿', 'cripto', '#FF3B30')}

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={[
              styles.totalValue,
              { color: getTotalAllocation() === 100 ? '#34C759' : '#FF3B30' }
            ]}>
              {getTotalAllocation()}%
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Simular"
              onPress={runSimulation}
              loading={isSimulating}
              disabled={getTotalAllocation() !== 100}
              style={styles.simulateButton}
            />
            <Button
              title="Resetar"
              onPress={resetAllocations}
              variant="outline"
              style={styles.resetButton}
            />
          </View>
        </Card>

        {result && (
          <Card style={styles.resultCard}>
            <Text style={styles.cardTitle}>Resultado da Simulação</Text>
            
            <View style={styles.resultHeader}>
              <View style={styles.rentabilidadeResult}>
                <Text style={styles.rentabilidadeLabel}>Rentabilidade Estimada</Text>
                <Text style={styles.rentabilidadeValue}>
                  {result.rentabilidadeEstimada.toFixed(1)}% a.a.
                </Text>
              </View>
              
              <View style={styles.riscoResult}>
                <Text style={styles.riscoLabel}>Nível de Risco</Text>
                <View style={styles.riscoContainer}>
                  <Text style={styles.riscoIcon}>
                    {getRiscoIcon(result.risco)}
                  </Text>
                  <Text style={[
                    styles.riscoValue,
                    { color: getRiscoColor(result.risco) }
                  ]}>
                    {result.risco.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.projecaoContainer}>
              <Text style={styles.projecaoTitle}>
                Projeção para R$ 10.000 investidos:
              </Text>
              
              <View style={styles.projecaoItem}>
                <Text style={styles.projecaoLabel}>12 meses:</Text>
                <Text style={styles.projecaoValue}>
                  {formatCurrency(result.projecao12Meses)}
                </Text>
              </View>
              
              <View style={styles.projecaoItem}>
                <Text style={styles.projecaoLabel}>24 meses:</Text>
                <Text style={styles.projecaoValue}>
                  {formatCurrency(result.projecao24Meses)}
                </Text>
              </View>
              
              <View style={styles.projecaoItem}>
                <Text style={styles.projecaoLabel}>36 meses:</Text>
                <Text style={styles.projecaoValue}>
                  {formatCurrency(result.projecao36Meses)}
                </Text>
              </View>
            </View>
          </Card>
        )}

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Dicas para Simulação</Text>
          <Text style={styles.infoText}>
            • Renda Fixa: Menor risco, menor retorno{'\n'}
            • Ações: Risco moderado a alto, maior potencial{'\n'}
            • Fundos: Diversificação profissional{'\n'}
            • Cripto: Alto risco, alta volatilidade
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
  allocationCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 20,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  sliderControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderButton: {
    width: 40,
    height: 32,
    marginHorizontal: 8,
  },
  sliderBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 4,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  simulateButton: {
    flex: 2,
  },
  resetButton: {
    flex: 1,
  },
  resultCard: {
    marginBottom: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rentabilidadeResult: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
  },
  rentabilidadeLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  rentabilidadeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34C759',
  },
  riscoResult: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginLeft: 8,
  },
  riscoLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  riscoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riscoIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  riscoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  projecaoContainer: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
  },
  projecaoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  projecaoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projecaoLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  projecaoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  infoCard: {
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
});
