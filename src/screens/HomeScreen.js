import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Table, Row, Rows} from 'react-native-table-component';
import {database} from './../database';

const HomeScreen = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockedInTime, setClockedInTime] = useState(null);
  const [clockedOutTime, setClockedOutTime] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [totalBreak, setTotalBreak] = useState(0);
  const [totalWorkingHours, setTotalWorkingHours] = useState(0);
  const handleClockButtonPress = () => {
    if (clockedIn) {
      // Clock out logic
      setClockedIn(false);
      setClockedOutTime(new Date());
    } else {
      // Clock in logic
      setClockedIn(true);
      setClockedInTime(new Date());
    }
  };
  useEffect(() => {
    if (clockedInTime) {
      insertData([clockedInTime.toLocaleTimeString(), clockedInTime.getTime()]);
    }
  }, [clockedInTime]);
  useEffect(() => {
    if (clockedOutTime) {
      updateData([
        clockedOutTime.toLocaleTimeString(),
        clockedOutTime.getTime(),
      ]);
    }
  }, [clockedOutTime]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM InOutEntries',
        [],
        (_, resultSet) => {
          const rows = resultSet.rows;
          const rowData = [];
          let calculateBreak = 0;
          let calculateWorkingHours = 0;
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            rowData.push([
              row.display_in,
              row.display_out,
              row.working_hours,
              row.break,
            ]);
            if (row.break) {
              calculateBreak += parseFloat(row.break);
            }
            if (row.working_hours) {
              calculateWorkingHours += parseFloat(row.working_hours);
            }
          }
          console.log(calculateBreak);
          setTableData(rowData);
          setTotalBreak(calculateBreak / 60);
          setTotalWorkingHours(calculateWorkingHours / 60000);
        },
        (_, error) => {
          console.log('Error executing SELECT query:', error);
        },
      );
    });
  };
  const insertData = data => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM InOutEntries order by id desc limit 1',
        [],
        (_, resultSet) => {
          const rows = resultSet.rows;
          let row = {};
          for (let i = 0; i < rows.length; i++) {
            row = rows.item(i);
          }
          if (Object.keys(row).length === 0) {
            data.push('');
          } else {
            data.push((data[1] - row.out) / 1000);
          }
          database.transaction(tx => {
            tx.executeSql(
              'INSERT INTO InOutEntries (display_in, `in`, `break`) VALUES (?,?,?)',
              data,
              () => {
                console.log('InOutEntry inserted successfully');
                fetchData();
              },
              error => console.log('Error inserting user: ', error),
            );
          });
        },
        (_, error) => {
          console.log('Error executing SELECT query:', error);
        },
      );
    });
  };
  const updateData = data => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM InOutEntries order by id desc limit 1',
        [],
        (_, resultSet) => {
          const rows = resultSet.rows;
          let row = {};
          for (let i = 0; i < rows.length; i++) {
            row = rows.item(i);
          }
          data.push((data[1] - row.in) / 1000);
          tx.executeSql(
            `UPDATE InOutEntries set display_out = ?, \`out\` = ?, \`working_hours\` = ? WHERE id = ${row.id}`,
            data,
            () => {
              console.log(`InOutEntry update ${row.id} successfully`);
              fetchData();
            },
            error => console.log('Error inserting user: ', error),
          );
        },
        (_, error) => {
          console.log('Error executing SELECT query:', error);
        },
      );
    });
  };
  const tableHead = ['In', 'Out', 'Working Hours', 'Break'];
  const iconNames = ['clock-o', 'clock-o', 'clock-o', 'clock-o'];
  const iconColors = ['green', 'red', 'blue', 'orange'];

  return (
    <ScrollView>
      <View style={tw`flex-1 p-4`}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleClockButtonPress}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>
                {clockedIn ? 'Clock Out' : 'Clock In'}
              </Text>
              <Icon
                name={clockedIn ? 'sign-out' : 'sign-in'}
                size={20}
                color="white"
              />
            </View>
          </TouchableOpacity>
          {tableData.length > 0 && (
            <>
              <Table borderStyle={styles.tableBorder}>
                <Row
                  data={tableHead.map((header, index) => (
                    <View style={styles.headContainer} key={header}>
                      <Icon
                        name={iconNames[index]}
                        size={20}
                        color={iconColors[index]}
                      />
                      <Text style={styles.headText}>{header}</Text>
                    </View>
                  ))}
                />
                <Rows data={tableData} />
              </Table>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Total Break: {totalBreak}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  Total Working Hours: {totalWorkingHours}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingRight: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableBorder: {borderWidth: 1, borderColor: '#ccc'},
  headContainer: {flexDirection: 'row', padding: 4},
  headText: {paddingLeft: 4, fontWeight: 'bold', textTransform: 'uppercase'},
  cellText: {margin: 6},
});

export default HomeScreen;
