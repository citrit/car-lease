
var DBFuncs = {
    
    iMapDB: null,
    ProjectList: new Array(),
    SpeciesList: new Array(),
    SpeciesURL: 'http://hermes.freac.fsu.edu/requests/state_species/species?state=',
    ProjectsURL: 'http://hermes.freac.fsu.edu/requests/state_species/project?state=',
    curState: '',
    
    // Application Constructor
    init: function() {
        iMapDB = window.sqlitePlugin.openDatabase({
                                              name : "carLeaseApp.db"
                                              });
        iMapDB.transaction(DBFuncs.checkForUpdates, DBFuncs.errorCB);
        //iMapDB.transaction(DBFuncs.loadProjectsByName, DBFuncs.errorCB);
        //DBFuncs.loadSpeciesList();
        //iMapDB.transaction(DBFuncs.loadObservations, DBFuncs.errorCB);
    },
    // check if the database has been loaded.
    checkForUpdates: function(tx, results) {
        iMapApp.debugMsg("Check for server updates...");
        //tx.executeSql("SELECT count(*) from imiadmin_state_species_list"
        tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='imiadmin_state_species_list'", [], function(tx, results) {
                  if (results.rows.length > 0) {
                      iMapApp.debugMsg("iMapInvasives DB all set.");
                  }
                  else {
                      window.plugins.spinnerDialog.show("Creating tables","Please wait...");
                      for(var i=0, len=createTablesSQL.length; i < len; i++){
                        tx.executeSql(createTablesSQL[i], [],  DBFuncs.successCB, DBFuncs.errorCB);
                      }
                      window.plugins.spinnerDialog.hide();
                  }
        }, DBFuncs.errorCB);
    },
    //Transaction error callback
    //
    errorCB: function(tx, err) {
        console.log("Error processing SQL: "+$.toJSON(tx)+$.toJSON(err));
    },
    //Transaction error callback
    //
    successCB: function(tx, results) {
        console.log("Success: "+$.toJSON(results));
    }

}

var createTablesSQL =  [ 'CREATE TABLE carlease-cars (name character varying(255), startDate timestamp without time zone, milesPerYear integer, currentMileage integer, costPerMile numeric(16,2))' ];
