function initAnalytics() {
    gapi.client.init({
        'apiKey': 'G-XHQ6QRPPG6',
        'discoveryDocs': ['https://analyticsreporting.googleapis.com/$discovery/rest'],
        'clientId': 'YOUR_CLIENT_ID',
        'scope': 'https://www.googleapis.com/auth/analytics.readonly',
    }).then(function() {
        getWeeklyVisits();
    });
}

// Fonction pour récupérer les données de Google Analytics
function getWeeklyVisits() {
    gapi.client.analyticsreporting.reports.batchGet({
        'reportRequests': [{
            'viewId': 'YOUR_VIEW_ID',
            'dateRanges': [{
                'startDate': '7daysAgo',
                'endDate': 'today'
            }],
            'metrics': [{'expression': 'ga:sessions'}]
        }]
    }).then(function(response) {
        var weeklyVisits = response.result.reports[0].data.totals[0].values[0];
        showNotification(weeklyVisits);
    }).catch(function(error) {
        console.error('Error retrieving data from Google Analytics:', error);
    });
}

// Fonction pour afficher une notification Windows
function showNotification(weeklyVisits) {
    if ('Notification' in window) {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                var notification = new Notification('Weekly Visits', {
                    body: 'This week, your site received ' + weeklyVisits + ' visits.',
                    icon: 'icon.png' // Replace with the path to your icon
                });
            }
        });
    }
}

// Initialiser l'API Google Analytics
gapi.load('client:auth2', initAnalytics);