import { muted } from  './index.js';

export async function playSound(type){
    if(muted) return false
    
    let audio
    switch(type){
        case 'step':
            audio = new Audio('./assets/sounds/step.mp3')
            break
        case 'complete':
            audio =  new Audio('./assets/sounds/finished.wav')
            break
        case 'click':
            audio = new Audio('./assets/sounds/click.wav')
            break
        }
    await audio.play();
}