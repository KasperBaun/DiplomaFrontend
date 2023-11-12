

using DataMigration;

/* This step only needs to be done when input is modified. Skip if there is no new data */
DataExtractor dataExtractor = new();
dataExtractor.CreateDataFiles();

/* This reads the created data-files and inserts it into the database. */
//DataMigrater dataMigrater = new();
//dataMigrater.PopulateDatabase(msSQL: false);


