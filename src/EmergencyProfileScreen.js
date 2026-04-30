import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EmergencyProfileScreen({ onBack, theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header - Stays primary blue but adds extra padding for system info */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        
        {/* Blood Type Card */}
        <View style={[styles.criticalCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.label, { color: theme.subText }]}>BLOOD TYPE</Text>
          <Text style={styles.value}>O-Positive</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Allergies</Text>
        <View style={[styles.infoBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {/* We keep the red color for visibility since these are dangerous allergies */}
          <Text style={styles.allergyText}>• Penicillin</Text>
          <Text style={styles.allergyText}>• Peanuts</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Emergency Contacts</Text>
        
        <View style={[styles.contactCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.contactName, { color: theme.text }]}>John Lim (Husband)</Text>
          <Text style={{ color: theme.subText }}>+60192223463</Text>
        </View>
        
        <View style={[styles.contactCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.contactName, { color: theme.text }]}>Dr. Smith</Text>
          <Text style={{ color: theme.subText }}>+60114466495</Text>
        </View>

        {/* Spacer for navigation bar */}
        <View style={{ height: 150 }} /> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    padding: 20, 
    paddingTop: 60, // Matches your other screens to clear system info
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center' 
  },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  criticalCard: { 
    padding: 20, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginBottom: 20,
    borderWidth: 1 
  },
  label: { fontSize: 12, fontWeight: 'bold' },
  value: { fontSize: 24, fontWeight: 'bold', color: '#d9534f', marginTop: 5 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 10 },
  infoBox: { 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20,
    borderWidth: 1 
  },
  allergyText: { color: '#d9534f', fontWeight: '600', marginBottom: 5 },
  contactCard: { 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    borderWidth: 1 
  },
  contactName: { fontWeight: 'bold', fontSize: 15 }
});