import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { Input, Button } from '../components';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { login } = useAuth();

  const validateForm = (): boolean => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');

    if (!email.includes('@')) {
      setEmailError('Digite um email válido');
      isValid = false;
    }

    if (password.length < 4) {
      setPasswordError('A senha deve ter pelo menos 4 caracteres');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (!success) {
        Alert.alert(
          'Erro no Login',
          'Credenciais inválidas. Verifique seu email e senha.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        'Ocorreu um erro inesperado. Tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    Alert.alert(
      'Criar Conta',
      'Funcionalidade em desenvolvimento. Use as credenciais de teste para acessar o app.',
      [{ text: 'OK' }]
    );
  };

  const showTestCredentials = () => {
    Alert.alert(
      'Credenciais de Teste',
      'Email: teste@operum.app\nSenha: 1234\n\nOu use qualquer email válido com senha de 4+ caracteres.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.logo}>💼 Operum</Text>
            <Text style={styles.subtitle}>
              Seu assessor virtual de investimentos
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={emailError}
              style={styles.input}
            />

            <Input
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={passwordError}
              style={styles.input}
            />

            <Button
              title="Entrar"
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginButton}
            />

            <TouchableOpacity
              onPress={handleCreateAccount}
              style={styles.createAccountButton}
            >
              <Text style={styles.createAccountText}>
                Não tem conta? Criar conta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={showTestCredentials}
              style={styles.testCredentialsButton}
            >
              <Text style={styles.testCredentialsText}>
                Ver credenciais de teste
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              CP3 - Mobile Development and IoT
            </Text>
            <Text style={styles.footerSubtext}>
              React Native + Expo
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#8E8E93',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    marginBottom: 8,
  },
  loginButton: {
    marginTop: 16,
    marginBottom: 16,
  },
  createAccountButton: {
    alignItems: 'center',
    padding: 12,
  },
  createAccountText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  testCredentialsButton: {
    alignItems: 'center',
    padding: 8,
  },
  testCredentialsText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
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
