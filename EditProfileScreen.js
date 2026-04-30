import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// ✅ FIXED: Move InputField OUTSIDE the main component 
// This prevents the component from being re-created on every keystroke
const InputField = ({ label, value, keyName, theme, onChange, keyboardType = 'default' }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, { color: theme.text, borderBottomColor: theme.border }]}
      value={value}
      onChangeText={(text) => onChange(keyName, text)}
      keyboardType={keyboardType}
      placeholderTextColor={theme.subText}
    />
  </View>
);

export default function EditProfileScreen({ onBack, onSave, initialData, theme }) {
  const [formData, setFormData] = useState(initialData);

  // Helper function to update state
  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack}>
          <Text style={{ color: theme.subText }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Edit Profile</Text>
        <TouchableOpacity onPress={() => onSave(formData)}>
          <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.photoSection}>
          <Image source={{ uri: formData.profileImage }} style={styles.profileImage} />
          <TouchableOpacity style={[styles.cameraBtn, { borderColor: theme.background }]}>
            <Ionicons name="camera" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={[styles.formSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <InputField 
            label="Full Name" 
            value={formData.name} 
            keyName="name" 
            theme={theme} 
            onChange={handleInputChange} 
          />
          <InputField 
            label="Email Address" 
            value={formData.email} 
            keyName="email" 
            theme={theme} 
            onChange={handleInputChange} 
            keyboardType="email-address" 
          />
          <InputField 
            label="Phone Number" 
            value={formData.phone} 
            keyName="phone" 
            theme={theme} 
            onChange={handleInputChange} 
            keyboardType="phone-pad" 
          />
        </View>

        <View style={[styles.formSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <InputField 
            label="IC Number" 
            value={formData.ic} 
            keyName="ic" 
            theme={theme} 
            onChange={handleInputChange} 
          />
          <InputField 
            label="Home Address" 
            value={formData.address} 
            keyName="address" 
            theme={theme} 
            onChange={handleInputChange} 
          />
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, borderBottomWidth: 1 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  photoSection: { alignItems: 'center', marginVertical: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  cameraBtn: { position: 'absolute', bottom: 0, right: '38%', backgroundColor: '#4A90E2', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 2 },
  formSection: { padding: 15, borderRadius: 15, marginBottom: 20, borderWidth: 1 },
  inputWrapper: { marginBottom: 15 },
  label: { fontSize: 11, color: '#888', textTransform: 'uppercase', marginBottom: 5 },
  input: { fontSize: 16, borderBottomWidth: 1, paddingVertical: 5 }
});