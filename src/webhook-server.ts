import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/governance-webhook', (req, res) => {
    const eventData = req.body;

    if (eventData?.chainhook_matches?.[0]?.stacks_events) {
        const events = eventData.chainhook_matches[0].stacks_events;

        events.forEach((event: any) => {
            console.log(`--- New Governance Activity ---`);
            console.log(`Contract: ${event.contract_id}`);
            console.log(`Payload: ${event.data}`);
            
            // Integration Logic:
            // 1. Parse the Clarity tuple hex.
            // 2. If 'proposal-created', trigger a Discord Webhook announcement.
            // 3. If 'vote-cast', update the real-time leaderboard database.
            console.log('--- Broadcast Successful ---');
        });
    }
    
    res.status(200).send('Oracle processed event');
});

app.listen(PORT, () => {
    console.log(`DAO Oracle Server active on port ${PORT}`);
});
