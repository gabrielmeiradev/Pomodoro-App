export function playSound(type){
    let audio
    switch(type){
        case 'step':
            audio = new Audio('../assets/sounds/step.mp3');
            break
        case 'complete':
            audio =  new Audio('../assets/sounds/finished.wav');
            break
        }
    audio.play();
}