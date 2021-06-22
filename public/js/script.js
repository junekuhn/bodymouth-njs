const skt = io();
let pte = document.querySelector("pink-trombone");
let ctx, mgain;
let aon = false;

pte.addEventListener("load", pteload);

function pteload(evt) {
    document.addEventListener("click", () => {
    if(!ctx) {
        try {
            window.AudioContext = 
                window.AudioContext || window.webkitAudioContext;
            ctx = new AudioContext();
            mgain = ctx.createGain();
            mgain.gain.value = 0;
            mgain.connect(ctx.destination);
            aon = true;
            pte.setAudioContext(ctx)
                .then(() => {
                pte.enableUI();
                pte.connect(mgain);
                pte.start();
            });
        }
        catch(e) {
            alert("blup");
        };
    }
})
    
};

skt.on("vol", (arg1) => {
    mgain.gain.value = arg1;
});


skt.on("intensity", (arg1) => {
    pte.intensity.value = arg1;
});


skt.on("freq", (arg1) => {
    pte.frequency.value = arg1;
});

skt.on("tenseness", (arg1) => {
    pte.tenseness.value = arg1;
});

skt.on("loudness", (arg1) => {
    pte.loudness.value = arg1;
});


skt.on("vibfreq", (arg1) => {
    pte.vibrato.frequency.value = arg1;
});


skt.on("vibgain", (arg1) => {
    pte.vibrato.gain.value = arg1;
});


skt.on("vibwobble", (arg1) => {
    pte.vibrato.wobble.value = arg1;
});


skt.on("vib", (freq, gain, wobble) => {
    pte.vibrato.frequency.value = freq;
    pte.vibrato.gain.value = gain;
    pte.vibrato.wobble.value = wobble;
});

skt.on("tongueidx", (arg1) => {
    console.log(pte.tongue)
    pte.tongue.index.value = arg1;
});


skt.on("tonguediam", (arg1) => {
    pte.tongue.diameter.value = arg1;
});

skt.on("tongue", (idx, diam) => {
    pte.tongue.index.value = idx;
    pte.tongue.diameter.value = diam;
});


skt.on("voiceness", (arg1) => {
  let tenseness = 1 - Math.cos((arg1) * Math.PI * 0.5);
  let loudness = Math.pow(tenseness, 0.25);
  
  pte.tenseness.value = tenseness;
  pte.loudness.value = loudness;
});
