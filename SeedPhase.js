const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet');

async function generateSeedPhraseAndAddress() {
    // Generate a random 12-word seed phrase
    const seedPhrase = bip39.generateMnemonic();
    console.log('Seed Phrase:', seedPhrase);

    // Convert the seed phrase to a seed buffer
    const seed = await bip39.mnemonicToSeed(seedPhrase);

    // Derive the HD wallet from the seed
    const hdWallet = hdkey.fromMasterSeed(seed);

    // Derive the first wallet/account from the HD wallet
    const wallet = hdWallet.derivePath("m/44'/60'/0'/0/0").getWallet();

    // Get the Ethereum address from the wallet
    const address = `0x${wallet.getAddress().toString('hex')}`;
    console.log('Address:', address);

    return { seedPhrase, address };
}

// Run the function
generateSeedPhraseAndAddress().catch(console.error);
