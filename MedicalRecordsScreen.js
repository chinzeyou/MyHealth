import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MedicalRecordsScreen({ onBack, theme }) {
  const [filter, setFilter] = useState('All');

  const records = [
    { id: 1, type: 'Lab Result', title: 'Full Blood Count', date: 'Feb 24, 2026', doctor: 'City Lab Corp', status: 'Normal', icon: 'test-tube' },
    { id: 2, type: 'Prescription', title: 'Amoxicillin 500mg', date: 'Jan 15, 2026', doctor: 'Dr. Lee', status: 'Expired', icon: 'pill' },
    { id: 3, type: 'Visit Summary', title: 'Annual Physical Exam', date: 'Dec 10, 2025', doctor: 'General Hospital', status: 'Completed', icon: 'file-document-outline' },
    { id: 4, type: 'Lab Result', title: 'Lipid Panel', date: 'Nov 20, 2025', doctor: 'City Lab Corp', status: 'Review Needed', icon: 'test-tube' }
  ];

  const filteredRecords = filter === 'All' ? records : records.filter(r => r.type === filter);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Fixed Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Medical Records</Text>
        <View style={{ width: 28 }} /> 
      </View>

      {/* Filter Chips */}
      <View style={[styles.filterContainer, { borderBottomColor: theme.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All', 'Lab Result', 'Prescription', 'Visit Summary'].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={[
                styles.chip, 
                { backgroundColor: theme.card },
                filter === item && { backgroundColor: theme.primary }
              ]}
              onPress={() => setFilter(item)}
            >
              <Text style={[
                styles.chipText, 
                { color: theme.subText },
                filter === item && { color: '#FFF' }
              ]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* SCROLLABLE AREA */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        {filteredRecords.map((record) => (
          <TouchableOpacity 
            key={record.id} 
            style={[styles.recordCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={[styles.iconBox, { backgroundColor: theme.primary + '15' }]}>
              <MaterialCommunityIcons name={record.icon} size={28} color={theme.primary} />
            </View>
            <View style={styles.infoBox}>
              <View style={styles.recordHeader}>
                <Text style={[styles.recordType, { color: theme.primary }]}>{record.type}</Text>
                <Text style={[styles.recordDate, { color: theme.subText }]}>{record.date}</Text>
              </View>
              <Text style={[styles.recordTitle, { color: theme.text }]}>{record.title}</Text>
              <Text style={[styles.doctorText, { color: theme.subText }]}>{record.doctor}</Text>
              
              <View style={styles.footerRow}>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: theme.background },
                  record.status === 'Normal' && { backgroundColor: '#4CAF5020' }
                ]}>
                  <Text style={[
                    styles.statusText, 
                    { color: theme.subText },
                    record.status === 'Normal' && { color: '#4CAF50' }
                  ]}>{record.status}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.border} />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 120 }} /> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, borderBottomWidth: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  filterContainer: { paddingVertical: 10, paddingLeft: 20, borderBottomWidth: 1 },
  chip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10 },
  chipText: { fontSize: 13, fontWeight: '500' },
  scrollContent: { padding: 20 },
  recordCard: { borderRadius: 15, padding: 15, marginBottom: 15, flexDirection: 'row', borderWidth: 1 },
  iconBox: { width: 50, height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  infoBox: { flex: 1 },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  recordType: { fontSize: 10, fontWeight: 'bold' },
  recordDate: { fontSize: 10 },
  recordTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  doctorText: { fontSize: 13, marginTop: 2 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: 'bold' }
});