import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, EmptyState } from '../components';
import { mockFAQ } from '../data/mockData';
import { FAQ } from '../types';

export const EducacaoScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', ...Array.from(new Set(mockFAQ.map(item => item.categoria)))];

  const filteredFAQ = mockFAQ.filter(item => {
    const matchesSearch = item.pergunta.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.resposta.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.categoria === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
  };

  const renderCategoryFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
      contentContainerStyle={styles.categoriesContent}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategoryButton
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === category && styles.selectedCategoryButtonText
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderFAQItem = (item: FAQ) => {
    const isExpanded = expandedItems.has(item.id);
    
    return (
      <Card
        key={item.id}
        style={styles.faqCard}
        onPress={() => toggleExpanded(item.id)}
      >
        <View style={styles.faqHeader}>
          <View style={styles.faqTitleContainer}>
            <Text style={styles.faqPergunta}>{item.pergunta}</Text>
            <Text style={styles.faqCategoria}>{item.categoria}</Text>
          </View>
          <Text style={styles.expandIcon}>
            {isExpanded ? '−' : '+'}
          </Text>
        </View>
        
        {isExpanded && (
          <View style={styles.faqContent}>
            <Text style={styles.faqResposta}>{item.resposta}</Text>
          </View>
        )}
      </Card>
    );
  };

  const renderChatStub = () => (
    <Card style={styles.chatCard}>
      <Text style={styles.chatTitle}>💬 Chat Virtual (Demo)</Text>
      <Text style={styles.chatDescription}>
        Em breve: chat inteligente para tirar suas dúvidas sobre investimentos
      </Text>
      
      <View style={styles.chatDemo}>
        <View style={styles.chatBubbleUser}>
          <Text style={styles.chatBubbleText}>
            Como começar a investir?
          </Text>
        </View>
        
        <View style={styles.chatBubbleBot}>
          <Text style={styles.chatBubbleText}>
            Olá! Primeiro, defina seus objetivos e prazo. Depois, faça seu perfil de investidor. Que tal começar com nossa seção de carteiras? 😊
          </Text>
        </View>
        
        <View style={styles.chatBubbleUser}>
          <Text style={styles.chatBubbleText}>
            Qual carteira é melhor para mim?
          </Text>
        </View>
        
        <View style={styles.chatBubbleBot}>
          <Text style={styles.chatBubbleText}>
            Isso depende do seu perfil! Vejo que você ainda não fez o diagnóstico. Baseando-se na sua tolerância ao risco:
            • Conservador: 🛡️ Foco em segurança
            • Moderado: ⚖️ Equilíbrio
            • Agressivo: 🚀 Maior rentabilidade
          </Text>
        </View>
      </View>
      
      <Text style={styles.chatNote}>
        *Esta é uma demonstração. O chat real será implementado em versões futuras.
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Educação Financeira</Text>
          <Text style={styles.subtitle}>
            Aprenda sobre investimentos e tire suas dúvidas
          </Text>
        </View>

        <Card style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar nas perguntas frequentes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </Card>

        {renderCategoryFilter()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Perguntas Frequentes ({filteredFAQ.length})
          </Text>
          
          {filteredFAQ.length === 0 ? (
            <EmptyState
              title="Nenhuma pergunta encontrada"
              subtitle={`Tente alterar os filtros ou buscar por outros termos`}
              icon="🔍"
              actionLabel="Limpar Filtros"
              onAction={clearSearch}
            />
          ) : (
            filteredFAQ.map(renderFAQItem)
          )}
        </View>

        {renderChatStub()}

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>📚 Mais Conteúdo</Text>
          <Text style={styles.infoText}>
            Em breve teremos mais conteúdos educacionais:
            {'\n'}• Artigos sobre estratégias de investimento
            {'\n'}• Vídeos explicativos
            {'\n'}• Calculadoras financeiras
            {'\n'}• Glossário completo de termos
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
  searchCard: {
    marginBottom: 16,
    paddingVertical: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E5EA',
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  faqCard: {
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  faqTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  faqPergunta: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
    lineHeight: 22,
  },
  faqCategoria: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  expandIcon: {
    fontSize: 20,
    color: '#8E8E93',
    fontWeight: '300',
  },
  faqContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  faqResposta: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 20,
  },
  chatCard: {
    marginBottom: 16,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  chatDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  chatDemo: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  chatBubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    maxWidth: '80%',
  },
  chatBubbleBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    maxWidth: '80%',
  },
  chatBubbleText: {
    fontSize: 14,
    color: '#1C1C1E',
    lineHeight: 18,
  },
  chatNote: {
    fontSize: 12,
    color: '#8E8E93',
    fontStyle: 'italic',
    textAlign: 'center',
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
