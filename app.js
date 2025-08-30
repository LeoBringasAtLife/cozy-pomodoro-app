class PomodoroTimer {
    constructor() {
        this.selectedTime = null;
        this.timeRemaining = 0;
        this.timerInterval = null;
        this.isRunning = false;

        // Screens
        this.startScreen = document.getElementById('start-screen');
        this.timerScreen = document.getElementById('timer-screen');
        this.completionScreen = document.getElementById('completion-screen');

        // Timer display
        this.minutesTens = document.getElementById('minutes-tens');
        this.minutesOnes = document.getElementById('minutes-ones');
        this.secondsTens = document.getElementById('seconds-tens');
        this.secondsOnes = document.getElementById('seconds-ones');

        // Buttons
        this.startBtn = document.getElementById('start-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.completionStopBtn = document.getElementById('completion-stop-btn');

        // Balloons
        this.balloons = document.querySelectorAll('.balloon');

        // Sound
        this.timerCompleteSound = document.getElementById('timer-complete');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Selección de globos
        this.balloons.forEach(balloon => {
            balloon.addEventListener('click', () => {
                this.selectBalloon(balloon);
            });
        });

        // Iniciar timer
        this.startBtn.addEventListener('click', () => {
            if (this.selectedTime) {
                this.startTimer();
            }
        });

        // Detener timer
        this.stopBtn.addEventListener('click', () => {
            this.stopTimer();
        });

        // Detener música en completion screen
        this.completionStopBtn.addEventListener('click', () => {
            if (this.timerCompleteSound) {
                this.timerCompleteSound.pause();
                this.timerCompleteSound.currentTime = 0;
            }
            this.completionScreen.classList.add('hidden');
            this.startScreen.classList.remove('hidden');
        });
    }

    selectBalloon(balloon) {
        // Remover selección de todos los globos
        this.balloons.forEach(b => b.classList.remove('selected'));
        // Marcar el globo clickeado como seleccionado
        balloon.classList.add('selected');
        this.selectedTime = parseInt(balloon.dataset.minutes);
    }

    startTimer() {
        this.timeRemaining = this.selectedTime * 60;

        // Mostrar pantalla de timer
        this.startScreen.classList.add('hidden');
        this.timerScreen.classList.remove('hidden');

        this.isRunning = true;

        // Inicializar display
        this.updateTimerDisplay();

        // Contador
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();

            if (this.timeRemaining <= 0) {
                this.timerComplete();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.selectedTime = null;

        // Quitar selección de globos
        this.balloons.forEach(b => b.classList.remove('selected'));

        // Volver a pantalla de inicio si no estamos en completion
        if (!this.completionScreen.classList.contains('hidden')) return;

        this.timerScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;

        this.minutesTens.textContent = Math.floor(minutes / 10);
        this.minutesOnes.textContent = minutes % 10;
        this.secondsTens.textContent = Math.floor(seconds / 10);
        this.secondsOnes.textContent = seconds % 10;
    }

    timerComplete() {
        if (this.timerCompleteSound) this.timerCompleteSound.play();

        this.timerScreen.classList.add('hidden');
        this.completionScreen.classList.remove('hidden');

        clearInterval(this.timerInterval);
        this.isRunning = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const pomodoro = new PomodoroTimer();
});