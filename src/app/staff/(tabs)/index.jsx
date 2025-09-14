import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Users, BookOpen, Calendar, TrendingUp, AlertCircle, Clock } from 'lucide-react-native';

export default function StaffDashboard() {
  const insets = useSafeAreaInsets();

  const stats = [
    { title: 'Total Students', value: '245', icon: Users, color: '#3B82F6' },
    { title: 'Active Classes', value: '12', icon: BookOpen, color: '#10B981' },
    { title: 'Today\'s Events', value: '3', icon: Calendar, color: '#F59E0B' },
    { title: 'Attendance Rate', value: '94%', icon: TrendingUp, color: '#8B5CF6' },
  ];

  const recentActivities = [
    { title: 'New student enrollment', time: '2 hours ago', type: 'info' },
    { title: 'Grade 5 exam results uploaded', time: '4 hours ago', type: 'success' },
    { title: 'Parent-teacher meeting scheduled', time: '1 day ago', type: 'warning' },
    { title: 'Library books overdue reminder', time: '2 days ago', type: 'alert' },
  ];

  const upcomingTasks = [
    { title: 'Submit monthly report', due: 'Due in 2 days' },
    { title: 'Grade assignment papers', due: 'Due tomorrow' },
    { title: 'Prepare lesson plans', due: 'Due in 3 days' },
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
        borderBottomColor: '#E2E8F0'
      }}>
        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          color: '#1E293B',
          marginBottom: 4
        }}>
          Staff Dashboard
        </Text>
        <Text style={{ 
          fontSize: 14, 
          color: '#64748B'
        }}>
          Welcome back, Teacher
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Grid */}
        <View style={{ padding: 20 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#1E293B',
            marginBottom: 16
          }}>
            Overview
          </Text>
          
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 12
          }}>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <View
                  key={index}
                  style={{
                    width: '47%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    padding: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8
                  }}>
                    <View style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: stat.color + '15',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComponent size={20} color={stat.color} />
                    </View>
                  </View>
                  
                  <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#1E293B',
                    marginBottom: 4
                  }}>
                    {stat.value}
                  </Text>
                  
                  <Text style={{
                    fontSize: 12,
                    color: '#64748B'
                  }}>
                    {stat.title}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#1E293B',
            marginBottom: 16
          }}>
            Recent Activities
          </Text>
          
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}>
            {recentActivities.map((activity, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: index < recentActivities.length - 1 ? 1 : 0,
                  borderBottomColor: '#F1F5F9'
                }}
              >
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: activity.type === 'success' ? '#10B981' : 
                                 activity.type === 'warning' ? '#F59E0B' :
                                 activity.type === 'alert' ? '#EF4444' : '#3B82F6',
                  marginRight: 12
                }} />
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#1E293B',
                    marginBottom: 2
                  }}>
                    {activity.title}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#64748B'
                  }}>
                    {activity.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Tasks */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#1E293B',
            marginBottom: 16
          }}>
            Upcoming Tasks
          </Text>
          
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}>
            {upcomingTasks.map((task, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: index < upcomingTasks.length - 1 ? 1 : 0,
                  borderBottomColor: '#F1F5F9'
                }}
                activeOpacity={0.7}
              >
                <Clock size={16} color="#64748B" style={{ marginRight: 12 }} />
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#1E293B',
                    marginBottom: 2
                  }}>
                    {task.title}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#64748B'
                  }}>
                    {task.due}
                  </Text>
                </View>
                
                <View style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  backgroundColor: '#FEF3C7',
                  borderRadius: 6
                }}>
                  <Text style={{
                    fontSize: 10,
                    fontWeight: '500',
                    color: '#D97706'
                  }}>
                    Pending
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}