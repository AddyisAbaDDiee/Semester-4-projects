import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const STEPS = [
  {
    id: 'basics',
    title: 'THE BASICS',
    sub: 'Tell us about yourself',
    fields: () => (
      <>
        <div className="row3">
          <div className="field">
            <label>Name</label>
            <input id="f-name" placeholder="Your name" />
          </div>
          <div className="field">
            <label>Age</label>
            <input id="f-age" type="number" placeholder="22" />
          </div>
          <div className="field">
            <label>Gender</label>
            <select id="f-gender">
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div className="row3">
          <div className="field">
            <label>Weight (kg)</label>
            <input id="f-weight" type="number" placeholder="70" />
          </div>
          <div className="field">
            <label>Height (cm)</label>
            <input id="f-height" type="number" placeholder="175" />
          </div>
          <div className="field">
            <label>Body Fat %</label>
            <input id="f-bf" type="number" placeholder="20" />
          </div>
        </div>
        <div className="field">
          <label>Current fitness level</label>
          <div className="chip-group" id="fitness-level">
            <div className="chip" onClick={(e) => selChip(e, 'fitness-level', true)}>Beginner</div>
            <div className="chip" onClick={(e) => selChip(e, 'fitness-level', true)}>Intermediate</div>
            <div className="chip" onClick={(e) => selChip(e, 'fitness-level', true)}>Advanced</div>
            <div className="chip" onClick={(e) => selChip(e, 'fitness-level', true)}>Athlete</div>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'goals',
    title: 'YOUR GOALS',
    sub: 'What do you want to achieve?',
    fields: () => (
      <>
        <div className="field">
          <label>Primary goal</label>
          <div className="chip-group" id="primary-goal">
            <div className="chip" onClick={(e) => selChip(e, 'primary-goal', true)}>Build Muscle</div>
            <div className="chip" onClick={(e) => selChip(e, 'primary-goal', true)}>Lose Fat</div>
            <div className="chip" onClick={(e) => selChip(e, 'primary-goal', true)}>Endurance</div>
            <div className="chip" onClick={(e) => selChip(e, 'primary-goal', true)}>Strength</div>
            <div className="chip" onClick={(e) => selChip(e, 'primary-goal', true)}>Athletic Performance</div>
            <div className="chip" onClick={(e) => selChip(e, 'primary-goal', true)}>Body Recomposition</div>
          </div>
        </div>
        <div className="field">
          <label>Specific goal (e.g. "100 consecutive pushups in 2 months")</label>
          <textarea id="f-specific-goal" placeholder="Be as specific as possible — deadline, target number, milestone..."></textarea>
        </div>
        <div className="field">
          <label>Your current status (e.g. "I can do 20 pushups now")</label>
          <textarea id="f-current-status" placeholder="Where are you right now?"></textarea>
        </div>
        <div className="field">
          <label>Timeline</label>
          <div className="chip-group" id="timeline">
            <div className="chip" onClick={(e) => selChip(e, 'timeline', true)}>4 Weeks</div>
            <div className="chip" onClick={(e) => selChip(e, 'timeline', true)}>8 Weeks</div>
            <div className="chip" onClick={(e) => selChip(e, 'timeline', true)}>3 Months</div>
            <div className="chip" onClick={(e) => selChip(e, 'timeline', true)}>6 Months</div>
            <div className="chip" onClick={(e) => selChip(e, 'timeline', true)}>1 Year</div>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'training',
    title: 'TRAINING PREFERENCES',
    sub: 'What works for you',
    fields: () => (
      <>
        <div className="field">
          <label>Available equipment</label>
          <div className="chip-group" id="equipment">
            <div className="chip" onClick={(e) => selChip(e, 'equipment')}>No equipment (bodyweight)</div>
            <div className="chip" onClick={(e) => selChip(e, 'equipment')}>Dumbbells</div>
            <div className="chip" onClick={(e) => selChip(e, 'equipment')}>Barbell</div>
            <div className="chip" onClick={(e) => selChip(e, 'equipment')}>Full gym</div>
            <div className="chip" onClick={(e) => selChip(e, 'equipment')}>Resistance bands</div>
            <div className="chip" onClick={(e) => selChip(e, 'equipment')}>Pull-up bar</div>
          </div>
        </div>
        <div className="row2">
          <div className="field">
            <label>Days per week available</label>
            <select id="f-days">
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </select>
          </div>
          <div className="field">
            <label>Workout duration</label>
            <select id="f-duration">
              <option>20-30 min</option>
              <option>30-45 min</option>
              <option>45-60 min</option>
              <option>60-90 min</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label>Exercises you want to include</label>
          <textarea id="f-like-ex" placeholder="e.g. pushups, pullups, running, squats..."></textarea>
        </div>
        <div className="field">
          <label>Exercises to AVOID</label>
          <textarea id="f-avoid-ex" placeholder="Injuries, dislikes, limitations..."></textarea>
        </div>
        <div className="field">
          <label>Weaknesses / areas to improve</label>
          <textarea id="f-weak" placeholder="e.g. poor upper body strength, weak core, low stamina..."></textarea>
        </div>
      </>
    )
  },
  {
    id: 'nutrition',
    title: 'NUTRITION & LIFESTYLE',
    sub: 'Fuel your transformation',
    fields: () => (
      <>
        <div className="field">
          <label>Diet type</label>
          <div className="chip-group" id="diet">
            <div className="chip" onClick={(e) => selChip(e, 'diet', true)}>No restrictions</div>
            <div className="chip" onClick={(e) => selChip(e, 'diet', true)}>Vegetarian</div>
            <div className="chip" onClick={(e) => selChip(e, 'diet', true)}>Vegan</div>
            <div className="chip" onClick={(e) => selChip(e, 'diet', true)}>Keto</div>
            <div className="chip" onClick={(e) => selChip(e, 'diet', true)}>Intermittent Fasting</div>
            <div className="chip" onClick={(e) => selChip(e, 'diet', true)}>High Protein</div>
          </div>
        </div>
        <div className="field">
          <label>Foods you love</label>
          <textarea id="f-food-like" placeholder="Rice, eggs, chicken, oats, bananas..."></textarea>
        </div>
        <div className="field">
          <label>Foods you dislike or can't eat</label>
          <textarea id="f-food-avoid" placeholder="Allergies, dislikes, cultural restrictions..."></textarea>
        </div>
        <div className="field">
          <label>Open to supplements?</label>
          <div className="chip-group" id="supps">
            <div className="chip" onClick={(e) => selChip(e, 'supps')}>Protein powder</div>
            <div className="chip" onClick={(e) => selChip(e, 'supps')}>Creatine</div>
            <div className="chip" onClick={(e) => selChip(e, 'supps')}>Pre-workout</div>
            <div className="chip" onClick={(e) => selChip(e, 'supps')}>Vitamins/minerals</div>
            <div className="chip" onClick={(e) => selChip(e, 'supps')}>No supplements</div>
          </div>
        </div>
        <div className="row2">
          <div className="field">
            <label>Avg sleep hours</label>
            <select id="f-sleep">
              <option>4-5</option>
              <option>5-6</option>
              <option>6-7</option>
              <option>7-8</option>
              <option>8+</option>
            </select>
          </div>
          <div className="field">
            <label>Stress level (1-10)</label>
            <input id="f-stress" type="number" min="1" max="10" placeholder="5" />
          </div>
        </div>
        <div className="field">
          <label>Any injuries or health conditions?</label>
          <textarea id="f-injuries" placeholder="Lower back pain, knee issues, none..."></textarea>
        </div>
      </>
    )
  }
];

function selChip(e, group, single = false) {
  if (single) {
    document.querySelectorAll(`#${group} .chip`).forEach(c => c.classList.remove('sel'));
  }
  e.target.classList.toggle('sel');
}

function getSelChips(group) {
  return [...document.querySelectorAll(`#${group} .chip.sel`)].map(c => c.textContent).join(', ');
}

export default function Onboard() {
  const { currentStep, setCurrentStep, setUserData, userData, setCurrentScreen } = useContext(AppContext);
  const total = STEPS.length;
  const currentStepData = STEPS[currentStep];

  const handleNext = () => {
    const step = STEPS[currentStep];
    const collected = {
      name: document.getElementById('f-name')?.value,
      age: document.getElementById('f-age')?.value,
      gender: document.getElementById('f-gender')?.value,
      weight: document.getElementById('f-weight')?.value,
      height: document.getElementById('f-height')?.value,
      bodyFat: document.getElementById('f-bf')?.value,
      fitnessLevel: getSelChips('fitness-level'),
      primaryGoal: getSelChips('primary-goal'),
      specificGoal: document.getElementById('f-specific-goal')?.value,
      currentStatus: document.getElementById('f-current-status')?.value,
      timeline: getSelChips('timeline'),
      equipment: getSelChips('equipment'),
      daysPerWeek: document.getElementById('f-days')?.value,
      duration: document.getElementById('f-duration')?.value,
      likedExercises: document.getElementById('f-like-ex')?.value,
      avoidExercises: document.getElementById('f-avoid-ex')?.value,
      weaknesses: document.getElementById('f-weak')?.value,
      diet: getSelChips('diet'),
      likedFoods: document.getElementById('f-food-like')?.value,
      avoidedFoods: document.getElementById('f-food-avoid')?.value,
      supplements: getSelChips('supps'),
      sleep: document.getElementById('f-sleep')?.value,
      stress: document.getElementById('f-stress')?.value,
      injuries: document.getElementById('f-injuries')?.value,
    };

    setUserData({ ...userData, ...collected });

    if (currentStep < total - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentScreen('generation');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const dots = [];
  for (let i = 0; i < total; i++) {
    const cls = i < currentStep ? 'done' : i === currentStep ? 'current' : '';
    dots.push(
      <React.Fragment key={i}>
        <div className={`step-dot ${cls}`} style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1.5px solid var(--border2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: '600',
          color: 'var(--text3)',
          background: i < currentStep ? 'var(--accent)' : 'transparent',
          borderColor: i < currentStep ? 'var(--accent)' : i === currentStep ? 'var(--accent)' : 'var(--border2)',
          color: i < currentStep ? '#0a0a0f' : i === currentStep ? 'var(--accent)' : 'var(--text3)',
        }}>
          {i < currentStep ? '✓' : i + 1}
        </div>
        {i < total - 1 && (
          <div style={{
            flex: 1,
            height: '1px',
            background: i < currentStep ? 'var(--accent)' : 'var(--border)',
          }}></div>
        )}
      </React.Fragment>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px 20px',
        width: '100%',
        flex: 1,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '36px',
        }}>
          {dots}
        </div>

        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '32px',
          letterSpacing: '0.05em',
          marginBottom: '6px',
        }}>
          {currentStepData.title}
        </h2>
        <p style={{
          color: 'var(--text2)',
          fontSize: '14px',
          marginBottom: '28px',
        }}>
          {currentStepData.sub}
        </p>

        {currentStepData.fields()}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '28px',
          alignItems: 'center',
        }}>
          {currentStep > 0 ? (
            <button className="btn-ghost" onClick={handlePrev}>
              ← Back
            </button>
          ) : (
            <div></div>
          )}
          <button className="btn-primary" onClick={handleNext}>
            {currentStep === total - 1 ? 'GENERATE MY PLAN →' : 'CONTINUE →'}
          </button>
        </div>
      </div>
    </div>
  );
}
