import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { api } from '../api/client';

export default function Generation() {
  const { userData, setPlanData, setCurrentScreen, setTasks } = useContext(AppContext);
  const [logs, setLogs] = useState(['Analyzing fitness profile...']);

  useEffect(() => {
    generatePlan();
  }, []);

  const generatePlan = async () => {
    const msgs = [
      'Analyzing fitness profile...',
      'Calculating macronutrient targets...',
      'Designing workout periodization...',
      'Personalizing daily schedule...',
      'Crafting meal plan...',
      'Adding supplement protocol...',
      'Building recovery strategy...',
      'Finalizing your APEX program...'
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < msgs.length) {
        setLogs(prev => [...prev, msgs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1400);

    const prompt = `You are APEX, an elite AI fitness coach. Create a comprehensive, highly personalized fitness program. Be extremely specific, professional, and actionable.

USER PROFILE:
- Name: ${userData.name || 'Athlete'}, Age: ${userData.age}, Gender: ${userData.gender}
- Weight: ${userData.weight}kg, Height: ${userData.height}cm, Body Fat: ${userData.bodyFat}%
- Fitness Level: ${userData.fitnessLevel}
- Primary Goal: ${userData.primaryGoal}
- SPECIFIC TARGET: ${userData.specificGoal}
- Current Status: ${userData.currentStatus}
- Timeline: ${userData.timeline}
- Equipment: ${userData.equipment}
- Days/week: ${userData.daysPerWeek}, Duration: ${userData.duration}
- Likes: ${userData.likedExercises}, Avoids: ${userData.avoidExercises}
- Weaknesses: ${userData.weaknesses}
- Diet: ${userData.diet}, Likes: ${userData.likedFoods}, Avoids: ${userData.avoidedFoods}
- Supplements: ${userData.supplements}
- Sleep: ${userData.sleep}h, Stress: ${userData.stress}/10
- Injuries: ${userData.injuries}

Return ONLY raw JSON (no markdown) with this structure:
{
  "summary": "2-3 sentence motivating overview",
  "calories": number, "protein": number, "carbs": number, "fat": number,
  "weeklyPlan": {
    "Monday": {"type": "workout|rest|cardio", "name": "session name", "details": "description"},
    "Tuesday": {}, "Wednesday": {}, "Thursday": {}, "Friday": {}, "Saturday": {}, "Sunday": {}
  },
  "workoutProgram": "Full detailed workout program with exercises, sets, reps, progression",
  "nutritionPlan": "Full meal plan with breakfast, lunch, dinner, snacks, macros",
  "supplementProtocol": "Supplement timing and dosing",
  "recoveryPlan": "Sleep, mobility, rest day activities",
  "progressionStrategy": "How to progress week by week",
  "dailyTasks": [
    {"type": "workout|nutrition|recovery|supplement", "name": "task name", "detail": "specific instruction"}
  ],
  "goalStart": "starting metric label", "goalEnd": "target metric label",
  "goalStartNum": number, "goalEndNum": number,
  "weeklyMilestones": ["Week 1: ...", "Week 2: ...", "Week 3: ...", "Week 4: ..."]
}`;

    try {
      const result = await api.generatePlan(prompt);
      let text = result.content[0].text.trim().replace(/```json|```/g, '').trim();
      const plan = JSON.parse(text);
      setPlanData(plan);
      
      const dailyTasks = plan.dailyTasks.map((t, i) => ({
        ...t,
        id: i,
        done: false
      }));
      setTasks(dailyTasks);
      
      clearInterval(interval);
      setTimeout(() => setCurrentScreen('app'), 1000);
    } catch (e) {
      console.error('Plan generation error:', e);
      setLogs(prev => [...prev, `Error: ${e.message}`]);
      
      // Fallback plan
      const fallbackPlan = {
        summary: `A powerful ${userData.timeline || '8-week'} program built around ${userData.specificGoal || 'peak performance'}.`,
        calories: 2800,
        protein: 180,
        carbs: 320,
        fat: 80,
        weeklyPlan: {
          Monday: { type: 'workout', name: 'Push Day', details: 'Chest, shoulders, triceps' },
          Tuesday: { type: 'cardio', name: 'Cardio + Core', details: '30 min zone 2 + ab circuit' },
          Wednesday: { type: 'workout', name: 'Pull Day', details: 'Back, biceps' },
          Thursday: { type: 'rest', name: 'Active Recovery', details: 'Light walk, stretching' },
          Friday: { type: 'workout', name: 'Legs + Power', details: 'Squats, lunges, plyometrics' },
          Saturday: { type: 'workout', name: 'Full Body HIIT', details: 'High intensity circuit' },
          Sunday: { type: 'rest', name: 'Rest Day', details: 'Complete rest' }
        },
        workoutProgram: 'WEEK 1-2: Foundation\n\nPUSH DAY:\n• Pushups: 4×15\n• Pike pushups: 3×12\n• Tricep dips: 3×15',
        nutritionPlan: 'DAILY: 2800 cal | 180g protein | 320g carbs | 80g fat\n\nBREAKFAST: 4 eggs + oats + banana',
        supplementProtocol: 'MORNING: Multivitamin, D3, Omega-3',
        recoveryPlan: 'SLEEP: 8 hours, 10:30pm bedtime',
        progressionStrategy: 'Week 1-2: Baseline, Week 3-4: +10% volume',
        dailyTasks: [
          { type: 'workout', name: 'Morning Training', detail: 'Complete programmed workout' },
          { type: 'nutrition', name: 'Hit Protein Target', detail: 'Eat 180g protein' }
        ],
        goalStart: 'Current pushups',
        goalEnd: 'Target pushups',
        goalStartNum: 20,
        goalEndNum: 100
      };
      
      setPlanData(fallbackPlan);
      const dailyTasks = fallbackPlan.dailyTasks.map((t, i) => ({
        ...t,
        id: i,
        done: false
      }));
      setTasks(dailyTasks);
      
      clearInterval(interval);
      setTimeout(() => setCurrentScreen('app'), 2000);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: '40px 20px',
      textAlign: 'center',
      gap: '20px',
      minHeight: '100vh'
    }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '42px',
        letterSpacing: '0.05em'
      }}>
        BUILDING YOUR <span style={{ color: 'var(--accent)' }}>APEX PLAN</span>
      </div>

      <div style={{
        width: '56px',
        height: '56px',
        border: '2px solid var(--border2)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>

      <p style={{
        color: 'var(--text2)',
        fontSize: '14px'
      }}>
        Claude is analyzing your profile and crafting your personalized program...
      </p>

      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '16px 20px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'left',
        fontFamily: "'DM Mono', monospace",
        fontSize: '12px',
        color: 'var(--text2)',
        maxHeight: '160px',
        overflow: 'auto'
      }}>
        {logs.map((log, i) => (
          <div key={i}>
            <span style={{ color: 'var(--accent)' }}>→</span> {log}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
