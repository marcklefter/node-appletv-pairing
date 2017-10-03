const readline = require('readline');

class CommandLine
{
    constructor()
    {
        this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });

        this.rl.on('line', line => {
            const input = line.trim();

            if (this.promptCallback)
            {
                this.promptCallback(input);
                this.promptCallback = null;

                this.prompt();

                return;
            }

            this.commands[input]
                ? this.commands[input]()
                : console.log(`Unknown command ${input}`);

            this.prompt();
        });

        this.prompt();
    }

    prompt(prompt, promptCallback)
    {
        this.promptCallback = promptCallback;
        
        this.rl.setPrompt(prompt ? prompt + ' > ' : '> ');
        this.rl.prompt();
    }

    subscribe(commands)
    {
        !this.commands && (this.commands = {});

        this.commands = { ...this.commands, ...commands };
    }

    close()
    {
        this.rl.close();
    }
}

module.exports = new CommandLine;