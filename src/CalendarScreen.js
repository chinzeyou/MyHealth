import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CalendarScreen({ onBack, onGoToDashboard, onConfirmBooking, theme }) {
  const [viewingDate, setViewingDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Manual list of time slots including 5:30 PM
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM' // <--- Added 5:30 PM here
  ];

  // Manual list of blocked slots
  const unavailableSlots = ['10:00 AM', '01:30 PM', '02:30 PM', '04:00 PM'];

  const months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = viewingDate.getFullYear();
  const month = viewingDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const changeMonth = (dir) => setViewingDate(new Date(year, month + dir, 1));

  const handleFinalConfirm = () => {
    onConfirmBooking({
      date: selectedDate,
      month: months[month],
      year: year,
      time: selectedTime
    });
    setModalVisible(false);
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <View style={[styles.successContainer, { backgroundColor: theme.background }]}>
        <View style={styles.successIconCircle}>
          <Ionicons name="checkmark" size={60} color="#FFF" />
        </View>
        <Text style={[styles.successTitle, { color: theme.text }]}>Booking Received!</Text>
        <Text style={[styles.successSub, { color: theme.subText }]}>
          Your appointment for {months[month]} {selectedDate}, {year} at {selectedTime} has been received.
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={onGoToDashboard}>
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Select Date & Time</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        {/* Month Navigation */}
        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Ionicons name="chevron-back" size={24} color={theme.primary} />
          </TouchableOpacity>
          <Text style={[styles.monthText, { color: theme.text }]}>{months[month]} {year}</Text>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Ionicons name="chevron-forward" size={24} color={theme.primary} />
          </TouchableOpacity>
        </View>
        
        {/* Calendar */}
        <View style={styles.calendarGrid}>
          {daysOfWeek.map((day, idx) => (
            <Text key={idx} style={[styles.dayLabel, { color: theme.subText }]}>{day}</Text>
          ))}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <View key={`e-${i}`} style={styles.dateCircle} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const dayNum = i + 1;
            const isPast = new Date(year, month, dayNum) < today;
            const isSel = selectedDate === dayNum;
            return (
              <TouchableOpacity 
                key={i} disabled={isPast}
                style={[styles.dateCircle, isSel && { backgroundColor: theme.primary, borderRadius: 20 }, isPast && { opacity: 0.2 }]}
                onPress={() => setSelectedDate(dayNum)}
              >
                <Text style={[styles.dateText, { color: isSel ? '#FFF' : theme.text }]}>{dayNum}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Time Grid */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Available Slots</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map(time => {
            const isUnavail = unavailableSlots.includes(time);
            const isSel = selectedTime === time;
            return (
              <TouchableOpacity 
                key={time} 
                disabled={isUnavail}
                style={[
                    styles.timeSlot, 
                    { backgroundColor: theme.card },
                    isSel && { backgroundColor: theme.primary }, 
                    isUnavail && { opacity: 0.3 }
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                    styles.timeText, 
                    { color: theme.text },
                    isSel && { color: '#FFF', fontWeight: 'bold' }, 
                    isUnavail && { color: theme.subText, textDecorationLine: 'line-through' }
                ]}>
                    {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity 
          style={[styles.primaryButton, (!selectedDate || !selectedTime) && { backgroundColor: theme.border }]} 
          onPress={() => (selectedDate && selectedTime) && setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Confirm Booking?</Text>
            <Text style={[styles.modalBody, { color: theme.subText }]}>
              {months[month]} {selectedDate} at {selectedTime}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={{ color: theme.subText }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.confirmBtn, { backgroundColor: theme.primary }]} onPress={handleFinalConfirm}>
                <Text style={{color:'#FFF', fontWeight:'bold'}}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20, paddingTop: 60, borderBottomWidth: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  monthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  monthText: { fontSize: 18, fontWeight: 'bold' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  dayLabel: { width: '14.28%', textAlign: 'center', fontWeight: 'bold', marginBottom: 10 },
  dateCircle: { width: '14.28%', height: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  dateText: { fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  timeSlot: { width: '31%', padding: 12, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  timeText: { fontSize: 11 },
  primaryButton: { backgroundColor: '#4A90E2', padding: 18, borderRadius: 10, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, paddingTop: 60 },
  successIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  successTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  successSub: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 30 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', padding: 25, borderRadius: 15, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalBody: { fontSize: 15, textAlign: 'center', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', width: '100%', justifyContent: 'space-around' },
  cancelBtn: { padding: 10 },
  confirmBtn: { padding: 10, borderRadius: 8, paddingHorizontal: 20 }
});