  // Replace with your Google Sheet's export CSV URL
        // Get the spreadsheet ID from the edit URL (e.g., https://docs.google.com/spreadsheets/d/YOUR_ID/edit)
        // Then use: https://docs.google.com/spreadsheets/d/YOUR_ID/export?format=csv&gid=0
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/1RwtkcGSaMuyU9qNgUYW9XqnUH7NShWy5NsekvXO2WHQ/export?format=csv&gid=0';

        fetch(sheetUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log('Fetched data:', data); // Debug: log the raw data
                Papa.parse(data, {
                    complete: function(results) {
                        const rows = results.data.slice(1); // Skip header row
                        const playersDiv = document.getElementById('players');
                        rows.forEach(row => {
                            if (row.length >= 1 && row[0] && row[0].trim()) { // At least name
                                const L_Name = row[0] || 'Unknown';
                                const F_Name = row[1] || '';
                                const position = row[2] || '';
                                const offers = row[3] || '';
                                const hudl = row[4] || '';
                                const imageURL = row[5] || '';
                                const bio = row[6] || '';

                                const card = document.createElement('div');
                                card.className = 'player-card';
                                card.innerHTML = `
                                    <h3 class="lName">${L_Name}</h3>
                                    <h5 class=fName>${F_Name}</h5>
                                    <p class="position">Position: ${position}</p>
                                    <p class="offers">Offers: ${offers}
                                    <p class="hudl">Hudl: ${hudl}</p>
                                    <img class="playerBioImage" src="images/playerImages/${imageURL}">
                                    <p class="bio">Bio: ${bio}</p>
                                `;
                                playersDiv.appendChild(card);
                            }
                        });
                    },
                    error: function(error) {
                        console.error('Error parsing CSV:', error);
                    }
                });
            })
            .catch(error => console.error('Error fetching sheet:', error));