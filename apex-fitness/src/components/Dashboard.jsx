import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Chat from './Chat';

export default function Dashboard() {
  const { userData, planData, tasks, setTasks } = useContext(AppContext);

  const name = userData.name || 'Athlete';
  const hr = new Date().getHours();
  const greet = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';

  const stats = [
    { label: 'Calories/day', val: planData.calories || 2800, unit: 'kcal' },
    { label: 'Daily Protein', val: (planData.protein || 180) + 'g', unit: 'target' },
    { label: 'Training Days', val: userData.daysPerWeek || 5, unit: 'per week' },
    { label: 'Timeline', val: userData.timeline || '8 Weeks', unit: 'to goal' }
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;

  const toggleTask = (id) => {
    const newTasks = [...tasks];
    newTasks[id].done = !newTasks[id].done;
    setTasks(newTasks);
  };

  const doneTasks = tasks.filter(t => t.done).length;
  const totalTasks = tasks.length;
  const pct = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const circ = 2 * Math.PI * 50;
  const offset = circ - (circ * pct / 100);

  const goalPct = Math.round(((planData.goalStartNum || 20) / (planData.goalEndNum || 100)) * 100);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      gap: 0,
      flex: 1,
      minHeight: 0,
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '28px',
        overflowY: 'auto',
        borderRight: '1px solid var(--border)'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '28px',
            marginBottom: '4px'
          }}>
            {greet}, <span style={{ color: 'var(--accent)' }}>{name}</span>
          </h2>
          <p style={{
            color: 'var(--text2)',
            fontSize: '14px'
          }}>
            Day 1 of your {userData.timeline || 'journey'}. {planData.summary?.split('.')[0] || "Let's make it count"}.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          marginBottom: '28px'
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '14px 16px'
            }}>
              <div style={{
                fontSize: '11px',
                color: 'var(--text3)',
                letterSpacing: '0.08em',
                fontWeight: '600',
                marginBottom: '6px',
                textTransform: 'uppercase'
              }}>
                {stat.label}
              </div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '28px',
                color: 'var(--text)',
                letterSpacing: '0.03em',
                lineHeight: 1
              }}>
                {stat.val}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--text2)',
                marginTop: '2px'
              }}>
                {stat.unit}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '19px',
          letterSpacing: '0.06em',
          color: 'var(--text2)',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '3px',
            height: '18px',
            background: 'var(--accent)',
            borderRadius: '2px'
          }}></div>
          WEEKLY OVERVIEW
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px',
          marginBottom: '28px'
        }}>
          {days.map((day, i) => {
            const plan = planData.weeklyPlan?.[fullDays[i]];
            const cls = i < todayIdx ? 'done' : i === todayIdx ? 'today' : 'future';
            const typeColors = { workout: 'var(--accent)', cardio: 'var(--blue)', rest: 'var(--text3)' };
            const color = plan ? (typeColors[plan.type] || 'var(--text3)') : 'var(--text3)';

            return (
              <div key={i} style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius2)',
                padding: '10px 6px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '10px',
                  color: 'var(--text3)',
                  fontWeight: '600',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}>
                  {day}
                </div>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: '600',
                  background: cls === 'done' ? 'var(--accent)' : 'transparent',
                  color: cls === 'done' ? '#0a0a0f' : color,
                  border: cls === 'today' ? `1.5px solid ${color}` : 'none'
                }}>
                  {cls === 'done' ? '✓' : plan?.type === 'rest' ? '—' : '▸'}
                </div>
                <div style={{
                  fontSize: '9px',
                  color: 'var(--text3)',
                  marginTop: '4px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}>
                  {plan?.name || '—'}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '19px',
          letterSpacing: '0.06em',
          color: 'var(--text2)',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '3px',
            height: '18px',
            background: 'var(--accent)',
            borderRadius: '2px'
          }}></div>
          TODAY'S TASKS
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '28px'
        }}>
          {tasks.map((task, i) => (
            <div
              key={i}
              onClick={() => toggleTask(i)}
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                transition: '0.2s',
                cursor: 'pointer',
                opacity: task.done ? 0.5 : 1
              }}
            >
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                border: `1.5px solid ${task.done ? 'var(--accent)' : 'var(--border3)'}`,
                flex: 'shrink',
                marginTop: '1px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: '0.2s',
                background: task.done ? 'var(--accent)' : 'transparent',
                color: task.done ? '#0a0a0f' : 'transparent',
                fontWeight: 700
              }}>
                {task.done ? '✓' : ''}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '3px',
                  color: task.type === 'workout' ? 'var(--accent)' : task.type === 'nutrition' ? 'var(--orange)' : task.type === 'recovery' ? 'var(--blue)' : 'var(--purple)'
                }}>
                  {task.type}
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--text)'
                }}>
                  {task.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text2)',
                  marginTop: '2px'
                }}>
                  {task.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '24px',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{
            position: 'relative',
            display: 'inline-block'
          }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#ffffff0a" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#c8f53a"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '36px',
                color: 'var(--accent)',
                lineHeight: 1
              }}>
                {pct}%
              </div>
              <div style={{
                fontSize: '11px',
                color: 'var(--text3)',
                fontWeight: '600',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}>
                Today
              </div>
            </div>
          </div>
          <p style={{
            fontSize: '12px',
            color: 'var(--text3)',
            marginTop: '8px'
          }}>
            {doneTasks} / {totalTasks} tasks done
          </p>
        </div>

        <div style={{
          padding: '16px',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '16px'
          }}>
            <div style={{
              fontSize: '12px',
              color: 'var(--text2)',
              fontWeight: '600',
              letterSpacing: '0.04em',
              marginBottom: '8px'
            }}>
              {planData.goalStart || 'PRIMARY GOAL'}
            </div>
            <div style={{
              background: 'var(--bg4)',
              borderRadius: '4px',
              height: '6px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  background: 'var(--accent)',
                  height: '6px',
                  borderRadius: '4px',
                  width: `${goalPct}%`,
                  transition: 'width 0.5s'
                }}
              ></div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: 'var(--text3)',
              marginTop: '5px'
            }}>
              <span>{planData.goalStartNum || 'Start'}</span>
              <span>{planData.goalEndNum || 'Goal'}</span>
            </div>
          </div>
        </div>

        <Chat />
      </div>

      <style>{`
        @media (max-width: 700px) {
          .dash { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .dash-side { border-top: 1px solid var(--border); height: 400px; }
        }
      `}</style>
    </div>
  );
}
