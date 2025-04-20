let isTradeScriptActive = true;
Smith();
async function Smith() {
    await delay(10);
    window.onpagehide = (event) => {
        if (!event.persisted)
            isTradeScriptActive = false;
    };
    let isSuccess = false
    while (isTradeScriptActive && !isSuccess) {
        console.log("started loading from servers")
        nfoResponse = await fetch("https://api.kite.trade/instruments/NFO");
        bfoResponse = await fetch("https://api.kite.trade/instruments/BFO");
        mcxResponse = await fetch("https://api.kite.trade/instruments/MCX");
        if (nfoResponse.ok && bfoResponse.ok && mcxResponse.ok) {
            let nfoResponseText = await nfoResponse.text();
            let bfoResponseText = await bfoResponse.text();
            let mcxResponseText = await mcxResponse.text();

            let nfoLines = nfoResponseText.split("\n");
            let bfoLines = bfoResponseText.split("\n");
            let mcxLines = mcxResponseText.split("\n");

            let instruments = [];
            const headers = nfoLines[0].split(',');
            for (let i = 1; i < nfoLines.length; i++) {
                if (nfoLines[i].trim().length === 0)
                    continue;
                let inst = {};
                let values = nfoLines[i].split(",");
                for (let j = 0; j < values.length; j++) {
                    if (j == 4 || j == 7)
                        continue;
                    inst[headers[j].trim()] = values[j].trim();

                }
                instruments.push(inst);
            }
            for (let i = 1; i < bfoLines.length; i++) {
                if (bfoLines[i].trim().length === 0)
                    continue;
                let inst = {};
                let values = bfoLines[i].split(",");
                for (let j = 0; j < values.length; j++) {
                    if (j == 4 || j == 7)
                        continue;
                    inst[headers[j].trim()] = values[j].trim();

                }
                instruments.push(inst);
            }
            for (let i = 1; i < mcxLines.length; i++) {
                if (mcxLines[i].trim().length === 0)
                    continue;
                let inst = {};
                let values = mcxLines[i].split(",");
                for (let j = 0; j < values.length; j++) {
                    if (j == 4 || j == 7)
                        continue;
                    inst[headers[j].trim()] = values[j].trim();

                }
                instruments.push(inst);
            }


            if (instruments.length > 100) {
                await setSyncStorage("foInstruments", instruments);
                await setSyncStorage("isInstLoading", false);
                isSuccess = true;
            }
        }
        await delay(2000);
    }
}