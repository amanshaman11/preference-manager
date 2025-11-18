import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 4001;

app.use(express.json());

const PREF_FILE = 'preferences.json';

// Ensure preferences.json exists
if (!fs.existsSync(PREF_FILE)) {
    fs.writeFileSync(PREF_FILE, '{}');
}

// POST: Save preference
app.post('/api/preferences', (req, res) => {
    const { key, value } = req.body;
    const prefs = JSON.parse(fs.readFileSync(PREF_FILE, 'utf-8'));
    prefs[key] = value;
    fs.writeFileSync(PREF_FILE, JSON.stringify(prefs, null, 2));
    res.json({ message: 'Preference saved', prefs });
});

// GET: Retrieve preferences
app.get('/api/preferences', (req, res) => {
    const prefs = JSON.parse(fs.readFileSync(PREF_FILE, 'utf-8'));
    res.json(prefs);
});

// PATCH: Update preference
app.patch('/api/preferences', (req, res) => {
    const { key, value } = req.body;
    const prefs = JSON.parse(fs.readFileSync(PREF_FILE, 'utf-8'));
    prefs[key] = value;
    fs.writeFileSync(PREF_FILE, JSON.stringify(prefs, null, 2));
    res.json({ message: 'Preference updated', prefs });
});

app.listen(PORT, () => {
    console.log(`Preference Manager running on port ${PORT}`);
});

