import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookOpen, Calendar, Clock, Trophy, Bell, ChevronRight, LogOut } from 'lucide-react-native';
import { useAuth } from '@/utils/auth/AuthContext'; // make sure this path is correct

export default function StudentHome() {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth(); //  use logout from AuthContext

  const todayClasses = [
    { subject: 'Mathematics', time: '9:00 AM', room: 'Room 101', status: 'upcoming' },
    { subject: 'English', time: '10:30 AM', room: 'Room 205', status: 'current' },
    { subject: 'Science', time: '2:00 PM', room: 'Lab 1', status: 'upcoming' },
    { subject: 'History', time: '3:30 PM', room: 'Room 302', status: 'upcoming' },
  ];

  const recentGrades = [
    { subject: 'Mathematics', grade: 'A', assignment: 'Quiz 3' },
    { subject: 'English', grade: 'B+', assignment: 'Essay' },
    { subject: 'Science', grade: 'A-', assignment: 'Lab Report' },
  ];

  const announcements = [
    { title: 'Sports Day Registration', time: '2 hours ago' },
    { title: 'Library Hours Extended', time: '1 day ago' },
    { title: 'Parent-Teacher Meeting', time: '2 days ago' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC', paddingTop: insets.top }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={{ 
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 20, 
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View>
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#1E293B',
            marginBottom: 4
          }}>
            Welcome Back!
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: '#64748B'
          }}>
            John Doe • Grade 8A
          </Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          onPress={async () => {
            await logout();
          }}

          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 6,
            paddingHorizontal: 10,
            backgroundColor: '#FEE2E2',
            borderRadius: 8
          }}
        >
          <LogOut size={18} color="#DC2626" style={{ marginRight: 6 }} />
          <Text style={{ color: '#DC2626', fontWeight: '600' }}>Logout</Text>
        </TouchableOpacity>
      </View>


      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Stats */}
        <View style={{ padding: 20 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12
          }}>
            <View style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#10B98115',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
              }}>
                <Trophy size={20} color="#10B981" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E293B' }}>85%</Text>
              <Text style={{ fontSize: 12, color: '#64748B', textAlign: 'center' }}>Average Grade</Text>
            </View>

            <View style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#3B82F615',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
              }}>
                <Calendar size={20} color="#3B82F6" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E293B' }}>4</Text>
              <Text style={{ fontSize: 12, color: '#64748B', textAlign: 'center' }}>Classes Today</Text>
            </View>

            <View style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#F59E0B15',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
              }}>
                <BookOpen size={20} color="#F59E0B" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E293B' }}>2</Text>
              <Text style={{ fontSize: 12, color: '#64748B', textAlign: 'center' }}>Assignments Due</Text>
            </View>
          </View>
        </View>

        {/* Today's Classes */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '600', 
              color: '#1E293B'
            }}>
              Today's Classes
            </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 14, color: '#10B981', fontWeight: '500' }}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}>
            {todayClasses.map((classItem, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: index < todayClasses.length - 1 ? 1 : 0,
                  borderBottomColor: '#F1F5F9'
                }}
                activeOpacity={0.7}
              >
                <View style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: classItem.status === 'current' ? '#10B981' : '#E2E8F0',
                  marginRight: 12
                }} />
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#1E293B',
                    marginBottom: 2
                  }}>
                    {classItem.subject}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Clock size={12} color="#64748B" style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 12, color: '#64748B', marginRight: 12 }}>
                      {classItem.time}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>
                      {classItem.room}
                    </Text>
                  </View>
                </View>
                
                {classItem.status === 'current' && (
                  <View style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    backgroundColor: '#DCFCE7',
                    borderRadius: 6
                  }}>
                    <Text style={{
                      fontSize: 10,
                      fontWeight: '500',
                      color: '#16A34A'
                    }}>
                      Current
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Grades */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '600', 
              color: '#1E293B'
            }}>
              Recent Grades
            </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 14, color: '#10B981', fontWeight: '500' }}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}>
            {recentGrades.map((grade, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  borderBottomWidth: index < recentGrades.length - 1 ? 1 : 0,
                  borderBottomColor: '#F1F5F9'
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#1E293B',
                    marginBottom: 2
                  }}>
                    {grade.subject}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#64748B'
                  }}>
                    {grade.assignment}
                  </Text>
                </View>
                
                <View style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: grade.grade.startsWith('A') ? '#DCFCE7' : 
                                 grade.grade.startsWith('B') ? '#FEF3C7' : '#FEE2E2',
                  borderRadius: 8
                }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: grade.grade.startsWith('A') ? '#16A34A' : 
                           grade.grade.startsWith('B') ? '#D97706' : '#DC2626'
                  }}>
                    {grade.grade}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Announcements */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '600', 
              color: '#1E293B'
            }}>
              Announcements
            </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 14, color: '#10B981', fontWeight: '500' }}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}>
            {announcements.map((announcement, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: index < announcements.length - 1 ? 1 : 0,
                  borderBottomColor: '#F1F5F9'
                }}
                activeOpacity={0.7}
              >
                <Bell size={16} color="#64748B" style={{ marginRight: 12 }} />
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#1E293B',
                    marginBottom: 2
                  }}>
                    {announcement.title}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#64748B'
                  }}>
                    {announcement.time}
                  </Text>
                </View>
                
                <ChevronRight size={16} color="#64748B" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}