import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import CflLogo from '../../images/cfl_logo.png';


const styles = StyleSheet.create({
  mainView: {
    border: '2px solid black',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    padding: 10
  },
  page: {
    padding: 20
  },
  border: {
    border: '1px solid black',
  },
  text: {
    marginBottom: 5,
    fontSize: 12
  },
  image: {
    width: 100,
    height: 100,
  }
});

interface StudentInfo {
  name: string,
  password: string;
  classLink: string;
  loginUrl: string;
}
const MyDocument: React.FC<{
  studentsInfo: StudentInfo[];
  classLink: string;
}> = ({ studentsInfo, classLink }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {studentsInfo.map((student: StudentInfo) => <View key={`${student.name}-pdf`} style={styles.mainView}>
        <View>
          <Image source={CflLogo} style={styles.image} />
        </View>
        <View>
          <Text style={styles.text}>Please ensure students keep login details in a secure place</Text>
          <Text style={styles.text}>Directly login with {student.loginUrl}</Text>
          <Text style={styles.text}>OR class link: {classLink}</Text>
          <Text style={styles.text}>Name: {student.name}</Text>
          <Text style={styles.text}>Password: {student.password}</Text>
        </View>
      </View>
      )}
    </Page>
  </Document>
);
export default MyDocument;
