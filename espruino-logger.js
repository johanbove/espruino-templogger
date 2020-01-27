var log = new Float32Array(100); // our logged data
var logIndex = 0; // index of last logged data item
var timePeriod = 60*1000; // every minute
var lastReadingTime; // time of last reading

// Store data into RAM
function storeMyData(data) {
  logIndex++;
  if (logIndex>=log.length) logIndex=0;
  log[logIndex] = data;
}

// Get Data and store it in RAM
function getData() {
  var data = E.getTemperature();
  storeMyData(data);
  lastReadingTime = Date.now();
}

// Dump our data in a human-readable format
function exportData() {
  for (var i=1;i<=log.length;i++) {
    var time = new Date(lastReadingTime - (log.length-i)*timePeriod);
    var data = log[(i+logIndex)%log.length];
    console.log(time.toString()+"\t"+data);
  }
}

// Start recording
setInterval(getData, timePeriod);
