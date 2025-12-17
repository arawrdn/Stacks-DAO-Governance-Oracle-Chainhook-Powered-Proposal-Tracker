import { ChainhookClient, Blockchains, Networks, StacksChainhook } from '@hirosystems/chainhooks-client';

const TARGET_CONTRACT = 'ST1PQHQKV0RJQDZGR7Y12K8SHTGYQYJPQ55N1082D.dao-governance'; 
const API_URL = 'http://localhost:8000'; 
const WEBHOOK_URL = 'http://localhost:3000/api/governance-webhook'; 

const governancePredicate: StacksChainhook = {
    chain: Blockchains.Stacks,
    network: Networks.Testnet,
    name: 'dao-governance-tracker',
    version: 1,
    webhook: {
        url: WEBHOOK_URL,
        authorization: 'Bearer DAO_SECRET_KEY',
    },
    trigger: {
        start_block: 100000, 
        events: [
            {
                contract_id: TARGET_CONTRACT,
                topic: 'print',
            }
        ],
    },
};

async function initOracle() {
    try {
        const client = new ChainhookClient(API_URL);
        await client.deleteChainhook(governancePredicate.name).catch(() => {});
        await client.registerChainhook(governancePredicate);
        
        console.log('DAO Governance Oracle Registered');
        console.log(`Tracking: ${TARGET_CONTRACT}`);
    } catch (error) {
        console.error('Registration failed:', error);
    }
}

initOracle();
