import SQLite from 'react-native-sqlite-storage';

//SQLite.enablePromise(true);

const databaseName = 'MyDatabase.db';
const databaseVersion = '1.0';
const databaseDisplayName = 'My Database';
const databaseSize = 200000;

const database = SQLite.openDatabase(
  databaseName,
  databaseVersion,
  databaseDisplayName,
  databaseSize,
);

const createTables = () => {
  // Table creation queries
  const createUsersTableQuery =
    'CREATE TABLE IF NOT EXISTS InOutEntries (id INTEGER PRIMARY KEY AUTOINCREMENT, display_in TEXT, display_out TEXT, `in` INTEGER, `out` INTEGER, `working_hours` INTEGER, `break` INTEGER)';

  // Execute table creation queries
  database.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS InOutEntries;',
      [],
      () => console.log('InOutEntries table has been removed'),
      error => console.log('Error: ', error),
    );
    tx.executeSql(
      createUsersTableQuery,
      [],
      () => console.log('InOutEntries table has been created'),
      error => console.log('Error: ', error),
    );
  });
};

export {database, createTables};
