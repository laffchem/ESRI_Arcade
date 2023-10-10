/* The purpose of this file is to save Esri Arcade Scripts to easily copy and paste between layers since they don't seem to have a user friendly library.
***Note*** This is NOT a functioning JS file. This is a collection of scripts that are run individually apart from each other, which is why the var statement is used multiple times.
*/
/* Key
Important / Urgently Needed: #fa5252
Warning / Upcoming: #f76707
Good / Recently Completed: #69db7c
*/

/* ***NOTE*** --- For each script, when defining the relationship you must confirm your table name is correct, and that your feature for the inspection date is correct or this will default to the else condition stating requires inspection, as there will be no data to pull!!! */

/* Cabinet Inspection Scripts */

// Last Inspection
var relatedrecords = OrderBy(FeatureSetByRelationshipName($feature, "CabinetInspections"), "InspectDate DES");
var cnt = Count(relatedrecords)
var relatedinfo = "";
if (cnt > 0) {
  var info = First(relatedrecords);
  relatedinfo = Text(ToLocal(info.InspectDate), "MM/DD/Y")
} else {
  relatedinfo = Text('Requires inspection!')
}
return relatedinfo;

// Cabinet Inspection
Proper($feature.CabinetCondition)

// Five Year Inspection
$feature.FiveYearInspectionLocation

// Font Color - Inspection Date
var relatedrecords = OrderBy(FeatureSetByRelationshipName($feature, "CabinetInspections"), "InspectDate DES");
var cnt = Count(relatedrecords)
var relatedinfo = "";
var fontColor = "";
if (cnt > 0) {
  var info = First(relatedrecords);
  relatedinfo = ToLocal(info.InspectDate)
  var dateDifference = DateDiff(Now(), relatedinfo, 'months')
  if(dateDifference < 1.5) {
  fontColor = '69db7c'
  } else if(dateDifference >= 1.5 && dateDifference < 3) {
    fontColor = 'f76707'
  } else {
    fontColor = 'fa5252'
  }
} else {
  fontColor = 'fa5252'
}
return fontColor;

// Font Color - Cabinet Inspection
var cabinetCondition = Proper($feature.CabinetCondition);
var fontColor = "";

if(cabinetCondition == 'Good' || cabinetCondition == 'New') {
fontColor = '51cf66'
} else if(cabinetCondition == 'Poor') {
  fontColor = 'f76707'
} 
else {
  fontColor = 'fa5252'
}
return fontColor;

// Cabinet Life Expectancy
var lifeExpectancy = Number($feature.LifeExpectancy);
var timeSinceInstall = Floor(DateDiff(Now(), $feature.InstallDate, 'years'), 1);
var timeToExpire = Floor(lifeExpectancy - timeSinceInstall, 1)

if(IsNan(timeSinceInstall)) {
  return Text('Please input an install date and life expectancy value into the database!')
} else if(timeToExpire <= 0) {
  return Text(`Cabinet is expired by ${-1 * timeToExpire} years according to FDOT Averages.`)
} else {
  return Text(`Cabinet has approximately ${timeToExpire} years left according to FDOT Averages.`)
}

// Pedestrian Condition
if($feature.PedsCondition == '' || $feature.PedsCondition == null) {
    return Text('There are no recorded pedestrian signals in the database.')
  } else {
    return Text(Proper($feature.PedsCondition))
  }

// Pedestrian Condition Font Color
var pedsCondition = Proper($feature.PedsCondition);
var fontColor = "";

if(pedsCondition == 'Good' || pedsCondition == 'New') {
fontColor = '51cf66'
} else if(pedsCondition == 'Poor') {
  fontColor = 'f76707'
} 
else {
  fontColor = 'fa5252'
}
return fontColor;

// Signal Life Expectancy
var lifeExpectancy = Number($feature.LifeExpectancy);
var timeSinceInstall = Floor(DateDiff(Now(), $feature.InstallDate, 'years'), 1);
var timeToExpire = Floor(lifeExpectancy - timeSinceInstall, 1)

if(IsNan(timeSinceInstall)) {
  return Text('Please input an install date and life expectancy value into the database!')
} else if(timeToExpire <= 0) {
  return Text(`Signals are expired by ${-1 * timeToExpire} years according to FDOT Averages.`)
} else {
  return Text(`Signals have approximately ${timeToExpire} years left before expiring according to FDOT Averages.`)
}






