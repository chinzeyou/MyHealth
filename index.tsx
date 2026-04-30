import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Import all custom screen components
import CalendarScreen from './CalendarScreen';
import EditProfileScreen from './EditProfileScreen';
import EmergencyProfileScreen from './EmergencyProfileScreen';
import MedicalRecordsScreen from './MedicalRecordsScreen';
import SettingsScreen from './SettingsScreen';
import VideoConsultScreen from './VideoConsultScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Dashboard');
  const [booking, setBooking] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // State for Custom Confirmation Modal
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  // Theme Object
  const theme = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    card: isDarkMode ? '#1E1E1E' : '#F9F9F9',
    text: isDarkMode ? '#FFFFFF' : '#333333',
    subText: isDarkMode ? '#AAAAAA' : '#666666',
    border: isDarkMode ? '#333333' : '#EEEEEE',
    primary: '#4A90E2',
    nav: isDarkMode ? '#1A1A1A' : '#FFFFFF'
  };

  const [userProfile, setUserProfile] = useState({
    name: 'Sarah Lee',
    email: 'sarah.l@gmail.com',
    phone: '+60 12-345 6789',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
    ic: '980122-14-5566',
    address: '123 Medical Lane, Kuala Lumpur',
    bloodType: 'O-Positive',
    weight: '70',
    height: '165',
    emergencyContact: 'John Lim (Husband)',
  });

  const handleSaveProfile = (updatedData) => {
    setUserProfile(updatedData);
    setCurrentScreen('Settings');
  };

  // --- DASHBOARD COMPONENT ---
  const DashboardScreen = () => (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.text }]}>Hello, {userProfile.name.split(' ')[0]}!</Text>
          <Text style={[styles.subGreeting, { color: theme.subText }]}>How can we help today?</Text>
        </View>
        <TouchableOpacity 
          style={[styles.profileCircle, { backgroundColor: theme.card }]} 
          onPress={() => setCurrentScreen('Settings')}
        >
          {userProfile.profileImage ? (
            <Image source={{ uri: userProfile.profileImage }} style={{ width: 50, height: 50, borderRadius: 25 }} />
          ) : (
            <Ionicons name="person" size={24} color={theme.subText} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#FFD966' }]} onPress={() => setCurrentScreen('Calendar')}>
          <Ionicons name="calendar-outline" size={32} color="#444" />
          <Text style={styles.cardText}>Book Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#FFD966' }]} onPress={() => setCurrentScreen('Video')}>
          <Ionicons name="videocam-outline" size={32} color="#444" />
          <Text style={styles.cardText}>Video Consult</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#FFD966' }]} onPress={() => setCurrentScreen('Records')}>
          <MaterialCommunityIcons name="file-chart-outline" size={32} color="#444" />
          <Text style={styles.cardText}>Medical Records</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: theme.primary }]} onPress={() => setCurrentScreen('Emergency')}>
          <Ionicons name="shield-checkmark-outline" size={32} color="#FFF" />
          <Text style={styles.cardTextWhite}>Emergency Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.statusCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.statusHeaderRow}>
          <Text style={[styles.statusHeader, { color: theme.text }]}>Upcoming Booking</Text>
          {booking && (
            <TouchableOpacity onPress={() => setCancelModalVisible(true)}>
              <Text style={{color: '#d9534f', fontSize: 13, fontWeight: 'bold'}}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {booking ? (
          <View style={styles.bookingDetailBox}>
            <Ionicons name="time-outline" size={20} color={theme.primary} />
            <Text style={[styles.statusSub, { color: theme.subText }]}>
              Dr. Lee — {booking.month} {booking.date}, {booking.year} at {booking.time}
            </Text>
          </View>
        ) : (
          <Text style={[styles.statusSub, { color: theme.subText }]}>No upcoming appointments scheduled.</Text>
        )}
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: booking ? '100%' : '0%' }]} />
        </View>
      </View>
      
      <View style={{ height: 120 }} /> 
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* SCREEN ROUTER */}
      {currentScreen === 'Dashboard' && <DashboardScreen />}
      
      {currentScreen === 'Calendar' && (
        <CalendarScreen 
          theme={theme}
          onBack={() => setCurrentScreen('Dashboard')} 
          onGoToDashboard={() => setCurrentScreen('Dashboard')}
          onConfirmBooking={(data) => setBooking(data)} 
        />
      )}

      {currentScreen === 'Records' && (
        <MedicalRecordsScreen theme={theme} onBack={() => setCurrentScreen('Dashboard')} />
      )}

      {currentScreen === 'Emergency' && (
        <EmergencyProfileScreen 
          theme={theme}
          userData={userProfile} 
          onBack={() => setCurrentScreen('Dashboard')} 
        />
      )}

      {currentScreen === 'Video' && (
        <VideoConsultScreen onBack={() => setCurrentScreen('Dashboard')} />
      )}

      {currentScreen === 'Settings' && (
        <SettingsScreen 
          theme={theme}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          userData={userProfile}
          onBack={() => setCurrentScreen('Dashboard')} 
          onEdit={() => setCurrentScreen('EditProfile')}
        />
      )}

      {currentScreen === 'EditProfile' && (
        <EditProfileScreen 
          theme={theme}
          initialData={userProfile} 
          onBack={() => setCurrentScreen('Settings')} 
          onSave={handleSaveProfile}
        />
      )}

      {/* CUSTOM THEMED MODAL FOR CANCELLATION */}
      <Modal
        transparent={true}
        visible={cancelModalVisible}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Cancel Booking</Text>
            <Text style={[styles.modalBody, { color: theme.subText }]}>
              Are you sure you want to cancel your appointment with Dr. Lee? This action cannot be undone.
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelBtn} 
                onPress={() => setCancelModalVisible(false)}
              >
                <Text style={{ color: theme.subText, fontWeight: '500' }}>Keep Booking</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalConfirmBtn, { backgroundColor: '#d9534f' }]} 
                onPress={() => {
                  setBooking(null);
                  setCancelModalVisible(false);
                }}
              >
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Yes, Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* NAVIGATION BAR */}
      {currentScreen !== 'Video' && currentScreen !== 'Emergency' && currentScreen !== 'EditProfile' && (
        <View style={[styles.navBar, { backgroundColor: theme.nav, borderTopColor: theme.border }]}>
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Dashboard')}>
            <Ionicons name="home" size={24} color={currentScreen === 'Dashboard' ? theme.primary : "#888"} />
            <Text style={[styles.navText, { color: currentScreen === 'Dashboard' ? theme.primary : "#888" }]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Calendar')}>
            <Ionicons name="calendar" size={24} color={currentScreen === 'Calendar' ? theme.primary : "#888"} />
            <Text style={[styles.navText, { color: currentScreen === 'Calendar' ? theme.primary : "#888" }]}>Book</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Records')}>
            <Ionicons name="heart" size={24} color={currentScreen === 'Records' ? theme.primary : "#888"} />
            <Text style={[styles.navText, { color: currentScreen === 'Records' ? theme.primary : "#888" }]}>Records</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Settings')}>
            <Ionicons name="settings" size={24} color={currentScreen === 'Settings' ? theme.primary : "#888"} />
            <Text style={[styles.navText, { color: currentScreen === 'Settings' ? theme.primary : "#888" }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50 },
  greeting: { fontSize: 24, fontWeight: 'bold' },
  subGreeting: { fontSize: 16 },
  profileCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 10 },
  card: { width: '47%', height: 120, borderRadius: 15, padding: 15, marginBottom: 20, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  cardText: { marginTop: 10, fontWeight: '600', textAlign: 'center', fontSize: 13, color: '#444' },
  cardTextWhite: { marginTop: 10, fontWeight: '600', textAlign: 'center', fontSize: 13, color: '#FFF' },
  statusCard: { padding: 20, borderRadius: 15, borderWidth: 1, marginTop: 10 },
  statusHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusHeader: { fontWeight: 'bold', fontSize: 16 },
  bookingDetailBox: { flexDirection: 'row', alignItems: 'center' },
  statusSub: { marginLeft: 8 },
  progressBarBg: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginTop: 15 },
  progressBarFill: { height: '100%', backgroundColor: '#4A90E2', borderRadius: 4 },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, position: 'absolute', bottom: 0, width: '100%' },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 12, marginTop: 4 },
  
  // Custom Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', padding: 25, borderRadius: 20, borderWidth: 1, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  modalBody: { fontSize: 14, textAlign: 'center', marginBottom: 25, lineHeight: 20 },
  modalButtons: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  modalCancelBtn: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  modalConfirmBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, marginLeft: 10 }
});