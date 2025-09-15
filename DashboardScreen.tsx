import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Modal, Image } from 'react-native';
import { Svg, Path, Circle, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import BottomNav from './ui/BottomNav';
import { useTheme } from '../contexts/ThemeContext';
import { useMedication } from '../contexts/MedicationContext';
import { useUser } from '../contexts/UserContext';
import { getMedicationIcon, getMedicationTypeColor } from '../utils/medicationIcons';

interface DashboardScreenProps {
  onHome: () => void;
  onNotifications: () => void;
  onProfile: () => void;
  onSeeDoctor: () => void;
  onArticles: () => void;
  onHealthRecords: () => void;
  onSymptomChecker: () => void;
  onMedications: () => void;
  onSettings: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
  onHome, 
  onNotifications, 
  onProfile,
  onSeeDoctor,
  onArticles,
  onHealthRecords,
  onSymptomChecker,
  onMedications,
  onSettings
}) => {
  const { colors } = useTheme();
  const { medications: contextMedications } = useMedication();
  const { userProfile, isLoading } = useUser();
  const [takenMedications, setTakenMedications] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGlossary, setShowGlossary] = useState(false);

  const takeMedication = (index: number) => {
    setTakenMedications(prev => [...prev, index]);
  };

  // Medical Glossary Data
  const glossaryTerms = [
    {
      id: 1,
      term: 'Hypertension',
      category: 'Cardiovascular',
      definition: 'High blood pressure, a condition where blood pressure in the arteries is persistently elevated.',
      symptoms: ['Headaches', 'Shortness of breath', 'Nosebleeds'],
      causes: ['Genetics', 'Poor diet', 'Lack of exercise', 'Stress']
    },
    {
      id: 2,
      term: 'Diabetes',
      category: 'Endocrine',
      definition: 'A group of metabolic disorders characterized by high blood sugar levels.',
      symptoms: ['Frequent urination', 'Excessive thirst', 'Fatigue', 'Blurred vision'],
      causes: ['Genetics', 'Obesity', 'Sedentary lifestyle', 'Poor diet']
    },
    {
      id: 3,
      term: 'Asthma',
      category: 'Respiratory',
      definition: 'A respiratory condition marked by attacks of spasm in the bronchi of the lungs.',
      symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing'],
      causes: ['Allergies', 'Air pollution', 'Respiratory infections', 'Genetics']
    },
    {
      id: 4,
      term: 'Migraine',
      category: 'Neurological',
      definition: 'A recurring headache disorder characterized by moderate to severe headaches.',
      symptoms: ['Severe headache', 'Nausea', 'Light sensitivity', 'Sound sensitivity'],
      causes: ['Stress', 'Hormonal changes', 'Certain foods', 'Sleep patterns']
    },
    {
      id: 5,
      term: 'Arthritis',
      category: 'Musculoskeletal',
      definition: 'Inflammation of one or more joints, causing pain and stiffness.',
      symptoms: ['Joint pain', 'Stiffness', 'Swelling', 'Reduced range of motion'],
      causes: ['Age', 'Genetics', 'Injury', 'Autoimmune disorders']
    },
    {
      id: 6,
      term: 'Pneumonia',
      category: 'Respiratory',
      definition: 'An infection that inflames air sacs in one or both lungs.',
      symptoms: ['Cough with phlegm', 'Fever', 'Chills', 'Difficulty breathing'],
      causes: ['Bacteria', 'Viruses', 'Fungi', 'Weakened immune system']
    },
    {
      id: 7,
      term: 'Depression',
      category: 'Mental Health',
      definition: 'A mental health disorder characterized by persistent feelings of sadness.',
      symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Sleep disturbances'],
      causes: ['Genetics', 'Brain chemistry', 'Trauma', 'Medical conditions']
    },
    {
      id: 8,
      term: 'Osteoporosis',
      category: 'Musculoskeletal',
      definition: 'A bone disease that occurs when the body loses too much bone mass.',
      symptoms: ['Back pain', 'Loss of height', 'Stooped posture', 'Bone fractures'],
      causes: ['Age', 'Hormonal changes', 'Low calcium', 'Sedentary lifestyle']
    }
  ];

  const filteredTerms = glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchFocus = () => {
    setShowGlossary(true);
  };

  const quickActions = [
    {
      id: 'symptom-checker',
      title: 'Symptom\nchecker',
      icon: (
        <Svg width={40} height={40} viewBox="0 0 44 43" fill="none">
          <Path d="M25.5583 43C21.6883 43 18.3916 41.6383 15.6683 38.915C12.9449 36.1917 11.5833 32.895 11.5833 29.025V27.7888C8.50159 27.2871 5.9395 25.8448 3.897 23.4619C1.8545 21.079 0.833252 18.275 0.833252 15.05V2.15H7.28325V0H11.5833V8.6H7.28325V6.45H5.13325V15.05C5.13325 17.415 5.97534 19.4396 7.6595 21.1238C9.34367 22.8079 11.3683 23.65 13.7333 23.65C16.0983 23.65 18.1228 22.8079 19.807 21.1238C21.4912 19.4396 22.3333 17.415 22.3333 15.05V6.45H20.1833V8.6H15.8833V0H20.1833V2.15H26.6333V15.05C26.6333 18.275 25.612 21.079 23.5695 23.4619C21.527 25.8448 18.9649 27.2871 15.8833 27.7888V29.025C15.8833 31.7125 16.8239 33.9969 18.7051 35.8781C20.5864 37.7594 22.8708 38.7 25.5583 38.7C28.2458 38.7 30.5301 37.7594 32.4114 35.8781C34.2926 33.9969 35.2333 31.7125 35.2333 29.025V25.4237C33.9791 24.9938 32.9489 24.2233 32.1426 23.1125C31.3364 22.0017 30.9333 20.7475 30.9333 19.35C30.9333 17.5583 31.5603 16.0354 32.8145 14.7813C34.0687 13.5271 35.5916 12.9 37.3833 12.9C39.1749 12.9 40.6978 13.5271 41.952 14.7813C43.2062 16.0354 43.8333 17.5583 43.8333 19.35C43.8333 20.7475 43.4301 22.0017 42.6239 23.1125C41.8176 24.2233 40.7874 24.9938 39.5333 25.4237V29.025C39.5333 32.895 38.1716 36.1917 35.4483 38.915C32.7249 41.6383 29.4283 43 25.5583 43ZM37.3833 21.5C37.9924 21.5 38.503 21.294 38.9151 20.8819C39.3272 20.4698 39.5333 19.9592 39.5333 19.35C39.5333 18.7408 39.3272 18.2302 38.9151 17.8181C38.503 17.406 37.9924 17.2 37.3833 17.2C36.7741 17.2 36.2635 17.406 35.8514 17.8181C35.4393 18.2302 35.2333 18.7408 35.2333 19.35C35.2333 19.9592 35.4393 20.4698 35.8514 20.8819C36.2635 21.294 36.7741 21.5 37.3833 21.5Z" fill="#4F8EF7"/>
        </Svg>
      ),
      onPress: onSymptomChecker
    },
    {
      id: 'medications',
      title: 'My Meds',
      icon: (
        <Svg width={40} height={40} viewBox="0 0 40 43" fill="none">
          <Path d="M12.8158 43L8.71053 39.8537V31.4634H6.6579C5.52895 31.4634 4.5625 31.0526 3.75855 30.2311C2.95461 29.4096 2.55263 28.4219 2.55263 27.2683V11.5366C1.97105 11.5366 1.48355 11.3356 1.09013 10.9335C0.696711 10.5315 0.5 10.0333 0.5 9.43902C0.5 8.84472 0.696711 8.34654 1.09013 7.94451C1.48355 7.54248 1.97105 7.34146 2.55263 7.34146H8.71053V4.19512H7.68421C7.10263 4.19512 6.61513 3.99411 6.22171 3.59207C5.82829 3.19004 5.63158 2.69187 5.63158 2.09756C5.63158 1.50325 5.82829 1.00508 6.22171 0.603049C6.61513 0.201016 7.10263 0 7.68421 0H13.8421C14.4237 0 14.9112 0.201016 15.3046 0.603049C15.698 1.00508 15.8947 1.50325 15.8947 2.09756C15.8947 2.69187 15.698 3.19004 15.3046 3.59207C14.9112 3.99411 14.4237 4.19512 13.8421 4.19512H12.8158V7.34146H18.9737C19.5553 7.34146 20.0428 7.54248 20.4362 7.94451C20.8296 8.34654 21.0263 8.84472 21.0263 9.43902C21.0263 10.0333 20.8296 10.5315 20.4362 10.9335C20.0428 11.3356 19.5553 11.5366 18.9737 11.5366V27.2683C18.9737 28.4219 18.5717 29.4096 17.7678 30.2311C16.9638 31.0526 15.9974 31.4634 14.8684 31.4634H12.8158V43ZM6.6579 27.2683H14.8684V24.122H11.2763C10.8658 24.122 10.5066 23.9646 10.1987 23.65C9.89079 23.3354 9.73684 22.9683 9.73684 22.5488C9.73684 22.1293 9.89079 21.7622 10.1987 21.4476C10.5066 21.1329 10.8658 20.9756 11.2763 20.9756H14.8684V17.8293H11.2763C10.8658 17.8293 10.5066 17.672 10.1987 17.3573C9.89079 17.0427 9.73684 16.6756 9.73684 16.2561C9.73684 15.8366 9.89079 15.4695 10.1987 15.1549C10.5066 14.8402 10.8658 14.6829 11.2763 14.6829H14.8684V11.5366H6.6579V27.2683ZM27.1842 41.9512C26.0553 41.9512 25.0888 41.5404 24.2849 40.7189C23.4809 39.8974 23.0789 38.9098 23.0789 37.7561V24.122C23.0789 23.1081 23.25 22.2691 23.5921 21.6049C23.9342 20.9406 24.2934 20.3638 24.6697 19.8744C25.0461 19.385 25.3882 18.9917 25.6961 18.6945C26.0039 18.3974 26.1579 18.1089 26.1579 17.8293V16.7805C25.5763 16.7805 25.0888 16.5795 24.6954 16.1774C24.302 15.7754 24.1053 15.2772 24.1053 14.6829C24.1053 14.0886 24.302 13.5904 24.6954 13.1884C25.0888 12.7864 25.5763 12.5854 26.1579 12.5854H36.4211C37.0026 12.5854 37.4901 12.7864 37.8836 13.1884C38.277 13.5904 38.4737 14.0886 38.4737 14.6829C38.4737 15.2772 38.277 15.7754 37.8836 16.1774C37.4901 16.5795 37.0026 16.7805 36.4211 16.7805V17.8293C36.4211 18.1089 36.5921 18.4236 36.9342 18.7732C37.2763 19.1228 37.6526 19.5423 38.0632 20.0317C38.4395 20.5211 38.773 21.098 39.0638 21.7622C39.3546 22.4264 39.5 23.213 39.5 24.122V37.7561C39.5 38.9098 39.098 39.8974 38.2941 40.7189C37.4901 41.5404 36.5237 41.9512 35.3947 41.9512H27.1842ZM27.1842 25.1707H35.3947V24.122C35.3947 23.5976 35.2408 23.1431 34.9329 22.7585C34.625 22.374 34.2829 21.9545 33.9066 21.5C33.5303 21.0455 33.1711 20.5386 32.8289 19.9793C32.4868 19.4199 32.3158 18.7033 32.3158 17.8293V16.7805H30.2632V17.8293C30.2632 18.6683 30.1007 19.3675 29.7757 19.9268C29.4507 20.4862 29.1 20.9931 28.7237 21.4476C28.3474 21.902 27.9967 22.3303 27.6717 22.7323C27.3467 23.1343 27.1842 23.5976 27.1842 24.122V25.1707ZM27.1842 31.4634H35.3947V28.3171H27.1842V31.4634ZM27.1842 37.7561H35.3947V34.6098H27.1842V37.7561Z" fill="#4F8EF7"/>
        </Svg>
      ),
      onPress: onMedications
    },
    {
      id: 'see-doctor',
      title: 'See a\nDoctor',
      icon: (
        <Svg width={40} height={40} viewBox="0 0 39 39" fill="none">
          <Path d="M33.9168 27.3375C31.5418 22.825 29.1668 23.5375 26.5543 23.3C26.7918 24.0125 26.7918 24.725 26.7918 25.675C30.5918 26.625 31.5418 31.1375 31.5418 33.75V36.125H26.7918V33.75H29.1668C29.1668 33.75 29.1668 27.8125 25.6043 27.8125C22.0418 27.8125 22.0418 33.5125 22.0418 33.75H24.4168V36.125H19.6668V33.75C19.6668 31.1375 20.6168 26.3875 24.4168 25.675C24.4168 24.25 24.1793 23.0625 23.9418 22.5875C23.4668 22.35 22.9918 21.875 22.9918 21.1625C22.9918 19.7375 24.8918 20.2125 26.3168 17.6C26.3168 17.6 28.4543 12.1375 27.7418 7.3875H25.3668C25.3668 6.9125 25.6043 6.675 25.6043 6.2C25.6043 5.725 25.6043 5.4875 25.3668 5.0125H27.2668C26.5543 2.6375 24.1793 0.5 19.6668 0.5C15.1543 0.5 12.7793 2.6375 11.8293 5.25H13.7293C13.7293 5.725 13.4918 5.9625 13.4918 6.4375C13.4918 6.9125 13.4918 7.15 13.7293 7.625H11.3543C10.8793 12.375 12.7793 17.8375 12.7793 17.8375C14.2043 20.2125 16.1043 19.7375 16.1043 21.4C16.1043 22.5875 14.9168 23.0625 13.4918 23.3C13.0168 23.775 12.5418 24.725 12.5418 26.625V29.475C13.9668 29.95 14.9168 31.375 14.9168 32.8C14.9168 34.4625 13.2543 36.125 11.3543 36.125C9.4543 36.125 7.7918 34.4625 7.7918 32.5625C7.7918 30.9 8.7418 29.7125 10.1668 29.2375V26.3875C10.1668 25.2 10.4043 24.25 10.6418 23.3C8.9793 23.5375 7.0793 24.25 5.4168 27.3375C3.9918 29.95 3.2793 38.5 3.2793 38.5H35.8168C36.0543 38.5 35.3418 29.95 33.9168 27.3375ZM16.1043 6.4375C16.1043 4.5375 17.7668 2.875 19.6668 2.875C21.5668 2.875 23.2293 4.5375 23.2293 6.4375C23.2293 8.3375 21.5668 10 19.6668 10C17.7668 10 16.1043 8.3375 16.1043 6.4375Z" fill="#4F8EF7"/>
          <Path d="M12.542 32.5625C12.542 32.8774 12.4169 33.1795 12.1942 33.4022C11.9715 33.6249 11.6694 33.75 11.3545 33.75C11.0395 33.75 10.7375 33.6249 10.5148 33.4022C10.2921 33.1795 10.167 32.8774 10.167 32.5625C10.167 32.2476 10.2921 31.9455 10.5148 31.7228C10.7375 31.5001 11.0395 31.375 11.3545 31.375C11.6694 31.375 11.9715 31.5001 12.1942 31.7228C12.4169 31.9455 12.542 32.2476 12.542 32.5625Z" fill="#4F8EF7"/>
        </Svg>
      ),
      onPress: onSeeDoctor
    }
  ];

  const healthStats = [
    { 
      value: '734', 
      unit: 'bpm', 
      label: 'Heart Rate', 
      color: '#FF7461',
      icon: (
        <Svg width={50} height={50} viewBox="0 0 46 49" fill="none">
          <Path d="M3.83325 24.5H13.0319C14.3894 24.5 15.5778 25.4116 15.9295 26.7228L19.1666 38.7917L22.9999 24.5" stroke={colors.background === '#000000' ? '#FFFFFF' : '#FF7461'} strokeWidth="1.5" strokeLinejoin="round"/>
          <Path d="M42.1667 24.5H32.9681C31.6106 24.5 30.4222 23.5884 30.0705 22.2772L26.8334 10.2083L23.0001 24.5" stroke={colors.background === '#000000' ? '#FFFFFF' : '#FF7461'} strokeWidth="1.5" strokeLinejoin="round"/>
        </Svg>
      )
    },
    { 
      value: '12,6', 
      unit: 'km', 
      label: 'Distance', 
      color: '#4D58DE',
      icon: (
        <Svg width={50} height={50} viewBox="0 0 40 40" fill="none">
          <Path d="M10.9589 30.8253C12.4895 31.1314 13.2548 31.2845 13.9212 31.2685C16.1824 31.2145 18.221 29.8935 19.1941 27.8517C19.4809 27.25 19.6539 26.4889 19.9998 24.9668V24.9668L22.0102 26.8814C22.5594 27.4045 22.834 27.666 23.0306 27.9749C23.2049 28.2488 23.3337 28.5491 23.4117 28.8642C23.4998 29.2196 23.4998 29.5989 23.4998 30.3573V37.0201C23.4998 37.4682 23.4998 37.6922 23.587 37.8633C23.6637 38.0139 23.7861 38.1362 23.9366 38.2129C24.1078 38.3001 24.3318 38.3001 24.7798 38.3001H25.7661C26.0145 38.3001 26.1387 38.3001 26.2405 38.2728C26.5164 38.1988 26.7318 37.9833 26.8058 37.7075C26.8332 37.6056 26.8332 37.4814 26.8332 37.2331V29.8521C26.8332 27.2646 25.7727 24.7902 23.899 23.0057V23.0057C23.5467 22.6702 23.391 22.1776 23.4864 21.7006L24.3332 17.4668C26.2452 19.6729 29.0657 21.2301 32.222 21.5657C32.6205 21.6081 32.8197 21.6293 33.0092 21.5498C33.165 21.4844 33.3193 21.3457 33.4007 21.1977C33.4998 21.0176 33.4998 20.7962 33.4998 20.3535V19.5801C33.4998 19.1349 33.4998 18.9123 33.4277 18.7542C33.3577 18.6004 33.2753 18.5052 33.1333 18.4137C32.9872 18.3195 32.7328 18.2824 32.2239 18.2082C29.6249 17.8291 27.4831 16.3126 26.3332 14.3001L24.6665 11.6335C23.9998 10.6335 22.9998 9.9668 21.8332 9.9668C21.6997 9.9668 21.5781 9.97867 21.462 9.99609C20.9788 10.0686 20.7371 10.1048 20.6268 10.13C20.4707 10.1656 20.4885 10.1606 20.3367 10.2118C20.2294 10.2479 20.0207 10.3362 19.6032 10.5128L16.716 11.7343C14.9507 12.4812 14.068 12.8546 13.4198 13.4602C12.847 13.9954 12.408 14.6577 12.1383 15.3939C11.8332 16.2268 11.8332 17.1852 11.8332 19.102V20.3535C11.8332 20.8015 11.8332 21.0255 11.9204 21.1967C11.9971 21.3472 12.1194 21.4696 12.27 21.5463C12.4411 21.6335 12.6651 21.6335 13.1132 21.6335H13.8865C14.3345 21.6335 14.5586 21.6335 14.7297 21.5463C14.8802 21.4696 15.0026 21.3472 15.0793 21.1967C15.1665 21.0255 15.1665 20.8015 15.1665 20.3535V19.1857C15.1665 18.0635 15.1665 17.5024 15.3393 17.0155C15.5135 16.5248 15.8123 16.0879 16.2065 15.7478C16.5977 15.4102 17.1206 15.2069 18.1665 14.8001V14.8001L16.4359 23.5614C16.1084 25.2191 15.9447 26.0479 15.4966 26.6157C15.1025 27.115 14.5599 27.4761 13.9472 27.6469C13.2505 27.8411 12.4227 27.6721 10.7671 27.3343L8.59225 26.8904C8.1517 26.8005 7.93142 26.7556 7.74589 26.8071C7.58271 26.8525 7.43813 26.9485 7.33297 27.0812C7.21343 27.2322 7.16934 27.4526 7.08116 27.8935L6.91753 28.7117C6.82966 29.151 6.78573 29.3707 6.83767 29.5556C6.88336 29.7182 6.97936 29.8622 7.11193 29.967C7.26264 30.086 7.48231 30.13 7.92165 30.2178L10.9589 30.8253Z" fill={colors.background === '#000000' ? '#FFFFFF' : '#4D58DE'}/>
          <Rect x="20" y="1.66699" width="6.66667" height="6.66667" rx="1.67" fill={colors.background === '#000000' ? '#FFFFFF' : '#4D58DE'}/>
        </Svg>
      )
    },
    { 
      value: '12', 
      unit: 'hrs', 
      label: 'Sleep', 
      color: '#007AEB',
      icon: (
        <Svg width={50} height={50} viewBox="0 0 58 59" fill="none">
          <Path d="M50.1494 37.8731C47.237 39.3037 44.0042 40.1 40.6 40.1C27.787 40.1 17.4 28.8176 17.4 14.9C17.4 11.202 18.1334 7.69007 19.4507 4.52637C11.401 8.4804 5.80005 17.2794 5.80005 27.4994C5.80005 41.417 16.187 52.6994 29 52.6994C38.4085 52.6994 46.509 46.6161 50.1494 37.8731Z" fill={colors.background === '#000000' ? '#FFFFFF' : '#007AEB'}/>
        </Svg>
      )
    },
    { 
      value: '540', 
      unit: 'cals', 
      label: 'Calories', 
      color: '#FEAA48',
      icon: (
        <Svg width={50} height={50} viewBox="0 0 51 49" fill="none">
          <Path fillRule="evenodd" clipRule="evenodd" d="M29.9796 4.98248C30.6866 5.16285 31.2788 5.62618 31.6059 6.25473C32.839 8.62418 33.7593 10.0623 34.6852 11.2282C35.6224 12.4085 36.6137 13.3747 38.1218 14.8236C41.6067 18.1718 43.3499 22.5652 43.3499 26.9505C43.3499 31.3357 41.6067 35.7291 38.1218 39.0773C31.1509 45.7748 19.8489 45.7748 12.878 39.0773C9.39312 35.7291 7.64991 31.3357 7.6499 26.9505C7.64989 22.5652 9.39311 18.1718 12.878 14.8236C13.6073 14.1229 14.7041 13.9133 15.657 14.2925C16.6099 14.6717 17.2312 15.5651 17.2312 16.556C17.2312 19.2995 17.4095 21.39 18.2447 23.0574C18.7039 23.9743 19.4203 24.8707 20.655 25.6706C20.9499 23.0717 21.4901 19.9054 22.22 16.8999C22.7946 14.5337 23.5094 12.1713 24.36 10.2014C24.7855 9.21603 25.2667 8.27782 25.8132 7.46776C26.3451 6.67928 27.0285 5.87691 27.9106 5.31188C28.5192 4.92207 29.2727 4.80211 29.9796 4.98248ZM30.9093 37.0476C27.9218 39.918 23.078 39.918 20.0905 37.0476C18.5968 35.6125 17.8499 33.7314 17.8499 31.8504C17.8499 31.8504 20.0905 33.0754 24.225 33.0754C24.225 30.6254 25.5 23.2754 27.4125 22.0504C28.6875 24.5004 29.4155 25.218 30.9093 26.6532C32.403 28.0883 33.1499 29.9694 33.1499 31.8504C33.1499 33.7314 32.403 35.6125 30.9093 37.0476Z" fill={colors.background === '#000000' ? '#FFFFFF' : '#FEAA48'}/>
        </Svg>
      )
    }
  ];

  // Medications are now managed by the MedicationContext

  const articles = [
    {
      id: 1,
      title: '5 Ways to Manage Stress Daily',
      icon: '🎯',
      image: require('../assets/images/1140-man-at-desk.jpg'),
      category: 'Mental Health',
      readTime: '5 min read',
      description: 'Learn effective techniques to manage daily stress and improve your mental wellbeing.',
      imageColor: '#FFE4E1'
    },
    {
      id: 2,
      title: '10 Healthy Habits for a Longer Life',
      icon: '🥗',
      image: require('../assets/images/images.jpg'),
      category: 'Lifestyle',
      readTime: '8 min read',
      description: 'Discover simple daily habits that can significantly improve your longevity and quality of life.',
      imageColor: '#F0F8E8'
    },
    {
      id: 3,
      title: 'Diabetes: Causes, and Prevention',
      icon: '🩺',
      image: require('../assets/images/MicrosoftTeams-image-10-1020x680.jpg.optimal.jpg'),
      category: 'Health Conditions',
      readTime: '6 min read',
      description: 'Understanding diabetes, its causes, and effective prevention strategies for better health.',
      imageColor: '#E8F4FD'
    },
    {
      id: 4,
      title: 'Heart Health: Exercise Tips',
      icon: '❤️',
      image: require('../assets/images/Heart-health-feb-copy.jpg'),
      category: 'Fitness',
      readTime: '7 min read',
      description: 'Essential exercises and lifestyle changes to maintain a healthy heart and cardiovascular system.',
      imageColor: '#FFEBEE'
    },
    {
      id: 5,
      title: 'Sleep Better: Night Routines',
      icon: '😴',
      image: require('../assets/images/why-is-sleep-important.jpg'),
      category: 'Sleep',
      readTime: '4 min read',
      description: 'Create the perfect bedtime routine for better sleep quality and overall health.',
      imageColor: '#F3E5F5'
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
          <View style={styles.headerLeft}>
            <View style={[styles.profileAvatar, { backgroundColor: colors.primary }]}>
              {userProfile?.profilePicture ? (
                <Image 
                  source={{ uri: userProfile.profilePicture }} 
                  style={styles.profileAvatarImage}
                  resizeMode="cover"
                />
              ) : (
                userProfile?.name ? (
                  <Text style={styles.profileAvatarText}>
                    {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </Text>
                ) : (
                  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </Svg>
                )
              )}
            </View>
            <View style={styles.headerText}>
              <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome Back</Text>
              <Text style={[styles.userName, { color: colors.text }]}>
                {isLoading ? 'Loading...' : (userProfile?.name || 'User')}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsButton} onPress={onSettings}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
              <Circle cx="12" cy="12" r="3"/>
              <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </Svg>
          </TouchableOpacity>
        </View>
        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2} style={styles.searchIcon}>
            <Circle cx="11" cy="11" r="8"/>
            <Path d="M21 21l-4.35-4.35"/>
          </Svg>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search glossary"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleSearchFocus}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={action.onPress}
            >
              <View style={styles.actionIcon}>
                {action.icon}
              </View>
              <Text style={[styles.actionTitle, { color: colors.text }]}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Health Tracker */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: 28, fontWeight: '600', marginBottom: 32 }]}>Health Tracker</Text>
          <View style={styles.statsGrid}>
            {healthStats.map((stat, index) => (
              <View key={index} style={[styles.statCard, { backgroundColor: colors.card }]}>
                <View style={styles.statIconContainer}>
                  {stat.icon}
                </View>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {stat.value}
                  <Text style={[styles.statUnit, { color: colors.text }]}> {stat.unit}</Text>
                </Text>
                <Text style={[styles.statLabel, { color: '#9CA3AF' }]}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Daily Medication */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Daily Medication</Text>
          <View style={styles.medicationList}>
            {contextMedications.filter(med => !med.taken).map((medication) => (
              <View key={medication.id} style={[styles.medicationCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.medicationInfo}>
                  {getMedicationIcon({ type: medication.type, size: 16, showBackground: false })}
                  <View style={styles.medicationText}>
                    <Text style={[styles.medicationName, { color: colors.text }]}>{medication.name}</Text>
                    <Text style={[styles.medicationDosage, { color: colors.textSecondary }]}>
                      {medication.quantity} {medication.type}, {medication.dosage} {medication.unit}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={[styles.takeButton, { backgroundColor: colors.primary }]}
                  onPress={() => {/* Handle medication taken */}}
                >
                  <Text style={styles.takeButtonText}>Take</Text>
                </TouchableOpacity>
              </View>
            ))}
            {contextMedications.filter(med => !med.taken).length === 0 && (
              <View style={styles.allMedicationsTaken}>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="#10B981">
                  <Circle cx="12" cy="12" r="10"/>
                  <Path d="M9 12l2 2 4-4" stroke="white" strokeWidth={2} fill="none"/>
                </Svg>
                <Text style={styles.allMedicationsTakenText}>All medications taken for today!</Text>
              </View>
            )}
          </View>
        </View>

        {/* Health Tips & Articles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Health Tips & Articles</Text>
            <TouchableOpacity onPress={onArticles}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.articlesScrollView}
            contentContainerStyle={styles.articlesScrollContent}
          >
            {articles.map((article, index) => (
              <TouchableOpacity 
                key={article.id} 
                style={[styles.articleCard, index === 0 && styles.firstArticleCard]} 
                onPress={onArticles}
              >
                <View style={[styles.articleImageContainer, { backgroundColor: article.imageColor }]}>
                  <Image 
                    source={article.image}
                    style={styles.articleImage}
                    resizeMode="cover"
                  />
                  <View style={styles.articleImageOverlay}>
                    <View style={styles.articleCategory}>
                      <Text style={styles.articleCategoryText}>{article.category}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle} numberOfLines={2}>{article.title}</Text>
                  <Text style={styles.articleDescription} numberOfLines={2}>{article.description}</Text>
                  <View style={styles.articleMeta}>
                    <Text style={styles.articleReadTime}>{article.readTime}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <BottomNav active="home" onHome={onHome} onNotifications={onNotifications} onProfile={onProfile} />

      {/* Glossary Modal */}
      <Modal
        visible={showGlossary}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowGlossary(false)}
      >
        <View style={styles.glossaryModal}>
          {/* Modal Header */}
          <View style={styles.glossaryHeader}>
            <Text style={styles.glossaryTitle}>Medical Glossary</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowGlossary(false)}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.glossarySearchContainer}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2} style={styles.searchIcon}>
              <Circle cx="11" cy="11" r="8"/>
              <Path d="M21 21l-4.35-4.35"/>
            </Svg>
            <TextInput
              style={styles.glossarySearchInput}
              placeholder="Search medical terms..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>

          {/* Results */}
          <ScrollView style={styles.glossaryResults} showsVerticalScrollIndicator={false}>
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term) => (
                <View key={term.id} style={styles.glossaryItem}>
                  <View style={styles.glossaryItemHeader}>
                    <Text style={styles.glossaryTerm}>{term.term}</Text>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{term.category}</Text>
                    </View>
                  </View>
                  <Text style={styles.glossaryDefinition}>{term.definition}</Text>
                  
                  <View style={styles.glossaryDetails}>
                    <View style={styles.detailSection}>
                      <Text style={styles.detailTitle}>Common Symptoms:</Text>
                      <View style={styles.symptomsList}>
                        {term.symptoms.map((symptom, index) => (
                          <View key={index} style={styles.symptomTag}>
                            <Text style={styles.symptomText}>{symptom}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    
                    <View style={styles.detailSection}>
                      <Text style={styles.detailTitle}>Common Causes:</Text>
                      <View style={styles.symptomsList}>
                        {term.causes.map((cause, index) => (
                          <View key={index} style={styles.causeTag}>
                            <Text style={styles.causeText}>{cause}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noResults}>
                <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={1}>
                  <Circle cx="11" cy="11" r="8"/>
                  <Path d="M21 21l-4.35-4.35"/>
                </Svg>
                <Text style={styles.noResultsText}>No medical terms found</Text>
                <Text style={styles.noResultsSubtext}>Try searching for a different term or condition</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#FF8C42',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  profileAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  profileAvatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'ReadexPro-Medium',
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  settingsButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    paddingBottom: 96,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  actionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'ReadexPro-Medium',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
    fontFamily: 'ReadexPro-Medium',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  seeAllText: {
    fontSize: 16,
    color: '#4F8EF7',
    fontWeight: '500',
    fontFamily: 'ReadexPro-Medium',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    maxWidth: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIconContainer: {
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
    textAlign: 'center',
    lineHeight: 28,
  },
  statUnit: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  statLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '400',
  },
  medicationList: {
    gap: 12,
  },
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medicationIcon: {
    marginRight: 20,
  },
  medicationText: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'ReadexPro-Medium',
  },
  medicationDosage: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'ReadexPro-Medium',
  },
  takeButton: {
    backgroundColor: '#4F8EF7',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  takeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'ReadexPro-Medium',
  },
  allMedicationsTaken: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  allMedicationsTakenText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#166534',
    fontFamily: 'ReadexPro-Medium',
  },
  articlesScrollView: {
    marginHorizontal: -24,
  },
  articlesScrollContent: {
    paddingHorizontal: 24,
    paddingRight: 48,
  },
  articleCard: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  firstArticleCard: {
    marginLeft: 0,
  },
  articleImageContainer: {
    height: 140,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  articleImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  articleImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  articleImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleEmoji: {
    fontSize: 28,
  },
  articleCategory: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  articleCategoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'ReadexPro-Medium',
  },
  articleContent: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 22,
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontFamily: 'ReadexPro-Medium',
    marginBottom: 12,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleReadTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'ReadexPro-Medium',
  },
  // Glossary Modal Styles
  glossaryModal: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  glossaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  glossaryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glossarySearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  glossarySearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
    fontFamily: 'ReadexPro-Medium',
  },
  glossaryResults: {
    flex: 1,
    paddingHorizontal: 20,
  },
  glossaryItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  glossaryItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  glossaryTerm: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'ReadexPro-Medium',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
    fontFamily: 'ReadexPro-Medium',
  },
  glossaryDefinition: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  glossaryDetails: {
    gap: 16,
  },
  detailSection: {
    gap: 8,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'ReadexPro-Medium',
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  symptomText: {
    fontSize: 12,
    color: '#92400E',
    fontFamily: 'ReadexPro-Medium',
  },
  causeTag: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  causeText: {
    fontSize: 12,
    color: '#1E40AF',
    fontFamily: 'ReadexPro-Medium',
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    fontFamily: 'ReadexPro-Medium',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'ReadexPro-Medium',
  },
});

export default DashboardScreen;
