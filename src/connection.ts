import makeWaSocket,{ DisconnectReason, useSingleFileAuthState } from "@adiwajshing/baileys";

import { Boom } from "@hapi/boom";

import path from  'path';

export const Connect = async () => {

    const { state, saveState } = useSingleFileAuthState(
        path.resolve(__dirname, '..', 'cache', 'state.json')
    );

    const socket = makeWaSocket({
        printQRInTerminal: true,
        auth: state
    });

    socket.ev.on('connection.update',async (update) => {
        const { connection, lastDisconnect} = update
        
        if(connection === 'close') {
            const sholdReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        
            if(sholdReconnect){
                await Connect();
            }
        };

        
    });

    socket.ev.on('creds.update',saveState);

    return socket;
    
}