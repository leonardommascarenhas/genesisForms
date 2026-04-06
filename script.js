const state = {
    currentStep: 0,
    answers: {
        name: '',
        phone: '',
        instagram: '',
        email: '',
        traffic: '',
        process: '',
        revenue: '',
        commitment: ''
    }
};

// Map steps to element IDs
const stepsMap = [
    'screen-home',
    'quiz-step-1', // Nome (1)
    'quiz-step-2', // Whats (2)
    'quiz-step-3', // Insta (3)
    'quiz-step-4', // Email (4)
    'quiz-step-5', // Trafego (5)
    'quiz-step-6', // CRM (6)
    'quiz-step-7', // Autoridade/Intermediary (7)
    'quiz-step-7', // Faturamento (8)
    'quiz-step-8', // Investimento (9)
];

// Start the quiz
function startQuiz() {
    goToScreen('screen-home', stepsMap[1]);
    state.currentStep = 1;
}

// Next Step Handlers for Inputs (Steps 1-4)
function nextStep(step) {
    let isValid = true;
    let value = '';

    // Validate inputs based on step
    if (step === 1) {
        value = document.getElementById('input-name').value.trim();
        if (value.length < 3) isValid = false;
        state.answers.name = value;
    } else if (step === 2) {
        value = document.getElementById('input-phone').value.trim();
        if (value.length < 10) isValid = false;
        state.answers.phone = value;
    } else if (step === 3) {
        value = document.getElementById('input-insta').value.trim();
        if (value.length < 2) isValid = false;
        state.answers.instagram = value;
    } else if (step === 4) {
        value = document.getElementById('input-email').value.trim();
        if (!value.includes('@')) isValid = false;
        state.answers.email = value;
    } else if (step === 7) {
        // Step 7 is Authority Screen (Just clicking 'Continue')
        isValid = true;
    }

    if (!isValid && step !== 7) {
        alert('Por favor, preencha o campo corretamente para continuar.');
        return;
    }

    const currentScreenId = stepsMap[step];
    const nextScreenId = stepsMap[step + 1];

    if (nextScreenId) {
        goToScreen(currentScreenId, nextScreenId);
        state.currentStep = step + 1;
    }
}

// Previous step
function prevStep(step) {
    const currentScreenId = stepsMap[step];
    const prevScreenId = stepsMap[step - 1];
    
    if (prevScreenId) {
        goToScreen(currentScreenId, prevScreenId);
        state.currentStep = step - 1;
    }
}

// Option Handlers (Steps 5, 6, 8, 9)
function selectOption(key, option, step) {
    state.answers[key] = option;
    
    const currentScreenId = stepsMap[step];
    const nextScreenId = stepsMap[step + 1];

    if (step === 9) {
        // Evaluate the answers and show final result
        evaluateLead(currentScreenId);
        return;
    }

    if (nextScreenId) {
        goToScreen(currentScreenId, nextScreenId);
        state.currentStep = step + 1;
    }
}

// Transition Helper
function goToScreen(fromId, toId) {
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);

    if (fromEl) {
        fromEl.classList.remove('active');
        // Small delay to allow fade out before display:none
        setTimeout(() => {
            fromEl.classList.add('hidden');
            toEl.classList.remove('hidden');
            // Trigger reflow
            void toEl.offsetWidth;
            toEl.classList.add('active');
        }, 400); // corresponds to var(--transition-medium)
    }
}

// Evaluate Qualification
function evaluateLead(lastScreenId) {
    // Lead is Qualified if they are willing to invest.
    const isWilling = state.answers.commitment === 'Sim, estamos dispostos';

    const lastEl = document.getElementById(lastScreenId);
    
    lastEl.classList.remove('active');

    setTimeout(() => {
        lastEl.classList.add('hidden');
        
        let resultElId = 'result-disqualified';
        if (isWilling) {
            resultElId = 'result-qualified';
            console.log('Lead Qualificado:', state.answers);
        } else {
            console.log('Lead Desqualificado:', state.answers);
        }

        const resultEl = document.getElementById(resultElId);
        resultEl.classList.remove('hidden');
        void resultEl.offsetWidth;
        resultEl.classList.add('active');
    }, 400);
}

// Simple Phone Formatter
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('input-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // Hit Enter to advance
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const step = state.currentStep;
                if (step >= 1 && step <= 4) {
                    nextStep(step);
                }
            }
        });
    });
});
