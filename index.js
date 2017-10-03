#!/usr/bin/env node

const path          = require('path');
const yargs         = require('yargs');

const ATV           = require('./lib/atv');
const commandLine   = require('./lib/commandLine');

// ...
// Command line arguments.
const argv = yargs.usage('Usage: $0 -a [apple tv IP address]')
    .demandOption(['a'])
    .argv;

const errorHandler = e => console.log(e);

(async () => {
    const atv = new ATV(argv.a);
    
    try
    {
        await atv.auth(
            path.resolve('./atv.json'), 
            () => new Promise(resolve => commandLine.prompt('PIN', input => resolve(input)))
        );
    }
    catch (err)
    {
        errorHandler(err);

        process.exit(1);
    }
        
    commandLine.subscribe(
        {
            play: () => atv.play('http://vjs.zencdn.net/v/oceans.mp4').catch(e => errorHandler(e)),
            stop: () => atv.stop().catch(e => errorHandler(e)),
            
            exit: () => {
                atv.close();
                commandLine.close();

                process.exit(0);
            }
        }
    );
})();