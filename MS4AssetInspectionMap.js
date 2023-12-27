/* The purpose of this file is to save Esri Arcade Scripts to easily copy and paste between layers since they don't seem to have a user friendly library.
***Note*** This is NOT a functioning JS file. This is a collection of scripts that are run individually apart from each other, which is why the var statement is used multiple times.
*/
/* Key
Important / Urgently Needed: #fa5252
Warning / Upcoming: #f76707
Good / Recently Completed: #69db7c
*/

/* ***NOTE*** --- For each script, when defining the relationship you must confirm your table name is correct, and that your feature for the inspection date is correct or this will default to the else condition stating requires inspection, as there will be no data to pull!!! */


/* Recent Inspections Script
This script is for detecting recent inspections that have occured from the survey 123 for each layer. */
var relatedrecords = OrderBy(FeatureSetByRelationshipName($feature, "MS4NetworkStructureInspections"), "InspectDate DES");
var cnt = Count(relatedrecords)
var relatedinfo = "";
if (cnt > 0) {
  var info = First(relatedrecords);
  relatedinfo = Text(ToLocal(info.InspectDate), "MM/DD/Y")
} else {
  relatedinfo = Text('Requires inspection!')
}
return relatedinfo;

/* Maintenance Verification Script
This script simply detects & reports if maintenance was verified at the location. */
var relatedrecords = OrderBy(FeatureSetByRelationshipName($feature, "MS4NetworkStructureInspections"), "InspectDate DES");
var cnt = Count(relatedrecords)
var relatedinfo = "";
if (cnt > 0) {
  var info = First(relatedrecords);
  relatedinfo = Text(info.MaintenanceVerification)
} else {
  relatedinfo = Text('Requires inspection!')
}
return relatedinfo;

/* Maintenance Type Script
This script simply detects & reports the type of maintenance that occured at the work site.*/
var relatedrecords = OrderBy(FeatureSetByRelationshipName($feature, "MS4NetworkStructureInspections"), "InspectDate DES");
var cnt = Count(relatedrecords)
var relatedinfo = "";
if (cnt > 0) {
  var info = First(relatedrecords);
  relatedinfo = Text(info.MaintenanceType)
  if (relatedinfo == '' || relatedinfo == null) {
    relatedinfo = Text('Maintenance Not Verified')
  }
} else {
  relatedinfo = Text('Requires inspection!')
}
return relatedinfo;

/* Font Color Inspection Date Script
This script colors the font in the html source depending on how long ago the survey occured (as a visual cue for inspectors in the pop-up).
Note this varies based on what layer we are talking about. Also, this script below is more in depth checking for a specific type of control structure. Most of these are smaller. See below this script. */
var relatedrecords = OrderBy(FeatureSetByRelationshipName($feature, "MS4NetworkStructureInspections"), "InspectDate DES");
var cnt = Count(relatedrecords)
var pollutionStructure = "Pollution Control Structure";
var relatedinfo = "";
var fontColor = "";
if($feature.STRUCTTYPE == pollutionStructure) {
  if(cnt > 0) {
    var info = First(relatedrecords);
    relatedinfo = ToLocal(info.InspectDate)
    var dateDifference = DateDiff(Now(), relatedinfo, 'months')
    if(dateDifference < 1.5) {
      fontColor = '69db7c'
    } else if(dateDifference >= 1.5 && dateDifference < 3) {
      fontColor = 'f76707'
    } else fontColor = 'fa5252'
  } else {
    fontColor = 'fa5252'
  }
} else { 
  if (cnt > 0) {
  var info = First(relatedrecords);
  relatedinfo = ToLocal(info.InspectDate)
  var dateDifference = DateDiff(Now(), relatedinfo, 'years')
  if(dateDifference < 3.5) {
  fontColor = '69db7c'
  } else if(dateDifference >= 3.5 && dateDifference < 5) {
    fontColor = 'f76707'
  } else {
    fontColor = 'fa5252'
  }
} else {
  fontColor = 'fa5252'
}
}
return fontColor;

/* Font Color Inspection Date with no extra conditions */
var relatedrecords = OrderBy(FeatureSetByRelationshipName($feature, "MS4DischargePointInspections"), "InspectDate DES");
var cnt = Count(relatedrecords)
var relatedinfo = "";
var fontColor = "";
if (cnt > 0) {
  var info = First(relatedrecords);
  relatedinfo = ToLocal(info.InspectDate)
  var dateDifference = DateDiff(Now(), relatedinfo, 'years')
  if(dateDifference < 3.5) {
  fontColor = '69db7c'
  } else if(dateDifference >= 3.5 && dateDifference < 5) {
    fontColor = 'f76707'
  } else {
    fontColor = 'fa5252'
  }
} else {
  fontColor = 'fa5252'
}
return fontColor;

/* Font Color Maintenance Verified Script
This script colors the font in the html source depending on if maintenance was verified at the location during the previous inspection. */
var relatedrecords = OrderBy(FeatureSetByRelationshipName($feature, "MS4DischargePointInspections"), "InspectDate DES");
var cnt = Count(relatedrecords)
var relatedinfo = "";
var fontColor = "";
if (cnt > 0) {
  var info = First(relatedrecords);
  relatedinfo = Text(info.MaintenanceVerification)
  if(relatedinfo == 'Yes') {
  fontColor = '51cf66'
  } else if(relatedinfo == 'No') {
    fontColor = 'f76707'
  } 
} else {
    fontColor = 'fa5252'
}
return fontColor;

// Maintenance Scripts
// ***********************************************************

// Last Maintenance Date
var relatedrecords = OrderBy(FeatureSetByRelationshipName($feature, "ManholeMaintenance"), "MaintenanceDate DES");
var cnt = Count(relatedrecords)
var relatedinfo = "";
if (cnt > 0) {
  var info = First(relatedrecords);
  relatedinfo = Text(ToLocal(info.MaintenanceDate), "MM/DD/Y")
} else {
  relatedinfo = Text('No maintenance recorded in Survey123!')
}
return relatedinfo;

// Find Latest GUID
var relatedrecords = OrderBy(FeatureSetByRelationshipName($feature, "ManholeMaintenance"), "MaintenanceDate DES");
var cnt = Count(relatedrecords)
var relatedinfo = "";
if (cnt > 0) {
  var info = First(relatedrecords);
  relatedinfo = Text(info.GUID)
} else {
  relatedinfo = Text('#')
}
return relatedinfo

// Find Latest ObjectID
var relatedrecords = OrderBy(FeatureSetByRelationshipName($feature, "ManholeMaintenance"), "MaintenanceDate DES");
var cnt = Count(relatedrecords)
var relatedinfo = "";
if (cnt > 0) {
  var info = First(relatedrecords);
  relatedinfo = Text(info.OBJECTID)
} else {
  relatedinfo = Text('#')
}
return relatedinfo

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Joined layer inspection age text box
var inspectionAge = DateDiff(Now(), $feature.InspectDate, 'years');
var inspectionDue = round(5 - inspectionAge, 2);

return inspectionDue;

// Symbology Expression
var inspectionAge = DateDiff(Now(), $feature.InspectDate, 'years');
if (inspectionAge >= 5) {
  return 'Requires Inspection';
} else {
  return 'Inspected';
}